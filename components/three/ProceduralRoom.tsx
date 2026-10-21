"use client";

/**
 * Static room shell + lighting.
 * - Deliberately dark in both color themes: the canvas reads as a
 *   spotlighted "creator's warehouse" vignette next to the paper-like panel.
 * - Accent strips blink via direct material mutation inside useFrame
 *   (single uniform write per frame, zero React re-renders).
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MeshStandardMaterial } from "three";

const ROOM_W = 15;
const ROOM_D = 9.5; // z from -4 .. +5.5 (camera side open)
const WALL_H = 5;

function AccentStrips() {
  const left = useRef<MeshStandardMaterial>(null);
  const right = useRef<MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Gentle in-phase pulse — two uniform writes per frame.
    if (left.current) left.current.emissiveIntensity = 0.55 + Math.sin(t * 0.9) * 0.12;
    if (right.current) right.current.emissiveIntensity = 0.55 + Math.cos(t * 0.9) * 0.12;
  });

  return (
    <group>
      {[
        [-ROOM_W / 2 + 0.06, right],
        [ROOM_W / 2 - 0.06, left],
      ].map(([x, ref], i) => (
        <mesh key={i} position={[x as number, 2.6, -1.5]}>
          <boxGeometry args={[0.05, 0.08, ROOM_D - 2]} />
          <meshStandardMaterial
            ref={ref as React.RefObject<MeshStandardMaterial>}
            color="#00ADB5"
            emissive="#00ADB5"
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ProceduralRoom() {
  return (
    <group>
      {/* floor + blueprint grid (pure GPU, no shadow map) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.75]}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color="#1c2129" roughness={0.85} metalness={0.05} />
      </mesh>
      <gridHelper
        args={[ROOM_W + 6, 44, "#26343b", "#1d262c"]}
        position={[0, 0.02, 0.75]}
      />

      {/* back wall */}
      <mesh position={[0, WALL_H / 2, -4.05]}>
        <boxGeometry args={[ROOM_W, WALL_H, 0.15]} />
        <meshStandardMaterial color="#232830" roughness={0.95} />
      </mesh>

      {/* side walls */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (ROOM_W / 2), WALL_H / 2, 0.75]}>
          <boxGeometry args={[0.15, WALL_H, ROOM_D]} />
          <meshStandardMaterial color="#1e232a" roughness={0.95} />
        </mesh>
      ))}

      {/* ceiling light panels (static emissive — reads as warehouse strip lights) */}
      {[-3.6, 0, 3.6].map((x) => (
        <mesh key={x} position={[x, WALL_H - 0.12, -1.4]}>
          <boxGeometry args={[1.9, 0.05, 0.5]} />
          <meshStandardMaterial
            color="#dfe8ef"
            emissive="#dfe8ef"
            emissiveIntensity={0.75}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* mid-ground props so the near floor is not an empty void */}
      <group position={[5.2, 0, 0.9]} rotation={[0, -0.35, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.8, 0.7, 0.8]} />
          <meshStandardMaterial color="#2a313a" roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.92, 0.06]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.6, 0.45, 0.6]} />
          <meshStandardMaterial color="#343d48" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-5.4, 0, 0.2]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, 0.31, 0]}>
          <boxGeometry args={[0.75, 0.62, 0.75]} />
          <meshStandardMaterial color="#262d36" roughness={0.8} />
        </mesh>
      </group>

      <AccentStrips />

      {/* lighting: warm ambient base + hemisphere fill + key + accents */}
      <ambientLight intensity={0.85} />
      <hemisphereLight intensity={0.4} color="#cfe4f4" groundColor="#14171c" />
      <directionalLight position={[2.5, 6, 5]} intensity={1.35} color="#dfe8ef" />
      <pointLight position={[-3, 2.4, 1.5]} intensity={34} color="#00ADB5" distance={10} decay={2} />
      <pointLight position={[4, 2.2, 1.5]} intensity={26} color="#a78bfa" distance={10} decay={2} />
    </group>
  );
}
