# Handoff Guidance

<!-- source-span: S013-5f067dd8 -->
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
<!-- /source-span: S013-5f067dd8 -->

Canonical receipt name: `handoff`.
