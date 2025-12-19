import coreliaLogo from "@/assets/corelia.png";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { UserNav } from "./UserNav";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-muted border-b">
            <div className="flex items-center gap-2">
                <div className="h-8">
                    <img
                        src={coreliaLogo}
                        alt="Corelia Logo"
                        className="object-contain h-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                </Button>

                <UserNav />
            </div>
        </nav>
    );
};