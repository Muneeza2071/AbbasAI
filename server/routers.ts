import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { invokeLLM } from "./_core/llm";
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
});

export type AppRouter = typeof appRouter;
