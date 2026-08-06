# Repository Operations / リポジトリ運用

## Core rules / 基本ルール

For every task, keep the requested scope bounded and preserve source instructions verbatim.
すべてのタスクで、変更前に対象を確認する。

## Testing / テストと検証

When tests or 動作確認 are needed, run the nearest verification first.
回帰と失敗確認では、実行した command and exact result を記録する。

## Release / リリース

When preparing a release, 配布, デプロイ, 投稿, or 公開主張, confirm the intended artifact.
Keep publication evidence separate from local demonstration evidence.

## Security / セキュリティ

When credentials, APIキー, 秘密情報, 権限, or アクセス are involved, avoid exposing values.
Record only the minimum security context needed for the task.

## Handoff / 引き継ぎ

When work needs 再開, 継続, 次の担当, or 再接続, leave a restartable handoff.
Include completed checks and the exact next action.

## Architecture and migration / 設計と移行

When changing architecture, 構造, 依存関係, マイグレーション, 変換, or 互換性, identify the boundary first.
Keep old and new formats traceable during migration work.

## Incident recovery / 障害復旧

When an incident, 障害, 事故, 復旧, ロールバック, or 再発防止 task occurs, separate observations from inference.
Record the recovery sequence without rewriting historical evidence.
