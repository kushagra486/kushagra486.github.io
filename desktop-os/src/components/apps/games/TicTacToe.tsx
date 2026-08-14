'use client';

import { useEffect, useState } from 'react';
import { getStat, setStat } from '@/lib/gameStats';

type Cell = 'X' | 'O' | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(board: Cell[]): Cell | 'draw' | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? 'draw' : null;
}

function computerMove(board: Cell[]): number {
  const empty = board.map((c, i) => (c ? -1 : i)).filter((i) => i !== -1);
  return empty[Math.floor(Math.random() * empty.length)];
}

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [status, setStatus] = useState<Cell | 'draw' | null>(null);
  const [record, setRecord] = useState({ wins: 0, losses: 0, draws: 0 });

  useEffect(() => {
    // Client-only: read the saved win/loss/draw record after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecord({
      wins: getStat('tictactoe-wins'),
      losses: getStat('tictactoe-losses'),
      draws: getStat('tictactoe-draws'),
    });
  }, []);

  function playerMove(i: number) {
    if (board[i] || status) return;
    const next = [...board];
    next[i] = 'X';

    const result = winner(next);
    if (result) {
      setBoard(next);
      finish(result);
      return;
    }

    const aiIndex = computerMove(next);
    if (aiIndex !== undefined) next[aiIndex] = 'O';
    setBoard(next);
    finish(winner(next));
  }

  function finish(result: Cell | 'draw' | null) {
    if (!result) return;
    setStatus(result);
    if (result === 'X') {
      const wins = getStat('tictactoe-wins') + 1;
      setStat('tictactoe-wins', wins);
      setRecord((r) => ({ ...r, wins }));
    } else if (result === 'O') {
      const losses = getStat('tictactoe-losses') + 1;
      setStat('tictactoe-losses', losses);
      setRecord((r) => ({ ...r, losses }));
    } else {
      const draws = getStat('tictactoe-draws') + 1;
      setStat('tictactoe-draws', draws);
      setRecord((r) => ({ ...r, draws }));
    }
  }

  function restart() {
    setBoard(Array(9).fill(null));
    setStatus(null);
  }

  return (
    <div className="space-y-2 text-center">
      <p className="text-xs text-white/60">
        You&apos;re X, computer is O · W {record.wins} / L {record.losses} / D {record.draws}
      </p>
      <div className="mx-auto grid w-fit grid-cols-3 gap-1.5">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => playerMove(i)}
            disabled={!!cell || !!status}
            className={`flex h-14 w-14 items-center justify-center rounded-md border text-2xl font-semibold transition ${
              cell === 'X' ? 'text-cyan-300' : 'text-pink-300'
            } border-white/15 bg-white/10 hover:bg-white/15 disabled:hover:bg-white/10`}
          >
            {cell}
          </button>
        ))}
      </div>
      {status && (
        <div className="space-y-1">
          <p className="text-sm text-white/80">
            {status === 'draw' ? "It's a draw!" : status === 'X' ? 'You win! 🎉' : 'Computer wins.'}
          </p>
          <button
            onClick={restart}
            className="rounded-md bg-cyan-400/90 px-4 py-1.5 text-xs font-medium text-black hover:bg-cyan-300"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
