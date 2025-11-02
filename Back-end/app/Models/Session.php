<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    /** @use HasFactory<\Database\Factories\SessionFactory> */
    use HasFactory;
    protected $table = 'session';
    protected $fillable = [
        'expires_at',
        'last_activity_at',
        'user_id',
        'revoked',
    ];

}
