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
        Schema::create('fines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id')->nullable()->constrained('payments')->onDelete('cascade'); // nullable karena pada awal pembuatan bagian ini belum tentu ada
            // lates fines
            $table->integer('late_time')->default(0);
            $table->integer('late_amount')->default(5000); // dihitung per jam (jika tidak melawati 1 jam akan tetap dihitung 1 jam)
            // damage fines
            $table->string('damage_type')->nullable(); // karena pada awal pembuatan bagian ini belum tentu ada
            $table->integer('damage_amount')->nullable(); // karena pada awal pembuatan bagian ini belum tentu ada
            $table->text('description')->nullable();
            $table->string('status')->default('waiting_check'); // unpaid, paid
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fines');
    }
};
