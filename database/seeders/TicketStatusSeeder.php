<?php

namespace Database\Seeders;

use App\Models\TicketStatus;
use Illuminate\Database\Seeder;

class TicketStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TicketStatus::factory()->create([
            'description' => 'Novo'
        ]);
        TicketStatus::factory()->create([
            'description' => 'Pendente'
        ]);
        TicketStatus::factory()->create([
            'description' => 'Resolvido'
        ]);
    }
}
