<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable','string','lowercase','email','max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'profile_picture' => ['nullable', 'image', 'max:2048'], // Maksimal 2MB
            'phone_number' => ['nullable','string','max:15',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];

        if ($this->user()->hasRole('owner')) {
            $rules['is_driver'] = ['required', 'boolean'];
        }
        
        return $rules;
    }
}
