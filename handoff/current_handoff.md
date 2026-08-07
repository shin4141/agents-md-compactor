# Current Handoff

## Product anchors

- Decision Owner: Shin
- Product: standalone `AGENTS.md Compactor`; not a V13-series product
- Canonical repository: `https://github.com/shin4141/agents-md-compactor`
- Canonical branch: `main`
- Repository visibility: `PUBLIC`
- Private source RC:
  `f697759dfc20d5406eef6b18b6a83654328c58cc`
- Clean public RC review base:
  `b60236dff97f8c026865f609f4db480428209c81`
- Private archive: `shin4141/agents-md-compactor-private-archive` — remains
  `PRIVATE`
- Canonical historical evidence:
  `evidence/public_rc_v0_1/EVIDENCE.md`
- Screenshot capture specification:
  `docs/public_screenshot_plan_v0_1.md`
- Public-export sanitization record:
  `validation/public_export_sanitization_v0_1.md`

## Current state

The clean public genesis, authorized sanitization, Apache-2.0 license,
A-2 screenshots, automated tests, evidence reproduction, unauthenticated
public-read verification, and both earlier PRs are complete. PR #1 merged as
`814f57aa187bd597169c8a137ac15d6915b6c562`. The Lightweight Guidance Receipt
marker PR #2 merged as canonical main
`437c9f882493a015738d70e8cc89f063c547b2df`.

The marker is shipped in generated output as `🪶 Core only` or
`🪶 Core + <guides actually read>`. It remains a declaration, not proof of
guide reading or runtime compliance. The capsule-refit PR #3 merged as
canonical main `c93e3db7fb2eb0d9327e3ef14963ab370731ec32`. Live Dogfood
Observation 002 established one local zero-guide receipt observation. Its
bounded settlement is under Draft PR #4 review and is controlled by the
settlement ancestry marker in the Current Gate section below.

Observation 002 does not establish general compliance, conditional-guide
reporting, or reconnect-target behavior. It does not authorize the fictional
sample, and Fable has not begun.

## Audit lineage

These audits have distinct scopes and must not be collapsed into one result.

### Opus — private product and evidence audit

- Audited fixed private product commit:
  `109d52ba59e3bc334c4de8bd8d1975deb0f012d9`
- Delivery capsule SHA-256:
  `90729379f9d5225c8f1fa54b73a10b3fb1b59402cb6e4ff2d7965403e1daf6c6`
- Verdict: `HOLD — bounded repairable gaps remain`
- Established:
  - 60/60 embedded files matched hashes and byte counts
  - 20,664 → 14,284 / 30.9% independently reproduced
  - 41/28/13 accounting and 10 reconnect routes
  - 13/13 moved bodies byte-preserved
  - 106/106 tests passed at the audited commit
  - no concrete meaning-destruction finding; all moved spans were conditional;
    universal and ambiguous spans remained active
  - reconnectability and shipped local-processing boundaries supported
  - credible non-developer-led human–AI development supported as Decision
    ownership and acceptance-criteria design, not coding novelty
- HOLD reason: public evidence packaging and public-copy disclosure, not core
  product failure
- Current closure status:
  - R1 self-contained public evidence: CLOSED
  - R2 direct historical regression test: CLOSED
  - R3 package total +56.7% disclosure: CLOSED
  - R4 same three-mode result disclosure: CLOSED
  - R5 tracked/openable evidence surface: CLOSED
  - R6 Apache-2.0 license: CLOSED
  - R7 file-scheme meta CSP: OPEN — LOW; known boundary, not an Opus-defined
    Fable blocker

### Sonnet — four-product comparison claim-boundary audit

- Scope: supplied source summaries and linked primary sources for AGENTS.md
  Compactor, Ponytail, RTK, and OSI; not a repository-wide code audit
- Verdict: `REVISE — bounded wording corrections are required`
- Product results: AGENTS.md Compactor PASS; Ponytail PASS; OSI PASS; RTK
  REVISE only because its compact wording must retain the Bash-routed
  limitation
