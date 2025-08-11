import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FloatingLabelInput } from '@/assets/FloatingLabelInput';
import { FloatingLabelPassword } from '@/assets/FloatingLabelPassword';

export default function Register() {
     const { role } = usePage().props; 

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: role || 'customer', // default kalau tidak ada
    });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route('register'), {
    //         onFinish: () => reset('password', 'password_confirmation'),
    //     });
    // };
    const submit = (e) => {
        e.preventDefault();
        post(route("register", { 
            role,
            onFinish: () => reset('password', 'password_confirmation'),
        })); // Kirim role ke route
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <header className='flex flex-col items-center text-white text-2xl p-3 font-semibold'>
                <h1>Register</h1>
            </header>
            <form onSubmit={submit}>
                <div>
                    <FloatingLabelInput
                        id="name"
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <FloatingLabelInput
                        id="email"
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <FloatingLabelPassword
                        id="password"
                        label="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <FloatingLabelPassword
                        id="password_confirmation"
                        label="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <input type="hidden" name="role" value={data.role} />

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-blue-400 underline hover:text-yellow-400"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4 bg-blue-400" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
