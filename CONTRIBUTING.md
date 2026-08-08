# Contributing

Thanks for taking the time to improve AGENTS.md Compactor.

## Before proposing a change

- Reproduce the behavior on current `main`.
- Keep the change bounded.
- Preserve source accounting and reconnectability.
- Do not silently change public evidence or historical metrics.
- Do not add network transmission, analytics, telemetry, storage, or training
  collection without an explicit product-direction decision.
- Do not present token, cost, latency, model-quality, or universal reduction
  claims without evidence.

## Verify your change

For code changes, run:

```sh
npm test
```

Also run:

```sh
git diff --check
```

If the change affects the fixed historical transformation, run:

```sh
node evidence/public_rc_v0_1/reproduce.mjs
```

## Describe your proposal

Explain:

- the problem;
- the bounded change;
- the verification performed; and
- any changed public claim or privacy boundary.

Clear, focused reports and pull requests make review easier. Thank you for
helping improve the project.
