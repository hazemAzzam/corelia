import { User, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/authentication/state/authSlice";
import { useAuth } from "./AuthProvider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const UserNav = () => {
    const user = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-border">
            <div className="hidden md:flex flex-col items-end whitespace-nowrap">
                <span className="text-sm font-semibold leading-none">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <User className="h-5 w-5 hidden md:block" />
                        <Menu className="h-5 w-5 md:hidden" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="md:hidden">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="md:hidden" />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
