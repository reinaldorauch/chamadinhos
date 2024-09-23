<?php

declare(strict_types=1);

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketCategoryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'description' => 'required|string|max:255|unique:ticket_categories'
        ];
    }
}
