'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(event: any) {
        setLoading(true);
        // will implement after backend api for loggin in and signing up is complete
        return;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Welcome Back!</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg text-white ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-600">
                    No account? Sign up
                    <Link href="/info/signup" className="text-blue-600 hover:underline mx-1">
                        here!
                    </Link>
                </p>
            </div>
        </div>
    );
}