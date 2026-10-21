"use client";

/**
 * ResumeSection — one scene-coupled DOM block.
 *
 * Wires together all three sync directions:
 *  - click title      -> focus sceneId (camera flies, section scrolls to itself)
 *  - hover            -> previews the 3D object highlight via the shared store
 *  - page scroll      -> IntersectionObserver marks it active (camera follows)
 *
 * Focus/active visuals are pure CSS transitions per OPTIMIZATION_NOTES.md.
 */

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiTarget } from "react-icons/fi";
import { hoverScene, useSceneField } from "@/lib/scene-store";
import { useSceneFocus, useSceneSectionObserver } from "@/hooks/use-scene-sync";
import { sceneDomId } from "@/hooks/use-scene-sync";
import type { SceneId } from "@/lib/scene-config";

interface ResumeSectionProps {
  sceneId: SceneId;
  /** Semantic DOM id for the floating nav (defaults from sceneId) */
  htmlId?: string;
  title: string;
  children: ReactNode;
}

export function ResumeSection({ sceneId, htmlId, title, children }: ResumeSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = !!useReducedMotion();
  const focus = useSceneFocus(reducedMotion);
  const active = useSceneField("activeId") === sceneId;

  // Page-scroll <-> camera sync (suppression guard handles programmatic scrolls)
  useSceneSectionObserver(ref, sceneId);

  return (
    <section
      ref={ref}
      id={sceneDomId(sceneId)}
      className={[
        "relative group scroll-mt-24 rounded-lg border-l-2 py-6 pl-4 pr-2",
        "transition-colors duration-300",
        active ? "border-[#00ADB5]" : "border-transparent",
      ].join(" ")}
    >
      {/* invisible waypoint so the floating nav (#about, #skills, …) scrolls
          to the same block without duplicating DOM ids */}
      {htmlId && <span id={htmlId} aria-hidden className="absolute -top-28" />}
      <button
        type="button"
        onClick={() => focus(sceneId)}
        onPointerEnter={() => hoverScene(sceneId)}
        onPointerLeave={() => hoverScene(null)}
        aria-pressed={active}
        className="mb-4 flex w-full items-center gap-3 text-left outline-offset-4 focus-visible:outline"
      >
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className={[
            "text-2xl font-bold tracking-tight transition-colors duration-300",
            active ? "text-[#00ADB5]" : "text-gray-900 dark:text-white",
          ].join(" ")}
        >
          {title}
        </motion.h2>
        <FiTarget
          aria-hidden="true"
          className={[
            "shrink-0 transition-all duration-300",
            active
              ? "text-[#00ADB5] opacity-100"
              : "text-neutral-400 opacity-0 group-hover:opacity-70",
          ].join(" ")}
        />
        <span className="sr-only">
          {active
            ? "Currently shown in the 3D scene"
            : "Show this in the 3D scene"}
        </span>
      </button>

      <div className="text-gray-600 dark:text-gray-300">{children}</div>
    </section>
  );
}
