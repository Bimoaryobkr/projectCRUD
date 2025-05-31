import React, { useState } from "react";
import authService from "../../services/authService";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);
        try {
            const responseData = await authService.register(email, password);
            console.log("Registration successful:", responseData);
            setSuccessMessage(`Registration successful!`);
            setEmail("");
            setPassword("");
        } catch (apiError) {
            console.error("Registration failed:", apiError);
            setError(
                apiError.error || "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <p className="text-center text-sm text-red-600 bg-red-100 p-2 rounded-md">
                    {error}
                </p>
            )}
            {successMessage && (
                <p className="text-center text-sm text-green-600 bg-green-100 p-2 rounded-md">
                    {successMessage}
                </p>
            )}

            <div>
                <label
                    htmlFor="register-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-50"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="register-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Password
                </label>
                <div className="mt-2">
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-50"
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    {loading ? "Registering..." : "Create account"}
                </button>
            </div>
        </form>
    );
}
