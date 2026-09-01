import { useEffect, useState } from "react";
import logo from "@/assets/ragamind-logo.png";

const links = [
  { href: "#ragas", label: "Ragas" },
  { href: "#psychology", label: "Psychology" },
  { href: "#research", label: "Research findings" },
  { href: "#medicinal", label: "Medicinal benefits" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 glow-primary" />
            <img
              src={logo}
              alt="Ragamind logo — a veena and lotus inside a soundwave circle"
              width={40}
              height={40}
              className="size-8 object-contain"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Ragamind
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#medicinal"
          className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          Benefits
        </a>
      </div>
    </header>
  );
}
