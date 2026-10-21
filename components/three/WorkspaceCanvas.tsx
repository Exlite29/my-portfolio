"use client";

/**
 * WorkspaceCanvas — R3F root.
 *
 * Performance decisions:
 * - `frameloop` is gated by (in viewport) AND (tab visible); when either is
 *   false the RAF loop stops completely instead of just skipping work.
 * - `dpr` capped at 1.75 and `powerPreference: high-performance`.
 * - `resize={{ scroll: false }}` avoids ResizeObserver churn while the
 *   page scrolls.
 * - `touch-action: pan-y` so page scroll still works when a finger rests on
 *   the canvas (mobile split layout).
 * - Accessibility: the canvas is decorative-interactive; a live region
 *   announces focus changes for screen readers, and every anchored object
 *   has an equivalent DOM control in the resume panel.
 */

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { ProceduralRoom } from "./ProceduralRoom";
import { SceneObjects } from "./SceneObjects";
import { INTRO_POSE } from "@/lib/scene-config";
import { deactivateScene, useSceneField } from "@/lib/scene-store";
import { getAnchor } from "@/lib/scene-config";

function SceneAnnouncer() {
  const activeId = useSceneField("activeId");
  return (
    // Rendered OUTSIDE the a11y-hidden canvas wrapper by parent; harmless here.
    <span className="sr-only" role="status" aria-live="polite">
      {activeId ? `${getAnchor(activeId)?.label ?? activeId} focused` : "Workspace overview"}
    </span>
  );
}

export function WorkspaceCanvas({ inView }: { inView: boolean }) {
  const [tabVisible, setTabVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      className="relative h-full w-full"
      role="img"
      aria-label="Interactive 3D workspace scene mirroring the resume sections"
    >
      {/* live region for SR users, kept out of the aria-hidden subtree */}
      <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <SceneAnnouncer />
      </div>

      <Canvas
        frameloop={inView && tabVisible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        resize={{ scroll: false }}
        camera={{
          fov: 50,
          near: 0.3,
          far: 45,
          position: INTRO_POSE.position,
        }}
        style={{ touchAction: "pan-y" }}
        onPointerMissed={() => deactivateScene("3d")}
      >
        <color attach="background" args={["#0b0e12"]} />
        <fog attach="fog" args={["#0b0e12", 9, 28]} />

        <ProceduralRoom />
        <SceneObjects />
        <CameraRig reducedMotion={!!reducedMotion} />
      </Canvas>
    </div>
  );
}
