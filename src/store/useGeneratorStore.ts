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

export const useGeneratorStore = create<GeneratorStore>((set, get) => ({
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
        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const binary = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
        const base64 = btoa(binary);

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type,
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
