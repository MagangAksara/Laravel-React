import { FloatingLabelInput } from '@/assets/FloatingLabelInput';
import { FloatingLabelPassword } from '@/assets/FloatingLabelPassword';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <header className='flex flex-col items-center text-white text-2xl p-3 font-semibold'>
                <h1>Login</h1>
            </header>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <FloatingLabelInput
                        id="email"
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    {/* <div> */}
                        <FloatingLabelPassword
                            id="password"
                            label="Password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    {/* </div>
                    <div> */}
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="flex justify-end mr-10 rounded-md text-sm text-blue-400 underline hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    {/* </div> */}
                </div>

                {/* <div className="relative mt-4 ml-10 w-[80%]">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div> */}

                <div className='flex flex-col items-center'>
                    <div className="mt-4 flex items-center justify-end">
                        {/* {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-blue-400 underline hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>
                        )} */}

                        <Button className=" bg-blue-400" disabled={processing}>
                            Log in
                        </Button>
                    </div>
                    <div className="mt-4 flex items-center justify-end text-white">
                        Don’t have an account yet?&nbsp;
                        <Link
                            href={route('chooseRole')}
                            className="rounded-md text-sm text-blue-400 underline hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Register
                        </Link>
                        &nbsp;now.
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
