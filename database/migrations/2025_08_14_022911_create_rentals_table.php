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
            $table->foreignId('pickup_location_id')->constrained('user_addresses')->onDelete('cascade');
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');
            $table->foreignId('fine_id')->nullable()->constrained()->onDelete('cascade'); // nullable karena belum tentu ada denda
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->integer('total_price'); // merupakan hasil perhitungan yang telah dilakukan
            $table->string('status')->default('pending_payment');
            $table->string('cancelled_reason')->nullable();
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
