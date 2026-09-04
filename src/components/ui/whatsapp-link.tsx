import type { ReactNode } from "react";

import { ArrowUpRightIcon, MessageIcon } from "@/components/icons";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "gold" | "outline";
  showMessageIcon?: boolean;
};

export function WhatsAppLink({
  children,
  className = "",
  variant = "primary",
  showMessageIcon = true,
}: WhatsAppLinkProps) {
  const variantClass = {
    primary: "button-primary",
    gold: "button-gold",
    outline: "button-outline",
  }[variant];

  return (
    <a
      className={`${variantClass} ${className}`}
      href={getDefaultWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
    >
      {showMessageIcon ? <MessageIcon className="size-5" /> : null}
      <span>{children}</span>
      <ArrowUpRightIcon className="size-4" />
      <span className="sr-only"> — ouvre WhatsApp dans un nouvel onglet</span>
    </a>
  );
}
