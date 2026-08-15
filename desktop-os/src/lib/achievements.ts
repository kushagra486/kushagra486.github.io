import { APPS } from '@/lib/apps';
import { getStat } from '@/lib/gameStats';

const OPENED_KEY = 'kushagra-os:opened-apps';
const CHAT_COUNT_KEY = 'kushagra-os:chat-messages';

export function recordAppOpen(id: string): void {
  if (typeof window === 'undefined') return;
  const raw = window.localStorage.getItem(OPENED_KEY);
  const opened: string[] = raw ? JSON.parse(raw) : [];
  if (!opened.includes(id)) {
    opened.push(id);
    window.localStorage.setItem(OPENED_KEY, JSON.stringify(opened));
  }
}

function getOpenedApps(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(OPENED_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function recordChatMessage(): void {
  if (typeof window === 'undefined') return;
  const count = getChatCount() + 1;
  window.localStorage.setItem(CHAT_COUNT_KEY, String(count));
}

function getChatCount(): number {
  if (typeof window === 'undefined') return 0;
  return Number(window.localStorage.getItem(CHAT_COUNT_KEY) ?? 0);
}

const GAME_KEYS = [
  ['snake-high-score'],
  ['memory-best-moves'],
  ['tictactoe-wins', 'tictactoe-losses', 'tictactoe-draws'],
  ['2048-best-score'],
  ['rps-wins', 'rps-losses', 'rps-draws'],
];

function gamesPlayedCount(): number {
  return GAME_KEYS.filter((keys) => keys.some((k) => getStat(k) > 0)).length;
}

export interface Achievement {
  id: string;
  label: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export function getAchievements(): Achievement[] {
  const opened = getOpenedApps();
  const gamesPlayed = gamesPlayedCount();
  const chatCount = getChatCount();

  return [
    {
      id: 'first-look',
      label: 'First Look',
      icon: '👀',
      description: 'Opened your first app',
      unlocked: opened.length >= 1,
    },
    {
      id: 'explorer',
      label: 'Explorer',
      icon: '🧭',
      description: `Opened ${Math.min(opened.length, APPS.length)}/${APPS.length} apps`,
      unlocked: opened.length >= APPS.length,
    },
    {
      id: 'ai-curious',
      label: 'AI Whisperer',
      icon: '💬',
      description: 'Chatted with the AI Assistant',
      unlocked: chatCount >= 1,
    },
    {
      id: 'gamer',
      label: 'Arcade Regular',
      icon: '🎮',
      description: `Played ${gamesPlayed}/5 games`,
      unlocked: gamesPlayed >= 3,
    },
    {
      id: 'well-read',
      label: 'Well Read',
      icon: '📄',
      description: 'Checked out the Resume/CV',
      unlocked: opened.includes('resume') || opened.includes('cv'),
    },
    {
      id: 'credentialed',
      label: 'Credential Check',
      icon: '🏅',
      description: 'Browsed the certifications',
      unlocked: opened.includes('certifications'),
    },
  ];
}
