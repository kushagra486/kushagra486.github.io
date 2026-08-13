'use client';

import { useRef, useState } from 'react';

export function NeonAirDraw() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const [color, setColor] = useState('#00e5ff');

  function getCtx() {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const ctx = getCtx();
    const { x, y } = pos(e);
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = getCtx();
    const { x, y } = pos(e);
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function end() {
    drawing.current = false;
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-white/60">
        Mouse/touch draw preview — swap in webcam hand-tracking for the real Neon Air Draw Ultra PRO.
      </p>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-7 w-10 cursor-pointer rounded border border-white/20 bg-transparent"
        />
        <button
          onClick={clear}
          className="rounded-md bg-white/10 px-3 py-1 text-xs text-white/90 hover:bg-white/20"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={560}
        height={320}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="w-full touch-none rounded-lg border border-white/15 bg-black/40"
      />
    </div>
  );
}
