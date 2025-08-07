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
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('city')->nullable(); // e.g., Malang
            $table->string('district')->nullable(); // e.g., Asembagus
            $table->string('regency')->nullable(); // e.g., Situbondo
            $table->string('province')->nullable(); // e.g., Jawa Timur
            $table->string('postal_code')->nullable(); // e.g., 62704
            $table->text('detail')->nullable(); // Additional details about the address
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