- Whole-graphic corrections:
  - add a Bash-routed or equivalent limitation to the RTK compact label
  - state that placement reflects each product's primary target, not exclusive
    scope
- Does not establish token, billed-cost, task-quality, performance, or
  product-superiority claims

### GPT — fixed public RC documentary consistency review

- Reviewed: `b60236dff97f8c026865f609f4db480428209c81`
- Verdict before repair: `HOLD — active operating state and one evidence As-of
  statement are stale`
- Repair surface: PR #1, five documentary files only
- No README, product source, screenshot, historical metric, or LICENSE change

### GPT — final marker PR review

- Final marker PR review head:
  `f3d19b398dc2630b05ee78cfbcea6096b504f4cc`
- Verdict: `PASS — ready for Shin merge authorization`
- Established:
  - exact feather-marker formatter syntax
  - generated receipt contract
  - declaration/non-proof boundary
  - no token, cost, time, or performance claim
  - 108 tests PASS
  - evidence reproduction PASS
  - 20,664 → 14,284 / 30.9% preserved
  - package 32,383 / +56.7% preserved
  - 41/28/13, 13/13, and 10 routes preserved

### Fable — pending

Fable review has not begun. The required order is Observation 002 settlement
review / merge, a separate fictional measured sample, and only then Fable
read-only review.

Fable must distinguish proven fixed-corpus facts; structurally plausible but
unmeasured repeated-use and future-bloat value; and unsupported token, cost,
latency, model-performance, semantic-equivalence, runtime-obedience, adoption,
and superiority claims.

Any decision to place the Fable conversation URL in README remains Shin's
separate explicit decision after reading the complete conversation.

## Exact verification

- metric: Unicode code points, LF, trailing newline included
- original active file: 20,664 code points
- generated active file: 14,284 code points
- actual active reduction: 6,380 / 30.9%; `COMPACTED`
- complete package: 32,383 code points; +56.7% versus the original
- accounting: 41 total / 28 retained / 13 moved / 0 folded / 0 deleted / 0
  unaccounted
- moved bodies: 13 of 13 exact
- reconnect routes: 10
- Apache-2.0 LICENSE SHA-256:
  `c71d239df91726fc519c6eb72d318ec65820627232b2f796219e87dcf35d0ab4`
- tracked input/mode screenshot SHA-256:
  `e650e12d15e5f4382670739094d1f7e8001c6ac4de79b5ef380d1c000d32bc4c`
- tracked result-metrics screenshot SHA-256:
  `69866a5415ad135ff9b367865294cb7e5d20a450c51ef1cdfb03cfa417edcc0d`
- tracked artifacts/review screenshot SHA-256:
  `f7fdd314c9a2c4d085ef679b845fed79a14220cd868b1434e2552d523280b01d`
- offline reproduction:
  `node evidence/public_rc_v0_1/reproduce.mjs`
- test suite: 108 passed, 0 failed, 0 cancelled, 0 skipped, 0 todo

## Required handoff fields

**Current Layer:**
`V11 — Reconnectable Forgetting / AGENTS.md Compactor`

**Current Gate:**

The reviewed Observation 002 settlement ancestry marker is
`97857d8e52de63520fb0142573dd8387a954660a`.

After refreshing canonical `origin/main`, determine the Gate with:

```text
git merge-base --is-ancestor 97857d8e52de63520fb0142573dd8387a954660a origin/main
```

- Marker absent from canonical `main`:
  `HOLD — Observation 002 settlement review / merge`.
- Marker present in canonical `main`:
  `HOLD — fictional measured sample before Fable`.

Do not use this branch, PR existence, or a stale checkout as a merge
substitute. The absent marker does not authorize the fictional sample or imply
that Observation 002 settlement is complete.

**Current Source of Truth:**

- Canonical product main:
  `c93e3db7fb2eb0d9327e3ef14963ab370731ec32`.
