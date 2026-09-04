// @vitest-environment node
import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "@/lib/site-url";

describe("site URL resolution", () => {
  it("uses the documented local fallback", () => {
    expect(resolveSiteUrl(undefined).href).toBe("http://localhost:3000/");
  });

  it("accepts an HTTP(S) origin and removes paths or fragments", () => {
    expect(
      resolveSiteUrl("https://preview.example/saucara?draft=1#top").href,
    ).toBe("https://preview.example/");
  });

  it("rejects invalid and unsafe protocols", () => {
    expect(resolveSiteUrl("not a URL").href).toBe("http://localhost:3000/");
    expect(resolveSiteUrl("javascript:alert(1)").href).toBe(
      "http://localhost:3000/",
    );
  });
});
