"use client";

/**
 * ContactChatPanel — the opened chat card.
 *
 * Validation -> sanitizeInput -> POST (CONTACT_ENDPOINT, see types/contact);
 * only the presentation is chat-like: fields are staged as a conversation,
 * and status messages render as bot bubbles. The API contract must stay in
 * sync with app/api/contact/route.ts (same field caps server-side).
 *
 * Loaded dynamically by ContactLauncher — never in the initial bundle.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { socialLinks } from "@/data/socialLinks";
import { FormData, SubmitStatus, initialFormData, initialSubmitStatus, CONTACT_ENDPOINT } from "@/types/contact";
import { sanitizeInput } from "@/utils/form";

const BUBBLE = "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed";
const BOT = `${BUBBLE} mr-auto bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300`;
const FIELD =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-neutral-400 transition-all duration-200 focus:border-[#00ADB5] focus:ring-1 focus:ring-[#00ADB5] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500";

export function ContactChatPanel({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(initialSubmitStatus);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Focus management: enter on the name field, focus stays trapped while
  // open (launcher restores focus on close).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    firstFieldRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Keep the latest status bubble visible.
  useEffect(() => {
    if (submitStatus.message) logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(initialSubmitStatus);

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("All fields are required");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
        }),
      }).catch(() => null);

      if (!response) {
        throw new Error("Network error — check your connection and try again");
      }

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data?.message || "Message sent successfully!",
        });
        setFormData(initialFormData);
      } else {
        throw new Error(data?.message || "Failed to send message");
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later.";
      setSubmitStatus({ success: false, message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Chat with Ariel"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute bottom-16 right-0 flex h-[520px] max-h-[calc(100dvh-6rem)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#0d1117] sm:bottom-20"
    >
      {/* header */}
      <header className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <span aria-hidden className="h-2 w-2 rounded-full bg-[#00ADB5]" />
        <p className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
          Chat with Ariel
          <span className="ml-2 font-normal text-neutral-400">usually replies fast</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-[#00ADB5] dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <FiX className="h-4 w-4" />
        </button>
      </header>

      {/* message log */}
      <div
        ref={logRef}
        className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4"
        aria-live="polite"
      >
        <div className={BOT}>Hey, this is Ariel 👋 Got a project in mind? Drop me a message.</div>

        {submitStatus.message && (
          <div className={submitStatus.success ? BOT : `${BOT} border border-red-300 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300`}>
            {submitStatus.success ? "Message sent ✓ — I'll get back to you soon." : submitStatus.message}
          </div>
        )}

        {submitStatus.success && (
          <div className={`mr-auto flex flex-wrap gap-2 ${BUBBLE} bg-transparent px-0`}>
            {socialLinks.map(({ id, href, icon: Icon, label }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600 transition-colors hover:border-[#00ADB5]/50 hover:text-[#00ADB5] dark:border-neutral-700 dark:text-neutral-300"
              >
                <Icon aria-hidden className="h-3 w-3" />
                {label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* composer (original form contract) */}
      <form onSubmit={handleSubmit} className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <div className="grid gap-2">
          <input
            ref={firstFieldRef}
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            autoComplete="name"
            maxLength={100}
            className={FIELD}
          />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            autoComplete="email"
            maxLength={150}
            className={FIELD}
          />
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message…"
            required
            rows={3}
            maxLength={2000}
            className={FIELD}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#00ADB5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#009fae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ADB5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
