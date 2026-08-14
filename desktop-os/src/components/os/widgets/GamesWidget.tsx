'use client';

import { useEffect, useState } from 'react';
import { getStat } from '@/lib/gameStats';
import { useDesktopStore } from '@/store/useDesktopStore';

export function GamesWidget() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const [stats, setStats] = useState({
    snakeBest: 0,
    memoryBest: 0,
    ticTacToeWins: 0,
    best2048: 0,
    rpsWins: 0,
  });

  useEffect(() => {
    // Client-only: read saved per-game stats after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      snakeBest: getStat('snake-high-score'),
      memoryBest: getStat('memory-best-moves'),
      ticTacToeWins: getStat('tictactoe-wins'),
      best2048: getStat('2048-best-score'),
      rpsWins: getStat('rps-wins'),
    });
  }, []);

  return (
    <button
      onClick={() => openWindow('games', 'Games')}
      className="block w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
    >
      <p className="text-xs text-white/50">Games — best scores</p>
      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-white/80">
        <span>🐍 Snake</span>
        <span className="text-right text-white/50">{stats.snakeBest || '—'}</span>
        <span>🧠 Memory</span>
        <span className="text-right text-white/50">{stats.memoryBest ? `${stats.memoryBest} moves` : '—'}</span>
        <span>⭕ Tic-Tac-Toe</span>
        <span className="text-right text-white/50">{stats.ticTacToeWins} wins</span>
        <span>🔢 2048</span>
        <span className="text-right text-white/50">{stats.best2048 || '—'}</span>
        <span>✂️ RPS</span>
        <span className="text-right text-white/50">{stats.rpsWins} wins</span>
      </div>
    </button>
  );
}
