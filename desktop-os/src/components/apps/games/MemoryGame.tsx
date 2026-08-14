'use client';

import { useEffect, useMemo, useState } from 'react';
import { bumpBestLow, getStat } from '@/lib/gameStats';

const ICONS = ['🚀', '🤖', '🧠', '💾', '🔭', '🛰️', '⚡', '🎯'];

interface Card {
  id: number;
  icon: string;
  matched: boolean;
}

function shuffle(): Card[] {
  const pairs = [...ICONS, ...ICONS].map((icon, id) => ({ id, icon, matched: false }));
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => shuffle());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [bestMoves, setBestMoves] = useState(0);

  useEffect(() => {
    // Client-only: read the saved best-moves record after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBestMoves(getStat('memory-best-moves'));
  }, []);

  const won = useMemo(() => cards.every((c) => c.matched), [cards]);

  useEffect(() => {
    if (won && moves > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBestMoves(bumpBestLow('memory-best-moves', moves));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  function handleFlip(index: number) {
    if (locked || flipped.includes(index) || cards[index].matched) return;
    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (cards[a].icon === cards[b].icon) {
        setTimeout(() => {
          setCards((prev) => prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
          setFlipped([]);
          setLocked(false);
        }, 400);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 700);
      }
    }
  }

  function restart() {
    setCards(shuffle());
    setFlipped([]);
    setMoves(0);
    setLocked(false);
  }

  return (
    <div className="space-y-2 text-center">
      <p className="text-xs text-white/60">
        Moves: {moves} · Best: {bestMoves || '—'}
        {won && ' — Solved! 🎉'}
      </p>
      <div className="mx-auto grid w-fit grid-cols-4 gap-1.5">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(i)}
              className={`flex h-12 w-12 items-center justify-center rounded-md border text-xl transition ${
                isFlipped
                  ? 'border-cyan-300/40 bg-cyan-400/20'
                  : 'border-white/15 bg-white/10 hover:bg-white/15'
              }`}
            >
              {isFlipped ? card.icon : ''}
            </button>
          );
        })}
      </div>
      <button
        onClick={restart}
        className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/20"
      >
        Restart
      </button>
    </div>
  );
}
