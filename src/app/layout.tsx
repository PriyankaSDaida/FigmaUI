import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Figma to Code AI",
  description: "Generate clean React & Next.js code from Figma screenshots using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="h-full flex overflow-hidden bg-background text-foreground">
        <Sidebar />
        <main className="flex-1 min-w-0 h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
