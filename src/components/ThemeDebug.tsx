'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeDebug() {
    const { theme, toggleTheme } = useTheme();

    const forceLight = () => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        window.location.reload();
    };

    return (
        <div className="fixed top-4 right-4 z-50 bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg shadow-lg">
            <p className="text-sm font-bold mb-2">Current Theme: {theme}</p>
            <div className="flex gap-2">
                <button
                    onClick={forceLight}
                    className="px-4 py-2 bg-white text-gray-900 border-2 border-gray-900 rounded font-bold hover:bg-gray-100"
                >
                    Force Light Mode
                </button>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-900 text-white rounded font-bold hover:bg-gray-700"
                >
                    Toggle ({theme === 'light' ? 'Go Dark' : 'Go Light'})
                </button>
            </div>
        </div>
    );
}
