import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { MENU_OPTIONS, USER_OPTIONS } from "@/constants/menu";

const MainNav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for the navbar menu
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navDropdown = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const location = useLocation();

    const handleClickOutside = (event: Event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    const handleClickOutsideNav = (event: Event) => {
        if (navDropdown.current && !navDropdown.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
            setIsNavbarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handleClickOutsideNav);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousedown", handleClickOutsideNav);
        };
    }, []);

    return (
        <nav className="dark:bg-background border-b border-slate-200 bg-white shadow dark:border-slate-800">
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
                                className={`text-gray-900 dark:text-white p-2 rounded ${location.pathname === option.to ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"
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
                    <ModeToggle />
                    {/* Dropdown menu */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full"
                            id="user-menu-button"
                            aria-expanded={isDropdownOpen}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className="sr-only">Open user menu</span>
                            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <svg
                                    className="absolute w-12 h-12 text-gray-400 -left-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </button>

                        {isDropdownOpen && (
                            <div
                                className={`absolute right-0 mt-2 z-50 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                        name@flowbite.com
                                    </span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    {
                                        USER_OPTIONS.map((option, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={option.to}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
