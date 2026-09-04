import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileMenu } from "@/components/layout/mobile-menu";

const navigation = [
  { label: "Créations", href: "#creations" as const },
  { label: "FAQ", href: "#faq" as const },
];

describe("MobileMenu", () => {
  it("exposes state and returns focus after Escape", async () => {
    const user = userEvent.setup();
    render(
      <MobileMenu
        navigation={navigation}
        whatsappUrl="https://wa.me/?text=Bonjour"
      />,
    );

    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Créations" })).toBeVisible();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes after a navigation link is chosen", async () => {
    const user = userEvent.setup();
    render(
      <MobileMenu
        navigation={navigation}
        whatsappUrl="https://wa.me/?text=Bonjour"
      />,
    );

    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    await user.click(toggle);
    await user.click(screen.getByRole("link", { name: "FAQ" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
