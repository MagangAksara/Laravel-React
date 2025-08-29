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
            $table->string('invoice_id')->nullable(); // ID for the invoice
            $table->string('payment_request_id')->nullable(); // ID for the payment request
            $table->string('payer_email'); // Email of the payer
            $table->integer('amount')->nullable(); // Amount to be paid
            $table->string('payment_method')->nullable(); // e.g., credit card, PayPal
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
