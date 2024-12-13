<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user',
        'id_admin',
        // Другие поля заказа...
    ];

    // Связь с пользователем
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    // Связь с администратором
    public function admin()
    {
        return $this->belongsTo(User::class, 'id_admin');
    }
    public function orderedTables()
    {
        return $this->hasMany(OrderTable::class, 'id_order');
    }
}
