export const DEFAULT_WHATSAPP_MESSAGE =
  "Bonjour SAUCARA, je souhaite discuter d’une création pâtissière sur mesure pour une célébration à Casablanca.";

const validRecipientPattern = /^\d{8,15}$/;

export function sanitizeWhatsAppRecipient(
  recipient: string | undefined,
): string | undefined {
  const normalized = recipient?.replace(/[\s()+-]/g, "");
  return normalized && validRecipientPattern.test(normalized)
    ? normalized
    : undefined;
}

export function buildWhatsAppUrl(message: string, recipient?: string): string {
  const normalizedMessage = message.trim();

  if (!normalizedMessage) {
    throw new Error("A WhatsApp message is required.");
  }

  const safeRecipient = sanitizeWhatsAppRecipient(recipient);
  const baseUrl = safeRecipient
    ? `https://wa.me/${safeRecipient}`
    : "https://wa.me/";

  return `${baseUrl}?text=${encodeURIComponent(normalizedMessage)}`;
}

export function getWhatsAppRecipient(): string | undefined {
  return sanitizeWhatsAppRecipient(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}

export function getDefaultWhatsAppUrl(): string {
  return buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE, getWhatsAppRecipient());
}
