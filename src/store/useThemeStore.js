import { create } from 'zustand';

const useThemeStore = create((set) => ({
    isDarkMode: false,
    toggleThemeMode: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
}))

export default useThemeStore;