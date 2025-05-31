import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { LogoutIcon } from "@heroicons/react/outline";

import { useAuth } from "../local/authLocal";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <nav className="bg-white shadow-md">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-indigo-700">
                            Dashboard
                        </span>
                    </div>
                    {isAuthenticated && (
                        <div className="flex items-center">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="text-indigo-700 flex text-sm rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    </MenuButton>
                                </div>
                                <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <MenuItem>
                                        {() => (
                                            <button
                                                onClick={handleSignOut}
                                                className="group flex w-full items-center px-4 py-2 text-sm text-gray-700"
                                            >
                                                <LogoutIcon
                                                    className="mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-700"
                                                    aria-hidden="true"
                                                />
                                                Sign out
                                            </button>
                                        )}
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
