import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronRight } from "lucide-react";
import { site } from "../data/site";

const Button = ({ href, children, className = "", icon: Icon }) => {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm border hover:shadow-md transition ${className}`}
    >
      {children}
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </a>
  );
};

export default function HeroSection({ imgSrc }) {
  return (
    <section id="home" className="relative overflow-hidden scroll-mt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 py-20 lg:py-28 items-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Hello, I'm</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {site.name}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Backend developer with frontend and game development experience.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href="#projects" className="bg-primary text-primary-foreground border-primary hover:opacity-90" icon={ChevronRight}>
              View Projects
            </Button>
            <Button href="#contact" className="bg-transparent" icon={Mail}>
              Contact Me
            </Button>
            <Button href={site.social.github} className="bg-transparent" icon={Github}>
              GitHub
            </Button>
            <Button href={site.social.linkedin} className="bg-transparent" icon={Linkedin}>
              LinkedIn
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative aspect-[4/3] rounded-3xl border shadow-sm overflow-hidden">
            <img src={imgSrc} alt={`${site.name} — portfolio hero`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}