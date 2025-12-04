'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { Client } from '@/types';
import { Plus, Edit, Trash2, X, Mail, Phone, Building } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/lib/translations';

export default function ClientsPage() {
    const { language } = useLanguage();
    const t = translations[language].admin;

    const [clients, setClients] = useState<Client[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [formData, setFormData] = useState<Partial<Client>>({
        name: '',
        company: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const res = await fetch('/api/clients', { cache: 'no-store' });
        setClients(await res.json());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingClient ? `/api/clients/${editingClient.id}` : '/api/clients';
        const method = editingClient ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setIsModalOpen(false);
            setEditingClient(null);
            setFormData({ name: '', company: '', email: '', phone: '' });
            fetchClients();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm(t.deleteClientConfirm)) {
            await fetch(`/api/clients/${id}`, { method: 'DELETE' });
            fetchClients();
        }
    };

    const openEditModal = (client: Client) => {
        setEditingClient(client);
        setFormData(client);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.clientsTitle}</h1>
                <button
                    onClick={() => {
                        setEditingClient(null);
                        setFormData({ name: '', company: '', email: '', phone: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>{t.addClient}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <div key={client.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{client.name}</h3>
                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                                    <Building className="w-3 h-3 mr-1" />
                                    {client.company}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => openEditModal(client)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(client.id)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                                <Mail className="w-4 h-4 mr-2" />
                                <a href={`mailto:${client.email}`} className="hover:underline">{client.email}</a>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                                <Phone className="w-4 h-4 mr-2" />
                                {client.phone}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingClient ? t.editClient : t.addClient}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.clientName}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.company}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.email}</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g. john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.phone}</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 placeholder:text-gray-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g. +1 234 567 890"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {editingClient ? t.updateClient : t.createClient}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
