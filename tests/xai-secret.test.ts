import { describe, expect, it } from "vitest";

describe("xAI credential", () => {
  it("can reach the lightweight models endpoint without exposing the key", async () => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) throw new Error("XAI_API_KEY is not configured");

    const response = await fetch("https://api.x.ai/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    expect(response.status).toBeLessThan(500);
    expect([200, 401, 403]).toContain(response.status);
    if (response.status !== 200) {
      throw new Error(`xAI credential rejected with HTTP ${response.status}`);
    }
  }, 15000);
});
