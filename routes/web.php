<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});
Route::get('/dash',function (){
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/orders', [ProfileController::class, 'myOrders'])->name('profile.orders');
});

// Для админа
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/clients', [AdminController::class, 'clients'])->name('admin.clients');
    Route::get('/admin/tournaments', [AdminController::class, 'tournaments'])->name('admin.tournaments');
    Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
    Route::get('/admin/orders/{id}', [AdminController::class, 'orderDetails'])->name('admin.orders.details');
    Route::post('/admin/clients/{id}/update', [AdminController::class, 'clientUpdate'])->name('clients.update');
});


//Для всех
Route::get('/', [UserController::class, 'index'])->name('main');
Route::get('/order',[UserController::class, 'order'])->name('main.order');
Route::get('/tournaments',function (){
    return Inertia::render('Main/Tournaments');
})->name('main.tournaments');
Route::post('/order',[UserController::class, 'orderPost'])->name('main.order.post');
Route::get('/order/confirm/{id}',[UserController::class, 'orderConfirm'])->name('main.order.confirm');
Route::post('/order/update-status',[UserController::class, 'orderUpdateStatus'])->name('main.order.update.status');


require __DIR__.'/auth.php';
