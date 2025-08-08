<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Xendit\Xendit;
use Xendit\Configuration;
use Xendit\invoice\InvoiceApi;
use Xendit\Invoice\CreateInvoiceRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

use App\Models\Payment;

class PaymentController extends Controller
{
    var $apiInstance = null;

    public function __construct() {
        Configuration::setXenditKey(config('services.xendit.secret_key'));
        $this->apiInstance = new InvoiceApi();
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1000',
            'description' => 'required|string|max:255',
            'payer_email' => 'required|email',
        ]);

        $external_id = (string) Str::uuid();

        $create_invoice_request = new CreateInvoiceRequest([
            'external_id' => $external_id,
            'amount' => (int) $request->amount,
            'description' => $request->description,
            'payer_email' => $request->payer_email,
            // 'metadata' => ['example' => 'value'], // optional
        ]);

        try {
            $result = $this->apiInstance->createInvoice($create_invoice_request);

            $payment = new Payment();
            $payment->status = 'pending';
            $payment->rental_id = null;
            $payment->external_id = $external_id;
            $payment->xendit_payment_id = $result->getId();
            $payment->payer_email = $request->payer_email;
            $payment->payment_method = 'xendit';
            $payment->checkout_link = $result->getInvoiceUrl();
            $payment->paid_at = null;
            $payment->description = $request->description;
            $payment->save();

            return response()->json([
                'message' => 'Payment created successfully',
                'data' => $payment,
                'checkout_link' => $result->getInvoiceUrl(),
            ], 201);
        } catch (\Xendit\XenditSdkException $e) {
            Log::error($e->getMessage());
            // Log::error($e->getResponseBody()); // Removed due to undefined method
            return response()->json([
                'error' => 'Failed to create invoice',
                'details' => $e->getMessage(),
            ], 400);
        }
    }
}
