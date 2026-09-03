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

export interface ViewerImage {
  src: string;
  alt?: string;
  /** 라이트박스 하단 캡션 (원본 갤러리 caption) */
  caption?: { title: string; description: string };
}

interface ImageViewerState {
  open: boolean;
  images: ViewerImage[];
  index: number;
  zoom: number;
  offset: { x: number; y: number };
  openViewer: (images: ViewerImage[], index?: number) => void;
  closeViewer: () => void;
  next: () => void;
  prev: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setOffset: (offset: { x: number; y: number }) => void;
}

export const ZOOM_STEP = 0.5;
export const ZOOM_MAX = 4;

export const useImageViewerStore = create<ImageViewerState>((set) => ({
  open: false,
  images: [],
  index: 0,
  zoom: 1,
  offset: { x: 0, y: 0 },
  openViewer: (images, index = 0) =>
    set({ open: true, images, index, zoom: 1, offset: { x: 0, y: 0 } }),
  closeViewer: () => set({ open: false }),
  next: () =>
    set((s) =>
      s.images.length
        ? {
            index: (s.index + 1) % s.images.length,
            zoom: 1,
            offset: { x: 0, y: 0 },
          }
        : s,
    ),
  prev: () =>
    set((s) =>
      s.images.length
        ? {
            index: (s.index - 1 + s.images.length) % s.images.length,
            zoom: 1,
            offset: { x: 0, y: 0 },
          }
        : s,
    ),
  zoomIn: () =>
    set((s) =>
      s.zoom < ZOOM_MAX ? { zoom: Math.min(ZOOM_MAX, s.zoom + ZOOM_STEP) } : s,
    ),
  zoomOut: () =>
    set((s) => {
      if (s.zoom <= 1) return { zoom: 1, offset: { x: 0, y: 0 } };
      const zoom = Math.max(1, s.zoom - ZOOM_STEP);
      return zoom === 1 ? { zoom, offset: { x: 0, y: 0 } } : { zoom };
    }),
  setOffset: (offset) => set({ offset }),
}));
