"use client";

/**
 * HybridWorkspace — the split-screen homepage section.
 *
 * Layout
 *  - lg+: left column is a STICKY full-height 3D workspace; right column is
 *    the scrolling resume panel.
 *  - < lg: the workspace is a 46vh banner on top; panel scrolls underneath.
 *
 * The two halves share zero component code — they communicate exclusively
 * through lib/scene-store, which keeps the canvas free of DOM imports and
 * vice versa.
 */

import { useEffect } from "react";
import { ScenePanel } from "./ScenePanel";
import { ResumePanel } from "./ResumePanel";
import { deactivateScene, isScrollSyncSuppressed, suppressScrollSync } from "@/lib/scene-store";

export function HybridWorkspace() {
  // Esc: release an explicit selection; camera ownership returns to the
  // scroll observers. Only acts on 3D-initiated focus so it never scrolls DOM.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isScrollSyncSuppressed()) return;
      deactivateScene("3d");
      suppressScrollSync(400);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="home"
      className="grid w-full grid-cols-1 lg:grid-cols-[1.05fr_1fr]"
    >
      {/* 3D half — sticky on desktop so text scrolls while the room holds still */}
      <div className="lg:sticky lg:top-0 lg:h-screen">
        <ScenePanel />
      </div>

      {/* resume half */}
      <div className="w-full lg:min-h-screen">
        <ResumePanel />
      </div>
    </section>
  );
}
