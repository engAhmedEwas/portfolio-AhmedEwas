'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Users, CheckSquare, LogOut, Globe, Shield, Moon, Sun, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/lib/translations';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    const navItems = [
        { href: '/admin', label: t.admin.dashboard, icon: LayoutDashboard },
        { href: '/admin/projects', label: t.admin.projects, icon: FolderKanban },
        { href: '/admin/clients', label: t.admin.clients, icon: Users },
        { href: '/admin/tasks', label: t.admin.tasks, icon: CheckSquare },
        { href: '/admin/create-admin', label: t.admin.createAdmin, icon: Shield },
    ];

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col transition-colors duration-300">
                <div className="p-6 border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">Ahmed Ewas Portfolio</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ERP Admin</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t dark:border-gray-700 space-y-2">
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={toggleTheme}
                            className="flex-1 flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={toggleLanguage}
                            className="flex-1 flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                        >
                            <Languages className="w-5 h-5" />
                            <span className="ml-2 text-xs font-bold">{language === 'en' ? 'AR' : 'EN'}</span>
                        </button>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center space-x-3 px-4 py-3 w-full text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                    >
                        <Globe className="w-5 h-5" />
                        <span className="font-medium">{t.admin.viewPortfolio}</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">{t.admin.logout}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 text-gray-900 dark:text-white">
                {children}
            </main>
        </div>
    );
}
