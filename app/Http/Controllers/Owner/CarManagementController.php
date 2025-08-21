<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('Owner/Konten/CarsManagement');
    }
}
