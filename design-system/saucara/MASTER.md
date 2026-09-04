# SAUCARA — Design System Master

**Status:** Accepted for the test candidate

**Direction:** Pâtisserie éditoriale casablancaise
**Updated:** 2026-09-04

This project deliberately supersedes the design-search tool's initial Liquid Glass and generic Swiss-style recommendations. The owner brief, brand palette, accessibility requirements, and independent visual review are the source of truth.

## Concept

SAUCARA should feel like a composed pâtisserie lookbook: deep-green lacquer, warm paper, brass-like rules, high-contrast editorial type, and close food photography. Premium quality comes from proportion, restraint, and concrete service language rather than ornamental effects or unsupported claims.

The single signature device is the **Cadre Casablanca**: two opposite clipped corners with a fine inset gold rule, used only on the hero and selected gallery photographs. It nods to Casablanca Art Deco geometry and zellige construction without becoming folkloric decoration.

## Color roles

| Token             | Value     | Use                                 |
| ----------------- | --------- | ----------------------------------- |
| `--green-950`     | `#071F1A` | deepest section and footer          |
| `--green-900`     | `#0A2922` | dark panels and hover               |
| `--green-800`     | `#123C32` | primary brand and actions           |
| `--cream-100`     | `#F7F0E4` | main background                     |
| `--paper-050`     | `#FFFDF8` | editorial surface                   |
| `--gold-500`      | `#C4A268` | ornament and text on green          |
| `--gold-ink`      | `#765326` | small accent text on light surfaces |
| `--charcoal`      | `#242421` | primary text                        |
| `--muted-ink`     | `#655F56` | supporting text                     |
| `--line-soft`     | `#D9CCB8` | decorative rules only               |
| `--border-strong` | `#857A68` | form boundaries                     |
| `--error`         | `#9F2D24` | errors                              |
| `--success`       | `#245B43` | prepared-message state              |

Contrast rules:

- Green/cream and charcoal/cream are primary reading pairs.
- Gold may be text only on deep green; `--gold-ink` is the light-surface text alternative.
- Plain gold on cream is decorative only because it does not meet normal-text contrast.
- Focus rings are 3px green on light surfaces and gold on green, always with offset.

## Typography

- Display: **Newsreader**, weights 400–600 with restrained italics.
- Body and UI: **Manrope**, weights 400–700.
- Wordmark: Manrope 700, approximately `0.2em` tracking.
- Self-host variable WOFF2 files with Latin/French glyph coverage and system fallbacks.
- H1: `clamp(3rem, 6vw, 5.5rem)`, line-height `0.95`.
- H2: `clamp(2.25rem, 4.5vw, 4rem)`, line-height `1`.
- Body: 16px mobile and 17–18px desktop, line-height `1.6–1.7`, measure no wider than 65 characters.
- Utility labels: 11–13px, uppercase only for short taxonomy, generous tracking.

## Layout and rhythm

- Content width: `min(calc(100% - 40px), 1240px)`.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Section spacing: `clamp(4.5rem, 8vw, 8rem)`.
- 320–479px: one column, 20px gutters, 64–80px section rhythm.
- 768px: selective two-column figures and gallery.
- 1024px+: twelve-column editorial grid; hero copy 5 columns, image 7.
- 1440px+: cap the composition at 1240–1280px.
- Use figures, captions, whitespace, and hairlines—not repeated generic cards.
- Controls are square or 4px radius. Images may use up to 12px only where the crop benefits.

## Components

- Primary light-section CTA: green fill, cream text, minimum 44px target.
- Dark-section CTA: muted gold fill with deep-green text after contrast verification.
- Secondary CTA: text link with directional rule/arrow, not a pill.
- Header: compact sticky paper surface with a solid border; no blur or glass.
- Product entries: semantic figures with image, occasion label, name, and sensory description.
- Occasions: oversized typographic list with rules, not icon cards.
- FAQ: native disclosure controls with state visible without color alone.
- Inputs: visible labels, 48px minimum control height, strong border, explicit invalid state and connected error copy.

## Photography

- Locally stored, attributed, compressed stock photography; never represented as real client work.
- Warm-neutral grade and controlled highlights.
- Hero: one commanding close, tactile cake image with useful negative space.
- Creations: portrait 4:5 crops. Gallery: asymmetric mosaic with reserved dimensions.
- Alt text describes visible pastry and decoration in natural French.
- Preload only the hero. Lazy-load below-fold imagery.

## Motion

- No GSAP or animation library.
- One coordinated hero entrance: opacity plus 8px translation over 400–600ms.
- Select section heading/image reveals only when progressively enhanced; content is visible by default.
- Hover image scale no greater than 1.02 and never layout-shifting.
- Menu/button transitions: 160–220ms.
- Under `prefers-reduced-motion: reduce`, disable smooth scrolling, reveal motion, rotation, and transforms.
- No parallax, scroll-jacking, marquees, autoplay, cursor effects, or animated gradients.

## Content and accessibility

- French is the only interface language in this milestone; `lang="fr"`.
- One H1, sequential headings, landmarks, skip link, logical DOM/tab order.
- Minimum 44×44 touch targets and visible focus everywhere.
- Sticky navigation never obscures hash targets or focused content.
- Testimonials, imagery, hours, and contact details are visibly labeled as demonstration content.
- Request CTAs say “demander” or “préparer”; never imply that an order is confirmed.
- Form success means the WhatsApp message is prepared, not sent.

## Forbidden patterns

- Liquid glass, blur panels, ornamental gradients, bento grids, repeated rounded cards.
- Faux-Arabic lettering, arches everywhere, dense zellige wallpaper, or folkloric clichés.
- Pills/badges as decoration, floating review chips, fake proof, awards, counters, ratings, or urgency.
- Gold normal-size text on cream, hidden focus, hover-only content, placeholder links, broken images.

## Pre-delivery checks

- Verify 320, 375, 768, 1024, 1440, and 1920px layouts without horizontal overflow.
- Test keyboard menu, FAQ, form errors, focus return, and all anchors.
- Verify reduced-motion removes smooth scrolling and transforms.
- Verify local images load and reserve space.
- Verify every WhatsApp URL contains valid French copy with no placeholder tokens.
- Verify no unsupported claim or real-customer implication remains.
