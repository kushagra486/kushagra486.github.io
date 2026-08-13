import { create } from 'zustand';

export interface DesktopWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface DesktopState {
  windows: DesktopWindow[];
  activeZIndex: number;
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useDesktopStore = create<DesktopState>((set) => ({
  windows: [],
  activeZIndex: 10,

  openWindow: (id, title) =>
    set((state) => {
      const exists = state.windows.find((w) => w.id === id);
      if (exists) {
        return {
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, isOpen: true, isMinimized: false, zIndex: state.activeZIndex + 1 }
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
    }),

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
}));
