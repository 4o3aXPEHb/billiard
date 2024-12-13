<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use Inertia\Response;

class AdminController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.clients');
    }
    public function clients(Request $request)
    {
        $query = User::query();

        // Поиск по имени или email
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }
        else $query->where('role','user');

        // Пагинация для удобства
        $clients = $query->paginate(10);

        return inertia('Admin/Clients', [
            'clients' => $clients,
            'filters' => $request->only('search'),
        ]);
    }

    public function orders(): Response
    {
        $user = Auth::user();
        $orders = Order::with('orderedTables.blockedTable') // Загрузка связанных столов
        ->get();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'user' => $user,
        ]);
    }

    public function orderDetails($id){
        $order = Order::with(['user', 'admin', 'orderedTables.blockedTable'])->find($id);
        return Inertia::render('Admin/OrderDetailsPage', [
            'order' => $order,
            'user' => Auth::user(),
        ]);
    }

    public function tournaments(){
        return Inertia::render('Admin/Tournaments');
    }

    public function clientUpdate(Request $request, $id)
    {
        $users = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $users->update($validated);

        return redirect()->route('admin.clients')->with('success', 'Клиент обновлён!');
    }
}
