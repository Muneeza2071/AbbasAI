import { describe, expect, it } from "vitest";

describe("live xAI secret", () => {
  it("authenticates against the xAI models endpoint", async () => {
    const apiKey = process.env.XAI_API_KEY;
    expect(apiKey).toBeTruthy();

    const response = await fetch("https://api.x.ai/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    expect(response.status).toBe(200);
    const body = await response.json() as { data?: unknown[] };
    expect(Array.isArray(body.data)).toBe(true);
  }, 15000);
});
