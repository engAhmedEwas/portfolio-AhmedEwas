'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { Project, Task } from '@/types';
import { DollarSign, Folder, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/lib/translations';

export default function DashboardPage() {
    const { language } = useLanguage();
    const t = translations[language];

    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeProjects: 0,
        pendingTasks: 0,
        completedProjects: 0,
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [projectsRes, tasksRes, clientsRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/tasks'),
                fetch('/api/clients'),
            ]);
            const projects: Project[] = await projectsRes.json();
            const tasks: Task[] = await tasksRes.json();
            const clients: any[] = await clientsRes.json();

            const totalRevenue = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
            const activeProjects = projects.filter((p) => p.status === 'In Progress').length;
            const completedProjects = projects.filter((p) => p.status === 'Completed').length;
            const pendingTasks = tasks.filter((t) => t.status !== 'Done').length;

            setStats({ totalRevenue, activeProjects, pendingTasks, completedProjects });

            // Combine and sort for recent activity
            const activity = [
                ...projects.map(p => ({ type: 'project', title: p.title, date: p.createdAt })),
                ...tasks.map(t => ({ type: 'task', title: t.title, date: t.createdAt })),
                ...clients.map(c => ({ type: 'client', title: c.name, date: c.createdAt }))
            ]
                .filter(item => item.date) // Only show items with createdAt
                .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
                .slice(0, 5);

            setRecentActivity(activity);
        };

        fetchData();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }: any) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.admin.dashboardOverview}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title={t.admin.totalRevenue}
                    value={`$${stats.totalRevenue.toLocaleString('en-US')}`}
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <StatCard
                    title={t.admin.activeProjects}
                    value={stats.activeProjects}
                    icon={Folder}
                    color="bg-blue-500"
                />
                <StatCard
                    title={t.admin.pendingTasks}
                    value={stats.pendingTasks}
                    icon={Clock}
                    color="bg-yellow-500"
                />
                <StatCard
                    title={t.admin.completedProjects}
                    value={stats.completedProjects}
                    icon={CheckCircle}
                    color="bg-purple-500"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t.admin.recentActivity}</h3>
                <div className="space-y-4">
                    {recentActivity.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">{t.admin.noActivity}</p>
                    ) : (
                        recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-50 dark:border-gray-700 last:border-0 last:pb-0">
                                <div className={`mt-1 p-2 rounded-full ${activity.type === 'project' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                    activity.type === 'task' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                                        'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                    }`}>
                                    {activity.type === 'project' && <Folder className="w-4 h-4" />}
                                    {activity.type === 'task' && <Clock className="w-4 h-4" />}
                                    {activity.type === 'client' && <CheckCircle className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {activity.type === 'project' && `${t.admin.newProject}: ${activity.title}`}
                                        {activity.type === 'task' && `${t.admin.newTask}: ${activity.title}`}
                                        {activity.type === 'client' && `${t.admin.newClient}: ${activity.title}`}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {activity.date ? new Date(activity.date).toLocaleDateString() : t.admin.justNow}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
