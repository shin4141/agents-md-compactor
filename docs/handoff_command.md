# Handoff Command

When the user selects `Handoff`, generate a compact, paste-ready transfer for
the next chat, AI, or Codex session. This command transfers current operational
state; it does not authorize new work, choose product direction, or hide
missing closure.

Include these fields:

- Target Layer
- Repo Root
- Current State
- Current Gate
- Active Branch
- Current Source of Truth
- Next Authorized Action
- Completion Line
- Missing Closure
- Next Owner
- What the Receiving AI Now Owns
- First One Action
- Rollback or Recheck Path
- Do Not Continue Boundary
- What must not be returned to the Decision Owner

Rules:

- Distinguish completed work, unresolved work, and routine cleanup.
- If identity or ownership is unknown, write `UNKNOWN` and do not imply PASS,
  acceptance, or closure.
- Name the earliest bounded action and its owner whenever executable work
  remains.
- `First One Action: none` is valid only when no authorized or routine work
  remains and the active branch and next authorized action are both `none`.
- Preserve implemented, tested, locally demonstrated, publicly released, and
  externally adopted as separate claims.
- Do not return routine execution or cleanup to Shin.
- Do not authorize implementation beyond the frozen v0.1 boundary, outreach,
  publication, release, pricing, or public claims unless already approved.
- End with the Completion Line.
