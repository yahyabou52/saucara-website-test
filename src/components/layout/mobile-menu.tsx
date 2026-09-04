"use client";

import { useEffect, useRef, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import type { NavigationItem } from "@/content/site";

type MobileMenuProps = {
  navigation: NavigationItem[];
  whatsappUrl: string;
  linkPrefix?: string;
};

export function MobileMenu({
  navigation,
  whatsappUrl,
  linkPrefix = "",
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="mobile-menu">
      <button
        ref={buttonRef}
        className="mobile-menu__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <CloseIcon className="size-5" />
        ) : (
          <MenuIcon className="size-5" />
        )}
        <span className="sr-only">
          {isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        </span>
      </button>

      <div
        id="mobile-navigation"
        className="mobile-menu__panel"
        hidden={!isOpen}
      >
        <nav aria-label="Navigation mobile">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={`${linkPrefix}${item.href}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="button-primary mobile-menu__cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setIsOpen(false)}
        >
          Demander sur WhatsApp
          <span className="sr-only"> — ouvre un nouvel onglet</span>
        </a>
      </div>
    </div>
  );
}
