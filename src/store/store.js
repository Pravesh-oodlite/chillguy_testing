import { create } from "zustand";

const createTokenSlice = (set) => ({
  token: "" || localStorage.getItem("token"),
  addToken: (token) => {
    localStorage.setItem("token", token); // Save to localStorage
    set(() => ({ token })); // Update store
  },
  removeToken: () => {
    localStorage.removeItem("token"); // Remove from localStorage
    set({ token: "" }); // Update store
  },
});

const createUserSlice = (set) => ({
  user: null || JSON.parse(localStorage.getItem("user")),
  addUser: (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    set({ user: userInfo });
  },
  removeUser: () => {
    localStorage.removeItem("user"); // Remove from localStorage
    set({ user: null });
  },
});

export const useBoundStore = create((...a) => ({
  ...createTokenSlice(...a),
  ...createUserSlice(...a),
}));
