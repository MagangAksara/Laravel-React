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
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // user_id dari role customer
            $table->foreignId('car_id')->constrained()->onDelete('cascade'); 
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_price'); // merupakan hasil perhitungan yang telah dilakukan
            $table->enum('status', ['pending_payment', 'confirmed_payment', 'cancelled','expired', 'on_rent', 'waiting_for_check', 'waiting_for_fines_payment', 'completed'])->default('pending_payment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rentals');
    }
};
