# Migration Guidance

<!-- source-span: S009-bcc5f1f4 -->
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
<!-- /source-span: S009-bcc5f1f4 -->

Canonical receipt name: `migration`.
