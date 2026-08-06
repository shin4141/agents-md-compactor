# Repository Agent Rules

## Repository-wide Rules

- Never commit secrets.
- Do not overwrite unrelated user changes.
- Keep every task inside its authorized scope.

## Testing Workflow

When work changes behavior, run focused tests first and then the complete validation suite. Record fixture failures with the command that reproduced them.

## Release Workflow

When preparing a release or package, assemble the changelog, version metadata, and deployment checklist for review.

## Security Review

When a task handles credentials, permissions, or sensitive data, inspect the trust boundary and verify secret-handling behavior.
