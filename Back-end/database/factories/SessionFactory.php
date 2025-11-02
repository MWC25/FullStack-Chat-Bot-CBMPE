<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Session>
 */
class SessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'created_at' => $this->faker->dateTime(),
            'expires_at' => $this->faker->dateTime(),
            'last_activity_at' => $this->faker->dateTime(),
            'user_id' => $this->faker->randomNumber(),
            'revoked' => $this->faker->boolean(),
            'revoked_at' => $this->faker->dateTime(),
        ];
    }
}
