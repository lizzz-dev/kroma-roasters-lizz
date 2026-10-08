import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { z } from "zod";

export const CATALOG = [
  { name: "Ethiopian Yirgacheffe G1", roast: "Light", price: 22, notes: "White Peach, Jasmine Blossom, Meyer Lemon", origin: "Gedeb, Ethiopia · Washed", bestFor: "Pour-Over, Chemex, V60" },
  { name: "Colombian Geisha Reserva", roast: "Medium", price: 26, notes: "Wild Blackberry, Cocoa Nib, Cane Sugar", origin: "Huila, Colombia · Natural", bestFor: "Aeropress, French Press, Pour-Over" },
  { name: "Midnight Velvet Espresso", roast: "Dark", price: 20, notes: "Dark Cacao, Smoked Vanilla, Crushed Hazelnut", origin: "Brazil & Guatemala blend", bestFor: "Espresso, Moka Pot, Milk drinks" },
] as const;

const resultSchema = z.object({
  product: z.enum(CATALOG.map((c) => c.name) as [string, ...string[]]),
  headline: z.string(),
  reason: z.string(),
  brewTip: z.string(),
});
export type Recommendation = z.infer<typeof resultSchema>;

const RUN_ID = "X-Lovable-AIG-Run-ID";

export async function recommendRoast(input: { flavors: string[]; method: string; extra: string }, apiKey: string) {
  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (url, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_ID, runId);
      const res = await fetch(url, { ...init, headers });
      runId ??= res.headers.get(RUN_ID) ?? undefined;
      return res;
    },
  });

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions:
      "You are KROMA Roasters' coffee sommelier. Recommend exactly ONE coffee from this catalog that best matches the shopper. " +
      "Catalog:\n" + CATALOG.map((c) => `- ${c.name} (${c.roast} roast, $${c.price}): ${c.notes}. ${c.origin}. Best for: ${c.bestFor}`).join("\n") +
      "\nKeep headline under 8 words, reason 2 sentences max, brewTip 1 sentence tailored to their brewing method. Warm, refined tone.",
    messages: [
      {
        role: "user",
        content: `Flavors I love: ${input.flavors.join(", ") || "no preference"}. Brewing method: ${input.method}. ${input.extra ? "Notes: " + input.extra : ""}`,
      },
    ],
    output: Output.object({ schema: resultSchema }),
    maxRetries: 0,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return (await result.output) as Recommendation;
}
