import coreliaLogo from "@/assets/corelia.png";
import { Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/state/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-muted">
            <div className="flex items-center gap-2">
                <div className="h-8 w-full">
                    <img
                        src={coreliaLogo}
                        alt="Corelia Logo"
                        className="object-contain w-full h-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    title="Sign out"
                >
                    <User className="h-4 w-4" />
                </Button>
            </div>
        </nav>
    );
};