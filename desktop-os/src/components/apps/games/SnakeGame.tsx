'use client';

import { useEffect, useRef, useState } from 'react';

const GRID = 18;
const CELL = 16;
const SPEED_MS = 120;

type Point = { x: number; y: number };

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>([{ x: 8, y: 8 }]);
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const nextDirRef = useRef<Point>({ x: 1, y: 0 });
  const foodRef = useRef<Point>(randomFood([{ x: 8, y: 8 }]));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);

  function reset() {
    snakeRef.current = [{ x: 8, y: 8 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodRef.current = randomFood(snakeRef.current);
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const next = map[e.key];
      if (!next) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (next.x === -cur.x && next.y === -cur.y) return;
      nextDirRef.current = next;
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const snake = snakeRef.current;
      const head = { x: snake[0].x + dirRef.current.x, y: snake[0].y + dirRef.current.y };

      const hitsWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
      const hitsSelf = snake.some((s) => s.x === head.x && s.y === head.y);
      if (hitsWall || hitsSelf) {
        setRunning(false);
        setGameOver(true);
        return;
      }

      const ate = head.x === foodRef.current.x && head.y === foodRef.current.y;
      const newSnake = [head, ...snake];
      if (ate) {
        setScore((s) => s + 1);
        foodRef.current = randomFood(newSnake);
      } else {
        newSnake.pop();
      }
      snakeRef.current = newSnake;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00e5ff';
        newSnake.forEach((seg) => ctx.fillRect(seg.x * CELL, seg.y * CELL, CELL - 2, CELL - 2));
        ctx.fillStyle = '#ff5577';
        ctx.fillRect(foodRef.current.x * CELL, foodRef.current.y * CELL, CELL - 2, CELL - 2);
      }
    }, SPEED_MS);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="space-y-2 text-center">
      <p className="text-xs text-white/60">Arrow keys / WASD to move · Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={GRID * CELL}
        height={GRID * CELL}
        className="mx-auto rounded-lg border border-white/15 bg-black/40"
      />
      {!running && (
        <button
          onClick={reset}
          className="rounded-md bg-cyan-400/90 px-4 py-1.5 text-xs font-medium text-black hover:bg-cyan-300"
        >
          {gameOver ? `Game Over — Score ${score}. Play Again` : 'Start Snake'}
        </button>
      )}
    </div>
  );
}
