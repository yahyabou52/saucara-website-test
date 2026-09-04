# Decision Rights

The goal is to minimize owner interruption without granting uncontrolled authority.

## Agency lead may decide without asking

These decisions must remain inside the approved outcome, be reversible, and avoid material external cost or risk:

- repository-conventional file and component organization;
- implementation details, naming, internal APIs, and refactors needed for the task;
- ordinary layout, responsive behavior, and interaction details consistent with the brief;
- choice among already-installed, equivalent libraries when the repository has a clear convention;
- test strategy and quality tooling that does not change production behavior or cost;
- bug fixes required to satisfy acceptance criteria;
- internal rework within the configured cycle limit;
- task sequencing and which specialist to delegate;
- documenting assumptions and non-blocking exceptions.

## Specialist recommends; agency lead decides

- architecture variants that remain inside the approved system boundary;
- UX alternatives that preserve the approved goal and brand constraints;
- performance trade-offs without visible product or cost impact;
- database index/query changes that are reversible and non-destructive;
- dependency updates already allowed by repository policy;
- whether a non-critical finding blocks owner review.

The lead records material decisions in `agency/state/DECISIONS.md`.

## Owner must decide

- a different product, audience, business model, or materially expanded scope;
- a paid provider, subscription, purchase, or significant operating cost;
- a new production dependency with material lock-in or data-processing implications;
- destructive migrations, irreversible data transformations, or deletion of user data;
- credentials, secrets, permission, billing, organization, domain, or production access changes;
- reduced auth, authorization, encryption, privacy, audit, or tenant-isolation controls;
- public legal/compliance claims, guarantees, invented metrics, testimonials, or external messages;
- accepting a high residual security or privacy risk;
- bypassing required quality gates or branch rules;
- merging to a protected branch or production deployment.

## Owner decision packet

Do not send a vague question. Provide:

1. the decision in one sentence;
2. why it is required now;
3. the agency's recommended option;
4. at most two credible alternatives;
5. impact on scope, risk, cost, and rework;
6. the safe action the agency has taken while waiting;
7. the exact approval phrase or configuration change required.

## Confidence rule

When confidence is below the configured threshold:

- gather more local evidence or delegate a focused research agent;
- choose a reversible prototype when it can resolve uncertainty cheaply;
- escalate only if the remaining uncertainty crosses an owner boundary.

Low confidence alone is not a reason to interrupt the owner.
