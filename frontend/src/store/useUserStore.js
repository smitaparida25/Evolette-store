import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,

  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },

  loadUserFromStorage: () => {
    const raw = localStorage.getItem("user");
    if (raw) {
      set({ user: JSON.parse(raw) });
    }
  }
}));
