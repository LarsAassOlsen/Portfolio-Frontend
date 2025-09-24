import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectsSection({ onSelect }) {
  return (
    <section id="projects" className="py-20 lg:py-28 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Selected projects</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Click to view images from projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div
                className="h-full cursor-pointer group rounded-2xl border shadow-sm bg-card text-card-foreground"
                role="button"
                tabIndex={0}
                onClick={() => requestAnimationFrame(() => onSelect?.(p))}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect?.(p)}
              >
                <div className="p-5">
                  <div className="aspect-video overflow-hidden rounded-xl bg-muted mb-4 p-2 sm:p-3">
                    {p.thumb ? (
                      <img
                        src={p.thumb}
                        alt={`${p.title} preview`}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-102"
                        draggable={false}
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">
                        No preview
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags?.map((t) => (
                      <span key={t} className="text-xs rounded-full border px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    {p.link && (
                      <a
                        href={p.link}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:shadow-sm"
                      >
                        Live <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:shadow-sm"
                      >
                        Code <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}