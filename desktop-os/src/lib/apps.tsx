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
import {
  Award,
  FileText,
  FolderOpen,
  Gamepad2,
  GitBranch,
  Mail,
  MessageCircle,
  Network,
  NotebookPen,
  Palette,
  Rocket,
  ScrollText,
  Settings,
  Target,
  Terminal,
  Trees,
  User,
} from 'lucide-react';

/** Single source of truth for launchable desktop apps — used by the desktop icons, dock, command palette, and shortcuts. */
export const APPS = [
  { id: 'about-me', title: 'About Me', icon: '🧑‍💻', appIcon: { Glyph: User, gradient: 'from-sky-400 to-blue-600' }, Component: AboutMe },
  { id: 'resume', title: 'Resume', icon: '📄', appIcon: { Glyph: FileText, gradient: 'from-zinc-100 to-zinc-400 [&>svg]:!text-zinc-700' }, Component: ResumeViewer },
  { id: 'cv', title: 'CV', icon: '📋', appIcon: { Glyph: ScrollText, gradient: 'from-amber-300 to-orange-500' }, Component: CVViewer },
  { id: 'projects', title: 'Projects', icon: '🗂️', appIcon: { Glyph: FolderOpen, gradient: 'from-sky-300 to-sky-600' }, Component: Projects },
  { id: 'app-dashboard', title: 'Live Apps', icon: '🚀', appIcon: { Glyph: Rocket, gradient: 'from-indigo-400 to-violet-600' }, Component: AppDashboard },
  { id: 'certifications', title: 'Certifications', icon: '🏅', appIcon: { Glyph: Award, gradient: 'from-yellow-300 to-amber-500' }, Component: Certifications },
  { id: 'ai-assistant', title: 'AI Assistant', icon: '💬', appIcon: { Glyph: MessageCircle, gradient: 'from-emerald-400 to-green-600' }, Component: AIAssistant },
  { id: 'jd-matcher', title: 'JD Matcher', icon: '🎯', appIcon: { Glyph: Target, gradient: 'from-rose-400 to-red-600' }, Component: JDMatcher },
  { id: 'skill-graph', title: 'Skill Graph', icon: '🕸️', appIcon: { Glyph: Network, gradient: 'from-fuchsia-400 to-purple-600' }, Component: SkillGraph },
  { id: 'notes', title: 'Notes', icon: '📝', appIcon: { Glyph: NotebookPen, gradient: 'from-yellow-200 to-yellow-400 [&>svg]:!text-yellow-900' }, Component: Notes },
  { id: 'contact', title: 'Contact', icon: '✉️', appIcon: { Glyph: Mail, gradient: 'from-sky-400 to-blue-700' }, Component: Contact },
  { id: 'games', title: 'Games', icon: '🎮', appIcon: { Glyph: Gamepad2, gradient: 'from-pink-400 to-rose-600' }, Component: Games },
  { id: 'ai-mantram', title: 'AI Mantram Console', icon: '🖥️', appIcon: { Glyph: Terminal, gradient: 'from-zinc-700 to-zinc-900' }, Component: AIMantram },
  { id: 'neon-air-draw', title: 'Neon Air Draw Ultra PRO', icon: '🎨', appIcon: { Glyph: Palette, gradient: 'from-orange-400 via-pink-500 to-purple-600' }, Component: NeonAirDraw },
  { id: 'sudha-vatika', title: 'Sudha Vatika Dashboard', icon: '🏡', appIcon: { Glyph: Trees, gradient: 'from-lime-400 to-emerald-600' }, Component: SudhaVatika },
  { id: 'github-live', title: 'Live GitHub Feed', icon: '🐙', appIcon: { Glyph: GitBranch, gradient: 'from-neutral-600 to-neutral-900' }, Component: GitHubLive },
  { id: 'system-preferences', title: 'System Preferences', icon: '⚙️', appIcon: { Glyph: Settings, gradient: 'from-zinc-400 to-zinc-600' }, Component: SystemPreferences },
] as const;

/** Launched from tiles/links rather than a desktop icon, so it's a window but not a dock/palette entry. */
export const WINDOW_ONLY_APPS = [{ id: 'app-viewer', Component: AppViewer }] as const;

export type AppId = (typeof APPS)[number]['id'];
