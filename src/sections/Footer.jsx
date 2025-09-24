import React from "react";
import { site } from "../data/site";

const Container = ({ className = "", children }) => (
  <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function FooterSection() {
  const year = React.useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="py-10 border-t">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {year} {site.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            className="hover:text-primary"
            href={site.social.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a
            className="hover:text-primary"
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a className="hover:text-primary" href={`mailto:${site.email}`}>
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}