import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone_number: user.phone_number || '',
            is_driver: user.is_driver || false,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={`${className} bg-white shadow rounded p-6`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Profile Information
                </h2>
            </header>

            <form onSubmit={submit} className="flex gap-12 items-center">
                {/* Bagian kiri: Foto dan tombol upload */}
                <div className="flex flex-col items-center gap-4 w-1/3">
                    <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
                        <img
                            src={user.profile_photo_url || 'https://i.pinimg.com/1200x/5d/f8/4f/5df84fb698e8c449cc8533eb22b5617f.jpg'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <PrimaryButton className="flex flex-col justify-center w-full" type="button">
                        Upload Picture
                    </PrimaryButton>
                </div>

                {/* Bagian kanan: Form input */}
                <div className="flex-1 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone_number" value="Phone Number" />
                        <TextInput
                            id="phone_number"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            autoComplete="tel"
                        />
                        <InputError className="mt-2" message={errors.phone_number} />
                    </div>

                    {user.role === 'owner' && (
                        <div>
                            <InputLabel htmlFor="is_driver" value="Driver Status" />
                            <select
                                id="is_driver"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                value={data.is_driver ? '1' : '0'}
                                onChange={(e) =>
                                    setData('is_driver', e.target.value === '1')
                                }
                            >
                                <option value="0">Not a Driver</option>
                                <option value="1">Is a Driver</option>
                            </select>
                            <InputError className="mt-2" message={errors.is_driver} />
                        </div>
                    )}

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your
                                    email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    );
}
