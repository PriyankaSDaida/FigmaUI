"use client";

import { create } from "zustand";

export type GenerationStatus = "idle" | "loading" | "success" | "error";

export interface GenerationResult {
  code: string;
  framework: "react" | "nextjs";
  imageName: string;
}

interface GeneratorStore {
  // Upload state
  files: (File & { preview: string })[];
  setFiles: (files: (File & { preview: string })[]) => void;
  removeFile: (name: string) => void;

  // Generation state
  status: GenerationStatus;
  results: GenerationResult[];
  activeResultIndex: number;
  error: string | null;

  // Actions
  generate: (files: (File & { preview: string })[], framework: "react" | "nextjs") => Promise<void>;
  setActiveResultIndex: (index: number) => void;
  reset: () => void;
}

export const useGeneratorStore = create<GeneratorStore>((set) => ({
  files: [],
  status: "idle",
  results: [],
  activeResultIndex: 0,
  error: null,

  setFiles: (files) => set({ files }),

  removeFile: (name) =>
    set((state) => ({
      files: state.files.filter((f) => f.name !== name),
    })),

  setActiveResultIndex: (index) => set({ activeResultIndex: index }),

  reset: () => set({ status: "idle", results: [], error: null, activeResultIndex: 0 }),

  generate: async (files, framework) => {
    if (files.length === 0) return;

    set({ status: "loading", error: null, results: [] });

    try {
      const results: GenerationResult[] = [];

      for (const file of files) {
        // Compress image to reduce token usage (max 1024px, JPEG 80%)
        const { base64, mimeType } = await compressImage(file, 1024, 0.8);

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType,
            framework,
            fileName: file.name,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        results.push({
          code: data.code,
          framework,
          imageName: file.name,
        });
      }

      set({ status: "success", results, activeResultIndex: 0 });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      set({ status: "error", error: message });
    }
  },
}));

/**
 * Compresses an image File using a canvas element.
 * Resizes to maxDimension on the longest side and encodes as JPEG.
 */
async function compressImage(
  file: File,
  maxDimension = 1024,
  quality = 0.8
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width >= height) {
          height = Math.round((height / width) * maxDimension);
          width = maxDimension;
        } else {
          width = Math.round((width / height) * maxDimension);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Could not get canvas context"));

      ctx.drawImage(img, 0, 0, width, height);

      // Export as JPEG for smaller size
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      const base64 = dataUrl.split(",")[1];

      resolve({ base64, mimeType: "image/jpeg" });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = url;
  });
}
