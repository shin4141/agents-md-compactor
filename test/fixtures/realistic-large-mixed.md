# Repository Playbook / リポジトリ運用手順

## Core rules / すべての作業に適用

For every task, confirm the requested scope, preserve the user's source text, and inspect the current state before editing. すべてのタスクで変更対象を明確にし、依頼された範囲だけを扱う。The Decision Owner retains product direction, release, branding, pricing, and public claims. Never expose secrets. ソースファイルの自動置換は禁止する。Report changed files, exact verification, remaining limits, and the next bounded action. Local evidence describes the local run rather than general reliability.

## Testing / テストと検証

When a task involves tests, verification, validation, fixtures, 回帰, 動作確認, or 失敗確認, start with the smallest check that directly covers the changed boundary. 別の担当者が再現できるように、実行したコマンドと結果を正確に記録する。Expand from a focused test to the relevant suite after the focused behavior succeeds. For a defect, keep a fixture that reproduces the original failure and an assertion that protects the correction. 決定的な出力では、部分文字列だけでなく完全な値または安定ハッシュを比較する。

When verification fails, distinguish implementation behavior from stale expectations, environment setup, and timing. 入力原文が変化していないことを確認し、生成された各成果物を独立して点検する。For an intentional deterministic change, review the complete output and block ledger before updating hashes. Include Unicode cases when Markdown, paths, clipboard text, previews, review packages, or ZIP entries cross the changed boundary.

Record pass, fail, skip, cancel, and todo counts when available. ブラウザ挙動には純粋関数テストを組み合わせ、アーカイブ生成には独立した解析または展開比較を組み合わせる。Error-path checks should prove that the last valid result remains present. Keep the fixture matrix broad enough for language and mode coverage while using focused tests for individual display and formatting rules.

## Release / リリースと公開

When work involves a release, publication, distribution, デプロイ, 投稿, 公開主張, or packaging, separate implementation readiness from authority to publish. Collect the exact commit, branch, test result, artifact inventory, archive checksum, and known limits. リリースノートには観測した挙動を記載し、採用状況や一般的信頼性を推測で表現しない。A locally generated ZIP proves facts about those bytes, and a browser demonstration proves facts about that run.

For a release candidate, verify the launch command, supported modes, local-only boundary, and recovery path. 生成物に隠しエントリ、現在時刻のメタデータ、絶対パス、相対移動、予期しない原文コピーが含まれないことを確認する。Review user-facing metrics for ambiguous wording: increases remain increases, reductions remain reductions, and unmeasured effects remain unmeasured.

When evaluating a public claim, trace it to direct evidence and name the measurement boundary. 文字数は文字数を、ZIP検査はアーカイブのバイトを、フィクスチャ結果はそのフィクスチャだけを説明する。Claims about model behavior, runtime recall, cost, speed, or token use require a separate measurement design before they become product evidence.

## Security / セキュリティとアクセス

When a task touches security, credentials, API keys, 秘密情報, 認証情報, 権限, authentication, or アクセス境界, identify the values and systems in scope before executing commands. Use the least privilege needed for the bounded operation. 秘密の値はログ、フィクスチャ、スクリーンショット、生成Markdown、レビュープロンプト、ZIPから除外する。Prefer metadata that proves a credential or permission check exists while withholding the value itself.

For permission-sensitive operations, distinguish a product error from sandbox, browser, filesystem, or network denial. クリップボードやダウンロードが失敗した場合も、直前の有効なメモリ内結果を保持する。Report the failed capability and the nearest safe recheck. Validate archive paths before construction and reject absolute paths, traversal segments, duplicates, malformed content, and unsupported limits.

Security review should follow every boundary touched by the change: pasted input, classifier, active file, guides, move map, review package, clipboard, browser download, and extracted archive. 機微な値を再掲せず、確認した境界と結果を記録する。Keep accounts, remote storage, analytics, billing, hosting, and external AI calls outside the local product unless separately authorized.

