import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      setAccessToken: (token) => set({ accessToken: token, isLoggedIn: !!token }),
      logout: () => set({ accessToken: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    },
  ),
);
