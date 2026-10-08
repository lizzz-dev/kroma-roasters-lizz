import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  flavors: z.array(z.string().max(40)).max(10),
  method: z.string().min(1).max(40),
  extra: z.string().max(300),
});

export const getRoastRecommendation = createServerFn({ method: "POST" })
  .inputValidator((d) => inputSchema.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false as const, error: "AI is not configured yet." };
    try {
      const { recommendRoast } = await import("./recommend.server");
      return { ok: true as const, rec: await recommendRoast(data, key) };
    } catch (e: unknown) {
      const status = (e as { statusCode?: number })?.statusCode;
      console.error("recommendation failed", e);
      const error =
        status === 402 ? "AI credits have run out for this workspace. Please try again later."
        : status === 429 ? "Our sommelier is busy — please try again in a moment."
        : "Couldn't get a recommendation right now. Please try again.";
      return { ok: false as const, error };
    }
  });
