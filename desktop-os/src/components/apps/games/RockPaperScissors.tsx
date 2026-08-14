'use client';

import { useEffect, useState } from 'react';
import { getStat, setStat } from '@/lib/gameStats';

const CHOICES = ['rock', 'paper', 'scissors'] as const;
type Choice = (typeof CHOICES)[number];

const EMOJI: Record<Choice, string> = { rock: '🪨', paper: '📄', scissors: '✂️' };
const BEATS: Record<Choice, Choice> = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

function randomChoice(): Choice {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

export function RockPaperScissors() {
  const [you, setYou] = useState<Choice | null>(null);
  const [cpu, setCpu] = useState<Choice | null>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [record, setRecord] = useState({ wins: 0, losses: 0, draws: 0 });

  useEffect(() => {
    // Client-only: read the saved win/loss/draw record after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecord({
      wins: getStat('rps-wins'),
      losses: getStat('rps-losses'),
      draws: getStat('rps-draws'),
    });
  }, []);

  function play(choice: Choice) {
    const cpuChoice = randomChoice();
    setYou(choice);
    setCpu(cpuChoice);

    let outcome: 'win' | 'lose' | 'draw';
    if (choice === cpuChoice) outcome = 'draw';
    else if (BEATS[choice] === cpuChoice) outcome = 'win';
    else outcome = 'lose';
    setResult(outcome);

    const key = outcome === 'win' ? 'rps-wins' : outcome === 'lose' ? 'rps-losses' : 'rps-draws';
    const value = getStat(key) + 1;
    setStat(key, value);
    setRecord((r) => ({
      ...r,
      [outcome === 'win' ? 'wins' : outcome === 'lose' ? 'losses' : 'draws']: value,
    }));
  }

  return (
    <div className="space-y-3 text-center">
      <p className="text-xs text-white/60">
        W {record.wins} / L {record.losses} / D {record.draws}
      </p>
      <div className="flex justify-center gap-2">
        {CHOICES.map((choice) => (
          <button
            key={choice}
            onClick={() => play(choice)}
            className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-white/15 bg-white/10 text-2xl transition hover:bg-white/20"
          >
            {EMOJI[choice]}
          </button>
        ))}
      </div>
      {you && cpu && (
        <div className="space-y-1">
          <p className="text-sm text-white/80">
            You: {EMOJI[you]} {you} · Computer: {EMOJI[cpu]} {cpu}
          </p>
          <p className="text-sm font-medium text-white">
            {result === 'win' && 'You win! 🎉'}
            {result === 'lose' && 'Computer wins.'}
            {result === 'draw' && "It's a draw!"}
          </p>
        </div>
      )}
    </div>
  );
}
