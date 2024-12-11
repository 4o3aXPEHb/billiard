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
        $userId = Auth::user()->id;
        DB::table('blocked_tables')->insert(
            ['id_order_table' => null,
                'id_table' => $request->id_table,
                'timeStart' => Carbon::parse($request->timeStart, 'UTC')->setTimezone('UTC')->format('Y-m-d H:i:s'),
                'timeEnd' => Carbon::parse($request->timeEnd, 'UTC')->setTimezone('UTC')->format('Y-m-d H:i:s')]
        );
        Log::info('This is some useful information.');
    }
}
