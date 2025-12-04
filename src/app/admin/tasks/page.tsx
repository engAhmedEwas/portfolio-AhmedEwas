'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { Task, Project } from '@/types';
import { Plus, Trash2, X, CheckCircle, Circle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/lib/translations';

export default function TasksPage() {
    const { language } = useLanguage();
    const t = translations[language].admin;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Task>>({
        title: '',
        projectId: '',
        status: 'Pending',
        dueDate: '',
    });

    useEffect(() => {
        fetchTasks();
        fetchProjects();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('/api/tasks', { cache: 'no-store' });
        setTasks(await res.json());
    };

    const fetchProjects = async () => {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        setProjects(await res.json());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setIsModalOpen(false);
            setFormData({ title: '', projectId: '', status: 'Pending', dueDate: '' });
            fetchTasks();
        }
    };

    const toggleStatus = async (task: Task) => {
        const newStatus = task.status === 'Done' ? 'Pending' : 'Done';
        await fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        fetchTasks();
    };

    const handleDelete = async (id: string) => {
        if (confirm(t.deleteTaskConfirm)) {
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            fetchTasks();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.tasksTitle}</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t.addTask}</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {tasks.map((task) => (
                        <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <div className="flex items-center space-x-4">
                                <button onClick={() => toggleStatus(task)} className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    {task.status === 'Done' ? (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Circle className="w-6 h-6" />
                                    )}
                                </button>
                                <div>
                                    <p className={`font-medium ${task.status === 'Done' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {projects.find((p) => p.id === task.projectId)?.title || t.noProject} • {t.dueDate}: {task.dueDate}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(task.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {tasks.length === 0 && (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">{t.noTasks}</div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.newTask}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.taskTitle}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g. Fix login bug"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.projects}</label>
                                <select
                                    required
                                    value={formData.projectId}
                                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">{t.selectProject}</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>{project.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.dueDate}</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {t.createTask}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
