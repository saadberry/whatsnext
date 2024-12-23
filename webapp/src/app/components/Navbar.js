"use client"; 
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-black-800 text-white">
      {isLoggedIn && <div className="text-lg font-bold">
        <Link href="/">What's next?</Link>
      </div>}
      {!isLoggedIn && (
        <div className="space-x-4 ml-auto">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
