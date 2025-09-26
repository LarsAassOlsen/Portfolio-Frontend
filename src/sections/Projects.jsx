import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Play } from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectsSection({ onSelect }) {
  return (
    <section id="projects" className="py-20 lg:py-28 border-t scroll-mt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Selected projects</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Click a card to view images or video.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const hasVideo =
              Array.isArray(p.media) &&
              p.media.some((m) => m.type === "youtube" || m.type === "video");

            const fit =
              p.thumbFit === "cover"
                ? "h-full w-full object-cover"
                : "max-h-full max-w-full object-contain";

            return (
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
                  aria-label={`Open project: ${p.title}`}
                  onClick={() => requestAnimationFrame(() => onSelect?.(p))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSelect?.(p);
                    if (e.key === " ") { e.preventDefault(); onSelect?.(p); }
                  }}
                >
                  <div className="p-5">
                    <div className="relative aspect-video rounded-xl bg-muted mb-4 overflow-hidden p-2 sm:p-3 flex items-center justify-center">
                      {p.thumb ? (
                        <img
                          src={p.thumb}
                          alt={`${p.title} preview`}
                          className={`block ${fit} origin-center transition-transform duration-300 group-hover:scale-[1.01]`}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">
                          No preview
                        </div>
                      )}

                      {hasVideo && (
                        <div className="pointer-events-none absolute inset-0 grid place-items-center">
                          <div className="rounded-full bg-black/50 p-3">
                            <Play className="h-6 w-6 text-white" />
                          </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}