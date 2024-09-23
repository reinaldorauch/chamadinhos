<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('tickets')->group(function () {
    Route::prefix('categories')->group(function () {
        Route::post('save', [TicketsController::class, 'storeCategory'])->name('tickets.category.save');
    });
    Route::get('/', [TicketsController::class, 'list'])->name('tickets');
    Route::get('/new', [TicketsController::class, 'create'])->name('tickets.create');
    Route::get('/handle', [TicketsController::class, 'handle'])->name('tickets.handle');
    Route::post('/save', [TicketsController::class, 'store'])->name('tickets.store');
    Route::patch('/save-handle', [TicketsController::class, 'storeHandle'])->name('tickets.store-handle');
    Route::delete('', [TicketsController::class, 'delete'])->name('tickets.delete');
})
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
