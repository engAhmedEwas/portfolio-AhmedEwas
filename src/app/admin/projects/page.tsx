'use client';

import { useState, useEffect } from 'react';
import { Project, Client } from '@/types';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function ProjectsPage() {
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
        const res = await fetch('/api/projects');
        setProjects(await res.json());
    };

    const fetchClients = async () => {
        const res = await fetch('/api/clients');
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
        if (confirm('Are you sure you want to delete this project?')) {
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
                <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
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
                    <span>Add Project</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Title</th>
                            <th className="p-4 font-medium text-gray-500">Client</th>
                            <th className="p-4 font-medium text-gray-500">Status</th>
                            <th className="p-4 font-medium text-gray-500">Budget</th>
                            <th className="p-4 font-medium text-gray-500">Public</th>
                            <th className="p-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">{project.title}</td>
                                <td className="p-4 text-gray-600">
                                    {clients.find((c) => c.id === project.clientId)?.name || 'Unknown'}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600">${project.budget}</td>
                                <td className="p-4 text-gray-600">{project.isPublic ? 'Yes' : 'No'}</td>
                                <td className="p-4 flex space-x-2">
                                    <button onClick={() => openEditModal(project)} className="text-blue-600 hover:text-blue-800">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800">
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
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Client</label>
                                <select
                                    required
                                    value={formData.clientId}
                                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                >
                                    <option value="">Select Client</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="On Hold">On Hold</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Budget</label>
                                    <input
                                        type="number"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.technologies?.join(', ')}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(s => s.trim()) })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Live URL</label>
                                    <input
                                        type="url"
                                        value={formData.liveUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Repository URL</label>
                                    <input
                                        type="url"
                                        value={formData.repoUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isPublic}
                                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label className="text-sm font-medium text-gray-700">Show in Public Portfolio</label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                {editingProject ? 'Update Project' : 'Create Project'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
