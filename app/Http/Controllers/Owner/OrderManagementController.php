<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('Owner/Konten/OrdersManagement');
    }
}
