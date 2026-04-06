import Link from "next/link";
import { Copy, Download, FolderGit2, GalleryVerticalEnd, Layers, LayoutTemplate, Settings2, Code2 } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
          <GalleryVerticalEnd size={20} className="text-primary" />
        </div>
        <span className="font-semibold text-lg tracking-tight">FigmaToCode</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-6">
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Workspace</p>
          <NavItem href="/" icon={<LayoutTemplate size={18} />} label="Editor" active />
          <NavItem href="#" icon={<Layers size={18} />} label="Components" />
          <NavItem href="#" icon={<Code2 size={18} />} label="Tokens" />
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent Projects</p>
          <NavItem href="#" icon={<FolderGit2 size={18} />} label="Landing Page" />
          <NavItem href="#" icon={<FolderGit2 size={18} />} label="Auth Screens" />
          <NavItem href="#" icon={<FolderGit2 size={18} />} label="Dashboard UI" />
        </div>
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <NavItem href="#" icon={<Settings2 size={18} />} label="Settings" />
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
