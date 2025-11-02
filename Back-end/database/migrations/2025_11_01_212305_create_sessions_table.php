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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->timestamps("created_at");
            $table->timestamps("expires_at");
            $table->timestamps("last_activity_at");
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->tinyint('revoked');
            $table->tinyint('revoked_at')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
