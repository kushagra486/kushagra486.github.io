import { create } from 'zustand';
import { recordAppOpen } from '@/lib/achievements';

export interface DesktopWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export interface ActiveApp {
  name: string;
  url: string;
}

interface DesktopState {
  windows: DesktopWindow[];
  activeZIndex: number;
  activeApp: ActiveApp | null;
  spotlightOpen: boolean;
  widgetsOpen: boolean;
  setSpotlightOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setWidgetsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  openApp: (app: ActiveApp) => void;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  windows: [],
  activeZIndex: 10,
  activeApp: null,
  spotlightOpen: false,
  widgetsOpen: false,

  setSpotlightOpen: (open) =>
    set((state) => ({ spotlightOpen: typeof open === 'function' ? open(state.spotlightOpen) : open })),
  setWidgetsOpen: (open) =>
    set((state) => ({ widgetsOpen: typeof open === 'function' ? open(state.widgetsOpen) : open })),

  openWindow: (id, title) => {
    recordAppOpen(id);
    set((state) => {
      const exists = state.windows.find((w) => w.id === id);
      if (exists) {
        return {
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, title, isOpen: true, isMinimized: false, zIndex: state.activeZIndex + 1 }
              : w
          ),
          activeZIndex: state.activeZIndex + 1,
        };
      }
      return {
        windows: [
          ...state.windows,
          { id, title, isOpen: true, isMinimized: false, zIndex: state.activeZIndex + 1 },
        ],
        activeZIndex: state.activeZIndex + 1,
      };
    });
  },

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, isOpen: false } : w)),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    })),

  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.activeZIndex + 1, isMinimized: false } : w
      ),
      activeZIndex: state.activeZIndex + 1,
    })),

  openApp: (app) => {
    set({ activeApp: app });
    get().openWindow('app-viewer', app.name);
  },
}));
