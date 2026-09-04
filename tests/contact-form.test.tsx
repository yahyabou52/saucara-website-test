import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactForm } from "@/components/contact/contact-form";

function completeForm() {
  fireEvent.change(screen.getByLabelText(/Prénom/), {
    target: { value: "Inès" },
  });
  fireEvent.change(screen.getByLabelText("Occasion"), {
    target: { value: "Mariage ou fiançailles" },
  });
  fireEvent.change(screen.getByLabelText("Date souhaitée"), {
    target: { value: "2026-12-20" },
  });
  fireEvent.change(screen.getByLabelText("Nombre de parts"), {
    target: { value: "80" },
  });
  fireEvent.change(screen.getByLabelText("Votre idée"), {
    target: {
      value:
        "Palette ivoire et vert profond, avec une note de fleur d’oranger.",
    },
  });
}

describe("ContactForm", () => {
  it("focuses an accessible error summary and links inline errors", async () => {
    render(<ContactForm />);

    fireEvent.click(
      screen.getByRole("button", { name: "Préparer mon message" }),
    );

    const summary = screen.getByRole("alert");
    await waitFor(() => expect(summary).toHaveFocus());
    expect(summary).toHaveTextContent("Vérifiez votre demande");
    expect(screen.getByLabelText("Occasion")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("link", { name: /Occasion/ })).toHaveAttribute(
      "href",
      "#occasion",
    );
  });

  it("prepares a WhatsApp link without claiming that a message was sent", async () => {
    render(<ContactForm />);
    completeForm();

    fireEvent.click(
      screen.getByRole("button", { name: "Préparer mon message" }),
    );

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Votre message est prêt");
    expect(status).toHaveTextContent("ne confirme pas encore");
    expect(status).not.toHaveTextContent("envoyé");

    const link = screen.getByRole("link", {
      name: /Ouvrir le message dans WhatsApp/,
    });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/\?text=/);
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain(
      "fleur d’oranger",
    );
  });

  it("has no first-party submission action or persistence contract", () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector("form");

    expect(form).not.toHaveAttribute("action");
    expect(form).not.toHaveAttribute("method");
    expect(screen.getByText(/ne les enregistre pas/)).toBeVisible();
  });
});
