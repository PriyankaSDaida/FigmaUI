"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw, Layout, Code2, MonitorPlay, Palette, Loader2 } from "lucide-react";
import HeroSection from "@/components/generated/HeroSection";
import { useGeneratorStore } from "@/store/useGeneratorStore";

export function CodePanel() {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "components" | "tokens">("code");
  const [framework, setFramework] = useState<"react" | "nextjs">("react");
  const { results, activeResultIndex, status } = useGeneratorStore();

  const generatedCode = results[activeResultIndex]?.code || "// Upload a screenshot and click Generate Code to see the magic happen!";
  const isLoading = status === "loading";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top Header / Actions */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0f0f15]">
        <div className="flex bg-[#1a1a2e] rounded-md p-1 border border-white/5">
          <button 
            onClick={() => setFramework("react")}
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${framework === "react" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"}`}
          >
            React
          </button>
          <button 
            onClick={() => setFramework("nextjs")}
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${framework === "nextjs" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"}`}
          >
            Next.js
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-md transition-colors" title="Regenerate">
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button 
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-md transition-colors" 
            title="Copy Code"
            onClick={() => navigator.clipboard.writeText(generatedCode)}
          >
            <Copy size={18} />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-md transition-colors" title="Download ZIP">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-[#0f0f15] px-4 pt-2 gap-4">
        <TabButton active={activeTab === "preview"} onClick={() => setActiveTab("preview")} icon={<MonitorPlay size={16} />} label="Preview" />
        <TabButton active={activeTab === "code"} onClick={() => setActiveTab("code")} icon={<Code2 size={16} />} label="Code" />
        <TabButton active={activeTab === "components"} onClick={() => setActiveTab("components")} icon={<Layout size={16} />} label="Components" />
        <TabButton active={activeTab === "tokens"} onClick={() => setActiveTab("tokens")} icon={<Palette size={16} />} label="Tokens" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#0f0f15]">
        {activeTab === "code" && (
          isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
              <p>Analyzing design and writing code...</p>
            </div>
          ) : (
            <div className="p-6 h-full overflow-auto text-sm text-gray-300 font-mono">
              <pre><code>{generatedCode}</code></pre>
            </div>
          )
        )}
        {activeTab === "preview" && (
          <div className="h-full w-full bg-background overflow-auto p-4 border border-border/50 rounded-lg shadow-inner m-4 max-w-[calc(100%-2rem)] relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}
            <HeroSection />
          </div>
        )}
        {activeTab === "components" && (
          <div className="p-6 text-muted-foreground">
            Layer tree goes here
          </div>
        )}
        {activeTab === "tokens" && (
          <div className="p-6 text-muted-foreground">
            Extracted design tokens go here
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-colors ${
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
