import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  language: "ar" | "en";
  isAuthModalOpen: boolean;
  isSellerModalOpen: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
    type?: "buyer" | "seller" | "admin";
  } | null;
  setLanguage: (language: "ar" | "en") => void;
  setAuthModalOpen: (open: boolean) => void;
  setSellerModalOpen: (open: boolean) => void;
  setUser: (user: AppState["user"]) => void;
  getText: (en: string, ar: string) => string;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: "ar",
      isAuthModalOpen: false,
      isSellerModalOpen: false,
      user: null,
      setLanguage: (language) => {
        set({ language });
        if (typeof document !== "undefined") {
          document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = language;
        }
      },
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      setSellerModalOpen: (open) => set({ isSellerModalOpen: open }),
      setUser: (user) => set({ user }),
      getText: (en, ar) => (get().language === "en" ? en : ar),
    }),
    {
      name: "wezo-app-store",
      partialize: (state) => ({ language: state.language, user: state.user }),
    },
  ),
);
