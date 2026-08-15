import { AboutMe } from '@/components/apps/AboutMe';
import { Projects } from '@/components/apps/Projects';
import { Certifications } from '@/components/apps/Certifications';
import { AIAssistant } from '@/components/apps/AIAssistant';
import { Games } from '@/components/apps/Games';
import { AppDashboard } from '@/components/apps/AppDashboard';
import { AppViewer } from '@/components/apps/AppViewer';
import { ResumeViewer } from '@/components/apps/ResumeViewer';
import { CVViewer } from '@/components/apps/CVViewer';
import { AIMantram } from '@/components/apps/AIMantram';
import { NeonAirDraw } from '@/components/apps/NeonAirDraw';
import { SudhaVatika } from '@/components/apps/SudhaVatika';
import { GitHubLive } from '@/components/apps/GitHubLive';
import { JDMatcher } from '@/components/apps/JDMatcher';
import { SkillGraph } from '@/components/apps/SkillGraph';
import { Notes } from '@/components/apps/Notes';
import { Contact } from '@/components/apps/Contact';
import { SystemPreferences } from '@/components/apps/SystemPreferences';

/** Single source of truth for launchable desktop apps — used by the desktop icons, dock, command palette, and shortcuts. */
export const APPS = [
  { id: 'about-me', title: 'About Me', icon: '🧑‍💻', Component: AboutMe },
  { id: 'resume', title: 'Resume', icon: '📄', Component: ResumeViewer },
  { id: 'cv', title: 'CV', icon: '📋', Component: CVViewer },
  { id: 'projects', title: 'Projects', icon: '🗂️', Component: Projects },
  { id: 'app-dashboard', title: 'Live Apps', icon: '🚀', Component: AppDashboard },
  { id: 'certifications', title: 'Certifications', icon: '🏅', Component: Certifications },
  { id: 'ai-assistant', title: 'AI Assistant', icon: '💬', Component: AIAssistant },
  { id: 'jd-matcher', title: 'JD Matcher', icon: '🎯', Component: JDMatcher },
  { id: 'skill-graph', title: 'Skill Graph', icon: '🕸️', Component: SkillGraph },
  { id: 'notes', title: 'Notes', icon: '📝', Component: Notes },
  { id: 'contact', title: 'Contact', icon: '✉️', Component: Contact },
  { id: 'games', title: 'Games', icon: '🎮', Component: Games },
  { id: 'ai-mantram', title: 'AI Mantram Console', icon: '🖥️', Component: AIMantram },
  { id: 'neon-air-draw', title: 'Neon Air Draw Ultra PRO', icon: '🎨', Component: NeonAirDraw },
  { id: 'sudha-vatika', title: 'Sudha Vatika Dashboard', icon: '🏡', Component: SudhaVatika },
  { id: 'github-live', title: 'Live GitHub Feed', icon: '🐙', Component: GitHubLive },
  { id: 'system-preferences', title: 'System Preferences', icon: '⚙️', Component: SystemPreferences },
] as const;

/** Launched from tiles/links rather than a desktop icon, so it's a window but not a dock/palette entry. */
export const WINDOW_ONLY_APPS = [{ id: 'app-viewer', Component: AppViewer }] as const;

export type AppId = (typeof APPS)[number]['id'];
