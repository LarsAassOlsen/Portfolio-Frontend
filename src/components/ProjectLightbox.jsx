import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

export default function ProjectLightbox({ project, onClose }) {
  if (!project) return null;

  const imgs = project?.images?.length ? project.images : [project.thumb].filter(Boolean);
  const images = (imgs || []).map((src) => (src ? encodeURI(src) : src));
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => (document.documentElement.style.overflow = prev);
  }, []);

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (!images.length) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images, onClose]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      />
      <motion.div
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
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="min-w-0">
              <h3 id="project-title" className="text-lg font-semibold truncate">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.desc}</p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:shadow-sm"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Image area */}
          <div className="relative bg-black">
            <div className="aspect-video w-full grid place-items-center">
              {images.length ? (
                <img
                  src={images[index]}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="max-h-[70vh] w-full object-contain select-none"
                  draggable={false}
                />
              ) : (
                <div className="text-muted-foreground">No images provided.</div>
              )}
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border bg-card/90 p-2 hover:shadow"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border bg-card/90 p-2 hover:shadow"
                  aria-label="Next image"
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
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 p-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full border ${i === index ? "bg-foreground" : "bg-transparent"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}