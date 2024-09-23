<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ticket\DestroyTicketRequest;
use App\Http\Requests\Ticket\StoreTicketCategoryRequest;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Models\TicketStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketsController extends Controller
{
    public function list()
    {
        return Inertia::render(
            'Tickets/List',
            ['tickets' => Ticket::all()->load('category', 'status')]
        );
    }

    public function create()
    {
        return Inertia::render(
            'Tickets/Form',
            ['categories' => TicketCategory::all()]
        );
    }

    public function handle(Request $request)
    {
        $request->validate([
            'id' => 'required|int|exists:tickets'
        ]);

        return Inertia::render(
            'Tickets/Handle',
            [
                'ticket' => Ticket::find($request->id)->load('category', 'status'),
                'status' => TicketStatus::where('id', '!=', TicketStatus::NEW)->get()
            ]
        );
    }

    public function store(StoreTicketRequest $request)
    {
        Ticket::create(
            [
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
            ]
        );

        return to_route('tickets');
    }

    public function destory(DestroyTicketRequest $request)
    {
        Ticket::find($request->id)->delete();
    }

    public function storeCategory(StoreTicketCategoryRequest $request)
    {
        TicketCategory::create([
            'description' => $request->description
        ]);
    }
}
