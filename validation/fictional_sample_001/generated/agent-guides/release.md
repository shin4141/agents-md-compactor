# Release Guidance

<!-- source-span: S010-ee535b56 -->
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
<!-- /source-span: S010-ee535b56 -->

Canonical receipt name: `release`.
