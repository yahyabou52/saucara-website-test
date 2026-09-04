# Assumptions

### 2026-09-04 — Numberless WhatsApp composer is the safe demo destination

- **Assumption:** Because no business number was provided, CTAs may use `https://wa.me/?text=...` and let WhatsApp choose the recipient.
- **Why needed:** Inventing a Moroccan phone number could contact a real person; leaving CTAs inert would fail the core journey.
- **Evidence:** Owner requires prefilled WhatsApp links but supplied no number; product and architecture reviews independently recommend the generic composer.
- **Reversible:** yes; one optional configuration value can add an approved number later.
- **Validation:** Inspect every CTA/form-generated href and test the composer URL shape without sending a message.
- **Status:** active for demo; production recipient not verified.

### 2026-09-04 — All brand operations are fictional demo content

- **Assumption:** Opening hours, policies, testimonials, Instagram presence, and location details beyond Casablanca may be written as plausible examples only when visibly marked fictional.
- **Why needed:** The owner explicitly describes a fictional studio and requires these sections.
- **Evidence:** Owner brief and decision-rights rules prohibit invented public claims.
- **Reversible:** yes; replace centralized content after owner approval.
- **Validation:** On-page disclosure, copy audit, and documentation review.
- **Status:** active.

### 2026-09-04 — Free stock imagery may demonstrate art direction

- **Assumption:** Pexels imagery can be used locally as licensed demonstration photography when author/source/license and the non-portfolio status are disclosed.
- **Why needed:** No customer photography was provided and the owner permits reusable placeholder assets.
- **Evidence:** Selected Pexels pages label the photos free to use; each source will be recorded in `docs/ASSETS.md`.
- **Reversible:** yes; assets are isolated and can be replaced without layout changes.
- **Validation:** Source-page audit, local image load tests, and visible demo notice.
- **Status:** active.

### 2026-09-04 — French-only is sufficient for this milestone

- **Assumption:** Natural French with Morocco/Casablanca context satisfies the target experience; Arabic/RTL is not required now.
- **Why needed:** The owner names French as primary and does not request localization.
- **Evidence:** Explicit brief.
- **Reversible:** yes; content is centralized for later localization.
- **Validation:** French copy review and `lang="fr"` verification.
- **Status:** validated.
