import React from "react";
import { site } from "../data/site";

export default function ContactSection({
    formEndpoint = "https://formspree.io/f/mvgwpdoo",
    eyebrow = "Contact",
    title = "Let's make something",
    subtitle = "Drop a note — I'll get back to you.",
}) {
    const [submitStatus, setSubmitStatus] = React.useState("idle");
    const [submitError, setSubmitError] = React.useState("");

    async function handleSubmit(e) {
    e.preventDefault();
    setSubmitStatus("sending");
    setSubmitError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
        const res = await fetch(formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        });

        if (res.ok) {
        form.reset();
        setSubmitStatus("success");
        } else {
        const json = await res.json().catch(() => ({}));
        setSubmitError(json?.errors?.[0]?.message || "Something went wrong. Please try again.");
        setSubmitStatus("error");
        }
        } catch (err) {
            setSubmitError(err?.message || "Network error. Please try again.");
            setSubmitStatus("error");
        }
    }


  return (
    <section id="contact" className="py-20 lg:py-28 border-t">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="rounded-2xl border shadow-sm bg-card text-card-foreground">
          <form onSubmit={handleSubmit} className="p-6 grid md:grid-cols-2 gap-4">
            <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" />
            <input type="hidden" name="subject" value={`New message from ${site.domain}`} />
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                id="name"
                name="name"
                required
                className="rounded-xl border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Name"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-xl border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email"
              />
            </div>

            <div className="md:col-span-2 grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="rounded-xl border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between">
              <p className="text-xs text-muted-foreground"></p>
              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm border bg-primary text-primary-foreground border-primary hover:opacity-90 disabled:opacity-60"
              >
                {submitStatus === "sending" ? "Sending..." : "Send"}
              </button>
            </div>

            <div className="md:col-span-2">
              {submitStatus === "success" && (
                <p className="text-sm text-green-600">Thanks! Your message has been sent.</p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-red-600">Couldn’t send message: {submitError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}