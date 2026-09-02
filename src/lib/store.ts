"use client";

import { create } from "zustand";

interface UiState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  toggleMobileMenu: (open?: boolean) => void;
  toggleSearch: (open?: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  toggleMobileMenu: (open) =>
    set((s) => ({ mobileMenuOpen: open ?? !s.mobileMenuOpen })),
  toggleSearch: (open) => set((s) => ({ searchOpen: open ?? !s.searchOpen })),
}));