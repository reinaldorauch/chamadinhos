<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class Ticket extends Model
{
    use HasFactory;

    /**
     * Defaults
     */
    public function __construct()
    {
        $this->solution_date = now()->addDays(3);
        $this->status_id = TicketStatus::NEW;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public $fillable = [
        'title',
        'category_id',
        'description'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(TicketCategory::class, 'category_id', 'id', 'ticket_categories');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(TicketStatus::class, 'status_id', 'id', 'ticket_status');
    }

    public static function sla(): array
    {
        $currentMonthWhere = DB::raw('YEAR(`created_at`) = YEAR(NOW()) AND MONTH(`created_at`) = MONTH(NOW())');

        $solvedCount = self::where('status_id', TicketStatus::SOLVED)
            ->where('solved_at', '<=', 'solution_date')
            ->where($currentMonthWhere)
            ->count();

        $elseCount = self::where($currentMonthWhere)->count();

        return [
            'solved' => $solvedCount,
            'unsolved' => $solvedCount - $elseCount
        ];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
            'solution_date' => 'datetime'
        ];
    }
}
