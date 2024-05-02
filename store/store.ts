import { User } from "firebase/auth";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  signOutZustand: () => void;
}

export const usePersonStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  signOutZustand: () => set({ user: null }),
}));
