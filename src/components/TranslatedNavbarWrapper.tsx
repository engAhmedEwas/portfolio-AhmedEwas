'use client';

import { useEffect, useState } from 'react';
import TranslatedNavbar from './TranslatedNavbar';

export default function TranslatedNavbarWrapper() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Ahmed Ewas - Full Stack Developer</span>
                    </div>
                </div>
            </nav>
        );
    }

    return <TranslatedNavbar />;
}
