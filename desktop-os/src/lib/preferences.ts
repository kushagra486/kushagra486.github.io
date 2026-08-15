import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WallpaperTheme = 'aurora' | 'sunset' | 'emerald' | 'nebula';

interface PreferencesState {
  wallpaper: WallpaperTheme;
  soundEnabled: boolean;
  reducedMotion: boolean;
  setWallpaper: (w: WallpaperTheme) => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
}

/** Persisted (localStorage) desktop preferences — wallpaper theme, sound, reduced motion. */
export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      wallpaper: 'aurora',
      soundEnabled: true,
      reducedMotion: false,
      setWallpaper: (wallpaper) => set({ wallpaper }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleReducedMotion: () => set((s) => ({ reducedMotion: !s.reducedMotion })),
    }),
    { name: 'kushagra-os:preferences' }
  )
);
