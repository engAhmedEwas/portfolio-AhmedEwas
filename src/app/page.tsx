import { db } from '@/lib/db';
import TranslatedNavbarWrapper from '@/components/TranslatedNavbarWrapper';
import PortfolioContentWrapper from '@/components/PortfolioContentWrapper';
import SettingsTogglesWrapper from '@/components/SettingsTogglesWrapper';




export default async function Home() {
  const projects = await db.getProjects();
  const profile = await db.getProfile();

  const publicProjects = projects.filter(p => p.isPublic && p.status === 'Completed');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TranslatedNavbarWrapper />
      <SettingsTogglesWrapper />
      <PortfolioContentWrapper projects={publicProjects} profile={profile} />
    </div>
  );
}
