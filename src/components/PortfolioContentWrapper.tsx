'use client';

import dynamic from 'next/dynamic';
import { Project, Profile } from '@/types';

const PortfolioContent = dynamic(() => import('./PortfolioContent'), {
    ssr: false,
});

interface PortfolioContentWrapperProps {
    projects: Project[];
    profile: Profile;
}

export default function PortfolioContentWrapper({ projects, profile }: PortfolioContentWrapperProps) {
    return <PortfolioContent projects={projects} profile={profile} />;
}
