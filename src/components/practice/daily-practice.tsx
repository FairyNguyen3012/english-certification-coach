"use client";

import { useState } from "react";
import type { ConversationMessage, DailyPracticePrompt, PracticeMode } from "@/types/practice";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpeakButton } from "@/components/ui/speak-button";
import { cn } from "@/lib/utils";

const MODES: Array<{ id: PracticeMode; label: string }> = [
  { id: "writing", label: "Type / write" },
  { id: "listening", label: "Listen" },
  { id: "speaking", label: "Speak" },
];

export function DailyPractice({ prompt }: { prompt: DailyPracticePrompt }) {
  const [mode, setMode] = useState<PracticeMode>("writing");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [message, setMessage] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  function switchMode(next: PracticeMode) {
    setMode(next);
    setAnswer("");
    setChecked(false);
  }

  async function sendMessage() {
    const content = message.trim();
    if (!content || chatBusy) return;
    const next = [...conversation, { role: "user" as const, content }];
    setConversation(next);
    setMessage("");
    setChatBusy(true);
    setChatError(null);
    try {
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic: prompt.topic, messages: next }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error ?? "The coach is unavailable.");
      setConversation([...next, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "The coach is unavailable.");
    } finally {
      setChatBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card as="section">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Today&apos;s topic: {prompt.topic}</p>
            <CardTitle className="mt-1">{prompt.title}</CardTitle>
          </div>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">{prompt.level}</span>
        </div>
        <p className="mt-4 text-sm leading-7">{prompt.passage}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
          {prompt.focusWords.map((word) => <span key={word} className="rounded-full bg-surface-muted px-2.5 py-1">{word}</span>)}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3" role="tablist" aria-label="Daily practice modes">
        {MODES.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={mode === item.id} onClick={() => switchMode(item.id)} className={cn("rounded-xl border px-4 py-3 text-sm font-medium transition", mode === item.id ? "border-accent bg-accent-soft text-accent" : "border-border bg-surface text-muted hover:border-accent")}>
            {item.label}
          </button>
        ))}
      </div>

      {mode === "writing" && (
        <Card as="section">
          <CardTitle>Type your answer</CardTitle>
          <p className="mt-2 text-sm text-muted">{prompt.writingTask}</p>
          <textarea value={answer} onChange={(event) => { setAnswer(event.target.value); setChecked(false); }} rows={8} className="mt-4 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm leading-6" placeholder="Write here..." />
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-muted">{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
            <Button type="button" onClick={() => setChecked(true)} disabled={answer.trim().length < 10}>Check writing</Button>
          </div>
          {checked && <p className="mt-4 rounded-xl bg-success-soft p-3 text-sm text-success">Good start. Review your verb tenses, linking words and one focus word before asking the coach for feedback below.</p>}
        </Card>
      )}

      {mode === "listening" && (
        <Card as="section">
          <CardTitle>Listen and answer</CardTitle>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-muted p-3 text-sm"><SpeakButton text={prompt.passage} label="Listen to today&apos;s passage" /> Listen to the passage above, then choose the best answer.</div>
          <p className="mt-5 text-sm font-medium">{prompt.listeningQuestion}</p>
          <div className="mt-3 grid gap-2">{prompt.listeningOptions.map((option, index) => <button key={option} type="button" onClick={() => { setAnswer(String(index)); setChecked(true); }} className={cn("rounded-xl border p-3 text-left text-sm", checked && index === prompt.listeningAnswer ? "border-success bg-success-soft" : "border-border hover:border-accent", checked && answer === String(index) && index !== prompt.listeningAnswer ? "border-danger bg-danger-soft" : "")}>{option}</button>)}</div>
          {checked && <p className="mt-4 text-sm text-muted">{answer === String(prompt.listeningAnswer) ? "Correct. Nice listening." : "Not quite. Listen again and look for the key idea."}</p>}
        </Card>
      )}

      {mode === "speaking" && (
        <Card as="section">
          <CardTitle>Speak aloud</CardTitle>
          <p className="mt-2 text-sm text-muted">{prompt.speakingPrompt}</p>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-muted p-3 text-sm"><SpeakButton text={prompt.speakingPrompt} accent="uk" label="Hear the speaking prompt" /> Hear the prompt, prepare for 30 seconds, then speak for one minute.</div>
          <p className="mt-4 rounded-xl bg-warning-soft p-3 text-xs text-warning">Self-check only: this browser exercise does not record or score your pronunciation. Focus on clear sounds, pauses and the focus words.</p>
        </Card>
      )}

      <Card as="section">
        <CardTitle>Talk with your AI coach</CardTitle>
        <p className="mt-1 text-sm text-muted">Ask for an example, correction or follow-up question about {prompt.topic}.</p>
        <div className="mt-4 max-h-80 space-y-3 overflow-y-auto">{conversation.map((item, index) => <div key={`${item.role}-${index}`} className={cn("rounded-xl p-3 text-sm", item.role === "user" ? "ml-8 bg-accent-soft" : "mr-8 bg-surface-muted")}><strong className="mr-2 text-xs">{item.role === "user" ? "You" : "Coach"}</strong>{item.content}</div>)}</div>
        <div className="mt-4 flex gap-2"><input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void sendMessage(); }} className="min-h-10 flex-1 rounded-xl border border-border bg-surface px-3 text-sm" placeholder="Ask the coach..." maxLength={500} /><Button type="button" onClick={() => void sendMessage()} disabled={chatBusy || !message.trim()}>{chatBusy ? "Thinking..." : "Send"}</Button></div>
        {chatError && <p className="mt-2 text-sm text-danger">{chatError}</p>}
      </Card>
    </div>
  );
}
