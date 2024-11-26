import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { MENU_OPTIONS } from "@/constants/menu";
import DropDownUserMenu from "./DropDownUserMenu";
import { useProfile } from '../context/UserContext';
import { Button } from "./ui/button";
import { SidebarTrigger } from '@/components/ui/sidebar';

const MainNav = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for the navbar menu
    const navDropdown = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { userProfile } = useProfile();

    const location = useLocation();
    const navigate = useNavigate();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClickOutsideNav = (event: Event) => {
        if (navDropdown.current && !navDropdown.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
            setIsNavbarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideNav);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideNav);
        };
    }, []);

    return (
        <nav className={`dark:bg-background border-b border-slate-200 bg-white shadow dark:border-slate-800 
            }`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Logo />
                </Link>

                {/* Navigation links for larger screens */}
                <div className="hidden md:flex items-center space-x-3">
                    {
                        MENU_OPTIONS.map((option, index) => (
                            <Link
                                to={option.to}
                                className={`text-gray-900 p-2 rounded dark:text-white ${location.pathname === option.to ? "bg-primary text-white dark:text-black" : "hover:bg-primary dark:hover:text-white text-black hover:text-white hover:dark:text-black"
                                    }`}
                                key={index}
                            >
                                {option.title}
                            </Link>
                        ))
                    }
                </div>

                {/* User Dropdown and Mode Toggle */}
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-5">
                    {
                        screenWidth <= 768 && <SidebarTrigger />
                    }

                    <ModeToggle />
                    {/* Dropdown menu */}
                    {userProfile ? <DropDownUserMenu /> : <Button onClick={() => navigate("/auth")}>Login</Button>}

                    {/* Toggle Button for Navbar */}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={isNavbarOpen}
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsNavbarOpen(!isNavbarOpen);
                        }}
                        ref={buttonRef}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                {isNavbarOpen && (
                    <div
                        className={`items-center justify-between w-full md:w-auto md:order-1 absolute z-50 top-16 right-1 md:hidden`}
                        id="navbar-user"
                        ref={navDropdown}
                    >
                        <ul className="flex gap-1 flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-background md:dark:bg-background dark:border-gray-700">
                            {
                                MENU_OPTIONS.map((option, index) => (
                                    <li key={index}>
                                        <Link
                                            to={option.to}
                                            className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === option.to && "bg-gray-200 md:dark:text-blue-500 dark:bg-gray-700 dark:text-white md:dark:bg-transparent"}`}
                                            aria-current="page"
                                        >
                                            {option.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MainNav;
