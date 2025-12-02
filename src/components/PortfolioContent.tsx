'use client';

import { useLanguage } from './LanguageProvider';
import { translations } from '@/lib/translations';
import { ArrowRight, Github, Linkedin, Mail, Code, Database, Layout } from 'lucide-react';
import Link from 'next/link';
import { Project, Profile } from '@/types';

interface PortfolioContentProps {
    projects: Project[];
    profile: Profile;
}

export default function PortfolioContent({ projects, profile }: PortfolioContentProps) {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <>
            {/* Hero Section */}
            <section id="home" className="relative bg-white dark:bg-gray-800 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                            {t.hero.title} <span className="text-blue-600 dark:text-blue-400">{t.hero.titleAccent}</span> {t.hero.titleEnd}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                            {profile.bio || t.hero.subtitle}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="#contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-200">
                                {t.hero.getInTouch}
                            </Link>
                            <Link href="#projects" className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">
                                {t.hero.viewWork}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Projects Showcase */}
            <section id="projects" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.projects.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {t.projects.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 group">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                                        {project.title[0]}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <Link href={`/projects/${project.id}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300">
                                        {t.projects.viewDetails} <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && (
                            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                                <p className="text-gray-500 dark:text-gray-400">{t.projects.noProjects}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.skills.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t.skills.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Code className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t.skills.frontend}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">React, Next.js, Tailwind CSS, TypeScript</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl text-center hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t.skills.backend}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Node.js, Python, SQL, REST APIs</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl text-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Layout className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t.skills.design}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Figma, UI/UX Principles, Responsive Design</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl text-center hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Github className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t.skills.tools}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Git, Docker, VS Code, Postman</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 dark:bg-blue-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
                        <h2 className="text-3xl font-bold mb-6">{t.contact.title}</h2>
                        <p className="text-blue-100 dark:text-blue-200 mb-8 text-lg">
                            {t.contact.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href={`mailto:${profile.contactEmail}`} className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors">
                                <Mail className="w-5 h-5 mr-2" />
                                {t.contact.emailMe}
                            </a>
                            <a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 dark:bg-blue-800 text-white border border-blue-500 dark:border-blue-600 rounded-full font-bold hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors">
                                <Linkedin className="w-5 h-5 mr-2" />
                                {t.contact.linkedIn}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Local-Biz-Hub</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">© 2023 {t.footer.rights}</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
