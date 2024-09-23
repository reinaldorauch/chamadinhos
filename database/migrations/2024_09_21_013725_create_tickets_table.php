<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ticket_categories', function (Blueprint $t) {
            $t->id();
            $t->string('description', 45)->unique();
        });

        Schema::create('ticket_status', function (Blueprint $t) {
            $t->id();
            $t->string('description', 45)->unique();
        });

        Schema::create('tickets', function (Blueprint $t) {
            $t->id();
            $t->string('title');
            $t->text('description');
            $t->dateTime('solution_date');
            $t->foreignId('category_id')->constrained(table: 'ticket_categories');
            $t->foreignId('status_id')->constrained(table: 'ticket_status');
            $t->timestamp('solved_at')->nullable();
            $t->timestamps();
            $t->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('ticket_categories');
        Schema::dropIfExists('ticket_status');
    }
};
