import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { transcribeAudio } from "./_core/voiceTranscription";
import { storageGetSignedUrl, storagePut } from "./storage";
import { publicProcedure, router } from "./_core/trpc";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(8000),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  ai: router({
    chat: publicProcedure
      .input(z.object({ messages: z.array(chatMessageSchema).min(1).max(30) }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are Abbas AI, a concise, kind, practical assistant. Give clear answers, use markdown when useful, and never claim to have taken an action you did not take.",
            },
            ...input.messages,
          ],
          maxTokens: 1200,
        });
        const content = response.choices[0]?.message?.content;
        const text = typeof content === "string" ? content : content?.map((part) => part.type === "text" ? part.text : "").join("").trim();
        if (!text) throw new Error("The AI returned an empty response");
        return { text };
      }),
  }),
  media: router({
    image: publicProcedure
      .input(z.object({ prompt: z.string().trim().min(3).max(2000) }))
      .mutation(async ({ input }) => generateImage({ prompt: input.prompt })),
    plan: publicProcedure
      .input(z.object({ kind: z.enum(["slides", "video"]), prompt: z.string().trim().min(3).max(4000) }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: input.kind === "slides" ? "You create concise presentation plans. Return JSON only." : "You create safe, detailed short-video storyboards. Return JSON only." },
            { role: "user", content: input.prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: input.kind === "slides" ? "slide_plan" : "video_plan",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  items: { type: "array", items: { type: "object", properties: { heading: { type: "string" }, description: { type: "string" } }, required: ["heading", "description"], additionalProperties: false } },
                },
                required: ["title", "items"],
                additionalProperties: false,
              },
            },
          },
        });
        const content = response.choices[0]?.message?.content;
        const text = typeof content === "string" ? content : content?.map((part) => part.type === "text" ? part.text : "").join("").trim();
        if (!text) throw new Error("The generation planner returned an empty response");
        return JSON.parse(text) as { title: string; items: Array<{ heading: string; description: string }> };
      }),
  }),
  voice: router({
    transcribe: publicProcedure
      .input(z.object({ audioUrl: z.string().url(), language: z.string().max(10).optional() }))
      .mutation(async ({ input }) => {
        const result = await transcribeAudio(input);
        if ("error" in result) throw new Error(result.error);
        return result;
      }),
    transcribeBase64: publicProcedure
      .input(z.object({ audioBase64: z.string().min(100).max(22_000_000), mimeType: z.string().max(80).default("audio/webm"), language: z.string().max(10).optional() }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.audioBase64, "base64");
        const stored = await storagePut(`voice/${Date.now()}.webm`, buffer, input.mimeType);
        const signedUrl = await storageGetSignedUrl(stored.key);
        const result = await transcribeAudio({ audioUrl: signedUrl, language: input.language });
        if ("error" in result) throw new Error(result.error);
        return result;
      }),
  }),
});

export type AppRouter = typeof appRouter;
