import React, { useState } from "react";
import { useAuth } from "../../local/authLocal";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoadingAuth, authError, setAuthError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (authError) setAuthError(null);

        const loginSuccess = await login(email, password);

        if (loginSuccess) {
            console.log("Login successful, navigating to dashboard...");
            navigate("/dashboard", { replace: true });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {authError && (
                <p className="text-center text-sm text-red-600 bg-red-100 p-2 rounded-md">
                    {authError}
                </p>
            )}

            <div>
                <label
                    htmlFor="login-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoadingAuth}
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-50"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="login-password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Password
                    </label>
                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoadingAuth}
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-50"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoadingAuth}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    {isLoadingAuth ? "Signing in..." : "Sign in"}
                </button>
            </div>
        </form>
    );
}
