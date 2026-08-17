import { describe, expect, it } from "vitest";
import { appRouter } from "../server/routers";
import type { TrpcContext } from "../server/_core/context";

const ctx = {
  user: null,
  req: { protocol: "https", headers: {} },
  res: {},
} as TrpcContext;

describe("ai.chat", () => {
  it("rejects an empty message list", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.ai.chat({ messages: [] })).rejects.toThrow();
  });

  it("returns a live assistant response from the built-in server LLM", async () => {
    const caller = appRouter.createCaller(ctx);
    const result = await caller.ai.chat({ messages: [{ role: "user", content: "Reply with exactly: Abbas AI online" }] });
    expect(result.text.length).toBeGreaterThan(0);
  }, 30000);
});
