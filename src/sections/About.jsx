import React from "react";
import { about } from "../data/about";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 scroll-mt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          {about.eyebrow && (
            <p className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">
              {about.eyebrow}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{about.title}</h2>
          {about.subtitle && (
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{about.subtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {about.stack?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {about.stack.map((t) => (
              <span key={t} className="text-xs rounded-full border px-2 py-1">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}