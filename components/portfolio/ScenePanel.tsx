"use client";

/**
 * ScenePanel — owns WHEN the 3D chunk exists at all.
 * - `next/dynamic` + IntersectionObserver: the R3F bundle is only fetched
 *   once the panel is within ~256px of the viewport; until then a pure-CSS
 *   skeleton renders (no JS cost).
 * - Reports `inView` so the canvas can fully stop its RAF loop offscreen.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const WorkspaceCanvas = dynamic(
  () => import("@/components/three/WorkspaceCanvas").then((m) => m.WorkspaceCanvas),
  {
    ssr: false,
    loading: () => <SceneSkeleton />,
  },
);

function SceneSkeleton() {
  return (
    <div className="h-full w-full animate-pulse bg-[radial-gradient(ellipse_at_center,#10151b_0%,#0b0e12_70%)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-neutral-500">Preparing workspace…</p>
      </div>
    </div>
  );
}

export function ScenePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // One observer, two jobs: bundle trigger (sticky) + frameloop gate (live).
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "256px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[46vh] w-full overflow-hidden lg:h-screen"
      data-testid="scene-panel"
    >
      {shouldLoad ? (
        <WorkspaceCanvas inView={inView} />
      ) : (
        <SceneSkeleton />
      )}

      {/* affordance hint (hidden for reduced-motion users) */}
      {!reducedMotion && (
        <p className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 text-center text-xs text-neutral-500">
          Click a terminal or shelf to open matching work
        </p>
      )}
    </div>
  );
}
