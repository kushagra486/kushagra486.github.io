import { usePreferences } from '@/lib/preferences';

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function blip(freq: number, duration: number, gain = 0.05) {
  if (!usePreferences.getState().soundEnabled) return;
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export const sound = {
  open: () => blip(660, 0.12),
  close: () => blip(320, 0.1),
  click: () => blip(880, 0.05, 0.03),
};
