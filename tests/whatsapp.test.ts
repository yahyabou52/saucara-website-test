import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl, sanitizeWhatsAppRecipient } from "@/lib/whatsapp";

describe("WhatsApp URL generation", () => {
  it("encodes French punctuation, line breaks, and ampersands", () => {
    const message = "Bonjour SAUCARA,\nFiançailles & dîner à Casablanca.";
    const url = buildWhatsAppUrl(message);

    expect(url).toBe(`https://wa.me/?text=${encodeURIComponent(message)}`);
    expect(
      decodeURIComponent(new URL(url).searchParams.get("text") ?? ""),
    ).toBe(message);
  });

  it("uses a normalized approved recipient", () => {
    expect(buildWhatsAppUrl("Bonjour", "+212 6 12-34-56-78")).toBe(
      "https://wa.me/212612345678?text=Bonjour",
    );
  });

  it("falls back to the numberless composer for invalid recipients", () => {
    expect(buildWhatsAppUrl("Bonjour", "not-a-number")).toBe(
      "https://wa.me/?text=Bonjour",
    );
    expect(sanitizeWhatsAppRecipient("123")).toBeUndefined();
  });

  it("rejects an empty message without crashing downstream code", () => {
    expect(() => buildWhatsAppUrl("   ")).toThrow(
      "A WhatsApp message is required.",
    );
  });
});
// @vitest-environment node
