'use client';

import { useLanguage } from './LanguageProvider';
import { translations } from '@/lib/translations';
import Link from 'next/link';

export default function TranslatedNavbar() {
    const { language } = useLanguage();
    const t = translations[language].nav;

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                        Local-Biz-Hub
                    </Link>
                    <div className="flex items-center space-x-8">
                        <Link href="/#home" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {t.home}
                        </Link>
                        <Link href="/#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {t.projects}
                        </Link>
                        <Link href="/#skills" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {t.skills}
                        </Link>
                        <Link href="/#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {t.contact}
                        </Link>
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                            {translations[language].community.login}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
