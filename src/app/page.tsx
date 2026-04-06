"use client";

import { UploadZone } from "@/components/upload/UploadZone";
import { CodePanel } from "@/components/code-panel/CodePanel";

export default function DashboardPage() {
  return (
    <div className="h-full w-full flex">
      {/* Left Side: Upload / Preview */}
      <div className="flex-1 flex flex-col bg-background relative border-r border-border h-full min-w-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Workspace</h1>
              <p className="text-muted-foreground">Upload Figma screenshots to generate code.</p>
            </div>
            <UploadZone />
          </div>
        </div>
      </div>

      <div className="w-1.5 bg-border shrink-0" />

      {/* Right Side: Code Output */}
      <div className="flex-1 bg-[#0f0f15] h-full flex flex-col min-w-0 overflow-hidden">
        <CodePanel />
      </div>
    </div>
  );
}
