'use client';

import PortfolioContent from './PortfolioContent';
import { Project, Profile } from '@/types';

interface PortfolioContentWrapperProps {
    projects: Project[];
    profile: Profile;
}

export default function PortfolioContentWrapper({ projects, profile }: PortfolioContentWrapperProps) {
    return <PortfolioContent projects={projects} profile={profile} />;
}
