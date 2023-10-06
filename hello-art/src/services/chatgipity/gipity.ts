import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const params = z.object({
    messages: z.array(
      z.object({
        role: z.enum(["function", "system", "user", "assistant"]),
        content: z.string(),
      })
    ),
  });

export async function runGipity(mgs: z.infer<typeof params>) {
    const { messages } = params.parse(mgs);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
