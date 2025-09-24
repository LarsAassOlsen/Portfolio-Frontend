import React from "react";
import { skills } from "../data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">
            Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Skills &amp; tools</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Mix and match to fit your stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((s) => (
            <div key={s.title} className="rounded-2xl border shadow-sm bg-card text-card-foreground">
              <div className="p-5">
                <h4 className="font-semibold">{s.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{s.items.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}