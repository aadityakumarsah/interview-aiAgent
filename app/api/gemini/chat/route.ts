import { generateText } from "ai";
import { google } from "@ai-sdk/google";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = (await request.json()) as {
      messages: Message[];
      systemPrompt: string;
    };

    // Gemini rejects an empty contents array — seed with a starter if needed
    const history =
      messages.length === 0
        ? [{ role: "user" as const, content: "Please begin the interview." }]
        : messages.map((m) => ({ role: m.role, content: m.content }));

    const { text } = await generateText({
      model: google("gemini-flash-latest"),
      system: systemPrompt,
      messages: history,
    });

    return Response.json({ text }, { status: 200 });
  } catch (error) {
    console.error("Gemini chat error:", error);
    return Response.json(
      { text: "Sorry, I encountered an error. Please try again." },
      { status: 500 }
    );
  }
}
