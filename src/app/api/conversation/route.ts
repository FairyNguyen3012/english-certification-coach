import type { NextRequest } from "next/server";
import { VOCABULARY_TOPICS, type VocabularyTopic } from "@/types/learning";
import type { ConversationMessage } from "@/types/practice";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;

function isTopic(value: string): value is VocabularyTopic {
  return VOCABULARY_TOPICS.includes(value as VocabularyTopic);
}

function localCoachReply(topic: VocabularyTopic, message: string): string {
  const clean = message.trim();
  return `Let's practise ${topic}. I understood: “${clean}”. Can you add one specific example, and use one of these words if possible: explain, experience, improve?`;
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Please send a valid conversation message." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return Response.json({ error: "Invalid conversation request." }, { status: 400 });
  }
  const body = payload as { topic?: unknown; messages?: unknown };
  if (typeof body.topic !== "string" || !isTopic(body.topic)) {
    return Response.json({ error: "Choose a valid practice topic." }, { status: 400 });
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
    return Response.json({ error: "Conversation history is invalid or too long." }, { status: 400 });
  }

  const messages = body.messages as ConversationMessage[];
  if (messages.some((item) => !item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string" || item.content.trim().length === 0 || item.content.length > MAX_MESSAGE_LENGTH)) {
    return Response.json({ error: "Each message must contain short text and a valid role." }, { status: 400 });
  }

  const latest = messages[messages.length - 1];
  if (latest.role !== "user") {
    return Response.json({ error: "The latest conversation message must be from you." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ reply: localCoachReply(body.topic, latest.content), fallback: true });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest",
        max_tokens: 300,
        system: `You are a kind English conversation coach. Topic: ${body.topic}. Reply in clear English at the learner's apparent level. Ask one follow-up question, correct at most one important mistake briefly, and never claim to measure pronunciation.`,
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
    const result = (await response.json()) as { content?: Array<{ type?: string; text?: string }> };
    const reply = result.content?.find((item) => item.type === "text")?.text?.trim();
    if (!reply) throw new Error("AI provider returned no text");
    return Response.json({ reply, fallback: false });
  } catch {
    return Response.json({ reply: localCoachReply(body.topic, latest.content), fallback: true });
  }
}
