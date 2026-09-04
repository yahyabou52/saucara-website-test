import { describe, expect, it } from "vitest";

import {
  buildEnquiryMessage,
  type EnquiryValues,
  validateEnquiry,
} from "@/lib/enquiry";

const validEnquiry: EnquiryValues = {
  firstName: "Inès",
  occasion: "Mariage ou fiançailles",
  desiredDate: "2099-12-20",
  servings: "80",
  details: "Palette ivoire et vert profond, avec des notes de fleur d’oranger.",
};

describe("validateEnquiry", () => {
  it("returns field-specific errors for an empty request", () => {
    expect(
      validateEnquiry({
        firstName: "",
        occasion: "",
        desiredDate: "",
        servings: "",
        details: "",
      }),
    ).toEqual({
      occasion: "Choisissez l’occasion qui correspond à votre projet.",
      desiredDate: "Indiquez la date souhaitée.",
      servings: "Indiquez un nombre de parts valide.",
      details:
        "Ajoutez au moins 20 caractères sur les saveurs, couleurs ou inspirations.",
    });
  });

  it("accepts a complete request", () => {
    expect(validateEnquiry(validEnquiry, "2026-09-04")).toEqual({});
  });

  it("rejects past and impossible calendar dates", () => {
    expect(
      validateEnquiry(
        { ...validEnquiry, desiredDate: "2026-09-03" },
        "2026-09-04",
      ).desiredDate,
    ).toBe("Choisissez une date à partir d’aujourd’hui.");
    expect(
      validateEnquiry(
        { ...validEnquiry, desiredDate: "2026-02-30" },
        "2026-01-01",
      ).desiredDate,
    ).toBe("Indiquez la date souhaitée.");
  });

  it("rejects unsupported occasions and unreasonable text values", () => {
    const errors = validateEnquiry(
      {
        ...validEnquiry,
        firstName: "A".repeat(61),
        occasion: "Urgent",
        servings: "-2",
        details: "x".repeat(601),
      },
      "2026-09-04",
    );

    expect(errors.firstName).toBeDefined();
    expect(errors.occasion).toBeDefined();
    expect(errors.servings).toBeDefined();
    expect(errors.details).toBeDefined();
  });
});

describe("buildEnquiryMessage", () => {
  it("keeps French accents and makes confirmation status explicit", () => {
    const message = buildEnquiryMessage(validEnquiry);

    expect(message).toContain("Prénom : Inès");
    expect(message).toContain("fleur d’oranger");
    expect(message).toContain("reste à confirmer");
    expect(message).not.toContain("undefined");
  });

  it("omits an empty optional first name cleanly", () => {
    const message = buildEnquiryMessage({ ...validEnquiry, firstName: " " });

    expect(message).not.toContain("Prénom :");
  });
});
// @vitest-environment node
