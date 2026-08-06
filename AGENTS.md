# Receiver Operating Capsule

This repository is the standalone `shin4141/agents-md-compactor` product. It is
not a V13-series repository and must not import V13 production code. V11
Reconnectable Forgetting is the primary product concept; V13 supplies only the
operating discipline below.

## 1. Ownership and Authority

- Shin is the final Decision Owner.
- This execution thread is the sole implementation owner. Do not create a
  competing implementation thread or ask Shin to shuttle routine prompts.
- The implementation owner may choose ordinary implementation details within
  the frozen v0.1 boundary.
- Product direction, public claims, pricing, release, externalization,
  branding, and risk-tolerance changes require Shin's approval.
- Prior work, an artifact, or a passing test does not create new authority.

## 2. Current Gate and Completion

Current Gate:

The reviewed capsule-refit ancestry marker is
`022eadbc4f4e8cdf654ba655877a053fd50da282`.

Before selecting the Gate, refresh canonical `origin/main` and check whether
that marker is its ancestor:

```text
git merge-base --is-ancestor 022eadbc4f4e8cdf654ba655877a053fd50da282 origin/main
```

- If it is not an ancestor, the Gate is:
  `HOLD — capsule refit review / merge`.
- If it is an ancestor, the Gate is:
  `HOLD — ordinary-user-path dogfood before fictional sample or Fable`.

Do not infer either state from a PR's existence, this branch, or a stale local
checkout. This branch never authorizes dogfood before the marker is present in
canonical `main`.

The Lightweight Guidance Receipt marker is merged on canonical `main`. While
the reviewed capsule-refit marker is absent, the current work may repair only
repository-persistent operating instructions and handoff state. It does not
authorize live dogfood, a fictional measured sample, Fable review, a tag,
GitHub Release, npm publication, announcement, screenshot regeneration,
product expansion, classifier, router, UI, or behavior change.

After the marker is present in canonical `main`, the next authorized product
step is ordinary-user-path dogfood under `docs/live_dogfood_protocol.md`. It is
not Fable review; do not reuse the pre-merge documentation-only boundary to
describe the post-merge next action.

Do not claim a stage complete from file existence, a running UI, partial
generation, or a happy-path test alone. Each stage must record:

- what changed;
- what was verified;
- what remains unresolved;
- the next safe action;
- what must not happen next;
- a restartable handoff.

Keep `handoff/current_handoff.md` current at every bounded stage boundary.

## 3. Frozen v0.1 Product Boundary

Input:

- one pasted `AGENTS.md`;
- one mode: Conservative, Balanced, or Aggressive.

Output:

- a generated active `AGENTS.md`;
- non-empty condition-routed Markdown guides as needed;
- a move map showing what moved and why;
- actual complete active-file reduction and separate source-externalization
  facts;
- one outcome: `COMPACTED` or `NO_ACTIVE_REDUCTION`;
- a Lightweight Guidance Receipt contract in generated outputs;
- explicit copy, Review with your AI, and ZIP export actions.

Preserve the original input and generated artifacts separately.
The deterministic classifier may recognize bounded English and Japanese
operational terms. Review with your AI copies a package for the user to paste
elsewhere; it does not call an external model.

The product must not expand into:

- repository scanning or nested `AGENTS.md` resolution;
- automatic repository writes or source-file replacement;
- agent-specific adapters or hooks;
- runtime recall or instruction-obedience guarantees;
- repository-aware stale detection;
- accounts, authentication, analytics, billing, or hosting infrastructure;
- Decision-OS framework integration;
- safety certification or semantic-equivalence claims;
- unmeasured performance, token, money, or time-saving claims.

Use a concrete CAP or return to HOLD rather than widening the product.

## 4. Compactor-specific Integrity Guards

- Treat this repository's root `AGENTS.md` as the source operating capsule.
  Treat every `AGENTS.md` emitted by Compactor as a generated artifact. Keep
  source and generated files separately identified; never overwrite or
  substitute one for the other by inference.
- Do not feed a Compactor-generated `AGENTS.md` or package back into Compactor
  as an ordinary source. A recursive-compaction experiment requires separate
  explicit authorization and exact input provenance. If input identity is
  uncertain, stop at `HOLD` and record `UNKNOWN`.
- User-equivalent dogfood must be configured by repository-persistent
  instructions. A transient chat prompt, developer-only instruction, or
  hand-written feather marker cannot establish user-equivalent behavior or
  valid marker evidence.
- Preserve source accounting, active safety and authority boundaries, and
  reconnect routes when evaluating generated output. If an instruction,
  boundary, source identity, or route cannot be accounted for, do not call the
  result complete.
- The Lightweight Guidance Receipt generated by the product is a declaration,
  not proof of guide reading or runtime compliance. Do not hand-write a marker
  instruction into this source capsule.
- Confirm repository, commit, source input, mode, and generated-package
  identity before relying on a dogfood or review result. Do not guess Missing
  Closure or upgrade stale evidence into current proof.

## 5. Forward-Only Changes and Evidence

- Do not silently rewrite an accepted product boundary.
- Record a scope change with its reason, impact, rollback, and reevaluation
  condition, and obtain Shin's approval when it changes product direction or
  externalization.
- Keep rollback simple and explicit.
- Separate implemented, tested, locally demonstrated, publicly released, and
  externally adopted claims.
- A local demonstration is not evidence of general reliability or adoption.
- The product must not state that an agent is guaranteed to obey routed
  guidance.

## 6. Routine Responsibility

The implementation owner must close routine branch cleanup, local setup,
dependency selection within scope, test grouping, ordinary file organization,
and routine error correction. Do not return those decisions to Shin.

Ask Shin only for product direction, externalization, risk tolerance, branding,
release, pricing, public claims, or another explicit approval boundary.

## 7. Conditional Guidance

- Before running live Compactor dogfood, installing its generated package,
  starting the fresh dogfood session, interpreting its receipt, creating the
  later fictional measured sample, or beginning Fable review: read
  `docs/live_dogfood_protocol.md`.
- Before changing a public README claim or making a marker, guide-reading,
  compliance, reduction, token, cost, time, or performance claim: read
  `validation/lightweight_guidance_receipt_feather_marker_v0_1.md` and the
  evidence boundary in `README.md`.
- When the user selects `Handoff`: read `docs/handoff_command.md`.
- When the destination purpose or a material operating surface changes: read
  `docs/capsule_fit_audit.md`, re-run the Fit Audit, and update that same
  canonical record before authorizing the changed work.

## 8. Handoff

When the user selects `Handoff`, follow `docs/handoff_command.md`.

A handoff is not complete until the receiver knows what it owns. Preserve the
current source of truth, Gate, Completion Line, Missing Closure, next action,
next owner, rollback path, prohibited continuation, and routine work that must
not be returned to Shin.
