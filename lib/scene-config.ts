/**
 * Single source of truth for the hybrid 3D workspace:
 * ids are shared between the DOM resume panel and the R3F scene so the two
 * layers stay loosely coupled (no imports of React components in either).
 */

export type SceneId =
  | "about"
  | "skills"
  | "project:dujas"
  | "project:nextmba"
  | "project:oms"
  | "project:revscout"
  | "contact";

export type SceneSource = "dom" | "3d" | null;

export interface CameraPose {
  /** Camera position */
  position: [number, number, number];
  /** Orbit/lookAt target */
  target: [number, number, number];
  /** Transition hint, seconds */
  duration?: number;
}

export type SceneObjectKind =
  | "monitor"
  | "laptop"
  | "terminal"
  | "poster"
  | "bookshelf"
  | "mailbox";

export interface SceneAnchor {
  id: SceneId;
  /** Human label (also used for aria-live announcements) */
  label: string;
  kind: SceneObjectKind;
  /** World position of the object centre */
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  /** Camera pose used when this anchor is focused */
  pose: CameraPose;
  /** Accent color for the focus ring / emissive highlight */
  color?: string;
}

export const DEFAULT_POSE: CameraPose = {
  // 3/4 hero angle: desk, shelf and screens all visible, floor grid gives depth
  position: [4.6, 2.7, 6.8],
  target: [-0.6, 1.15, -2.0],
};

export const INTRO_POSE: CameraPose = {
  // high establishing sweep that settles into DEFAULT_POSE
  position: [1.5, 4.6, 10.2],
  target: [0, 1.0, -1.6],
};

/**
 * Room footprint: 14 wide (x -7..7), depth 5 (z -4 back wall .. +1 front).
 * Anchors hug the back/side walls so the default camera sees a clean
 * "creator's warehouse" sightline with no object occlusion.
 */
export const SCENE_ANCHORS: SceneAnchor[] = [
  {
    id: "about",
    label: "Standing desk — who I am",
    kind: "monitor",
    position: [-2.4, 1.05, -2.6],
    rotation: [0, 0.35, 0],
    color: "#00ADB5",
    pose: { position: [-1.6, 1.5, -0.6], target: [-2.4, 1.1, -2.7], duration: 1.1 },
  },
  {
    id: "skills",
    label: "Skills shelf",
    kind: "bookshelf",
    position: [2.6, 1.0, -3.2],
    color: "#e8b04b",
    pose: { position: [2.0, 1.55, -1.1], target: [2.6, 1.05, -3.3], duration: 1.1 },
  },
  {
    id: "project:dujas",
    label: "Dujas Cleaning — client terminal",
    kind: "terminal",
    position: [-4.9, 1.05, -2.0],
    rotation: [0, 0.9, 0],
    color: "#38bdf8",
    pose: { position: [-3.9, 1.5, -0.5], target: [-5.0, 1.1, -2.1], duration: 1.2 },
  },
  {
    id: "project:nextmba",
    label: "NEXT MBA — admin workstation",
    kind: "laptop",
    position: [4.7, 0.95, -2.4],
    rotation: [0, -0.85, 0],
    color: "#a78bfa",
    pose: { position: [3.7, 1.45, -0.9], target: [4.8, 1.0, -2.5], duration: 1.2 },
  },
  {
    id: "project:oms",
    label: "OMS G-Rocket — poster wall",
    kind: "poster",
    position: [0.1, 1.75, -3.85],
    scale: 1,
    color: "#f472b6",
    pose: { position: [0.1, 1.75, -1.9], target: [0.1, 1.8, -4.0], duration: 1.2 },
  },
  {
    id: "project:revscout",
    label: "RevScout — AR crates",
    kind: "terminal",
    position: [5.9, 1.0, -1.4],
    rotation: [0, -1.15, 0],
    scale: 0.9,
    color: "#fb923c",
    pose: { position: [4.9, 1.5, -0.3], target: [6.0, 1.05, -1.5], duration: 1.2 },
  },
  {
    id: "contact",
    label: "Mail slot — say hello",
    kind: "mailbox",
    position: [0.9, 0.95, -2.9],
    color: "#f87171",
    pose: { position: [1.6, 1.35, -1.5], target: [0.9, 1.0, -3.0], duration: 1.1 },
  },
];

export function getAnchor(id: SceneId): SceneAnchor | undefined {
  return SCENE_ANCHORS.find((a) => a.id === id);
}

export function getAnchorPose(id: SceneId | null): CameraPose {
  if (!id) return DEFAULT_POSE;
  return getAnchor(id)?.pose ?? DEFAULT_POSE;
}
