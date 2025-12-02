'use client';

import { useEffect, useState } from 'react';
import { Project, Task } from '@/types';
import { DollarSign, Folder, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeProjects: 0,
        pendingTasks: 0,
        completedProjects: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const [projectsRes, tasksRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/tasks'),
            ]);
            const projects: Project[] = await projectsRes.json();
            const tasks: Task[] = await tasksRes.json();

            const totalRevenue = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
            const activeProjects = projects.filter((p) => p.status === 'In Progress').length;
            const completedProjects = projects.filter((p) => p.status === 'Completed').length;
            const pendingTasks = tasks.filter((t) => t.status !== 'Done').length;

            setStats({ totalRevenue, activeProjects, pendingTasks, completedProjects });
        };

        fetchData();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }: any) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString('en-US')}`}
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <StatCard
                    title="Active Projects"
                    value={stats.activeProjects}
                    icon={Folder}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Pending Tasks"
                    value={stats.pendingTasks}
                    icon={Clock}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Completed Projects"
                    value={stats.completedProjects}
                    icon={CheckCircle}
                    color="bg-purple-500"
                />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                <p className="text-gray-500">Activity feed coming soon...</p>
            </div>
        </div>
    );
}
