"use client";

/**
 * Procedural anchor objects for the workspace room.
 * Each object:
 *  - reads focus state from the scene store (tiny leaf re-renders only)
 *  - flips the global pointer cursor on hover
 *  - activates itself (source "3d") on click — the DOM bridge handles the scroll
 *
 * Swap-in note for GLTF: replace the kind-switch bodies with <useGLTF> nodes
 * keyed by the same `SceneAnchor.id`; the store, camera poses and DOM layer
 * stay untouched.
 */

import { Fragment, useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import {
  activateScene,
  hoverScene,
  useSceneField,
} from "@/lib/scene-store";
import { SCENE_ANCHORS, type SceneAnchor } from "@/lib/scene-config";

const ACTIVE_EMISSIVE = 0.95;
const IDLE_EMISSIVE = 0.4;

function usePointerFeedback() {
  return useMemo(
    () => ({
      over: () => {
        document.body.style.cursor = "pointer";
      },
      out: () => {
        document.body.style.cursor = "";
      },
    }),
    [],
  );
}

/* ------------------------------- objects ------------------------------- */

function Desk({ w = 1.7, d = 0.8, h = 0.78 }: { w?: number; d?: number; h?: number }) {
  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[w, 0.06, d]} />
        <meshStandardMaterial color="#2b3038" roughness={0.6} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (w / 2 - 0.08), h / 2, 0]}>
          <boxGeometry args={[0.07, h, d * 0.7]} />
          <meshStandardMaterial color="#1c2026" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function MonitorScreen({
  active,
  color,
  size = [1.15, 0.68] as [number, number],
  tilt = 0,
}: {
  active: boolean;
  color: string;
  size?: [number, number];
  tilt?: number;
}) {
  return (
    <group rotation={[0, tilt, 0]}>
      <mesh>
        <boxGeometry args={[size[0] + 0.05, size[1] + 0.05, 0.06]} />
        <meshStandardMaterial color="#101216" roughness={0.35} />
      </mesh>
      {/* Screen surface — emissive reacts to focus, no re-mount */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          color={active ? color : "#0d1117"}
          emissive={color}
          emissiveIntensity={active ? ACTIVE_EMISSIVE : IDLE_EMISSIVE}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function MonitorObject({ anchor, active }: { anchor: SceneAnchor; active: boolean }) {
  const [x, y, z] = anchor.position;
  const accent = anchor.color ?? "#00ADB5";
  return (
    <group position={[x, y, z]} rotation={anchor.rotation ?? [0, 0, 0]}>
      <Desk />
      <group position={[0, 1.02, -0.05]}>
        {/* stand */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 0.24, 16]} />
          <meshStandardMaterial color="#1c2026" />
        </mesh>
        <MonitorScreen active={active} color={accent} />
      </group>
    </group>
  );
}

function LaptopObject({ anchor, active }: { anchor: SceneAnchor; active: boolean }) {
  const [x, y, z] = anchor.position;
  const accent = anchor.color ?? "#00ADB5";
  return (
    <group position={[x, y, z]} rotation={anchor.rotation ?? [0, 0, 0]}>
      <Desk w={1.5} d={0.75} />
      {/* base */}
      <mesh position={[0, 0.85, 0.05]}>
        <boxGeometry args={[0.95, 0.03, 0.62]} />
        <meshStandardMaterial color="#20242b" roughness={0.4} />
      </mesh>
      {/* tilted lid with screen */}
      <group position={[0, 0.87, -0.27]} rotation={[-0.42, 0, 0]}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.95, 0.62, 0.03]} />
          <meshStandardMaterial color="#20242b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.22, 0.02]}>
          <planeGeometry args={[0.78, 0.45]} />
          <meshStandardMaterial
            color={active ? accent : "#0d1117"}
            emissive={accent}
            emissiveIntensity={active ? ACTIVE_EMISSIVE : IDLE_EMISSIVE}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function TerminalObject({ anchor, active }: { anchor: SceneAnchor; active: boolean }) {
  const [x, y, z] = anchor.position;
  const accent = anchor.color ?? "#00ADB5";
  const s = anchor.scale ?? 1;
  return (
    <group position={[x, y, z]} rotation={anchor.rotation ?? [0, 0, 0]} scale={s}>
      <Desk w={1.4} d={0.7} />
      {/* CRT shell */}
      <group position={[0, 1.0, -0.03]}>
        <mesh>
          <boxGeometry args={[0.98, 0.7, 0.5]} />
          <meshStandardMaterial color="#262b33" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.78, 0.5, 0.04]} />
          <meshStandardMaterial color="#0b0e12" />
        </mesh>
        <mesh position={[0, 0, 0.285]}>
          <planeGeometry args={[0.7, 0.44]} />
          <meshStandardMaterial
            color={active ? accent : "#0d1117"}
            emissive={accent}
            emissiveIntensity={active ? ACTIVE_EMISSIVE : IDLE_EMISSIVE}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function BookshelfObject({ anchor, active }: { anchor: SceneAnchor; active: boolean }) {
  const accent = anchor.color ?? "#e8b04b";
  const [x, y, z] = anchor.position;
  const BOOK_COLORS = ["#00ADB5", "#e8b04b", "#f472b6", "#a78bfa", "#38bdf8", "#f87171"];

  const shelves = useMemo(() => [0.18, 0.72, 1.26], []);

  return (
    <group position={[x, y - 1.0, z]}>
      {/* frame */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[1.7, 2.0, 0.5]} />
        <meshStandardMaterial color={active ? accent : "#23272f"} roughness={0.75} />
      </mesh>
      {shelves.map((sy, si) => (
        <Fragment key={sy}>
          <mesh position={[0, sy, 0.06]}>
            <boxGeometry args={[1.5, 0.04, 0.4]} />
            <meshStandardMaterial color="#31363f" roughness={0.8} />
          </mesh>
          {/* books: deterministic pseudo-random rows */}
          {Array.from({ length: 11 }, (_, bi) => {
            const seed = (si * 31 + bi * 7) % BOOK_COLORS.length;
            return (
              <mesh
                key={bi}
                position={[0.64 - bi * 0.12, sy + 0.11, 0.08]}
              >
                <boxGeometry args={[0.055, 0.18, 0.3]} />
                <meshStandardMaterial
                  color={BOOK_COLORS[seed]}
                  roughness={0.5}
                  emissive={active ? BOOK_COLORS[seed] : "#000000"}
                  emissiveIntensity={active ? 0.5 : 0}
                />
              </mesh>
            );
          })}
        </Fragment>
      ))}
    </group>
  );
}

function PosterObject({ anchor, active }: { anchor: SceneAnchor; active: boolean }) {
  const accent = anchor.color ?? "#f472b6";
  const [x, y, z] = anchor.position;
  return (
    <group position={[x, y, z]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 0.78 - 0.78, 0, 0]}>
          <boxGeometry args={[0.62, 0.85, 0.04]} />
          <meshStandardMaterial
            color={active ? accent : "#181c22"}
            roughness={0.6}
          />
        </mesh>
      ))}
      {/* thin emissive center strip = faux artwork glow */}
      <mesh position={[0, 0.35, 0.025]}>
        <planeGeometry args={[2.4, 0.12]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? ACTIVE_EMISSIVE : IDLE_EMISSIVE}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function MailboxObject({ anchor, active }: { anchor: SceneAnchor; active: boolean }) {
  const accent = anchor.color ?? "#f87171";
  const [x, y, z] = anchor.position;
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.55, 0.7, 0.35]} />
        <meshStandardMaterial
          color={active ? accent : "#37414d"}
          roughness={0.5}
          emissive={accent}
          emissiveIntensity={active ? 0.35 : 0}
        />
      </mesh>
      {/* mail slot */}
      <mesh position={[0, 0.05, 0.18]}>
        <boxGeometry args={[0.34, 0.05, 0.02]} />
        <meshStandardMaterial color="#0b0e12" />
      </mesh>
      {/* raised flag when focused */}
      <mesh position={[0.2, active ? 0.52 : 0.3, 0.1]} rotation={[0, 0, active ? 0.7 : 0]}>
        <boxGeometry args={[0.05, 0.3, 0.02]} />
        <meshStandardMaterial color="#f87171" emissive="#f87171" emissiveIntensity={active ? 0.6 : 0.05} />
      </mesh>
    </group>
  );
}

const KIND_COMPONENTS = {
  monitor: MonitorObject,
  laptop: LaptopObject,
  terminal: TerminalObject,
  poster: PosterObject,
  bookshelf: BookshelfObject,
  mailbox: MailboxObject,
} as const;

/* --------------------------- interactive shell -------------------------- */

function InteractiveAnchor({ anchor }: { anchor: SceneAnchor }) {
  const fx = usePointerFeedback();
  const Kind = KIND_COMPONENTS[anchor.kind];

  const active = useSceneField("activeId") === anchor.id;
  const hovered = useSceneField("hoverId") === anchor.id;

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hoverScene(anchor.id);
    fx.over();
  };
  const onOut = () => {
    hoverScene(null);
    fx.out();
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // 3D-initiated focus; the DOM bridge scrolls the matching section.
    activateScene(anchor.id, "3d");
  };

  return (
    <group onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}>
      <Kind anchor={anchor} active={active || hovered} />
    </group>
  );
}

/* ------------------------------- exported ------------------------------ */

export function SceneObjects() {
  return (
    <group>
      {SCENE_ANCHORS.map((anchor) => (
        <InteractiveAnchor key={anchor.id} anchor={anchor} />
      ))}
    </group>
  );
}
