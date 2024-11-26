import { useProfile } from '../context/UserContext';
import { useState, useRef, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
const DropDownUserMenu = () => {
    const navigate = useNavigate();
    const { userProfile, setUserProfile } = useProfile();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: Event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        try {
            const res: AxiosResponse = await apiClient.get("/auth/logout");

            // console.log(res);

            if (res.status === 200) {
                const data = res.data;
                console.log(data);

                setUserProfile(null)
                navigate("/")
                toast.success("User successfully Logged out!")
            }
        } catch (error) {
            toast.error("There was some error");
        }
    }

    return (
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
                    {/* <svg
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
                                </svg> */}
                    <img src={userProfile?.profilePic} alt="Profile pic" />
                </div>
            </button>

            {isDropdownOpen && (
                <div
                    className={`absolute right-0 mt-2 z-50 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                    id="user-dropdown"
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">{userProfile?.name}</span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {userProfile?.email}
                        </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">

                        <li>
                            <Link
                                to={'/dashboard'}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"

                            >
                                Dashboard
                            </Link>
                            <div
                                onClick={handleSignOut}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                            >
                                Sign out
                            </div>
                        </li>


                    </ul>
                </div>
            )}
        </div>
    )
}

export default DropDownUserMenu