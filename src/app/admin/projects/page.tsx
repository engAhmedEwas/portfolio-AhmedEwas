'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { Project, Client } from '@/types';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/lib/translations';

export default function ProjectsPage() {
    const { language } = useLanguage();
    const t = translations[language].admin;

    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: '',
        clientId: '',
        status: 'In Progress',
        budget: 0,
        startDate: '',
        description: '',
        isPublic: false,
        technologies: [],
        liveUrl: '',
        repoUrl: '',
    });

    useEffect(() => {
        fetchProjects();
        fetchClients();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        setProjects(await res.json());
    };

    const fetchClients = async () => {
        const res = await fetch('/api/clients', { cache: 'no-store' });
        setClients(await res.json());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
        const method = editingProject ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setIsModalOpen(false);
            setEditingProject(null);
            setFormData({
                title: '',
                clientId: '',
                status: 'In Progress',
                budget: 0,
                startDate: '',
                description: '',
                isPublic: false,
                technologies: [],
                liveUrl: '',
                repoUrl: '',
            });
            fetchProjects();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm(t.deleteProjectConfirm)) {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            fetchProjects();
        }
    };

    const openEditModal = (project: Project) => {
        setEditingProject(project);
        setFormData(project);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.projectsTitle}</h1>
                <button
                    onClick={() => {
                        setEditingProject(null);
                        setFormData({
                            title: '',
                            clientId: '',
                            status: 'In Progress',
                            budget: 0,
                            startDate: '',
                            description: '',
                            isPublic: false,
                            technologies: [],
                            liveUrl: '',
                            repoUrl: '',
                        });
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t.addProject}</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                        <tr>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t.projectTitle}</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t.client}</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t.status}</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t.budget}</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t.public}</th>
                            <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-4 font-medium text-gray-900 dark:text-white">{project.title}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">
                                    {clients.find((c) => c.id === project.clientId)?.name || t.unknown}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                        project.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                            'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">${project.budget}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">{project.isPublic ? t.yes : t.no}</td>
                                <td className="p-4 flex space-x-2">
                                    <button onClick={() => openEditModal(project)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(project.id)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingProject ? t.editProject : t.addProject}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.projectTitle}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g. E-commerce Platform"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.client}</label>
                                <select
                                    required
                                    value={formData.clientId}
                                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">{t.selectClient}</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.status}</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="On Hold">On Hold</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.budget}</label>
                                    <input
                                        type="number"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.startDate}</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.description}</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Project details..."
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.technologies}</label>
                                <input
                                    type="text"
                                    value={formData.technologies?.join(', ')}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(s => s.trim()) })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="React, Node.js, Tailwind"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.liveUrl}</label>
                                    <input
                                        type="url"
                                        value={formData.liveUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.repoUrl}</label>
                                    <input
                                        type="url"
                                        value={formData.repoUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isPublic}
                                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.showInPublic}</label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {editingProject ? t.updateProject : t.createProject}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
