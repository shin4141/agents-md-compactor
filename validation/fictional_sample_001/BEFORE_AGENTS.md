# Lumen Draft Repository Instructions

Lumen Draft is a desktop-first collaborative writing application for editorial
teams. The repository contains a Rust document engine, a TypeScript desktop
shell, a small synchronization service, and shared format fixtures. Documents
must remain usable offline; synchronization is optional and must never be
required to open or export local work.

## Authority and ownership

- The repository maintainers own product and architecture decisions. The
  on-call maintainer owns operational decisions during an incident.
- Ask for maintainer approval before changing the document format, sync
  protocol, cryptographic choices, telemetry posture, supported platform
  matrix, licensing, or release channels.
- Treat user documents as user-owned data. Do not upload, delete, rewrite, or
  migrate a real document merely to debug a problem.
- Do not claim that a change is released, deployed, backwards compatible, or
  lossless until the corresponding verification has completed.
- Prefer the smallest change that resolves the stated problem. Record adjacent
  risks instead of expanding a patch into an unrequested redesign.

## Non-negotiable safety boundaries

- Never commit credentials, document contents from users, signing keys,
  production database exports, or unredacted crash reports.
- Never disable encryption, signature verification, access checks, or update
  verification to make a test pass.
- Never run destructive maintenance against production from a development
  command. Production changes require the documented operator path and a named
  human approver.
- Never make a network call from the document engine. The engine must be usable
  in a process with networking denied.
- Preserve the original file until a replacement has been fully written,
  flushed, and atomically renamed. Recovery code must prefer duplication over
  silent data loss.
- Generated fixtures may be replaced only by their documented generator. Do
  not hand-edit generated snapshots and call the result canonical.
- Do not weaken or delete a failing regression test without explaining why the
  asserted behavior is no longer part of the product contract.

## Repository shape and architecture

- `crates/document-core/` owns parsing, editing, undo history, deterministic
  serialization, and local recovery. It has no UI or network dependencies.
- `crates/sync-protocol/` owns wire types, protocol versions, merge semantics,
  and compatibility fixtures. It may depend on document-core, never on the
  desktop shell.
- `apps/desktop/` owns windows, menus, filesystem prompts, update UX, and the
  bridge into the Rust engine. Business rules do not belong in view
  components.
- `services/relay/` is a stateless encrypted-operation relay. It must not need
  document plaintext and must not become the canonical copy of a document.
- `packages/test-documents/` contains synthetic fixtures only. A fixture that
  resembles a real manuscript must still be invented and reviewed for secrets.
- Dependencies point inward toward document-core. Avoid a shared `utils`
  package when a concept has a clear owner.
- Public format and protocol types require explicit versioning. Internal UI
  state does not become a wire field for convenience.

## Working defaults

- Start by reading the nearest module README and existing tests for the area
  being changed.
- Keep source changes focused. Do not mix formatting sweeps, dependency
  upgrades, generated artifacts, and behavioral changes in one commit.
- Use repository scripts rather than recreating their command sequences by
  hand. If a script is wrong, repair it in the same patch and explain the
  difference.
- Add or update a regression test for every user-visible bug fix when the
  behavior can be reproduced deterministically.
- Preserve stable error codes and structured fields. Human-readable error text
  may improve, but automation must not depend on punctuation or prose.
- Treat warnings as useful product signals. Do not blanket-suppress them; fix
  the cause or scope the suppression to a documented false positive.
- Keep logs free of document text, selections, filenames, email addresses,
  access tokens, and raw operation payloads.
- Before handing work off, report what changed, what was verified, and what is
  still uncertain.

## Verification baseline

- Run formatting and the narrowest relevant tests while iterating.
- Before declaring a patch ready, run `cargo test --workspace` and
  `pnpm test`. If either suite cannot run, state the exact blocker and do not
  substitute a partial check without saying so.
- Run `pnpm lint` for TypeScript or UI changes and `cargo clippy --workspace
  --all-targets -- -D warnings` for Rust changes.
- For serializer or parser changes, round-trip every versioned fixture and
  compare the semantic document tree as well as emitted bytes.
- For filesystem or recovery changes, exercise interruption before write,
  during temporary-file write, before rename, and after rename.
- For sync changes, test two-client convergence, duplicate delivery,
  out-of-order delivery, reconnect after a long offline interval, and an old
  supported client paired with the new implementation.
- Do not describe manual clicking as automated coverage. Record manual checks
  separately with platform and build identity.

## When changing the document format

Document-format work includes adding or removing stored fields, changing
serialization order, altering normalization, or changing how unknown fields
are preserved.

1. Write a short compatibility note in `docs/format/changes/` with the old and
   new behavior, affected versions, and rollback limits.
2. Add a golden document written by the previous stable build and keep it
   immutable.
3. Implement readers before writers. A released reader must understand the new
   form before any stable writer emits it.
4. Preserve unknown fields when a document is opened and saved by a version
   that does not interpret them.
5. Run the format matrix with the oldest supported reader, current stable, and
   the candidate build.
6. Obtain maintainer approval for the format-version increment.

Use this compatibility note template:

```markdown
# Format change: <short name>

- Oldest readable version:
- First writing version:
- Unknown-field behavior:
- Upgrade path:
- Downgrade behavior:
- Rollback limit:
- Fixtures added:
```

## When changing synchronization behavior

Synchronization behavior includes operation encoding, merge ordering,
acknowledgement rules, retry policy, membership enforcement, or relay storage.

- Write the invariant first in `docs/sync/invariants.md` and link the test that
  enforces it.
