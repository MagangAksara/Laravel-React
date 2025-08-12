<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\UserAddress;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    // update
    private function validateDataAddress(Request $request)
    {
        return $request->validate([
            'city'        => 'required|string|max:255',
            'district'       => 'required|string|max:20',
            'regency'     => 'required|string|max:255',
            'province'    => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'detail'      => 'nullable|string|max:500',
        ]);
    }

    public function storeAddress(Request $request)
    {
        $validated = $this->validateDataAddress($request);

        $address = UserAddress::create([
            'user_id'       => Auth::id(),
            'city'          => $validated['city'],
            'district'      => $validated['district'],
            'regency'       => $validated['regency'],
            'province'      => $validated['province'],
            'postal_code'   => $validated['postal_code'],
            'detail'        => $validated['detail'],
        ]);

        $address->save();

        return response()->json([
            'message' => 'Alamat berhasil ditambahkan',
            'data'    => $address
        ], 201);
    }

    public function updateAddress(Request $request, $id)
    {
        $validated = $this->validateDataAddress($request);

        $address = UserAddress::where('user_id', Auth::id())->findOrFail($id);

        $address->update([
            'city'        => $validated['city'],
            'district'    => $validated['district'],
            'regency'     => $validated['regency'],
            'province'    => $validated['province'],
            'postal_code' => $validated['postal_code'],
            'detail'      => $validated['detail'],
        ]);

        return response()->json([
            'message' => 'Alamat berhasil diperbarui',
            'data'    => $address
        ], 200);
    }

}
