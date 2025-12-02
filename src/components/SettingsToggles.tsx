'use client';

import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { Moon, Sun, Languages } from 'lucide-react';

export default function SettingsToggles() {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="fixed bottom-6 right-6 flex gap-3 z-50">
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="p-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-700" />
                ) : (
                    <Sun className="w-5 h-5 text-yellow-400" />
                )}
            </button>

            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                className="p-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
                title={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
            >
                <div className="flex items-center gap-1.5">
                    <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {language.toUpperCase()}
                    </span>
                </div>
            </button>
        </div>
    );
}
