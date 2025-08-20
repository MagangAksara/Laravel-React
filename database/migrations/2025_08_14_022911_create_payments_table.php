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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('external_id'); // Optional external ID for tracking
            $table->string('xendit_payment_id')->unique(); // Unique ID from Xendit
            $table->string('payer_email'); // Email of the payer
            $table->string('payment_method'); // e.g., credit card, PayPal
            $table->string('status')->default('pending'); // pending, confirmed, completed
            $table->string('checkout_link'); // URL for Xendit checkout
            $table->timestamp('paid_at')->nullable(); // Timestamp when payment was made
            $table->text('description')->nullable(); // Description of the payment
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
