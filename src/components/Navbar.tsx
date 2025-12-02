'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Alex Dev
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">Projects</Link>
                        <Link href="#skills" className="text-gray-600 hover:text-blue-600 transition-colors">Skills</Link>
                        <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
                        <Link href="/login" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                            Admin Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="#projects" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Projects</Link>
                        <Link href="#skills" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Skills</Link>
                        <Link href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Contact</Link>
                        <Link href="/login" className="block px-3 py-2 text-blue-600 font-medium">Admin Login</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
