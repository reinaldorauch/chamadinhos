<?php

declare(strict_types=1);

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class DestroyTicketRequest extends FormRequest
{
    public function rules()
    {
        return [
            'description' => 'required|string|max:45|unique:ticket_categories'
        ];
    }
}
