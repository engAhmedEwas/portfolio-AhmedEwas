'use client';

import { useEffect, useState } from 'react';
import PortfolioContent from './PortfolioContent';
import { Project, Profile } from '@/types';

interface PortfolioContentWrapperProps {
    projects: Project[];
    profile: Profile;
}

export default function PortfolioContentWrapper({ projects, profile }: PortfolioContentWrapperProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    return <PortfolioContent projects={projects} profile={profile} />;
}
