import { describe, expect, it } from "vitest";

import {
  creations,
  faqs,
  gallery,
  navigation,
  occasions,
  testimonials,
} from "@/content/site";

describe("site content invariants", () => {
  it("contains the complete creation and occasion ranges", () => {
    expect(creations).toHaveLength(5);
    expect(occasions.map((item) => item.title)).toEqual(
      expect.arrayContaining([
        "Anniversaires",
        "Mariages & fiançailles",
        "Baby showers",
        "Événements d’entreprise",
        "Célébrations familiales",
      ]),
    );
  });

  it("covers every required FAQ topic", () => {
    expect(faqs.map((faq) => faq.topic)).toEqual(
      expect.arrayContaining([
        "notice",
        "customization",
        "delivery",
        "allergens",
        "payment",
        "cancellation",
      ]),
    );
  });

  it("marks every testimonial as demonstration content", () => {
    expect(testimonials).toHaveLength(3);
    expect(testimonials.every((testimonial) => testimonial.demo)).toBe(true);
  });

  it("uses unique navigation IDs and meaningful gallery alternatives", () => {
    expect(new Set(navigation.map((item) => item.href)).size).toBe(
      navigation.length,
    );
    expect(gallery).toHaveLength(6);
    expect(gallery.every((item) => item.alt.length > 30)).toBe(true);
  });
});
// @vitest-environment node
