"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw, Layout, Code2, MonitorPlay, Palette } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import HeroSection from "@/components/generated/HeroSection";

export function CodePanel() {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "components" | "tokens">("code");
  const [framework, setFramework] = useState<"react" | "nextjs">("react");

  const mockCode = `export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-b border-border">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Design to Code in Seconds
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Upload your Figma designs and let our AI generate clean, maintainable React and Next.js code tailored to your design system.
            </p>
          </div>
          <div className="space-x-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              Get Started
            </button>
            <button className="border border-border bg-card hover:bg-white/5 text-foreground px-6 py-2 rounded-md font-medium transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

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
            <RefreshCw size={18} />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-md transition-colors" title="Copy Code">
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
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}
            CodeTag="div"
          >
            {mockCode}
          </SyntaxHighlighter>
        )}
        {activeTab === "preview" && (
          <div className="h-full w-full bg-background overflow-auto p-4 border border-border/50 rounded-lg shadow-inner m-4 max-w-[calc(100%-2rem)]">
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
