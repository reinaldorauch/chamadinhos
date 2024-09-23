<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'sla' => Ticket::sla(),
            'perDay' => Ticket::perDayInLastMonth(),
        ]);
    }
}
