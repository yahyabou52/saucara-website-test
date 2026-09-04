export const occasionOptions = [
  "Anniversaire",
  "Mariage ou fiançailles",
  "Baby shower",
  "Événement d’entreprise",
  "Célébration familiale",
  "Autre occasion",
] as const;

export type Occasion = (typeof occasionOptions)[number];

export type EnquiryValues = {
  firstName: string;
  occasion: string;
  desiredDate: string;
  servings: string;
  details: string;
};

export type EnquiryField = keyof EnquiryValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const servingsPattern = /^\d{1,4}$/;

export function getLocalDateInputValue(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isValidIsoDate(value: string): boolean {
  if (!isoDatePattern.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

export const emptyEnquiry: EnquiryValues = {
  firstName: "",
  occasion: "",
  desiredDate: "",
  servings: "",
  details: "",
};

export function validateEnquiry(
  values: EnquiryValues,
  minimumDate = getLocalDateInputValue(),
): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const firstName = values.firstName.trim();
  const details = values.details.trim();

  if (firstName.length > 60) {
    errors.firstName = "Le prénom doit contenir 60 caractères maximum.";
  }

  if (!occasionOptions.includes(values.occasion as Occasion)) {
    errors.occasion = "Choisissez l’occasion qui correspond à votre projet.";
  }

  if (!isValidIsoDate(values.desiredDate)) {
    errors.desiredDate = "Indiquez la date souhaitée.";
  } else if (values.desiredDate < minimumDate) {
    errors.desiredDate = "Choisissez une date à partir d’aujourd’hui.";
  }

  if (!servingsPattern.test(values.servings) || Number(values.servings) < 1) {
    errors.servings = "Indiquez un nombre de parts valide.";
  }

  if (details.length < 20) {
    errors.details =
      "Ajoutez au moins 20 caractères sur les saveurs, couleurs ou inspirations.";
  } else if (details.length > 600) {
    errors.details = "Limitez votre description à 600 caractères.";
  }

  return errors;
}

export function validateEnquiryField(
  field: EnquiryField,
  values: EnquiryValues,
): string | undefined {
  return validateEnquiry(values)[field];
}

export function buildEnquiryMessage(values: EnquiryValues): string {
  const firstName = values.firstName.trim();
  const lines = [
    "Bonjour SAUCARA,",
    "",
    "Je souhaite discuter d’une création pâtissière sur mesure.",
    firstName ? `Prénom : ${firstName}` : null,
    `Occasion : ${values.occasion}`,
    `Date souhaitée : ${values.desiredDate}`,
    `Nombre de parts : ${values.servings}`,
    `Projet, saveurs et inspiration : ${values.details.trim()}`,
    "",
    "Je comprends que cette demande reste à confirmer selon les disponibilités et le devis.",
  ];

  return lines.filter((line): line is string => line !== null).join("\n");
}
