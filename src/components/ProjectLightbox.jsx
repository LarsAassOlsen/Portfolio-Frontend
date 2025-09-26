import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

export default function ProjectLightbox({ project, onClose }) {
  if (!project) return null;

  const dialogRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);
  const lastFocusedRef = React.useRef(null);

  React.useEffect(() => {
    lastFocusedRef.current = document.activeElement;
    // Focus close button when dialog mounts
    closeBtnRef.current?.focus();
    return () => {
      // Restore focus to the last active element
      lastFocusedRef.current?.focus?.();
    };
  }, []);

  // Focus trap
  React.useEffect(() => {
    function trap(e) {
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, []);

  // Media list
  const rawMedia = React.useMemo(() => {
    if (Array.isArray(project.media) && project.media.length) return project.media;
    const imgs = project?.images?.length ? project.images : [project.thumb].filter(Boolean);
    return (imgs || []).map((src) => ({ type: "image", src }));
  }, [project]);

  const media = React.useMemo(
    () =>
      rawMedia.map((m) =>
        m.type === "image" ? { ...m, src: m.src ? encodeURI(m.src) : m.src } : m
      ),
    [rawMedia]
  );

  const [index, setIndex] = React.useState(0);
  const current = media[index];

  // Scroll lock
  React.useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => (document.documentElement.style.overflow = prev);
  }, []);

  // Keyboard controls
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (!media.length) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % media.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + media.length) % media.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [media, onClose]);

  const goPrev = () => setIndex((i) => (i - 1 + media.length) % media.length);
  const goNext = () => setIndex((i) => (i + 1) % media.length);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="pl-backdrop"
        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
        aria-hidden="true"
      />
      <motion.div
        key="pl-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className="fixed inset-0 z-[9999] grid place-items-center p-4"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="w-[min(96vw,1100px)] max-h-[90vh] overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="min-w-0">
              <h3 id="project-title" className="text-lg font-semibold truncate">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.desc}</p>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:shadow-sm"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Media area */}
          <div className="relative bg-black">
            <div className="aspect-video w-full grid place-items-center">
              {current?.type === "image" && current.src && (
                <img
                  src={current.src}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="max-h-[70vh] w-full object-contain select-none"
                  draggable={false}
                />
              )}

              {current?.type === "youtube" && current.id && (
                <iframe
                  loading="lazy"
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${current.id}?rel=0&modestbranding=1&autoplay=1`}
                  title={current.title || project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}

              {current?.type === "video" && current.src && (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={current.poster}
                  className="max-h-[70vh] w-full object-contain bg-black"
                  src={current.src}
                />
              )}
            </div>

            {media.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border bg-card/90 p-2 hover:shadow"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border bg-card/90 p-2 hover:shadow"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 flex flex-wrap items-center gap-3 border-t">
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((t) => (
                <span key={t} className="text-xs rounded-full border px-2 py-1">{t}</span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:shadow-sm"
                >
                  Live <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:shadow-sm"
                >
                  Code <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Dots */}
          {media.length > 1 && (
            <nav aria-label="Media pagination">
              <div className="flex items-center justify-center gap-2 p-3">
                {media.map((m, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={`${project.title}-${m.type}-${m.src || m.id || i}`}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to item ${i + 1}`}
                      aria-current={active ? "true" : undefined}
                      className={[
                        "h-2.5 w-2.5 rounded-full transition-all duration-200",
                        "border",
                        "border-foreground/40",
                        active
                          ? "bg-primary border-primary ring-2 ring-primary/40 scale-110"
                          : "bg-transparent hover:bg-foreground/20"
                      ].join(" ")}
                    />
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}