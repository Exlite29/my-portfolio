"use client";

/**
 * Framework-agnostic scene store (no zustand, no context).
 * - React components subscribe per-field via useSyncExternalStore so an
 *   "activeId" change never re-renders unrelated sections.
 * - The R3F render loop reads state imperatively (getSceneState) or through
 *   a subscribe callback, so camera transitions cause ZERO React re-renders.
 */

import { useCallback, useSyncExternalStore } from "react";
import type { SceneId, SceneSource } from "./scene-config";

export interface SceneState {
  /** Currently focused anchor (null = neutral "warehouse overview" pose) */
  activeId: SceneId | null;
  /** Which layer last triggered focus — used to break DOM <-> 3D loops */
  source: SceneSource;
  /** Hover/preview state (non-essential, may throttle) */
  hoverId: SceneId | null;
  /** Contact chat panel visibility (launcher OR 3D mailbox can trigger it) */
  chatOpen: boolean;
}

const initialState: SceneState = {
  activeId: null,
  source: null,
  hoverId: null,
  chatOpen: false,
};

let state: SceneState = initialState;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function getSceneState(): SceneState {
  return state;
}

function setState(patch: Partial<SceneState>) {
  const next = { ...state, ...patch };
  // Skip notifications when nothing actually changed (redundant clicks, etc.)
  if (
    next.activeId === state.activeId &&
    next.source === state.source &&
    next.hoverId === state.hoverId &&
    next.chatOpen === state.chatOpen
  ) {
    return;
  }
  state = next;
  emit();
}

export function subscribeToScene(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * The single mutation entry point used by BOTH layers.
 * Deduping identical (id, source) pairs prevents the scroll listener and the
 * camera rig from fighting each other.
 */
export function activateScene(id: SceneId, source: SceneSource) {
  if (state.activeId === id && state.source === source) return;
  setState({ activeId: id, source });
}

export function deactivateScene(source: SceneSource) {
  if (state.activeId === null && state.source === null) return;
  setState({ activeId: null, source });
}

export function hoverScene(id: SceneId | null) {
  setState({ hoverId: id });
}

/**
 * Open/close the contact chat panel. `source` works exactly like
 * activateScene's: same-source dedupe prevents the DOM launcher, the 3D
 * mailbox and the panel itself from re-triggering each other.
 */
export function setChatOpen(open: boolean, source: SceneSource) {
  if (state.chatOpen === open && state.source === source) return;
  setState({ chatOpen: open, source });
}

/* ------------------------------------------------------------------ */
/* Programmatic-scroll suppression                                     */
/* ------------------------------------------------------------------ */

/**
 * While the DOM smooth-scrolls to a focused section, IntersectionObserver
 * events fire for intermediate sections. We suppress them so scrolling to
 * "project:nextmba" doesn't blink "project:dujas" (and re-move the camera)
 * while passing it.
 */
let suppressUntil = 0;

export function suppressScrollSync(windowMs = 1200) {
  suppressUntil = Date.now() + windowMs;
}

/** Early release (used by scrollend-based suppression). */
export function clearScrollSyncSuppression() {
  suppressUntil = 0;
}

export function isScrollSyncSuppressed(): boolean {
  return Date.now() < suppressUntil;
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

export function useSceneField<K extends keyof SceneState>(key: K): SceneState[K] {
  const subscribe = useCallback((cb: () => void) => subscribeToScene(cb), []);
  const getSnapshot = useCallback(() => state[key], [key]);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Convenience hook for the DOM resume layer. */
export function useActiveSceneId(): SceneId | null {
  return useSceneField("activeId");
}
