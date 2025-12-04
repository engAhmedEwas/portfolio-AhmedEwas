import { db } from '@/lib/db';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Calendar, DollarSign, CheckCircle, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const projects = await db.getProjects();
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await db.getProjectById(id);

    if (!project || !project.isPublic) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/#projects" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-64 md:h-96 bg-gradient-to-r from-blue-600 to-purple-600 relative flex items-center justify-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white opacity-90">{project.title}</h1>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                <span className="font-medium">{project.status}</span>
                            </div>
                            {project.startDate && (
                                <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                                    <span>Started: {project.startDate}</span>
                                </div>
                            )}
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About the Project</h3>
                            <p>{project.description}</p>
                        </div>

                        {(project.liveUrl || project.repoUrl) && (
                            <div className="flex flex-wrap gap-4 mb-12">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        <ExternalLink className="w-5 h-5 mr-2" />
                                        Live Demo
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
                                    >
                                        <Github className="w-5 h-5 mr-2" />
                                        View Code
                                    </a>
                                )}
                            </div>
                        )}

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Technologies Used</h3>
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
