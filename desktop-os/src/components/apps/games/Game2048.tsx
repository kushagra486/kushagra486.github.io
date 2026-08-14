'use client';

import { useEffect, useRef, useState } from 'react';
import { bumpBest, getStat } from '@/lib/gameStats';

const SIZE = 4;

type Board = number[][];

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function addRandomTile(board: Board): Board {
  const empties: [number, number][] = [];
  board.forEach((row, r) => row.forEach((v, c) => v === 0 && empties.push([r, c])));
  if (empties.length === 0) return board;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  const next = cloneBoard(board);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideRowLeft(row: number[]): { row: number[]; gained: number; moved: boolean } {
  const values = row.filter((v) => v !== 0);
  const result: number[] = [];
  let gained = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] === values[i + 1]) {
      const merged = values[i] * 2;
      result.push(merged);
      gained += merged;
      i++;
    } else {
      result.push(values[i]);
    }
  }
  while (result.length < SIZE) result.push(0);
  const moved = row.some((v, i) => v !== result[i]);
  return { row: result, gained, moved };
}

function rotateLeft(board: Board): Board {
  const next = emptyBoard();
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) next[SIZE - 1 - c][r] = board[r][c];
  return next;
}

function move(board: Board, direction: 'left' | 'right' | 'up' | 'down') {
  let rotations = 0;
  if (direction === 'up') rotations = 1;
  if (direction === 'right') rotations = 2;
  if (direction === 'down') rotations = 3;

  let working = board;
  for (let i = 0; i < rotations; i++) working = rotateLeft(working);

  let gained = 0;
  let moved = false;
  const result = working.map((row) => {
    const slid = slideRowLeft(row);
    gained += slid.gained;
    if (slid.moved) moved = true;
    return slid.row;
  });

  let final = result;
  for (let i = 0; i < (4 - rotations) % 4; i++) final = rotateLeft(final);

  return { board: final, gained, moved };
}

function canMove(board: Board): boolean {
  for (const dir of ['left', 'right', 'up', 'down'] as const) {
    if (move(board, dir).moved) return true;
  }
  return false;
}

const TILE_COLORS: Record<number, string> = {
  2: 'bg-white/10 text-white/90',
  4: 'bg-white/15 text-white/90',
  8: 'bg-amber-500/60 text-white',
  16: 'bg-amber-500/80 text-white',
  32: 'bg-orange-500/80 text-white',
  64: 'bg-orange-600/90 text-white',
  128: 'bg-yellow-400/80 text-black',
  256: 'bg-yellow-400/90 text-black',
  512: 'bg-yellow-300 text-black',
  1024: 'bg-cyan-300 text-black',
  2048: 'bg-cyan-400 text-black',
};

export function Game2048() {
  const [board, setBoard] = useState<Board>(() => addRandomTile(addRandomTile(emptyBoard())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const boardRef = useRef(board);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    // Client-only: read the saved high score after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(getStat('2048-best-score'));
  }, []);

  function restart() {
    setBoard(addRandomTile(addRandomTile(emptyBoard())));
    setScore(0);
    setOver(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, 'left' | 'right' | 'up' | 'down'> = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down',
        a: 'left',
        d: 'right',
        w: 'up',
        s: 'down',
      };
      const dir = map[e.key];
      if (!dir || over) return;
      e.preventDefault();

      const result = move(boardRef.current, dir);
      if (!result.moved) return;

      const withTile = addRandomTile(result.board);
      setBoard(withTile);
      setScore((s) => {
        const next = s + result.gained;
        setBest(bumpBest('2048-best-score', next));
        return next;
      });
      if (!canMove(withTile)) setOver(true);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [over]);

  return (
    <div className="space-y-2 text-center">
      <p className="text-xs text-white/60">
        Arrow keys / WASD to merge tiles · Score: {score} · Best: {best}
      </p>
      <div className="mx-auto grid w-fit grid-cols-4 gap-1.5 rounded-lg bg-black/30 p-1.5">
        {board.flat().map((value, i) => (
          <div
            key={i}
            className={`flex h-12 w-12 items-center justify-center rounded-md text-sm font-bold ${
              value ? TILE_COLORS[value] ?? 'bg-cyan-500 text-black' : 'bg-white/5'
            }`}
          >
            {value || ''}
          </div>
        ))}
      </div>
      {over && (
        <div className="space-y-1">
          <p className="text-sm text-white/80">No more moves — Game Over</p>
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
