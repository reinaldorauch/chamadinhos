<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketStatus extends Model
{
    const NEW = 1;
    const PENDING = 2;
    const SOLVED = 3;

    use HasFactory;

    protected $table = 'ticket_status';

    public $timestamps = false;
}
