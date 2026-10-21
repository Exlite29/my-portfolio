"use client";

/**
 * Footer — "loading dock": ties the page end into the workspace story.
 *
 * Deliberately framer-motion-free (OPTIMIZATION_NOTES.md): entrance/hover
 * states are pure CSS transitions; the only animations are core utilities
 * (animate-ping availability dot), all motion-safe prefixed.
 *
 * Scene coupling (same store as the nav/camera):
 *  - Explore + logo-blueprint links drive the camera like FloatingNav does.
 *  - "Open chat" and the contact column open the chat launcher.
 *  - Back-to-top resets to the neutral warehouse overview.
 */

import { useCallback } from "react";
import { FiArrowUp, FiMessageSquare } from "react-icons/fi";
import { socialLinks as socialLinkData } from "@/data/socialLinks";
import {
  activateScene,
  deactivateScene,
  setChatOpen,
} from "@/lib/scene-store";
import { suppressScrollUntilScrollEnd } from "@/hooks/use-scene-sync";

const prefersReducedScroll = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToTopSmooth() {
  window.scrollTo({ top: 0, behavior: prefersReducedScroll() ? "auto" : "smooth" });
}

/** Section link whose click mirrors FloatingNav's store-driven behavior. */
function SectionLink({
  label,
  onClick,
  className = "",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-fit text-sm text-neutral-400 transition-colors duration-200 hover:text-[#00ADB5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ADB5] ${className}`}
    >
      {label}
    </button>
  );
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const goHome = useCallback(() => {
    suppressScrollUntilScrollEnd();
    scrollToTopSmooth();
    deactivateScene("dom");
  }, []);

  const goSection = useCallback((sectionId: "about" | "skills") => {
    suppressScrollUntilScrollEnd();
    // Scroll under the floating nav, mirroring FloatingNav offsets.
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: prefersReducedScroll() ? "auto" : "smooth" });
    }
    activateScene(sectionId, "dom");
  }, []);

  const goProjects = useCallback(() => {
    suppressScrollUntilScrollEnd();
    const el = document.getElementById("projects");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: prefersReducedScroll() ? "auto" : "smooth" });
    }
    activateScene("project:dujas", "dom");
  }, []);

  const openChat = useCallback(() => setChatOpen(true, "dom"), []);

  return (
    <footer className="bg-[#11161d] text-neutral-400 dark:bg-[#11161d]">
      {/* hairline echoing the scene's wall accent strips */}
      <div
        aria-hidden
        className="h-px bg-gradient-to-r from-transparent via-[#00ADB5]/60 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10">
        <nav
          aria-label="Footer"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.2fr]"
        >
          {/* identity + availability */}
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">Ariel Agdon</p>
            <p className="mt-0.5 text-sm">Jr. Front End Developer</p>
            <span
              aria-label="Available for opportunities"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#00ADB5]/30 bg-[#00ADB5]/5 px-3 py-1 text-xs text-[#00ADB5]"
            >
              <span className="relative flex h-2 w-2">
                <span
                  aria-hidden
                  className="absolute inline-flex h-full w-full rounded-full bg-[#00ADB5] opacity-60 motion-safe:animate-ping"
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ADB5]" />
              </span>
              Open to opportunities
            </span>
          </div>

          {/* explore */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Explore
            </p>
            <div className="flex flex-col items-start gap-2">
              <SectionLink label="Home" onClick={goHome} />
              <SectionLink label="About" onClick={() => goSection("about")} />
              <SectionLink label="Skills" onClick={() => goSection("skills")} />
              <SectionLink label="Projects" onClick={goProjects} />
            </div>
          </div>

          {/* get in touch */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Get in touch
            </p>
            <div className="flex flex-col items-start gap-2">
              {socialLinkData.map(({ id, href, icon: Icon, label }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-[#00ADB5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ADB5]"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={openChat}
                aria-haspopup="dialog"
                className="flex w-fit items-center gap-2 rounded-md border border-[#00ADB5]/40 px-3 py-1.5 text-sm text-[#00ADB5] transition-colors duration-200 hover:bg-[#00ADB5]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ADB5]"
              >
                <FiMessageSquare aria-hidden className="h-4 w-4" />
                Open chat
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-4 text-xs text-neutral-600 sm:flex-row sm:px-10">
          <p>&copy; {currentYear} Ariel Agdon. All rights reserved.</p>
          <p className="hidden sm:block">Built with Next.js · Three.js · Tailwind</p>
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-1.5 text-neutral-400 transition-colors duration-200 hover:text-[#00ADB5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ADB5]"
          >
            Back to top
            <FiArrowUp aria-hidden className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
