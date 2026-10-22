"use client";

/**
 * DOM-side synchronization hooks.
 *
 * Flow overview:
 *  DOM click -> focusScene(id)            -> store update -> CameraRig tweens
 *  3D click  -> activateScene(id, "3d")   -> SceneScrollBridge scrolls DOM
 *  DOM scroll-> useSceneSectionObserver   -> store update -> CameraRig tweens
 *
 * `suppressScrollSync` (see lib/scene-store) prevents the observer from
 * re-focusing intermediate sections while a programmatic smooth scroll is
 * still settling, which would otherwise move the camera mid-flight.
 */

import { useCallback, useEffect } from "react";
import {
  activateScene,
  clearScrollSyncSuppression,
  getSceneState,
  isScrollSyncSuppressed,
  setChatOpen,
  suppressScrollSync,
  useActiveSceneId,
} from "@/lib/scene-store";
import type { SceneId } from "@/lib/scene-config";

/** Fallback cap in case `scrollend` never fires (instant/legacy scrolling). */
const SCROLL_SUPPRESSION_CAP_MS = 3500;

/**
 * Suppression that self-releases on `scrollend` (Chrome 114+, Firefox 109+)
 * with a generous timeout fallback, so long smooth-scrolls don't flash
 * intermediate sections' observers mid-flight.
 */
export function suppressScrollUntilScrollEnd() {
  const release = () => {
    clearScrollSyncSuppression();
    window.removeEventListener("scrollend", release);
    window.clearTimeout(timer);
  };
  const timer = window.setTimeout(release, SCROLL_SUPPRESSION_CAP_MS);
  window.addEventListener("scrollend", release, { once: true });
  suppressScrollSync(SCROLL_SUPPRESSION_CAP_MS);
}

/** Stable DOM id for the resume section matching a scene anchor. */
export function sceneDomId(id: SceneId): string {
  return `resume-${id.replace(":", "-")}`;
}

/**
 * Focus a section from the resume panel: sets active state on the store
 * (camera rig reacts) and smooth-scrolls the corresponding DOM section
 * under the floating nav.
 */
export function useSceneFocus(reducedMotion: boolean = false) {
  return useCallback(
    (id: SceneId) => {
      activateScene(id, "dom");
      suppressScrollUntilScrollEnd();
      const el = document.getElementById(sceneDomId(id));
      el?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reducedMotion],
  );
}

/**
 * React to 3D clicks: scroll the resume panel to the matching section.
 * Render once near the top of HybridWorkspace.
 */
export function SceneScrollBridge({ enabled = true }: { enabled?: boolean }) {
  const activeId = useActiveSceneId();

  useEffect(() => {
    if (!enabled || !activeId) return;
    // Only scroll when the 3D layer initiated the focus; DOM-initiated
    // focus already scrolled itself in useSceneFocus.
    if (getSceneState().source !== "3d") return;
    if (isScrollSyncSuppressed()) return;

    // The mailbox no longer scrolls: contacting happens in the chat panel.
    if (activeId === "contact") {
      suppressScrollUntilScrollEnd();
      setChatOpen(true, "3d");
      return;
    }

    suppressScrollUntilScrollEnd();
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = document.getElementById(sceneDomId(activeId));
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [activeId, enabled]);

  return null;
}

/**
 * Marks the scene section currently occupying the viewport as active
 * (source "dom"), so reading the panel drives the 3D camera.
 *
 * Threshold semantics (why this looks the way it does):
 *  - IntersectionObserver fires on threshold crossings, but `isIntersecting`
 *    is true for ANY overlap. Checking only that flag made every partially
 *    in-view section fire its callback at least once (mount order! last one
 *    won -> the page opened focused on Skills and kept churning poses).
 *  - Instead we use a narrow mid-viewport band ("reading line"). An element
 *    entering that band IS the section the user is currently reading, and
 *    short rows (project cards) work exactly like tall sections.
 *  - The first delivery per observer is the element's state AT MOUNT, not a
 *    user action: we skip it so the opening camera pose remains the neutral
 *    warehouse overview.
 */
export function useSceneSectionObserver(ref: React.RefObject<HTMLElement | null>, id: SceneId) {
  const activeId = useActiveSceneId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let primed = false; // swallow the initial (mount-time) state delivery
    const observer = new IntersectionObserver(
      (entries) => {
        if (!primed) {
          primed = true;
          return;
        }
        if (isScrollSyncSuppressed()) return;
        if (!entries.some((e) => e.isIntersecting)) return;
        if (activeId === id) return;
        activateScene(id, "dom");
      },
      // "Reading line": only the middle 20% of the viewport counts as "on
      // screen". Works uniformly for tall sections and short project rows,
      // and no longer fires for any 2%-overlap.
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, id, activeId]);
}

