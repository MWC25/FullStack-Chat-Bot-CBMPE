<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceRequestFactory> */
    use HasFactory;
    protected $table = 'service_requests';
    protected $fillable = [
        'pushName',
        'numero',
        'status',
        'topic',
        'conversationSummary'
    ];
}
