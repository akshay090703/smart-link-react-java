import { ModeToggle } from "./mode-toggle";
import Logo from "./Logo";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="border-b">
            <div className="flex h-16 justify-between mx-auto px-4 lg:px-7">
                <Link to={'/'} className="flex justify-center items-center">
                    <Logo />
                </Link>
                <div className="flex items-center ml-auto space-x-4">
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}