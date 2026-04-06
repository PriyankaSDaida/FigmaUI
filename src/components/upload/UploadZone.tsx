"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

export function UploadZone() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  });

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-white/5"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex justify-center mb-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <UploadCloud size={32} className="text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-1">Upload Screenshots</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Drag and drop your Figma designs here, or click to browse. Max size 5MB per image.
        </p>
      </div>

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
                      URL.revokeObjectURL(file.preview);
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
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-destructive rounded-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
              Generate Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
