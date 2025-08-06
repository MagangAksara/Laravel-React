<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Xendit\Xendit;
use Xendit\Configuration;
use Xendit\invoices\InvoiceApi;

use Illuminate\Http\Request;
use Illuminte\Support\Str;

class PaymentController extends Controller
{
    public function __construct() {
        Configuration::setXenditKey(env('XENDIT_SECRET_KEY'));
        $this->apiInstance = new InvoiceApi();
    }

    public function store(Request $request)
    {
        $create_invoice_request = new \Xendit\Invoice\CreateInvoiceRequest([
            'external_id' => Str::uuid(),
            'description' => $request->description,
            'amount' => $request->amount,
            'payer_email' => $request->payer_email,
        ]);

        $result = $this->apiInstance->createInvoice($create_invoice_request);
    }
}
