<?php

declare(strict_types=1);

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class DestroyTicketRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|int|exists:tickets'
        ];
    }
}
