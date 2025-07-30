'use client';
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="shadow-blue-300 bg-gray-300 w-screen flex justify-between items-center p-4">
            <h1 className="text-2xl text-black font-bold">Whiteboard</h1>
            <div className="space-x-4">
                <Link href="/" className="text-black hover:text-blue-600 font-semibold transition">
                    Home
                </Link>
                <Link href="/info/login" className="text-black hover:text-blue-500 font-semibold transition">
                    Login
                </Link> 
                <Link href="/info/signup" className="text-black hover:text-blue-600 font-semibold transition">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}