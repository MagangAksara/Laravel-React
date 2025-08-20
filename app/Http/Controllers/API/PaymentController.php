<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Xendit\Xendit;
use Xendit\Configuration;
use Xendit\XenditSdkException;
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

    public function showPayments()
    {
        $payments = Payment::all();
        return response()->json($payments);
    }

    // fungsi untuk membuat pembayaran baru
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
            'success_redirect_url' => url('/rental'), // halaman sukses
            'failure_redirect_url' => url('/rental/failed'),  // halaman gagal
        ]);

        try {
            $result = $this->apiInstance->createInvoice($create_invoice_request);

            $payment = new Payment();
            $payment->status = 'pending';
            // $payment->rental_id = null;
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
        } catch (XenditSdkException $e) {
            Log::error($e->getMessage());
            // Log::error($e->getResponseBody()); // Removed due to undefined method
            return response()->json([
                'error' => 'Failed to create invoice',
                'details' => $e->getMessage(),
            ], 400);
        }
    }

    public function webhook(Request $request)
    {
        $data = $request->all();
        Log::info('Xendit Webhook received', $data);

        $payment = Payment::where('external_id', $data['external_id'] ?? null)->first();

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        // Ambil status asli dari Xendit
        $xenditStatus = strtolower($data['status'] ?? '');

        // Mapping status untuk rental
        $statusMap = [
            'pending' => 'pending payment',
            'unpaid'  => 'pending payment',
            'paid'    => 'confirmed payment',
            'settled' => 'confirmed payment',
            'expired' => 'expired',
            'failed'  => 'cancelled',
        ];

        // Selalu simpan status asli dari Xendit ke payment
        $payment->status = $xenditStatus;

        if (in_array($xenditStatus, ['paid', 'settled'])) {
            $payment->paid_at = $data['paid_at'] ?? now();
        }

        $payment->save();

        // 🔥 update status rental (pakai status hasil mapping)
        if (isset($statusMap[$xenditStatus])) {
            $mappedStatus = $statusMap[$xenditStatus];
            $rental = $payment->rental;

            if ($rental && in_array($mappedStatus, ['confirmed payment', 'cancelled', 'expired'])) {
                $rental->status = $mappedStatus;
                $rental->save();
            }
        }

        return response()->json(['message' => 'Webhook processed']);
    }


    
    // public function notification(Request $request)
    // {
    //     $result = $this->apiInstance->getInvoices(null, $request->external_id);

    //     // get data dari DB
    //     $payment = Payment::where('external_id', $request->external_id)->first();

    //     if (!$payment) {
    //         return response()->json(['message' => 'Payment tidak ditemukan'], 404);
    //     }

    //     if ($payment->status == 'settled') {
    //         return response()->json('Payment telah diproses');
    //     }

    //     // update status
    //     $payment->status = strtolower($result[0]['status']);

    //     // update paid_at jika ada dari Xendit
    //     if (!empty($result[0]['paid_at'])) {
    //         $payment->paid_at = $result[0]['paid_at'];
    //     }

    //     // simpan perubahan
    //     $payment->save();

    //     return response()->json([
    //         'message' => 'Payment status updated successfully',
    //         'updated_payment' => [
    //             'id' => $payment->id,
    //             'external_id' => $payment->external_id,
    //             'status' => $payment->status,
    //             'paid' => $payment->status === 'settled' || $payment->status === 'paid',
    //             'paid_at' => $payment->paid_at,
    //             'description' => $payment->description,
    //             'payer_email' => $payment->payer_email,
    //             'checkout_link' => $payment->checkout_link,
    //         ]
    //     ]);
    

    //     // $data = $request->all();
    //     // Log::info('Payment notification received', $data);

    //     // if (isset($data['id']) && isset($data['status'])) {
    //     //     $payment = Payment::where('xendit_payment_id', $data['id'])->first();

    //     //     if ($payment) {
    //     //         $payment->status = $data['status'];
    //     //         if ($data['status'] === 'PAID') {
    //     //             $payment->paid_at = now();
    //     //         }
    //     //         $payment->save();

    //     //         return response()->json(['message' => 'Payment status updated successfully'], 200);
    //     //     }
    //     // }

    //     // return response()->json(['error' => 'Invalid notification data'], 400);
    // }

}

