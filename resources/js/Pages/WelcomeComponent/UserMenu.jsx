import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";

const UserMenu = ({ userName }) => {
    const handleLogout = () => {
        router.post(route("logout")); // pastikan route logout ada di Laravel
    };
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className="px-3 py-1.5 bg-blue-600 border border-white rounded-full text-white text-sm hover:bg-white hover:text-black transition-colors"
                    style={{ fontFamily: "quicksand" }}
                >
                    {userName}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2 space-y-2 text-center">
                <Link href="/dashboard">
                    <button
                        className="block w-full px-2 py-1 rounded-md hover:bg-gray-100 text-sm"
                    >
                        Dashboard
                    </button>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full px-2 py-1 rounded-md hover:bg-red-100 text-sm text-red-600"
                >
                    Logout
                </button>
            </PopoverContent>
        </Popover>
    );
};

export default UserMenu;
