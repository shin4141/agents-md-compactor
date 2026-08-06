# Core Operating Rules

Always preserve source evidence, safety boundaries, and the Decision Owner's final authority.

## Chat Continuation

When significant context has accumulated or continuation risk exists, report one continuation signal.

Keep these definitions intact:

- `CHAT_CONTINUE`: the current chat can continue safely.
- `PREPARE_HANDOFF`: prepare restartable state while continuing useful work.
- `HANDOFF_NOW`: stop expansion and leave the exact reconnect action.

### Output template

```text
Chat Continuation: CHAT_CONTINUE | PREPARE_HANDOFF | HANDOFF_NOW
Reconnect: <exact next action>
```

Do not select `HANDOFF_NOW` merely because a response is long.

## Context Compression

When raw history becomes inefficient or a compression decision is needed, report one context signal.

Use exactly one value:

1. `KEEP` when current context remains efficient.
2. `COMPRESS` when a faithful local summary is sufficient.
3. `HANDOFF` when a fresh execution context is required.

### Exception

Never compress away an unresolved exception, approval boundary, or reconnect route.

## チャット継続

継続リスクがある場合、現在のチャットを続けられるかを一つのシグナルで報告する。

次の値と意味を維持する：

- `CHAT_CONTINUE`: 現在のチャットを安全に継続できる。
- `PREPARE_HANDOFF`: 作業を続けながら再開可能な状態を準備する。
- `HANDOFF_NOW`: 範囲の拡大を止め、正確な再接続手順を残す。

### 例外

応答が長いという理由だけで `HANDOFF_NOW` を選ばない。

## 文脈圧縮

文脈が長くなった場合、履歴を保持するか圧縮するか引き継ぐかを一つ選ぶ。

選択肢は次のとおり：

1. `KEEP`: 現在の文脈がまだ効率的である。
2. `COMPRESS`: 忠実なローカル要約で十分である。
3. `HANDOFF`: 新しい実行文脈が必要である。

### 保持条件

未解決の例外、承認境界、再接続経路を圧縮で失わない。
