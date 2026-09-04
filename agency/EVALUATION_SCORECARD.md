# Agency Evaluation Scorecard

Do not judge the system only by whether it generated many files. Run repeatable evaluation projects and track both output quality and autonomy.

## Per-milestone score

| Dimension | Weight | Question |
| --- | ---: | --- |
| Outcome completeness | 20 | Did the result satisfy every owner acceptance criterion? |
| Correctness and reliability | 20 | Did automated and manual checks find unresolved defects? |
| UX and visual quality | 10 | Is the experience coherent, responsive, and intentional? |
| Security and privacy | 10 | Were trust boundaries and abuse cases handled? |
| Accessibility | 10 | Are critical flows keyboard/assistive-tech usable? |
| Performance | 10 | Was performance measured and kept inside project targets? |
| Scope discipline | 5 | Did the agency avoid unrelated changes and invented requirements? |
| Evidence quality | 5 | Can every completion claim be verified? |
| Owner interruption rate | 5 | How many routine questions reached the owner? Lower is better. |
| Rework efficiency | 5 | Was feedback diagnosed and corrected without unnecessary regeneration? |

## Operational metrics

Track over time:

- milestones accepted on first owner review;
- owner-detected defects by severity;
- internal defects caught before owner review;
- average rework cycles;
- routine owner interruptions per milestone;
- scope-drift incidents;
- CI pass rate on first pull request;
- escaped production incidents;
- median cycle time from brief to owner packet;
- token/compute cost per accepted milestone;
- percentage of claims with direct evidence;
- skipped quality gates and reasons.

## Benchmark set

Maintain a small private benchmark:

1. new responsive landing page from a short brief;
2. multi-step authenticated dashboard feature;
3. reproduced and fixed browser regression;
4. database migration with rollback and attack tests;
5. performance remediation with before/after measurements;
6. owner rejection requiring a materially different redesign.

Reuse the same briefs after skill changes to detect regressions in autonomy, correctness, and cost.
