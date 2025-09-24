// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Moon, Sun, ChevronRight } from "lucide-react";
import { site } from "./data/site";

import NavbarSection from "./sections/Navbar.jsx";
import HeroSection from "./sections/Hero.jsx";
import AboutSection from "./sections/About.jsx";
import ProjectsSection from "./sections/Projects.jsx";
import SkillsSection from "./sections/Skills.jsx";
import ContactSection from "./sections/Contact.jsx";
import FooterSection from "./sections/Footer.jsx";

import ProjectLightbox from "./components/ProjectLightbox.jsx";
import heroImg from "./assets/hero.jfif";

const Container = ({ className = "", children }) => (
  <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Button = ({ as: Tag = "button", href, children, className = "", icon: Icon, ...props }) => {
  const Comp = href ? "a" : Tag;
  return (
    <Comp
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm border hover:shadow-md transition ${className}`}
      {...props}
    >
      {children}
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </Comp>
  );
};

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);

  // Theme
  const getInitialTheme = () => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  };
  const [dark, setDark] = useState(getInitialTheme);

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Smooth-scroll for same-page anchors
  useEffect(() => {
    const handler = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
      {/* Navbar */}
      <NavbarSection
        isDark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        navItems={navItems}
      />

      {/* Hero */}
      <HeroSection imgSrc={heroImg} />

      {/* About */}
      <AboutSection />

      {/* Projects */}
      <ProjectsSection onSelect={setActiveProject} />

      {/* Skills */}
      <SkillsSection />

      {/* Contact */}
      <ContactSection formEndpoint="https://formspree.io/f/mvgwpdoo" />

      {/* Lightbox */}
      {activeProject && (
        <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      {/* Footer */}
      <FooterSection />
    </div>
  );
}