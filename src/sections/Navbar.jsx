import React from "react";
import { Moon, Sun, ChevronRight } from "lucide-react";
import { site } from "../data/site";

const Container = ({ className = "", children }) => (
  <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const IconButton = ({ onClick, icon: Icon, label }) => (
  <button
    aria-label={label}
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm border-0 bg-muted hover:bg-muted/80 transition"
    title={label}
  >
    <span className="sr-only">{label}</span>
    <Icon className="h-4 w-4" />
  </button>
);

export default function NavbarSection({ isDark, onToggleTheme, navItems = [] }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-extrabold tracking-tight text-lg">
          {site.domain}
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-primary transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <IconButton
            onClick={onToggleTheme}
            icon={isDark ? Sun : Moon}
            label="Toggle theme"
          />
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm font-medium">
            Say hi <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </header>
  );
}