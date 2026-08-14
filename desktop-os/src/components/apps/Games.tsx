'use client';

import { useState } from 'react';
import { SnakeGame } from '@/components/apps/games/SnakeGame';
import { MemoryGame } from '@/components/apps/games/MemoryGame';
import { TicTacToe } from '@/components/apps/games/TicTacToe';
import { Game2048 } from '@/components/apps/games/Game2048';
import { RockPaperScissors } from '@/components/apps/games/RockPaperScissors';

const TABS = [
  {
    id: 'snake',
    label: 'Snake',
    Component: SnakeGame,
    guide: [
      'Guide the snake around the board with the Arrow keys or WASD.',
      'Eat the red food to grow and score a point.',
      "Avoid hitting the walls or the snake's own tail — one hit ends the run.",
      'Click "Start Snake" to begin, and again to try to beat your best score.',
    ],
  },
  {
    id: 'memory',
    label: 'Memory Match',
    Component: MemoryGame,
    guide: [
      'Click any two cards to flip them over.',
      'If the icons match, they stay face-up. If not, they flip back after a moment.',
      'Match all 8 pairs to win — fewer moves is a better score.',
      'Click "Restart" for a freshly shuffled board.',
    ],
  },
  {
    id: 'tictactoe',
    label: 'Tic-Tac-Toe',
    Component: TicTacToe,
    guide: [
      "You play X, the computer plays O and moves right after you.",
      'Get three of your marks in a row — across, down, or diagonally — to win.',
      'If all 9 squares fill up with no winner, it\'s a draw.',
      'Click "Play Again" to start a new round.',
    ],
  },
  {
    id: '2048',
    label: '2048',
    Component: Game2048,
    guide: [
      'Slide tiles with the Arrow keys or WASD — all tiles move together in that direction.',
      'When two tiles with the same number touch, they merge into one with double the value.',
      'A new tile (2 or 4) appears after every move.',
      'Reach the 2048 tile for the classic win — or just chase a higher score. Game ends when no moves are left.',
    ],
  },
  {
    id: 'rps',
    label: 'Rock Paper Scissors',
    Component: RockPaperScissors,
    guide: [
      'Pick rock, paper, or scissors — the computer picks at the same time.',
      'Rock beats scissors, scissors beats paper, paper beats rock.',
      'Matching picks are a draw.',
      'Your win/loss/draw record is saved and shown above the choices.',
    ],
  },
] as const;

export function Games() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('snake');
  const [showGuide, setShowGuide] = useState(false);
  const active = TABS.find((t) => t.id === tab)!;
  const Active = active.Component;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setShowGuide(false);
            }}
            className={`rounded-md px-3 py-1 text-xs transition ${
              tab === t.id ? 'bg-cyan-400/90 text-black' : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={() => setShowGuide((v) => !v)}
          className="ml-auto rounded-md bg-white/10 px-3 py-1 text-xs text-white/80 transition hover:bg-white/20"
        >
          {showGuide ? 'Hide guide' : '❓ How to play'}
        </button>
      </div>

      {showGuide && (
        <ul className="list-disc space-y-1 rounded-lg border border-white/10 bg-white/5 p-3 pl-7 text-xs text-white/70">
          {active.guide.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}

      <Active />
    </div>
  );
}
