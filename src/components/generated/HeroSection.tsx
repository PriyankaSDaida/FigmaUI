export default function HeroSection() {
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
