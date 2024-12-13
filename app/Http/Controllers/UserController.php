<?php

namespace App\Http\Controllers;

use App\Models\BlockedTable;
use App\Models\Order;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;


class UserController extends Controller
{
    public function index(){
        return Redirect::to(route('main.order'));
    }
    public function order(){
        $tables = Table::all();
        $blockedTables = BlockedTable::query()->where('timeStart','>=',now())->get();
        return inertia('Main/Order', [
            'tables' => $tables,
            'bookedTables' => $blockedTables,
            'user' => Auth::user(),
        ]);
    }

    public function orderPost(Request $request){
        $isAdmin = false;
        $isAuthorized = false;
        if(Auth::check()){
            $userId = Auth::user()->id;
            $isAuthorized = true;
            if(Auth::user()->role == 'admin'){
                $isAdmin = true;
            }
        }

        $idBlockedTable = DB::table('blocked_tables')->insertGetId(
            ['id_order_table' => null,
                'id_table' => $request->id_table,
                'timeStart' => Carbon::parse($request->timeStart, 'UTC')->setTimezone('UTC')->format('Y-m-d H:i:s'),
                'timeEnd' => Carbon::parse($request->timeEnd, 'UTC')->setTimezone('UTC')->format('Y-m-d H:i:s')]
        );

        $idOrder = DB::table('orders')->insertGetId([
            'id_admin' => ($isAdmin ? $userId : null),
            'id_user' => ($isAuthorized && !$isAdmin ? $userId : null),
            'status' => 'processed',
            'total_price' => 0, //********Заполнить
            'client_name' => ($isAdmin || !$isAuthorized ? $request->client['name'] : null),
            'client_email' => ($isAdmin || !$isAuthorized ? $request->client['email'] : null),
            'client_phone' => ($isAdmin || !$isAuthorized ? $request->client['phone'] : null),
        ]);

        // вычисление цены стола по времени
        $timeStart = Carbon::parse($request->timeStart);
        $timeEnd = Carbon::parse($request->timeEnd);

        // Вычисляем разницу в минутах
        $minutesDifference = $timeEnd->diffInMinutes($timeStart);

        // Преобразуем в часы в виде числа
        $hours = $minutesDifference / 60;

        $tableHourPrice = Table::query()->where('id','=',$request->id_table)->get()->first()->hour_price;
        $tableTotalPrice = $tableHourPrice * $hours;

        $idOrderTable = DB::table('order_tables')->insertGetId([
            'id_blocked_table' => $idBlockedTable,
            'id_order' => $idOrder,
            'price'    => $tableTotalPrice,
        ]);


        //надо бы похорошему все столы перемножить*************************
        DB::table('orders')->where('id','=',$idOrder)->update([
            'total_price' => $tableTotalPrice,
        ]);

        return response()->json([
            'redirect' => route('main.order.confirm', ['id' => $idOrder]),
        ]);
    }

    public function orderConfirm($id){
        $order = Order::with(['user', 'admin', 'orderedTables.blockedTable'])->find($id);
        return Inertia::render('Main/ConfirmOrderPage', [
            'order' => $order,
            'user' => Auth::user(),
        ]);
    }

    public function orderUpdateStatus(Request $request)
    {
        DB::table('orders')->where('id','=',$request->id_order)->update([
            'status' => $request->status,
        ]);
        return response()->json([
            'redirect' => route('main.order'),
            'orderStatus' => $request->status,
        ]);
    }
}
