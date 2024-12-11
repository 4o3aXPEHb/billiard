<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

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

    public function orders(){
        return Inertia::render('Admin/Orders');
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
