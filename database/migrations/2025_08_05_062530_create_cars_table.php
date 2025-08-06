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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // name
            $table->string('brand'); // e.g., Toyota, Honda
            $table->string('model')->nullable(); // e.g., Corolla, Civic
            // description
            $table->string('plate_number')->unique();
            $table->string('color')->nullable(); // e.g., Red, Blue
            $table->string('type')->nullable(); // e.g., G for sedan, SUV, MPV
            $table->text('fuel_type')->nullable(); // e.g., Petrol, Diesel, Electric
            $table->string('type_transmisi')->nullable(); // manual atau automatic
            $table->integer('capacity')->nullable(); // e.g., 4, 5, 7
            $table->string('year')->nullable(); // e.g., 2020, 2021
            $table->text('description')->nullable();
            // price order
            $table->decimal('price_per_day', 10, 2);
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