## Handoff / 引き継ぎと再開

When work needs a handoff, restart, 継続, 次の担当, or 再接続, record the repository, active branch, exact commit, current Gate, source of truth, completed verification, unresolved work, next owner, and first safe action. 確認済みの事実と未実行の作業を分け、既知のコミットから始まるロールバックまたは再確認経路を残す。The receiver should be able to resume without reconstructing the entire history.

Preserve the authority boundary in the handoff. Routine implementation, local setup, tests, branch cleanup, and documentation remain with the implementation owner. 製品方針、外部公開、リポジトリ可視性、価格、ブランド、外部主張は決定権者が持つ。State prohibited continuation explicitly so available capability cannot be mistaken for authorization.

For closeout, verify local and remote SHAs, the clean worktree, exact test results, and local evidence before reporting PASS. 自動化の制限は製品欠陥と混同せず、隠さず記録する。Make the next action concrete and bounded.

## Architecture / 設計と依存関係

When a task changes architecture, structure, dependencies, 設計, アーキテクチャ, browser adapters, rendering, or data shape, begin with the existing pure contract. Keep classification, validation, artifact collection, presentation, clipboard, and download in their established layers. 環境機能は注入境界から渡し、標準Nodeテストランナーで純粋な挙動を検証できるようにする。Prefer a small explicit module to a framework, bundler, service, or persistence layer.

The compaction contract owns deterministic parsing, classification, routes, artifacts, source-block disposition, and counts. エクスポート層は正規成果物を検証して決定的ZIPを作り、UI層は検証済み結果を表示して明示操作を結び付ける。The review package uses the same artifacts and facts. Each layer calls the lower contract instead of copying classification logic.

For structural changes, inspect stable hashes, ledgers, reachability, guide order, Unicode counts, ZIP order, and error behavior. 生成されたルーターとレシートも完全なアクティブファイルに含まれるため、短く保ち、最終成果物全体を計測する。Add dependencies only when the current zero-dependency design cannot express the bounded requirement clearly.

## Migration / 移行と互換性

When work involves migration, schema changes, data conversion, マイグレーション, 変換, 互換性, or an upgrade path, record the source shape, target shape, transformation, validation, and rollback point. Preserve an untouched input throughout conversion. バイト比較または意味検証で対応を確認するまで、新旧の表現を独立して点検できる状態にする。Use a deterministic fixture or hash to expose future drift.

Migration checks should include empty boundaries, representative content, Unicode, and the largest ordinary case. すべてのソースブロックに一つだけ配置先があり、各ルートが実在するガイドを指すことを確認する。For paths or ZIP changes, verify canonical ordering and safe relative names. For count changes, identify source movement, router text, receipt text, and other generated layers separately.

Compatibility work should preserve current launch commands and in-memory behavior unless the migration explicitly changes them. 一時的なアダプターは移行境界に限定し、新しい形が正規になった時点で整理する。Record a re-evaluation condition for any retained compatibility path.

## Incident recovery / 障害と復旧

When work concerns an incident, outage, 障害, 事故, インシデント, rollback, 復旧, or 再発防止, build a factual timeline from observed state. Record the input, selected mode, artifact inventory, relevant logs, exact error, and last valid result. 直接観測した事実と仮説を分け、修正前に原文と生成証拠を保持する。Choose a reversible bounded repair that restores the established contract.

For archive incidents, inspect headers, UTF-8 flags, timestamps, permissions, storage method, paths, checksums, and extracted bytes. UI障害では表示エラー、操作フィードバック、選択状態、入力保持、コンソールを確認する。Classifier incidents require heading context, matched signals, protection rules, category choice, and source ledger inspection. Re-run the smallest reproduction after each correction.

Recovery closes after the affected boundary and adjacent invariants pass again. 原因、修正、テスト、ローカル証拠、残る不確実性、ロールバックコミットを引き継ぎへ記録する。Treat restoration of a local run as local recovery evidence rather than proof that unrelated environments are healthy.
