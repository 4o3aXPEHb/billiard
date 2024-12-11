<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blocked_tables', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_table')->references('id')->on('tables');
            $table->dateTime('timeStart');
            $table->dateTime('timeEnd');
            $table->integer('id_order_table')->nullable()->references('id')->on('order_tables');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blocked_table');
    }
};
