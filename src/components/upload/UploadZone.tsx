"use client";

import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Image as ImageIcon, X, Loader2, ClipboardPaste, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useGeneratorStore } from "@/store/useGeneratorStore";

export function UploadZone() {
  const { files, setFiles, removeFile, generate, status, error } = useGeneratorStore();
  const isLoading = status === "loading";

  // Helper: add image files to store
  const addImageFiles = useCallback((newFiles: File[]) => {
    const imageFiles = newFiles.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;
    setFiles([
      ...files,
      ...imageFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  }, [files, setFiles]);

  // Global paste listener — works anywhere on the page
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const imageItems = Array.from(e.clipboardData.items).filter(
        (item) => item.type.startsWith("image/")
      );
      if (imageItems.length === 0) return;
      e.preventDefault();
      const pastedFiles = imageItems
        .map((item) => item.getAsFile())
        .filter(Boolean) as File[];
      // Give each pasted image a unique name
      const namedFiles = pastedFiles.map(
        (f, i) =>
          new File([f], `pasted-image-${Date.now()}-${i}.png`, { type: f.type })
      );
      addImageFiles(namedFiles);
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [addImageFiles]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addImageFiles(acceptedFiles);
  }, [addImageFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-white/5"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex justify-center mb-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <UploadCloud size={32} className="text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-1">
          {isDragActive ? "Drop to add your design!" : "Upload or Paste Screenshots"}
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Drag &amp; drop, click to browse, or press{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-xs font-mono">⌘V</kbd>
          {" "}to paste directly from your clipboard.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <UploadCloud size={14} /> Drag &amp; Drop
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ClipboardPaste size={14} /> Paste (⌘V / Ctrl+V)
          </span>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mt-4 flex items-start gap-3 p-4 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Generation failed</p>
            <p className="text-xs mt-0.5 opacity-80">{error}</p>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <ImageIcon size={18} className="text-muted-foreground" />
            Selected Screens
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="group relative rounded-lg border border-border bg-card overflow-hidden"
              >
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    fill
                    className="object-contain"
                    onLoad={() => {
                      // Don't revoke immediately in store, otherwise it breaks if component remounts
                      // URL.revokeObjectURL(file.preview);
                    }}
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-destructive rounded-md opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <button 
              onClick={() => generate(files, "react")}
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Code"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