- Capsule-refit ancestry marker (merged through PR #3):
  `022eadbc4f4e8cdf654ba655877a053fd50da282`.
- Reviewed Observation 002 settlement Draft PR:
  `https://github.com/shin4141/agents-md-compactor/pull/4`.
- Reviewed Observation 002 settlement ancestry marker:
  `97857d8e52de63520fb0142573dd8387a954660a`.
- V13 capsule-standard source:
  `shin4141/decision-os-v13-loopkit@c81b907951cb223106717b040aa2da034800d81d`.
- Canonical durable Fit Audit record:
  `docs/capsule_fit_audit.md`.
- Conditional live sequence:
  `docs/live_dogfood_protocol.md`.
- Live dogfood record:
  `validation/live_dogfood_observation_002.md`.

**Completion Line:** If the settlement marker is absent, Observation 002 is a
reviewed settlement candidate and PR #4 review / merge remains open. If it is
present, Observation 002 records a local fresh-session `🪶 Core only` receipt
for the generated zero-guide package without a transient marker prompt; the
next Gate is held for a separately authorized fictional measured sample before
Fable.

**Missing Closure:**

- If the settlement marker is absent: review / merge of Draft PR #4; the
  separate fictional `AGENTS.md` measured sample; Fable read-only review; and
  any separately authorized announcement decision.
- If the settlement marker is present: the separate fictional `AGENTS.md`
  measured sample; Fable read-only review; and any separately authorized
  announcement decision. PR #4 review / merge is no longer Missing Closure.

**Next Owner:** The executing AI owns Observation 002 settlement integrity,
PR #4 review / merge hygiene while its marker is absent, preservation of the
remaining `UNKNOWN`s, validation, and handoff hygiene. Shin retains the final
Seat and merge authority. The executing AI does not gain authority to start the
fictional sample.

**What the Receiving AI Now Owns:** Preserve the Observation 002 record,
including its zero-guide scope, A-3 invalid-observation boundary, and remaining
`UNKNOWN`s. While the settlement marker is absent, own PR #4 review / merge
hygiene; after it is present, preserve the settled record. Do not promote the
result to general compliance, erase unresolved conditional-guide or reconnect
behavior, or start the fictional sample without separate authority.

**Next Authorized Action:** If the settlement marker is absent, review and,
only with Shin's authorization, merge PR #4. If it is present, no fictional
sample authorization is carried by this record; with separate authorization,
the next product stage is the fictional `AGENTS.md` measured sample, not Fable.

**First One Action:** Refresh canonical `origin/main` and run the settlement
ancestry check above. If absent, reconnect to PR #4 review / merge; if present,
keep the Gate at `HOLD` until Shin separately authorizes the fictional measured
sample. Before that sample, read `docs/live_dogfood_protocol.md`.

**Rollback or Recheck Path:** If the marker is absent, leave canonical main
unchanged and close or revise PR #4 only as documentary settlement work. If it
is present, recheck Observation 002 against
`validation/live_dogfood_observation_002.md`, its source and generated hashes,
and its claim boundary. If a discrepancy is found, preserve it as observation
evidence, update the same Fit Audit record, and remain `HOLD`; do not repair
product behavior inside that review.

**Known Boundaries:** Observation 002 is one local zero-guide result.
Observation 001 remains transport-incomplete, and A-3 is an invalid
wrong-workspace observation. Unicode code points are not tokens. The complete
package can be larger than the source. Routes and the receipt do not guarantee
runtime compliance. Nonzero-guide reporting and automatic recursive-input
detection remain `UNKNOWN`, and repository reconnect-target use was not
exercised in the fresh context. No token, cost, latency, model-performance,
safety, adoption, or public-release claim is established.

**Do Not Continue Boundary:** Do not begin the fictional sample or Fable, run
Compactor again, replace a source with generated output, add a feather marker
manually, or change product behavior, classifier, router, UI, tests, evidence,
screenshots, README claims, LICENSE, visibility, tags, GitHub Releases, npm
publication, or announcements without separate authorization.

**What must not be returned to the Decision Owner:** routine wording, checksum
maintenance, test grouping, branch cleanup, deterministic evidence maintenance,
or handoff hygiene. Ask Shin only for a real direction, risk, public-claim,
externalization, or merge decision.
