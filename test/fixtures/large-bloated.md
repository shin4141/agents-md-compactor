# Agent Operating Manual

## Always Required

- The Decision Owner keeps final authority.
- Never commit secrets.
- Keep all work inside the authorized repository and task.

## Architecture Notes

The application uses a layered architecture with a pure domain module, an adapter boundary, and a presentation layer. Domain modules depend only on values passed by the caller.

- Presentation code may call the domain module.
  - Exception: formatting helpers may live beside the presentation component.
  - Domain code may not import presentation components.

### Dependency Direction

Dependencies point inward toward the domain contract. Structural changes should preserve that direction.

## Migration Procedure

When a schema migration is required, keep the ordered procedure together:

1. Capture the current schema version.
2. Generate the compatibility transform.
3. Run the conversion fixture.
4. Record the rollback version.

Use this probe to explain the required verification:

```sh
tool migrate --check-only
# This heading is code, not a Markdown section:
## verify-output
```

## Handoff Workflow

When pausing work or transferring ownership, record the active branch, current source of truth, unresolved work, next owner, and first safe action.

## Incident History

The 2024 outage came from a partial rollback that restored application code but not configuration. Recovery now keeps configuration and code rollback steps in the same incident record.

## Context Record Alpha

Historical context: the first prototype used a single large configuration object. That shape was retained for two iterations because it made experiments fast, but it is not a current architectural requirement.

## Reference Notes

Background from the earlier prototype: reviewers asked for verbose diagnostic messages, repeated examples, and a long rationale beside each setting. These notes remain useful only when revisiting diagnostic design.

## Conditional Operations

When an optional local diagnostic is useful, run it once and preserve its output beside the task notes. This is contextual guidance and is not a repository-wide rule.
