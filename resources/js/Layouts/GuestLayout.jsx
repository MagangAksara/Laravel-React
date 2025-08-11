import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div 
            className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0"
            style={{
                backgroundImage: "url('https://i.pinimg.com/736x/1f/ad/49/1fad49ca4ed2f8aa815cb62656e34cd5.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <div 
                className="mt-6 w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg"
                style={{
                    backgroundColor: "rgba(38, 52, 52, 1)"
                }}
            >
                <header>
                    <Link href={route('welcome')}>
                        <h1 className='text-2xl font-bold mb-3'  style={{ fontFamily: "'Playfair Display', serif" }}>
                            <span className='text-white'>Eazy</span>
                            <span className='text-blue-300'>Ride</span>
                        </h1>
                    </Link>
                </header>
                {children}
            </div>
        </div>
    );
}
