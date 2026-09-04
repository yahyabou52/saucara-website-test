# Project Charter — SAUCARA one-page website

## Owner outcome

Deliver a production-quality French one-page website for fictional Casablanca pastry studio SAUCARA that helps visitors prepare and open a useful custom-order enquiry in WhatsApp.

## Target users and critical job

The primary users are people planning birthdays and family celebrations, wedding or engagement couples, baby-shower hosts, and corporate event buyers in Casablanca. Their critical job is to judge stylistic fit, understand the made-to-order process, define occasion/date/portions/flavours/visual direction, and request availability without mistaking the request for a confirmed order.

## Primary journey

Land on the page → understand the custom cake/pastry offer and Casablanca context → inspect creations and occasions → learn the brief/order process → resolve objections in the FAQ → prepare a French message → choose to open WhatsApp and send it.

## In scope

- Responsive one-page French marketing experience with all owner-required sections.
- Sticky desktop/mobile navigation, working anchors, visible focus, and restrained motion.
- Five signature creations and a responsive, accessible local-image gallery.
- Custom-service explanation, four-step request process, and occasion coverage.
- Clearly fictional demonstration testimonials and transparent project notice.
- Accessible FAQ covering notice, customization, delivery, allergens, payment confirmation, and changes/cancellation.
- Compact client-side enquiry form with invalid, prepared, and recoverable error states.
- French WhatsApp message generation with a generic composer fallback when no recipient is configured.
- Metadata, Open Graph image, local favicon/brand mark, `noindex` demo safeguard, and branded 404.
- Automated unit/component/E2E tests plus real-browser, accessibility, performance, and independent reviews.
- Local run instructions, asset provenance, quality report, and owner delivery packet.

## Non-goals

- Backend, form submission service, database, authentication, CMS, analytics, uploads, payments, or stored personal data.
- Production hosting, deployment, protected-branch merge, domain/canonical configuration, or real contact credentials.
- Real business claims, real customer testimonials, real opening hours/policies, pricing, awards, statistics, or press logos.
- Arabic localization, checkout, booking, inventory, delivery calculation, or order management.

## Constraints

- Owner-release mode; proceed on safe reversible choices and stop at owner-gated actions.
- Royal dark green, cream, muted gold, charcoal, editorial typography, premium food imagery, controlled motion.
- No unstable image hotlinks; all third-party photos must be local, optimized, reusable, and documented.
- Builders may not approve their own work.
- No paid service, credentials, production action, merge, or deployment.

## Repository baseline

- Stack: no application stack existed; selected Next.js App Router, React, TypeScript, Tailwind CSS.
- Package manager: npm with committed lockfile.
- Deployment target: intentionally unspecified.
- Existing tests/CI: Agency OS validator test and Agency quality GitHub workflow.
- Protected existing behavior: original repository identity and Agency OS installation commit `fef9135`.
- Unrelated owner changes: none; worktree was clean before product planning.

## Acceptance criteria

- [ ] At 375px and desktop widths, the first view identifies custom cakes/pastries, Casablanca, and a primary WhatsApp action.
- [ ] Header, hero, five creations, custom service, four request steps, five occasion types, gallery, demo testimonials, six-topic FAQ, contact/form, and footer are complete in natural French.
- [ ] Every primary CTA produces a tested HTTPS WhatsApp URL with a French prefill and never claims order confirmation.
- [ ] The form blocks invalid required data, shows linked inline errors and a focusable summary, preserves input, and creates an honest message-ready state without storage or POST requests.
- [ ] Mobile menu, FAQ, anchors, form, and outbound links are keyboard usable with visible focus and no traps.
- [ ] Reduced-motion mode disables nonessential transforms, animation, and smooth scrolling while leaving all content available.
- [ ] All stock imagery is local, loads successfully, has correct dimensions/alt treatment, and is documented as demonstration imagery with source and author.
- [ ] Testimonials and fictional business details are visibly labeled as demo content; no unsupported claim, metric, award, urgency, exact price, or real-customer implication appears.
- [ ] Metadata, Open Graph image, favicon, semantic landmarks, French language, demo `noindex`, and custom 404 are present.
- [ ] No console error, broken internal link, placeholder `href="#"`, image failure, or horizontal overflow occurs at tested widths.
- [ ] Formatting, Agency validation, Python tests, lint, typecheck, unit/component tests, production build, and Playwright E2E all pass.
- [ ] Independent QA, accessibility, performance, and implementation reviews permit owner review, with limitations documented.

## Definition of done

- [ ] Every acceptance criterion is verified.
- [ ] Required quality gates pass or owner-visible exceptions are documented.
- [ ] Delivery packet is complete.
- [ ] No approval-gated action is implied as completed.

## Owner decisions required

None for the fictional test candidate. A real launch would require owner-approved WhatsApp/Instagram destinations, address/service area, hours, lead times, payment/change/cancellation/allergen wording, licensed final photography, and genuine testimonials.
