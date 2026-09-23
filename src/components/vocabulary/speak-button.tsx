"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const isSpeechSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Plays the word with the browser's built-in text-to-speech (no external service).
 * Hidden when the browser doesn't support it.
 */
export function SpeakButton({ text }: { text: string }) {
  const supported = useSyncExternalStore(subscribe, isSpeechSupported, () => false);
  if (!supported) return null;

  function speak() {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={`Listen to “${text}”`}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted transition hover:bg-surface-muted hover:text-accent"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
      </svg>
    </button>
  );
}
