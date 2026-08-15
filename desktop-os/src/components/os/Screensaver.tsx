'use client';

import { useEffect, useRef, useState } from 'react';
import { skills } from '@/lib/portfolioData';
import { usePreferences } from '@/lib/preferences';

const POOL = Array.from(new Set(Object.values(skills).flat().join('').replace(/[^A-Za-z0-9]/g, ''))).join('');
const IDLE_MS = 120_000;

/** After IDLE_MS of no input, fills the screen with a Matrix-style rain of the portfolio's own tech-stack characters. */
export function Screensaver() {
  const reducedMotion = usePreferences((s) => s.reducedMotion);
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let timeout: ReturnType<typeof setTimeout>;

    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(() => setActive(true), IDLE_MS);
    }

    const events: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
      clearTimeout(timeout);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!active) return;
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext('2d');
    if (!ctx2d) return;
    // Narrowed once here; re-bound to non-nullable names so nested closures don't need re-checks.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2d;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    let raf: number;
    function draw() {
      ctx.fillStyle = 'rgba(4,8,16,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#22d3ee';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = POOL[Math.floor((drops[i] * 7 + i * 13) % POOL.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[500] cursor-pointer bg-black"
      onClick={() => setActive(false)}
      onKeyDown={() => setActive(false)}
      role="button"
      tabIndex={0}
      aria-label="Dismiss screensaver"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/30">
        Move or click to return to Kushagra OS
      </p>
    </div>
  );
}
