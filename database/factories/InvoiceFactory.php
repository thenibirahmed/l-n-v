<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => 'INV-1000'.$this->faker->unique()->word,
            'customer_id' => $this->faker->numberBetween(1, 20),
            'date' => $this->faker->date(),
            'due_date' => $this->faker->date(),
            'reference' => 'REF-'.$this->faker->text,
            'terms_and_conditions' => $this->faker->text,
            'subtotal' => $this->faker->randomFloat(2, 1, 100),
            'discount' => $this->faker->randomFloat(2, 1, 100),
            'total' => $this->faker->randomFloat(2, 1, 100),
        ];
    }
}
