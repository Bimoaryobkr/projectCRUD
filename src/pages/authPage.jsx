import { useState } from "react";
import LoginForm from "../components/auth/loginCard";
import RegisterForm from "../components/auth/RegisterCard";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        alt="Dashboard Icon"
                        src="/icon.png"
                        className="mx-auto h-12 w-auto"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
                        {isLogin
                            ? "Sign in to your account"
                            : "Create your account"}
                    </h2>
                </div>
                <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10">
                    {isLogin ? <LoginForm /> : <RegisterForm />}
                </div>
                <p className="text-center text-sm text-gray-600">
                    {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 rounded-md"
                    >
                        {isLogin ? "Register now" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    );
}
