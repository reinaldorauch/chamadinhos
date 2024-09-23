<?php

declare(strict_types=1);

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'integer',
            'title' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:ticket_categories,id',
            'description' => 'required|string|max:1024',
        ];
    }
}
