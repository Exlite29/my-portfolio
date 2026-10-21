"use client";

/**
 * ContactLauncher — fixed bottom-right chat launcher (replaces the inline
 * contact section).
 *
 * - Pure-CSS idle nudge (no JS animation loops; OPTIMIZATION_NOTES.md).
 * - Chat JS never loads until first open (dynamic + ssr:false).
 * - Store-driven: the 3D mailbox can open the chat from the scene via
 *   setChatOpen(true, "3d"); same-source dedupe prevents echo loops.
 */

import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";
import { setChatOpen, getSceneState, useSceneField } from "@/lib/scene-store";
import { useOutsideClick } from "@/hooks/use-outside-click";

const ContactChatPanel = dynamic(
  () => import("@/components/contact/ContactChatPanel").then((m) => m.ContactChatPanel),
  { ssr: false },
);

export function ContactLauncher() {
  const chatOpen = useSceneField("chatOpen");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setChatOpen(false, "dom");
    launcherRef.current?.focus(); // restore focus to the trigger
  }, []);

  const open = useCallback(() => {
    setChatOpen(true, "dom");
  }, []);

  // Click outside the launcher/panel pair closes the chat (the wrapper ref
  // includes the FAB so its own toggle click is unaffected). The state check
  // keeps a plain outside click (chat already closed) from stealing focus.
  useOutsideClick(wrapperRef, useCallback(() => {
    if (!getSceneState().chatOpen) return;
    close();
  }, [close]));

  return (
    <div ref={wrapperRef} className="fixed bottom-5 right-5 z-50" data-testid="contact-launcher">
      {/* Chat JS only imports on first open: AnimatePresence mounts its child
          exclusively while `chatOpen` is true. */}
      <AnimatePresence>{chatOpen && <ContactChatPanel onClose={close} />}</AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={chatOpen ? close : open}
        aria-expanded={chatOpen}
        aria-haspopup="dialog"
        aria-label={chatOpen ? "Close chat" : "Open chat"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00ADB5] text-white shadow-lg shadow-[#00ADB5]/25 transition-all duration-200 hover:scale-105 hover:bg-[#009fae] hover:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ADB5] active:scale-95 motion-safe:animate-nudge"
      >
        <FiMessageSquare aria-hidden className="h-6 w-6" />
      </button>
    </div>
  );
}
