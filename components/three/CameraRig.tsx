"use client";

/**
 * CameraRig — the only camera controller.
 *
 * Design notes (performance-first):
 * - Subscribes to the scene store imperatively; focus changes NEVER re-render
 *   React inside the canvas. All animation lives in one controller.
 * - Tweening uses framer-motion's imperative `animate()` (already in the
 *   bundle) writing into a `useRef` pose; `useFrame` only applies the pose
 *   while the dirty flag is set, so idle frames cost ~zero work.
 * - Retargeting mid-flight captures the *current interpolated* pose, so
 *   rapid clicks never snap or fight a leftover tween.
 * - Honors prefers-reduced-motion: instant jump instead of a tween.
 */

import { animate, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { DEFAULT_POSE, getAnchorPose, INTRO_POSE, type CameraPose } from "@/lib/scene-config";
import { getSceneState, subscribeToScene } from "@/lib/scene-store";

const REST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EPSILON = 0.001;

function poseIsBehind(a: CameraPose, b: CameraPose): boolean {
  const dp = Math.hypot(
    a.position[0] - b.position[0],
    a.position[1] - b.position[1],
    a.position[2] - b.position[2],
  );
  const dt = Math.hypot(
    a.target[0] - b.target[0],
    a.target[1] - b.target[1],
    a.target[2] - b.target[2],
  );
  return dp < EPSILON && dt < EPSILON;
}

export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera);

  const startPose: CameraPose = reducedMotion ? DEFAULT_POSE : INTRO_POSE;
  const pose = useRef<CameraPose>({
    position: [...startPose.position],
    target: [...startPose.target],
  });
  const dirty = useRef(true);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const transitionTo = (next: CameraPose, duration?: number) => {
    if (poseIsBehind(pose.current, next)) return;

    if (reducedMotion) {
      controls.current?.stop();
      pose.current = { position: [...next.position], target: [...next.target] };
      dirty.current = true;
      return;
    }

    const from = { position: [...pose.current.position], target: [...pose.current.target] } as CameraPose;
    const to = { position: [...next.position], target: [...next.target] } as CameraPose;
    controls.current?.stop();

    controls.current = animate(0, 1, {
      duration: duration ?? next.duration ?? 1.25,
      ease: REST_EASE,
      onUpdate: (t) => {
        pose.current = {
          position: [
            from.position[0] + (to.position[0] - from.position[0]) * t,
            from.position[1] + (to.position[1] - from.position[1]) * t,
            from.position[2] + (to.position[2] - from.position[2]) * t,
          ],
          target: [
            from.target[0] + (to.target[0] - from.target[0]) * t,
            from.target[1] + (to.target[1] - from.target[1]) * t,
            from.target[2] + (to.target[2] - from.target[2]) * t,
          ],
        };
        dirty.current = true;
      },
    });
  };

  useEffect(() => {
    const unsub = subscribeToScene(() => {
      const { activeId } = getSceneState();
      transitionTo(getAnchorPose(activeId));
    });

    // Intro sweep: neutral cocked-in camera eases into the resting overview.
    if (!reducedMotion) {
      transitionTo(getAnchorPose(null), 1.8);
    } else {
      pose.current = { position: [...DEFAULT_POSE.position], target: [...DEFAULT_POSE.target] };
      dirty.current = true;
    }

    return () => {
      unsub();
      controls.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useFrame(() => {
    if (!dirty.current) return;
    const { position, target } = pose.current;
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(target[0], target[1], target[2]);
    dirty.current = false;
  });

  return null;
}
