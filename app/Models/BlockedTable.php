<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockedTable extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_table',
        'id_order_table',
        'timeStart',
        'timeEnd',
    ];

    /**
     * Отключение автоматических временных меток (created_at, updated_at).
     */
    public $timestamps = false;

    /**
     * Связь с таблицей 'tables' (одна запись соответствует одному столу).
     */
    public function table()
    {
        return $this->belongsTo(Table::class, 'id_table');
    }

    /**
     * Связь с таблицей 'order_tables' (одна запись связана с заказом, если он есть).
     */
    public function orderTable()
    {
        return $this->belongsTo(OrderTable::class, 'id_order_table');
    }
}
