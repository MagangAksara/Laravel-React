<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Xendit\Xendit;
use Xendit\Configuration;
use Xendit\XenditSdkException;

use Xendit\invoice\InvoiceApi;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\PaymentRequest\PaymentRequest;
use Xendit\Refund\RefundApi;
use Xendit\Refund\CreateRefund;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

use App\Models\Payment;
use App\Models\Rental;
use Xendit\PaymentRequest\PaymentRequestApi;

class PaymentController extends Controller
{
    var $apiInstance = null;
    var $refundInstance = null;

    public function __construct()
    {
        Configuration::setXenditKey(config('services.xendit.secret_key'));
        $this->apiInstance = new InvoiceApi();
        $this->refundInstance = new RefundApi();
        // $this->apiInstance = new PaymentRequestApi();
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
            'invoice_duration' => 86400, // 24 jam dalam detik
            'success_redirect_url' => url('/rental'), // halaman sukses
            'failure_redirect_url' => url('/rental/failed'),  // halaman gagal
            // 'payment_methods' => [
            //     'credit_card',
            //     'bank_transfer',
            // ],
        ]);

        try {
            $result = $this->apiInstance->createInvoice($create_invoice_request);

            // dd($result);

            $payment = new Payment();
            $payment->status = Payment::STATUS_PENDING;;
            // $payment->rental_id = null;
            $payment->external_id = $external_id;
            $payment->xendit_payment_id = $result->getId(); // seharusnya berupa id dari invoice id
            $payment->invoice_id = $result->getId();
            $payment->payment_request_id = 'null';
            $payment->payer_email = $request->payer_email;
            $payment->amount = (int) $request->amount;
            // $payment->payment_method = 'xendit';
            $payment->checkout_link = $result->getInvoiceUrl();
            $payment->paid_at = null;
            $payment->description = $request->description;
            $payment->save();

            Log::info("Xendit Invoice Created", [
                'id' => $result->getId(),
                'url' => $result->getInvoiceUrl(),
                'status' => $result->getStatus(),
            ]);

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

    // yang ini error tapi bisa
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'amount' => 'required|numeric|min:1000',
    //         'description' => 'required|string|max:255',
    //         'payer_email' => 'required|email',
    //     ]);

    //     $external_id = (string) Str::uuid();

    //     $createPaymentRequest = new PaymentRequest([
    //         'reference_id' => $external_id,
    //         'currency' => 'IDR',
    //         'amount' => (int) $request->amount,
    //         'payment_method' => [
    //             'type' => 'EWALLET', // contoh, bisa ganti VA, CC, dll.
    //             'ewallet' => [
    //                 'channel_code' => 'OVO', // contoh OVO
    //                 'channel_properties' => [
    //                     'success_redirect_url' => url('/rental'),
    //                     'failure_redirect_url' => url('/rental/failed'),
    //                 ]
    //             ]
    //         ]
    //     ]);

    //     try {
    //         $result = $this->apiInstance->createPaymentRequest($createPaymentRequest);

    //         $payment = new Payment();
    //         $payment->status = Payment::STATUS_PENDING;
    //         $payment->external_id = $external_id;
    //         $payment->payment_request_id = $result->getId(); // ini yg dipakai refund
    //         $payment->payer_email = $request->payer_email;
    //         $payment->amount = (int) $request->amount;
    //         $payment->checkout_link = $result->getActions()[0]->getUrl() ?? null; // link bayar
    //         $payment->description = $request->description;
    //         $payment->save();

    //         Log::info("Xendit PaymentRequest Created", [
    //             'id' => $result->getId(),
    //             'status' => $result->getStatus(),
    //         ]);

    //         return response()->json([
    //             'message' => 'Payment created successfully',
    //             'data' => $payment,
    //             'checkout_link' => $payment->checkout_link,
    //         ], 201);
    //     } catch (XenditSdkException $e) {
    //         Log::error($e->getMessage());
    //         return response()->json([
    //             'error' => 'Failed to create payment',
    //             'details' => $e->getMessage(),
    //         ], 400);
    //     }
    // }

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

        // Simpan payment_request_id & payment_method_id kalau ada
        // if (isset($data['payment_request_id'])) {
        //     $payment->payment_request_id = $data['payment_request_id'];
        // }
        if (isset($data['id'])) {
            $payment->invoice_id = $data['id'];
        }
        if (isset($data['external_id'])) {
            $payment->payment_request_id = $data['external_id'];
        }
        if (isset($data['payment_method'])) {
            $payment->payment_method = $data['payment_method'];
        }

        // Mapping status untuk rental
        $statusMap = [
            Payment::STATUS_PENDING => Rental::STATUS_PENDING_PAYMENT,
            Payment::STATUS_UNPAID  => Rental::STATUS_CANCELLED,
            Payment::STATUS_PAID    => Rental::STATUS_CONFIRMED_PAYMENT,
            Payment::STATUS_SETTLED => Rental::STATUS_PAYMENT_RECEIVED,
            Payment::STATUS_EXPIRED => Rental::STATUS_EXPIRED,
            Payment::STATUS_FAILED  => Rental::STATUS_FAILED,
        ];

        // Selalu simpan status asli dari Xendit ke payment
        $payment->status = $xenditStatus;

        if (in_array($xenditStatus, [Payment::STATUS_PAID, Payment::STATUS_SETTLED])) {
            $payment->paid_at = $data['paid_at'] ?? now();
        }

        $payment->save();

        // Update Rental status (jika mapping tersedia)
        if (isset($statusMap[$xenditStatus])) {
            $rental = $payment->rental;
            if ($rental) {
                $rental->status = $statusMap[$xenditStatus];
                $rental->save();

                Log::info('Rental status updated', [
                    'rental_id' => $rental->id,
                    'new_status' => $rental->status,
                    'xenditStatus' => $xenditStatus
                ]);
            }
        }

        return response()->json(['message' => 'Webhook processed']);
    }

    public function cancel(Request $request, $paymentId)
    {
        $payment = Payment::where('id', $paymentId)->with('rental')->first();

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        // cek apakah sudah paid/settled
        if (!in_array($payment->status, [Payment::STATUS_PAID, Payment::STATUS_SETTLED])) {
            // Belum bayar → cukup cancel rental aja
            if ($payment->rental) {
                $payment->rental->status = Rental::STATUS_CANCELLED;
                $payment->rental->save();
            }
            $payment->status = Payment::STATUS_CANCELLED;
            $payment->save();

            return response()->json(['message' => 'Rental cancelled (unpaid)'], 200);
        }
    }

    // masih error
    public function cancelRefund($paymentId)
    {
        $payment = Payment::where('id', $paymentId)->with('rental')->first();

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        // cek apakah sudah paid/settled
        if (!in_array($payment->status, [Payment::STATUS_PAID, Payment::STATUS_SETTLED])) {
            // Belum bayar → cukup cancel rental aja
            if ($payment->rental) {
                $payment->rental->status = Rental::STATUS_CANCELLED;
                $payment->rental->save();
            }
            $payment->status = Payment::STATUS_CANCELLED;
            $payment->save();

            return response()->json(['message' => 'Rental cancelled (unpaid)'], 200);
        }

        try {
            // Buat refund request dengan setter biar properti kebaca
            $createRefundRequest = new CreateRefund();
            $createRefundRequest->setPaymentRequestId($payment->payment_request_id); // gunakan invoice_id
            $createRefundRequest->setAmount((int) $payment->amount);
            $createRefundRequest->setReason('REQUESTED_BY_CUSTOMER'); // enum valid

            Log::info("Refund request payload", [
                'payment_request_id' => $createRefundRequest->getPaymentRequestId(),
                'invoice_id' => $createRefundRequest->getInvoiceId(),
                'amount'     => $createRefundRequest->getAmount(),
                'reason'     => $createRefundRequest->getReason(),
            ]);

            $refund = $this->refundInstance->createRefund($createRefundRequest);

            Log::info("Refund response", json_decode(json_encode($refund), true));

            // Update status di DB Tabel Payment dan Rental
            $payment->status = Payment::STATUS_REFUNDED;;
            $payment->save();

            if ($payment->rental) {
                $payment->rental->status = Rental::STATUS_CANCELLED;
                $payment->rental->save();
            }

            return response()->json([
                'message' => 'Refund berhasil diproses',
                'refund' => $refund
            ], 200);
        } catch (\Exception $e) {
            Log::error("Refund gagal: " . $e->getMessage());
            return response()->json([
                'error' => 'Refund gagal',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