- Keep operation identifiers stable across retries. A retry must not create a
  second logical edit.
- Assume delivery can be delayed, duplicated, and reordered. Do not rely on
  wall-clock ordering for correctness.
- Test with plaintext inspection disabled; the relay must remain unable to
  derive document contents.
- Add a protocol fixture for every new message form and retain old fixtures for
  the full support window.
- If a new client can emit behavior an old client cannot safely ignore, gate
  emission on negotiated capability rather than application version text.
- Record the relay rollout order, mixed-version interval, observable failure
  signal, and rollback step before deployment.

For a sync pull request, include this checklist in the description:

```markdown
- [ ] convergence cases added or unchanged
- [ ] duplicate and out-of-order delivery tested
- [ ] mixed-version behavior tested
- [ ] relay cannot observe plaintext
- [ ] retry identity preserved
- [ ] rollout and rollback written down
```

## When adding or changing a database migration

The relay database stores account, workspace, device, and encrypted-envelope
metadata. It does not store document plaintext.

- Make forward migrations safe to retry after interruption.
- Avoid long table rewrites in a single transaction. Use expand/backfill/
  contract for large or highly active tables.
- Keep the application compatible with both sides of a rolling migration until
  the contract step is explicitly scheduled.
- Backfills must be resumable, rate limited, and observable without logging
  protected values.
- Supply a read-only preflight query, an estimated lock profile, and a rollback
  or roll-forward decision point.
- A destructive contract migration requires a separately approved backup
  verification and cannot ship in the same release that first stops writing
  the old shape.

Migration record template:

```markdown
Migration:
Owner:
Expected rows:
Lock behavior:
Preflight:
Backfill cursor:
Mixed-version window:
Rollback or roll-forward point:
Post-check:
```

## When preparing a desktop release

Only a maintainer may authorize a release candidate or stable release. Agents
may assemble evidence and draft notes but must not publish, sign, notarize, or
promote a build without that authorization.

1. Start from a clean commit on the release branch and record the commit hash.
2. Run the full verification baseline on the pinned toolchain.
3. Build macOS, Windows, and Linux artifacts in the release workflow; do not
   substitute a developer workstation build.
4. Verify signatures, package manifests, update metadata, and SHA-256 values.
5. Exercise open, edit, crash-recovery, export, and update-from-previous-stable
   on each supported platform.
6. Confirm the candidate can read the oldest supported document fixture and
   that current stable can safely reject or preserve candidate-only data.
7. Draft release notes that separate fixes, behavior changes, known limits,
   and migration concerns.
8. Wait for maintainer approval before publishing artifacts or updating the
   release channel.

If a release is aborted, preserve the candidate logs and hashes, mark the
version as unused, and begin a new candidate from a new commit. Never replace
an artifact under an existing version.

## When responding to an incident

An incident is suspected data loss, unauthorized access, signing-key exposure,
corrupt update delivery, widespread sync divergence, or sustained inability to
open local documents.

- Stop normal release work and notify the on-call maintainer through the
  private incident channel.
- Preserve logs, build identities, timestamps, and affected version ranges.
  Redact document content and credentials before sharing evidence.
- Prefer containment that preserves local document access. Do not remotely
  disable the offline editor as a first response to a relay incident.
- Do not rotate keys, delete relay data, revoke all devices, or issue a public
  statement without the incident commander's approval unless the documented
  emergency authority explicitly applies.
- Maintain an event timeline that distinguishes observed facts, hypotheses,
  decisions, and actions.
- Record the recovery test and rollback trigger before applying a broad fix.
- After containment, create a blameless review with corrective actions and
  named owners. Security-sensitive details remain in the restricted record.

Incident update template:

```markdown
Time (UTC):
Coordinator:
Observed impact:
Confirmed facts:
Current hypothesis:
Containment in effect:
Next decision and deadline:
Evidence location:
```

## When changing platform support

- Changes to the minimum macOS, Windows, or Linux version require a maintainer
  decision and a compatibility note.
- Test filesystem semantics on a real representative platform when changing
  locking, atomic rename, path normalization, or case handling.
- Preserve readable export formats even when an operating system leaves the
  supported matrix.
- For a toolchain or runtime floor increase, document the user-visible reason,
  affected contributor setup, release impact, and rollback plan.
- Do not infer platform compatibility from successful compilation alone.

## Handoff and restart procedure

Use a durable handoff when work crosses sessions, changes owner, or stops with
an unresolved risk. Update the existing task record rather than creating a
parallel source of truth.

The handoff must contain:

- task goal and explicit non-goals;
- branch and exact commit;
- files changed and generated files, if any;
- verification completed with exact commands and outcomes;
- unresolved facts labeled `UNKNOWN`;
- next safe action and its owner;
- rollback or recheck path;
- actions that must not happen next.

On restart, confirm the repository, branch, commit, and working-tree state
before continuing. Re-run any check whose inputs changed after the handoff.
Do not interpret a previous agent's confidence as verification evidence.

## Review checklist

Use this checklist when reviewing a change, omitting items that genuinely do
not apply and explaining any safety-critical omission.

- [ ] Authority and requested scope are clear.
- [ ] Document ownership and offline access are preserved.
- [ ] Architecture boundaries still point inward.
- [ ] Logs and fixtures contain no private document data.
- [ ] Relevant narrow tests and repository-wide baselines passed.
- [ ] Format, protocol, migration, or platform compatibility was checked when
      affected.
- [ ] Release and operational claims match completed evidence.
- [ ] Rollback or recovery is explicit for risky changes.
- [ ] Remaining uncertainty is named rather than implied away.
