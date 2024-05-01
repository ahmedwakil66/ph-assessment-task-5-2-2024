import { create } from 'zustand';

const mockLoading = async () => new Promise((resolve) => setTimeout(resolve, 1000));

const useAuthStore = create((set) => ({
    isLoading: true,
    isAuthenticated: false,
    assignAuth: async () => {
        set(() => ({ isLoading: true }));
        await mockLoading();
        set(() => ({ isAuthenticated: true, isLoading: false }));
    },
    revokeAuth: async () => {
        set(() => ({ isLoading: true }));
        await mockLoading();
        set(() => ({ isAuthenticated: false, isLoading: false }));
    },
}))

export default useAuthStore;