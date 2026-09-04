import type { StaticImageData } from "next/image";

import berryTarts from "@/assets/images/berry-tarts.jpg";
import cakePearlRose from "@/assets/images/cake-pearl-rose.jpg";
import cakeSculpturalIvory from "@/assets/images/cake-sculptural-ivory.jpg";
import chocolateService from "@/assets/images/chocolate-service.jpg";
import finishingCake from "@/assets/images/finishing-cake.jpg";
import heroCake from "@/assets/images/hero-cake.jpg";
import macaronsEvening from "@/assets/images/macarons-evening.jpg";
import moroccanPastries from "@/assets/images/moroccan-pastries.jpg";
import receptionTable from "@/assets/images/reception-table.jpg";

export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type Creation = {
  name: string;
  occasion: string;
  description: string;
  image: StaticImageData;
  alt: string;
};

export const navigation: NavigationItem[] = [
  { label: "Créations", href: "#creations" },
  { label: "Sur mesure", href: "#sur-mesure" },
  { label: "Étapes", href: "#commande" },
  { label: "Galerie", href: "#galerie" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  image: heroCake,
  alt: "Gâteau blanc minimaliste à la crème texturée, présenté sur un plateau doré.",
};

export const creations: Creation[] = [
  {
    name: "Jardin ivoire",
    occasion: "Mariage & fiançailles",
    description:
      "Une pièce sculpturale aux lignes végétales, pensée dans une palette ivoire et or doux.",
    image: cakeSculpturalIvory,
    alt: "Gâteau blanc à trois étages décoré de feuillages en sucre sur un présentoir doré.",
  },
  {
    name: "Perle de rose",
    occasion: "Célébration",
    description:
      "Crème nacrée, fleurs poudrées et détails perlés pour une table tout en douceur.",
    image: cakePearlRose,
    alt: "Gâteau à deux étages rose poudré, décoré de roses pêche et de petites perles.",
  },
  {
    name: "Baies du jardin",
    occasion: "Réception",
    description:
      "Des tartelettes de format individuel, garnies de fruits rouges et composées pour le partage.",
    image: berryTarts,
    alt: "Tartelettes individuelles garnies de fraises et de myrtilles sur une table de réception.",
  },
  {
    name: "Nuit pralinée",
    occasion: "Dîner & entreprise",
    description:
      "Une collection de macarons aux tonalités cacao, noisette et pistache pour les attentions raffinées.",
    image: macaronsEvening,
    alt: "Macarons chocolat, noisette et pistache disposés dans une lumière chaude.",
  },
  {
    name: "Écrin marocain",
    occasion: "Famille & cadeaux",
    description:
      "Un assortiment graphique de petits fours inspiré des plateaux généreux des grandes réunions.",
    image: moroccanPastries,
    alt: "Assortiment vu du dessus de petits biscuits et pâtisseries marocaines sur des plaques sombres.",
  },
];

export const bespokeChoices = [
  {
    title: "Saveurs",
    text: "Biscuit, crème, fruits, chocolat ou notes florales : décrivez les accords que vous aimez.",
  },
  {
    title: "Format",
    text: "Nombre de parts, gâteau central ou assortiment individuel : le format suit votre réception.",
  },
  {
    title: "Univers",
    text: "Couleurs, ambiance et niveau de décor orientent une proposition cohérente, jamais une copie.",
  },
  {
    title: "Occasion",
    text: "Date, lieu et rythme de l’événement permettent de préparer retrait ou livraison à convenir.",
  },
];

export const orderSteps = [
  {
    number: "01",
    title: "Écrivez-nous",
    text: "Partagez votre date et votre occasion sur WhatsApp.",
  },
  {
    number: "02",
    title: "Précisez votre idée",
    text: "Indiquez les parts, saveurs, couleurs et inspirations souhaitées.",
  },
  {
    number: "03",
    title: "Validez la proposition",
    text: "Disponibilité, composition, décor et modalités sont confirmés ensemble.",
  },
  {
    number: "04",
    title: "Retrait ou livraison",
    text: "Récupérez votre création ou convenez d’une livraison selon la zone.",
  },
];

export const occasions = [
  {
    title: "Anniversaires",
    text: "Du gâteau intime à la grande tablée.",
  },
  {
    title: "Mariages & fiançailles",
    text: "Pièces centrales et tables de douceurs.",
  },
  {
    title: "Baby showers",
    text: "Palettes délicates et formats à partager.",
  },
  {
    title: "Événements d’entreprise",
    text: "Réceptions, cadeaux et assortiments individuels.",
  },
  {
    title: "Célébrations familiales",
    text: "Des douceurs pensées pour les moments réunis.",
  },
];

export const gallery = [
  {
    image: finishingCake,
    alt: "Main de pâtissier saupoudrant de sucre un gâteau garni de fruits frais.",
    caption: "Le dernier geste",
    className: "gallery-item gallery-item--tall",
  },
  {
    image: receptionTable,
    alt: "Table de réception composée de petits gâteaux, éclairs et meringues aux tons pastel.",
    caption: "Table de réception",
    className: "gallery-item gallery-item--wide",
  },
  {
    image: chocolateService,
    alt: "Part de gâteau au chocolat servie sur une assiette claire dans une ambiance chaleureuse.",
    caption: "Accord chocolat",
    className: "gallery-item",
  },
  {
    image: macaronsEvening,
    alt: "Macarons aux couleurs naturelles posés sur un plat en verre éclairé de petites lumières.",
    caption: "Petits formats",
    className: "gallery-item",
  },
  {
    image: moroccanPastries,
    alt: "Plateaux de biscuits marocains aux formes rondes et cannelées vus du dessus.",
    caption: "Gestes d’ici",
    className: "gallery-item gallery-item--wide",
  },
  {
    image: cakePearlRose,
    alt: "Détail d’un gâteau rose très pâle avec perles de sucre et rose couleur pêche.",
    caption: "Détails sur mesure",
    className: "gallery-item gallery-item--tall",
  },
];

export const testimonials = [
  {
    quote:
      "La proposition a repris notre palette avec beaucoup de justesse, tout en restant simple à servir le jour de la fête.",
    author: "Leïla A.",
    occasion: "Anniversaire",
    demo: true,
  },
  {
    quote:
      "Nous avons aimé pouvoir préciser chaque détail avant validation : le format, les saveurs et le retrait.",
    author: "Nadia & Youssef",
    occasion: "Fiançailles",
    demo: true,
  },
  {
    quote:
      "Les petits formats donnaient une vraie cohérence à notre table sans compliquer le service.",
    author: "Meryem K.",
    occasion: "Réception d’entreprise",
    demo: true,
  },
];

export const faqs = [
  {
    question: "Combien de temps à l’avance faut-il nous écrire ?",
    answer:
      "Pour cette démonstration, une demande au moins 7 à 10 jours à l’avance est conseillée, davantage pour un mariage ou une grande réception. La disponibilité reste toujours à confirmer sur WhatsApp.",
    topic: "notice",
  },
  {
    question: "Peut-on personnaliser entièrement le décor et les saveurs ?",
    answer:
      "Oui, le principe présenté est celui d’une création sur mesure : format, palette, niveau de décor et accords de saveurs sont définis ensemble. Une image d’inspiration guide une proposition originale ; elle n’est pas reproduite à l’identique.",
    topic: "customization",
  },
  {
    question: "Dans quelles zones la livraison est-elle possible ?",
    answer:
      "Le retrait est prévu à Casablanca sur rendez-vous. Une livraison peut être étudiée selon l’adresse, l’horaire et le format ; la zone et les éventuels frais sont confirmés avant la commande. Ces modalités sont fictives pour le prototype.",
    topic: "delivery",
  },
  {
    question: "Comment signaler une allergie ou une intolérance ?",
    answer:
      "Mentionnez tout allergène dès votre demande. La composition et les risques de traces doivent être confirmés directement avant validation ; le prototype ne présente aucune garantie d’absence d’allergènes.",
    topic: "allergens",
  },
  {
    question: "Quand la commande est-elle réellement confirmée ?",
    answer:
      "Le message WhatsApp ouvre la discussion. La commande n’est considérée comme confirmée qu’après validation de la disponibilité, du devis et des modalités de paiement convenues. Aucune confirmation n’est réalisée par ce site.",
    topic: "payment",
  },
  {
    question: "Peut-on modifier ou annuler une demande ?",
    answer:
      "Les possibilités dépendent de l’avancement de la préparation et sont étudiées au cas par cas. Pour cette démonstration, aucune règle commerciale définitive ni droit au remboursement n’est revendiqué.",
    topic: "cancellation",
  },
];
