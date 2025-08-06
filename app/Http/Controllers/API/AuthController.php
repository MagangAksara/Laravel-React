<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email',
            'password'     => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name'         => $validated['name'],
            'email'        => $validated['email'],
            'password'     => bcrypt($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => $user, 'message' => 'Registered successfully.'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.']
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user'  => $user,'token' => $token, 'message' => 'Login berhasil.'], 200);
    }

    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout berhasil.']);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'email'        => 'sometimes|email|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string',
            'address'      => 'nullable|string',
        ]);

        $user->update($validated);

        return response()->json(['user' => $user, 'message' => 'Profile updated successfully.']);
    }

    public function changePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($validated['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.']
            ]);
        }

        $user->password = bcrypt($validated['new_password']);
        $user->save();

        return response()->json(['message' => 'Password changed successfully.']);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->delete();

        return response()->json(['message' => 'Akun berhasil dihapus.']);
    }
}
