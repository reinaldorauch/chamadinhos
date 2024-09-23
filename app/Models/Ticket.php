<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

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
    protected $fillable = [
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
        $solvedCount = self::where('status_id', TicketStatus::SOLVED)
            ->where('solved_at', '<=', 'solution_date')
            ->where(DB::raw('YEAR(`created_at`)'), '=', DB::raw('YEAR(NOW())'))
            ->where(DB::raw('MONTH(created_at)'), '=', DB::raw('MONTH(NOW())'))
            ->count();

        $elseCount = self::where(DB::raw('YEAR(`created_at`)'), '=', DB::raw('YEAR(NOW())'))
            ->where(DB::raw('MONTH(created_at)'), '=', DB::raw('MONTH(NOW())'))->count();

        return [
            'solved' => $solvedCount,
            'unsolved' => $elseCount - $solvedCount
        ];
    }

    public static function perDayInLastMonth(): Collection
    {
        return DB::table('tickets')
            ->select([DB::raw('COUNT(`id`) as count_per_day'), DB::raw('DATE(`created_at`) as day')])
            ->groupByRaw('DATE(`created_at`)')
            ->where(DB::raw('YEAR(`created_at`)'), '=', DB::raw('YEAR(NOW())'))
            ->where(DB::raw('MONTH(created_at)'), '=', DB::raw('MONTH(NOW())'))
            ->get();
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
