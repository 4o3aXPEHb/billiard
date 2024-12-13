<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTable extends Model
{
    use HasFactory;

    // Связь с заказом
    public function order()
    {
        return $this->belongsTo(Order::class, 'id_order'); // Укажите внешний ключ, если он отличается
    }
    public function blockedTable()
    {
        return $this->belongsTo(BlockedTable::class, 'id_blocked_table'); // Укажите внешний ключ, если он отличается
    }
}
