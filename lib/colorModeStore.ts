import { create } from 'zustand';

interface ColorModeStore {
  colorMode: 'light' | 'dark';
  toggleColorMode: () => void;
  setColorMode: (mode: 'light' | 'dark') => void;
}

export const useColorModeStore = create<ColorModeStore>((set) => ({
  colorMode: 'light',
  toggleColorMode: () => set((state) => ({ 
    colorMode: state.colorMode === 'light' ? 'dark' : 'light' 
  })),
  setColorMode: (mode) => set({ colorMode: mode }),
}));
