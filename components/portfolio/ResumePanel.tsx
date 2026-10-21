"use client";

/**
 * ResumePanel — the accessible text half of the hybrid layout.
 * Data comes from the SAME sources as the original sections
 * (data/index.tsx, data/skillsData.ts); only the presentation is new.
 *
 * Scene coupling:
 *  - ResumeSection (About / Skills / Contact): click header OR scroll into view.
 *  - ProjectRow: each row individually self-observes, so scrolling through
 *    the project list moves the 3D camera desk-to-desk.
 */

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub, FiMessageSquare } from "react-icons/fi";
import { skillsData } from "@/data/skillsData";
import { projects } from "@/data";
import { hoverScene, setChatOpen, useSceneField } from "@/lib/scene-store";import type { SceneId } from "@/lib/scene-config";
import {
  SceneScrollBridge,
  useSceneFocus,
  useSceneSectionObserver,
} from "@/hooks/use-scene-sync";
import { ResumeSection } from "./ResumeSection";

const ABOUT_TEXT =
  "Hi, I'm Ariel — a passionate Jr. Front End Developer dedicated to turning design ideas into interactive, user-friendly websites. Let's build something amazing together!";

function ProjectRow({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const sceneId = `project:${project.id}` as SceneId;
  const active = useSceneField("activeId") === sceneId;
  const reducedMotion = !!useReducedMotion();
  const focus = useSceneFocus(reducedMotion);

  // Scroll-sync: reading the project list moves the camera between desks.
  useSceneSectionObserver(ref, sceneId);

  return (
    <section
      ref={ref}
      onPointerEnter={() => hoverScene(sceneId)}
      onPointerLeave={() => hoverScene(null)}
      aria-label={project.title}
      className={[
        "scroll-mt-28 rounded-md border-l-2 py-2 pl-3 pr-2 transition-colors duration-200",
        active ? "border-[#00ADB5]" : "border-transparent",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => focus(sceneId)}
        aria-pressed={active}
        className="w-full text-left outline-offset-4 focus-visible:outline"
      >
        <span className="flex items-center justify-between gap-2">
          <span
            className={[
              "font-semibold transition-colors duration-200",
              active ? "text-[#00ADB5]" : "text-gray-900 dark:text-white",
            ].join(" ")}
          >
            {project.title}
          </span>
          <span className="flex shrink-0 items-center gap-2 text-neutral-500">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden="true"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className="transition-colors hover:text-[#00ADB5]"
              >
                <FiGithub className="h-4 w-4" />
              </Link>
            )}
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden="true"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className="transition-colors hover:text-[#00ADB5]"
              >
                <FiExternalLink className="h-4 w-4" />
              </Link>
            )}
          </span>
        </span>
        <span className="mt-1 block text-sm line-clamp-2">{project.description}</span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {(project.technologies ?? []).map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {t}
            </span>
          ))}
        </span>
        <span className="sr-only">Show {project.title} in the 3D scene</span>
      </button>
    </section>
  );
}

/**
 * Contact block in the resume panel — now a chat CTA instead of an inline
 * form. Title click = camera flies to the mailbox (same as every other
 * section); the CTA opens the chat panel itself.
 */
function ChatContactTrigger() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = !!useReducedMotion();
  const active = useSceneField("activeId") === "contact";
  const chatOpen = useSceneField("chatOpen");
  const focus = useSceneFocus(reducedMotion);

  useSceneSectionObserver(ref, "contact");

  return (
    <section
      ref={ref}
      id="resume-contact"
      className={[
        "group relative scroll-mt-24 rounded-lg border-l-2 py-6 pl-4 pr-2 transition-colors duration-300",
        active ? "border-[#00ADB5]" : "border-transparent",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => focus("contact")}
        onPointerEnter={() => hoverScene("contact")}
        onPointerLeave={() => hoverScene(null)}
        aria-pressed={active}
        className="mb-4 flex w-full items-center gap-3 text-left outline-offset-4 focus-visible:outline"
      >
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-white">
          Contact
        </h2>
        <span className="sr-only">Show contact in the 3D scene</span>
      </button>

      <button
        type="button"
        onClick={() => setChatOpen(true, "dom")}
        onPointerEnter={() => hoverScene("contact")}
        onPointerLeave={() => hoverScene(null)}
        aria-expanded={chatOpen}
        className={[
          "flex w-fit items-center gap-2 rounded-md border px-4 py-2 transition-colors duration-200",
          chatOpen
            ? "border-[#00ADB5]/70 text-[#00ADB5]"
            : "border-neutral-200 hover:border-[#00ADB5]/50 hover:text-[#00ADB5] dark:border-neutral-800",
        ].join(" ")}
      >
        <FiMessageSquare aria-hidden className="h-4 w-4" />
        {chatOpen ? "Chat is open" : "Open the chat"}
      </button>
    </section>
  );
}

export function ResumePanel() {
  const reducedMotion = !!useReducedMotion();
  const focusProjects = useSceneFocus(reducedMotion);

  return (
    <div className="relative flex flex-col bg-white px-5 py-10 text-gray-600 dark:bg-[#11161d] dark:text-gray-300 sm:px-10 lg:border-l lg:border-white/5">
      <SceneScrollBridge />

      {/* compact hero (folded into the panel) */}
      <header className="mb-10 max-w-xl">
        <p className="mb-2 text-sm uppercase tracking-widest text-[#00ADB5]">
          Portfolio · 2026
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Resume as a <span className="text-[#00ADB5]">workspace</span>
        </h1>
        <p className="mt-3 text-lg">
          Focus a section here — the 3D room follows. Or click an object in the room — the page follows you.
        </p>
      </header>

      <ResumeSection sceneId="about" htmlId="about" title="About">
        <p className="max-w-xl leading-relaxed">{ABOUT_TEXT}</p>
      </ResumeSection>

      <ResumeSection sceneId="skills" htmlId="skills" title="Skills">
        <div className="max-w-xl space-y-3">
          {(["frontend", "backend", "tools"] as const).map((cat) => (
            <div key={cat}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {cat}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skillsData
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <span
                      key={s.name}
                      title={`${s.name} · ${s.level}`}
                      className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-xs transition-colors hover:border-[#00ADB5]/50 hover:text-[#00ADB5] dark:border-neutral-800"
                    >
                      <span
                        aria-hidden
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ResumeSection>

      {/* projects wrapper: semantic nav target; camera sync happens per row */}
      <section id="projects" className="scroll-mt-24 py-6 pl-4 pr-2">
        <button
          type="button"
          onClick={() => focusProjects("project:dujas")}
          className="mb-4 text-left outline-offset-4 focus-visible:outline"
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Projects
          </h2>
        </button>
        <div className="max-w-xl">
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* NOTE: no htmlId waypoint here — the real contact section below the
          panel owns id="contact" (FloatingNav + "Open the contact form"
          resolve to it). The 3D bridge targets `resume-contact`. */}
      {/* mailbox 3D object opens the chat too; this button continues to chat */}
      <ChatContactTrigger />
    </div>
  );
}

