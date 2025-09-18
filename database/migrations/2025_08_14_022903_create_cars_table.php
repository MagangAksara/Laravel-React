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
            // in relasion
            $table->foreignId('car_brand_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_model_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_color_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_fuel_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_transmission_id')->constrained()->onDelete('cascade');
            // in tabel
            $table->text('main_image')->nullable(); // URL or path to the car image
            $table->string('plate_number')->unique();
            $table->integer('capacity')->nullable(); // e.g., 4, 5, 7
            $table->string('year')->nullable(); // e.g., 2020, 2021
            $table->text('description')->nullable();
            // fee
            $table->unsignedInteger('price_per_day');
            $table->unsignedInteger('driver_fee_on_day');
            $table->unsignedInteger('overtime_fee_on_hour');
            $table->boolean('is_available')->default(true);
            // important Informatin
            $table->text('rule_before_booking')->default('Be sure to read the rental terms');
            $table->text('rule_after_booking')->default('The provider will contact the driver via WhatsApp to request photos of some mandatory documents.');
            $table->text('rule_during_pickup')->default("Bring your ID card, driver's license, and any other documents required by the rental company.
When you meet with the rental staff, inspect the car's condition with them.
Afterward, read and sign the rental agreement.");
            // policies
            $table->text('rule_before_pickup')->nullable();
            $table->text('rule_at_pickup')->nullable();
            $table->text('rule_usage')->nullable();
            $table->text('rule_return')->nullable();
            $table->text('rule_overtime')->nullable();
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
