<?php

namespace App\Http\Controllers;

use App\Models\BlockedTable;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\User;


class UserController extends Controller
{
    public function index(){
        return redirect()->route('main.order');
    }
    public function order(){
        $tables = Table::all();
        $blockedTables = BlockedTable::query()->where('timeStart','>=',now())->get();
        return inertia('Main/Order', [
            'tables' => $tables,
            'bookedTables' => $blockedTables,
            'user' => Auth::user()]);
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
            'id_user' => ($isAuthorized ? $userId : null),
            'status' => 'processed',
            'total_price' => 0, //********Заполнить
            'client_name' => ($isAdmin || !$isAuthorized ? $request->client['name'] : null),
            'client_email' => ($isAdmin || !$isAuthorized ? $request->client['email'] : null),
            'client_phone' => ($isAdmin || !$isAuthorized ? $request->client['phone'] : null),
        ]);

        $idOrderTable = DB::table('order_tables')->insertGetId([
            'id_blocked_table' => $idBlockedTable,
            'id_order' => $idOrder,
            'price'    => 100
        ]);

        return redirect()->route('main.order', [
            'id_blocked_table' => $idBlockedTable,
            'id_order' => $idOrder,
            'idOrderTable' => $idOrderTable,
        ]);
    }

    public function orderDetail($request){
        $blockedTable = BlockedTable::query()->find($request->id_blocked_table);
    }
}
