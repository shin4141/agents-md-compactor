export const MODES = Object.freeze([
  "Conservative",
  "Balanced",
  "Aggressive",
]);

export const GUIDE_CATEGORIES = Object.freeze([
  "testing",
  "release",
  "security",
  "handoff",
  "architecture",
  "migration",
  "incident-recovery",
  "other",
]);

export const RECEIPT_CATEGORIES = Object.freeze([
  "core",
  ...GUIDE_CATEGORIES,
]);

const GUIDE_DEFINITIONS = Object.freeze({
  testing: {
    title: "Testing Guidance",
    routeLabel: "Testing or verification",
    heading:
      /(?:\b(test|testing|verification|validation|quality|qa)\b|テスト|検証|動作確認|回帰|失敗確認)/i,
    signals: [
      /\btests?\b/i,
      /\btesting\b/i,
      /\bverification\b/i,
      /\bvalidation\b/i,
      /\bcoverage\b/i,
      /\bfixtures?\b/i,
      /テスト/i,
      /検証/i,
      /動作確認/i,
      /回帰/i,
      /失敗確認/i,
    ],
    recall:
      "When the task involves tests, validation, verification, or test failures",
  },
  release: {
    title: "Release Guidance",
    routeLabel: "Release or public claims",
    heading:
      /(?:\b(release|publication|publishing|deployment|packaging)\b|リリース|公開|配布|デプロイ|投稿|公開主張)/i,
    signals: [
      /\brelease\b/i,
      /\bpublish(?:ing|ed)?\b/i,
      /\bpublication\b/i,
      /\bdeploy(?:ment|ing|ed)?\b/i,
      /\bpackag(?:e|ing)\b/i,
      /\bpublic claims?\b/i,
      /リリース/i,
      /公開/i,
      /配布/i,
      /デプロイ/i,
      /投稿/i,
      /公開主張/i,
    ],
    recall:
      "When the task involves release, publication, packaging, deployment, or public claims",
  },
  security: {
    title: "Security Guidance",
    routeLabel: "Security or credentials",
    heading:
      /(?:\b(security|permissions?|credentials?|secrets?)\b|セキュリティ|秘密情報|認証情報|権限|アクセス|APIキー)/i,
    signals: [
      /\bsecurity\b/i,
      /\bsecrets?\b/i,
      /\bcredentials?\b/i,
      /\bpermissions?\b/i,
      /\bsensitive data\b/i,
      /\bauthentication\b/i,
      /セキュリティ/i,
      /秘密情報/i,
      /認証情報/i,
      /権限/i,
      /アクセス/i,
      /APIキー/i,
    ],
    recall:
      "When the task involves security, secrets, credentials, permissions, or sensitive data",
  },
  handoff: {
    title: "Handoff Guidance",
    routeLabel: "Handoff or restart",
    heading:
      /(?:\b(handoff|restart|ownership transfer|completion)\b|引き継ぎ|再開|継続|完了|次の担当|再接続)/i,
    signals: [
      /\bhandoff\b/i,
      /\bhand(?:ing)?\s+(?:work\s+)?off\b/i,
      /\brestart(?:ability)?\b/i,
      /\bownership transfer\b/i,
      /\bnext (?:owner|session|agent)\b/i,
      /\bre-entry\b/i,
      /引き継ぎ/i,
      /再開/i,
      /継続/i,
      /完了/i,
      /次の担当/i,
      /再接続/i,
    ],
    recall:
      "When the task involves handoff, restart, re-entry, or ownership transfer",
  },
  architecture: {
    title: "Architecture Guidance",
    routeLabel: "Architecture or dependencies",
    heading:
      /(?:\b(architecture|design|dependencies|structure)\b|設計|アーキテクチャ|構造|依存関係)/i,
    signals: [
      /\barchitecture\b/i,
      /\bdesign boundaries?\b/i,
      /\bdependencies\b/i,
      /\bmodules?\b/i,
      /\bstructural changes?\b/i,
      /\blayers?\b/i,
      /設計/i,
      /アーキテクチャ/i,
      /構造/i,
      /依存関係/i,
    ],
    recall:
      "When the task involves architecture, design boundaries, dependencies, or structural changes",
  },
  migration: {
    title: "Migration Guidance",
    routeLabel: "Migration or compatibility",
    heading:
      /(?:\b(migration|schema change|data conversion|compatibility)\b|移行|マイグレーション|変換|互換性)/i,
    signals: [
      /\bmigrat(?:e|ion|ing)\b/i,
      /\bschema changes?\b/i,
      /\bdata conversion\b/i,
      /\bbackward compatibility\b/i,
      /\bcompatibility\b/i,
      /\bupgrade path\b/i,
      /移行/i,
      /マイグレーション/i,
      /変換/i,
      /互換性/i,
    ],
    recall:
      "When the task involves migration, schema changes, data conversion, or compatibility work",
  },
  "incident-recovery": {
    title: "Incident Recovery Guidance",
    routeLabel: "Incident or recovery",
    heading:
      /(?:\b(incident|recovery|rollback|outage|postmortem)\b|障害|事故|復旧|ロールバック|再発防止|インシデント)/i,
    signals: [
      /\bincidents?\b/i,
      /\brecovery\b/i,
      /\brollback\b/i,
      /\boutages?\b/i,
      /\bpostmortems?\b/i,
      /\bfailure history\b/i,
      /障害/i,
      /事故/i,
      /復旧/i,
      /ロールバック/i,
      /再発防止/i,
      /インシデント/i,
    ],
    recall:
      "When the task involves incidents, recovery, rollback, outages, or postmortems",
  },
  other: {
    title: "Other Conditional Guidance",
    routeLabel: "Other conditional guidance",
    recall:
      "When the task matches contextual or specialist guidance routed from the source file",
  },
});

const CONDITIONAL_HANDOFF_SECTION_DEFINITIONS = Object.freeze({
  "chat-continuation": Object.freeze({
    heading:
      /^(?:(?:chat|session)[\t ]+continuation)(?:[\t ]+(?:footer|signal|rules?|guidance))?$|^(?:チャット継続|セッション継続)(?:フッター|シグナル|ルール|ガイダンス|指針)?$/iu,
    guideHeading: "Chat Continuation",
    anchor: "chat-continuation",
    routeLabel:
      "For chat/session continuation risk or `CHAT_CONTINUE / PREPARE_HANDOFF / HANDOFF_NOW`",
    shortLabel:
      "chat/session risk or `CHAT_CONTINUE / PREPARE_HANDOFF / HANDOFF_NOW`",
    recall:
      "When chat or session continuation risk requires CHAT_CONTINUE, PREPARE_HANDOFF, or HANDOFF_NOW",
  }),
  "context-compression": Object.freeze({
    heading:
      /^(?:context[\t ]+(?:compression|compaction))(?:[\t ]+(?:footer|signal|rules?|guidance))?$|^(?:コンテキスト圧縮|文脈圧縮)(?:フッター|シグナル|ルール|ガイダンス|指針)?$/iu,
    guideHeading: "Context Compression",
    anchor: "context-compression",
    routeLabel:
      "When long context may require `KEEP / COMPRESS / HANDOFF`",
    shortLabel: "long context requiring `KEEP / COMPRESS / HANDOFF`",
    recall:
      "When long context or inefficient raw history may require KEEP, COMPRESS, or HANDOFF",
  }),
});

const CONDITIONAL_HANDOFF_SECTION_ORDER = Object.freeze([
  "chat-continuation",
  "context-compression",
]);

const CONDITIONAL_DETAIL_DEFINITIONS = Object.freeze({
  "minimal-handoff": Object.freeze({
    category: "handoff",
    anchor: "minimal-handoff",
    guideHeading: "Minimal Handoff",
    routeLabel: "When the user selects `Handoff`",
    shortLabel: "user-selected Handoff",
    recall: "When the user selects Handoff",
  }),
  "operational-judgment-references": Object.freeze({
    category: "other",
    anchor: "operational-judgment-references",
    guideHeading: "Operational Judgment References",
    routeLabel: "When an operational judgment needs its routed reference",
    shortLabel: "operational-judgment references",
    recall: "When an operational judgment needs its routed reference",
  }),
  "continuation-proof-references": Object.freeze({
    category: "other",
    anchor: "continuation-proof-references",
    guideHeading: "Continuation Proof References",
    routeLabel: "For continuation-proof origins and validation",
    shortLabel: "continuation-proof references",
    recall: "When continuation-proof origins or validation references are needed",
  }),
  "conditional-report-extensions": Object.freeze({
    category: "other",
    anchor: "conditional-report-extensions",
    guideHeading: "Conditional Report Extensions",
    routeLabel: "When a conditional report extension applies",
    shortLabel: "conditional report extensions",
    recall: "When one of the authored conditional report extensions applies",
  }),
  "signal-format": Object.freeze({
    category: "other",
    anchor: "signal-format",
    guideHeading: "Signal and Parked-Horizon Format",
    routeLabel: "When formatting active signals or parked horizons",
    shortLabel: "signal and parked-horizon format",
    recall: "When formatting active signals or parked horizons",
  }),
  "context-health-procedure": Object.freeze({
    category: "other",
    anchor: "context-health-procedure",
    guideHeading: "Context Health Procedure",
    routeLabel: "When Context Health output or YELLOW/RED follow-up is required",
    shortLabel: "Context Health output or YELLOW/RED follow-up",
    recall: "When Context Health output or YELLOW/RED follow-up is required",
  }),
  "update-check-output": Object.freeze({
    category: "other",
    anchor: "update-check-output",
    guideHeading: "0.01 Update Check Output",
    routeLabel: "When a 0.01 extension must be emitted",
    shortLabel: "0.01 extension output",
    recall: "When a 0.01 extension must be emitted",
  }),
  "concept-promotion-record": Object.freeze({
    category: "other",
    anchor: "concept-promotion-record",
    guideHeading: "Concept Promotion Record",
    routeLabel: "When preparing a canonical promotion record",
    shortLabel: "canonical promotion record",
    recall: "When preparing a canonical promotion record",
  }),
});

const MIXED_SECTION_DECOMPOSITIONS = Object.freeze([
  Object.freeze({
    heading: /^V12 → V13 Handoff Discipline$/u,
    routeAfter:
      "When the user selects `Handoff`, follow `docs/handoff_command.md`.\n",
    groups: Object.freeze([
      Object.freeze({
        kind: "minimal-handoff",
        ranges: Object.freeze([
          Object.freeze({
            start: "Minimal handoff:",
            endBefore: null,
            fencedBlock: true,
          }),
        ]),
      }),
    ]),
  }),
  Object.freeze({
    heading: /^Operational Judgment Core References$/u,
    requiredTrigger:
      /consult the relevant operational reference when that judgment is needed/iu,
    groups: Object.freeze([
      Object.freeze({
        kind: "operational-judgment-references",
        requireConditionalListItems: true,
        ranges: Object.freeze([
          Object.freeze({
            start: "- Next 0.01 selection:",
            endBefore: "If the relevant reference",
          }),
        ]),
      }),
    ]),
  }),
  Object.freeze({
    heading: /^Continuation Proof Selection$/u,
    routeAfter:
      "Before modifying files or authority during a continuation, use the minimum sufficient proof required by the continuation dependency.\n",
    groups: Object.freeze([
      Object.freeze({
        kind: "continuation-proof-references",
        ranges: Object.freeze([
          Object.freeze({
            start: "Operational origin and validation:",
            endBefore: null,
          }),
        ]),
      }),
    ]),
  }),
  Object.freeze({
    heading: /^V13 Lite Footer \/ Canonical Base Report$/u,
    requiredTrigger: /Add only the extension whose trigger applies:/iu,
    groups: Object.freeze([
      Object.freeze({
        kind: "conditional-report-extensions",
        requireConditionalListItems: true,
        ranges: Object.freeze([
          Object.freeze({
            start: "- Context Health:",
            endBefore: "Absence of a conditional extension",
          }),
        ]),
      }),
    ]),
  }),
  Object.freeze({
    heading: /^Signal Format: Active Signals vs Parked Horizons$/u,
    requiredTrigger:
      /separate active (?:task )?signals from parked (?:future )?horizons/iu,
    groups: Object.freeze([
      Object.freeze({
        kind: "signal-format",
        ranges: Object.freeze([
          Object.freeze({ start: "Use:", endBefore: "Rules:" }),
          Object.freeze({
            start: "Example:",
            endBefore: null,
            fencedBlock: true,
          }),
        ]),
      }),
    ]),
  }),
  Object.freeze({
    heading: /^Context Health Self-Check$/u,
    routeAfter:
      "Include the Context Health extension when risk is `YELLOW` or `RED`, materially changes, or the next action depends on context health. A routine `BLUE` result may remain implicit in an ordinary base report, but omission is not an affirmative safe-continuation judgment.\n",
    groups: Object.freeze([
      Object.freeze({
        kind: "context-health-procedure",
        ranges: Object.freeze([
          Object.freeze({
            start: "Use this format:",
            endBefore: "Risk rules:",
          }),
          Object.freeze({
            start: "Completion rule:",
            endBefore: "Completion Line:",
          }),
        ]),
      }),
    ]),
  }),
  Object.freeze({
    heading: /^0\.01 Update Check$/u,
    requiredTrigger: /Include this extension only for/iu,
    groups: Object.freeze([
      Object.freeze({
        kind: "update-check-output",
        ranges: Object.freeze([
          Object.freeze({
            start: "Use this format:",
            endBefore: "Scoring:",
          }),
        ]),
      }),
    ]),
  }),
  Object.freeze({
    heading: /^Concept Promotion Gate$/u,
    requiredTrigger:
      /Canonical promotion[^\n]+unless the promotion record includes:/iu,
    groups: Object.freeze([
      Object.freeze({
        kind: "concept-promotion-record",
        ranges: Object.freeze([
          Object.freeze({
            start: "- what is being promoted",
            endBefore: "Example:",
          }),
          Object.freeze({
            start: "Example:",
            endBefore: null,
            paragraphCount: 2,
          }),
        ]),
      }),
    ]),
  }),
]);

const GENERIC_CONDITIONAL_DETAIL_HEADING =
  /^(?:Conditional (?:Details|Procedure)|条件付き(?:詳細|手順))$/iu;

const GENERIC_CONDITIONAL_DETAIL_TRIGGER_TOPIC =
  /(?:\b(?:details?|procedure|definitions?|scoring|example|reference inventory)\b|(?:詳細|手順|定義|採点|スコア|例|参照一覧))/iu;

const GENERIC_CONDITIONAL_DETAIL_GUARD =
  /(?:\b(?:decision owner|final authority|final approval|final decision|repository-wide safety|repo-wide safety|mandatory completion evidence|completion evidence|required gate|gate authority|for every task|every task|all tasks|for every response|every response|all responses)\b|(?:決定権者|最終権限|最終判断|最終承認|すべてのタスク|全タスク|すべての応答|全応答|リポジトリ全体.{0,12}安全|完了証拠|必須ゲート))/iu;

const UTF8_ENCODER = new TextEncoder();

export class CompactorContractError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "CompactorContractError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new CompactorContractError(code, message);
}

export function formatGuidanceReceipt(categories = []) {
  if (!Array.isArray(categories)) {
    fail("INVALID_RECEIPT", "receipt categories must be an array");
  }

  const used = new Set();
  for (const category of categories) {
    if (category === "core") {
      continue;
    }
    if (!GUIDE_CATEGORIES.includes(category)) {
      fail("INVALID_RECEIPT", `unknown receipt category: ${category}`);
    }
    used.add(category);
  }

  const orderedGuides = GUIDE_CATEGORIES.filter((category) => used.has(category));
  return orderedGuides.length === 0
    ? "🪶 Core only"
    : `🪶 Core + ${orderedGuides.join(" · ")}`;
}

function assertValidUnicode(value) {
  for (let index = 0; index < value.length; index += 1) {
    const unit = value.charCodeAt(index);

    if (unit >= 0xd800 && unit <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) {
        fail("INVALID_INPUT", "input contains an unpaired high surrogate");
      }
      index += 1;
    } else if (unit >= 0xdc00 && unit <= 0xdfff) {
      fail("INVALID_INPUT", "input contains an unpaired low surrogate");
    }
  }
}

function assertInput(input, mode) {
  if (typeof input !== "string") {
    fail("INVALID_INPUT", "input must be one UTF-8 Markdown string");
  }
  if (input.trim().length === 0) {
    fail("EMPTY_INPUT", "input must contain non-whitespace Markdown");
  }
  assertValidUnicode(input);

  if (!MODES.includes(mode)) {
    fail(
      "INVALID_MODE",
      `mode must be exactly one of: ${MODES.join(", ")}`,
    );
  }
}

function assertMarkdownInput(input) {
  if (typeof input !== "string") {
    fail("INVALID_INPUT", "input must be one UTF-8 Markdown string");
  }
  if (input.trim().length === 0) {
    fail("EMPTY_INPUT", "input must contain non-whitespace Markdown");
  }
  assertValidUnicode(input);
}

function scanLines(source) {
  const lines = [];
  let offset = 0;

  while (offset < source.length) {
    const start = offset;
    while (
      offset < source.length &&
      source[offset] !== "\n" &&
      source[offset] !== "\r"
    ) {
      offset += 1;
    }

    const content = source.slice(start, offset);
    if (source[offset] === "\r" && source[offset + 1] === "\n") {
      offset += 2;
    } else if (source[offset] === "\r" || source[offset] === "\n") {
      offset += 1;
    }

    lines.push({ content, start, end: offset });
  }

  return lines;
}

function scanHeadings(source) {
  const headings = [];
  let fence = null;

  for (const line of scanLines(source)) {
    const fenceMatch = line.content.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fence) {
      if (
        fenceMatch &&
        fenceMatch[1][0] === fence.character &&
        fenceMatch[1].length >= fence.length
      ) {
        fence = null;
      }
      continue;
    }

    if (fenceMatch) {
      fence = {
        character: fenceMatch[1][0],
        length: fenceMatch[1].length,
      };
      continue;
    }

    const headingMatch = line.content.match(
      /^ {0,3}(#{1,6})[\t ]+(.+?)[\t ]*#*[\t ]*$/,
    );
    if (headingMatch) {
      headings.push({
        level: headingMatch[1].length,
        title: headingMatch[2].trim(),
        offset: line.start,
      });
    }
  }

  return headings;
}

function headingContextAt(headings, start, end) {
  const stack = [];
  let sawHeading = false;

  for (const heading of headings) {
    if (heading.offset > start) {
      break;
    }
    stack.length = heading.level - 1;
    stack[heading.level - 1] = heading.title;
    sawHeading = true;
  }

  if (!sawHeading) {
    const firstInside = headings.find(
      (heading) => heading.offset >= start && heading.offset < end,
    );
    if (firstInside) {
      stack[firstInside.level - 1] = firstInside.title;
    }
  }

  return stack.filter(Boolean);
}

function fnv1a(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    const unit = value.charCodeAt(index);
    hash ^= unit & 0xff;
    hash = Math.imul(hash, 0x01000193);
    hash ^= unit >>> 8;
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/**
 * Split Markdown into non-overlapping major instruction sections.
 *
 * In a mixed H1/H2 document, H1 headings establish document context and H2
 * headings establish the primary classification blocks. Text before the first
 * H2 remains its own block, and H3+ descendants remain attached to their H2.
 * Documents without that structure retain the bounded shallowest-heading
 * behavior. A heading-free document is one block. This is intentionally
 * smaller and more predictable than a complete Markdown parser.
 */
export function parseInstructionBlocks(input) {
  assertMarkdownInput(input);
  const headings = scanHeadings(input);

  if (headings.length === 0) {
    return [
      {
        id: `B001-${fnv1a(input)}`,
        headingContext: ["Document"],
        text: input,
        start: 0,
        end: input.length,
      },
    ];
  }

  const hasH1 = headings.some((heading) => heading.level === 1);
  const hasH2 = headings.some((heading) => heading.level === 2);
  let boundaryOffsets;

  if (hasH1 && hasH2) {
    boundaryOffsets = headings
      .filter((heading) => heading.level === 1 || heading.level === 2)
      .map((heading) => heading.offset);
  } else {
    const minimumLevel = Math.min(...headings.map((heading) => heading.level));
    const minimumCount = headings.filter(
      (heading) => heading.level === minimumLevel,
    ).length;
    const deeperLevels = headings
      .map((heading) => heading.level)
      .filter((level) => level > minimumLevel);
    const boundaryLevel =
      minimumCount === 1 && deeperLevels.length > 0
        ? Math.min(...deeperLevels)
        : minimumLevel;
    boundaryOffsets = headings
      .filter((heading) => heading.level === boundaryLevel)
      .map((heading) => heading.offset);
  }
  const starts = [...new Set([0, ...boundaryOffsets])].sort(
    (left, right) => left - right,
  );
  const blocks = [];

  for (let index = 0; index < starts.length; index += 1) {
    const start = starts[index];
    const end = starts[index + 1] ?? input.length;
    const text = input.slice(start, end);
    if (text.trim().length === 0) {
      continue;
    }

    const sequence = blocks.length + 1;
    blocks.push({
      id: `B${String(sequence).padStart(3, "0")}-${fnv1a(text)}`,
      headingContext: headingContextAt(headings, start, end),
      text,
      start,
      end,
    });
  }

  return blocks;
}

function paragraphRanges(input, start, end) {
  const ranges = [];
  let paragraphStart = null;
  let paragraphEnd = null;

  for (const line of scanLines(input).filter(
    (candidate) => candidate.start >= start && candidate.start < end,
  )) {
    if (line.content.trim().length === 0) {
      if (paragraphStart !== null) {
        ranges.push({ start: paragraphStart, end: paragraphEnd });
        paragraphStart = null;
        paragraphEnd = null;
      }
      continue;
    }

    paragraphStart ??= line.start;
    paragraphEnd = Math.min(line.end, end);
  }

  if (paragraphStart !== null) {
    ranges.push({ start: paragraphStart, end: paragraphEnd });
  }
  return ranges;
}

function isHeadingOnly(value) {
  const lines = value
    .split(/\r\n|\r|\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    lines.length > 0 &&
    lines.every((line) => /^#{1,6}[\t ]+\S/u.test(line))
  );
}

function hasIndependentInstruction(value) {
  const instruction = value.replace(/^ {0,3}[-+*][\t ]+/u, "").trim();
  return (
    CONDITION_MARKER.test(instruction) ||
    UNIVERSAL_RULE_MARKER.test(instruction)
  );
}

function lineMarkerOffset(value, marker, from = 0) {
  let offset = value.indexOf(marker, from);
  while (offset !== -1) {
    if (offset === 0 || value[offset - 1] === "\n" || value[offset - 1] === "\r") {
      return offset;
    }
    offset = value.indexOf(marker, offset + 1);
  }
  return -1;
}

function fencedBlockEnd(value, from) {
  const lines = scanLines(value).filter((line) => line.start >= from);
  const openingIndex = lines.findIndex((line) =>
    /^ {0,3}(`{3,}|~{3,})/u.test(line.content),
  );
  if (openingIndex === -1) {
    return -1;
  }
  const opening = lines[openingIndex].content.match(
    /^ {0,3}(`{3,}|~{3,})/u,
  )[1];
  for (const line of lines.slice(openingIndex + 1)) {
    const candidate = line.content.match(/^ {0,3}(`{3,}|~{3,})[\t ]*$/u);
    if (
      candidate &&
      candidate[1][0] === opening[0] &&
      candidate[1].length >= opening.length
    ) {
      return line.end;
    }
  }
  return -1;
}

function conditionalExtensionTriggers(value) {
  const items = value
    .split(/(?=^ {0,3}-[\t ]+)/mu)
    .filter((item) => /^ {0,3}-[\t ]+/u.test(item));
  const triggers = items.map((item) => {
    const normalized = item
      .replace(/^ {0,3}-[\t ]+/u, "")
      .replace(/\s+/gu, " ")
      .trim();
    const labelEnd = normalized.indexOf(":");
    const conditionStart = normalized.search(/\bwhen\b/iu);
    if (labelEnd <= 0 || conditionStart <= labelEnd) {
      return null;
    }
    const conditionTail = normalized.slice(conditionStart);
    const sentenceEndMatch = /\.(?=\s|$)/u.exec(conditionTail);
    const sentenceEnd = sentenceEndMatch
      ? conditionStart + sentenceEndMatch.index
      : -1;
    const condition = normalized
      .slice(conditionStart, sentenceEnd === -1 ? undefined : sentenceEnd)
      .trim();
    return {
      label: normalized.slice(0, labelEnd).trim(),
      condition,
      text: `${normalized.slice(0, labelEnd).trim()} ${condition}`,
    };
  });
  if (triggers.length === 0 || triggers.some((trigger) => trigger === null)) {
    return null;
  }
  return triggers;
}

function conditionalExtensionRouteLabel(value) {
  const triggers = conditionalExtensionTriggers(value);
  return triggers
    ? `Extensions—${triggers
        .map((trigger) => {
          const compactLabels = {
            "Chat Continuation": "Chat",
            "Context Compression / Handoff": "Compression/Handoff",
            "Completion Evidence": "Evidence",
            "Branch Authority": "Branch",
            "0.01 Update Check": "0.01",
          };
          return `${compactLabels[trigger.label] ?? trigger.label}: ${trigger.condition.replace(/^when\s+/iu, "")}`;
        })
        .join("; ")}`
    : null;
}

function decomposeMixedSection(block) {
  const leafHeading = block.headingContext.at(-1) ?? "";
  const definition = MIXED_SECTION_DECOMPOSITIONS.find((candidate) =>
    candidate.heading.test(leafHeading),
  );
  if (!definition) {
    return null;
  }
  if (
    definition.requiredTrigger &&
    !definition.requiredTrigger.test(block.text)
  ) {
    return null;
  }

  const detailRanges = [];
  for (const group of definition.groups) {
    const groupRanges = [];
    for (const rangeDefinition of group.ranges) {
      const localStart = lineMarkerOffset(block.text, rangeDefinition.start);
      if (localStart === -1) {
        return null;
      }
      let localEnd;
      if (rangeDefinition.endBefore) {
        localEnd = lineMarkerOffset(
          block.text,
          rangeDefinition.endBefore,
          localStart + rangeDefinition.start.length,
        );
      } else if (rangeDefinition.fencedBlock) {
        localEnd = fencedBlockEnd(block.text, localStart);
        if (
          localEnd !== -1 &&
          block.text.slice(localEnd).trim().length === 0
        ) {
          localEnd = block.text.length;
        }
      } else if (rangeDefinition.paragraphCount) {
        const paragraphs = paragraphRanges(
          block.text,
          localStart,
          block.text.length,
        );
        localEnd = paragraphs[rangeDefinition.paragraphCount - 1]?.end ?? -1;
        if (
          localEnd !== -1 &&
          block.text.slice(localEnd).trim().length === 0
        ) {
          localEnd = block.text.length;
        }
      } else {
        localEnd = block.text.length;
      }
      if (localEnd === -1 || localEnd <= localStart) {
        return null;
      }
      const candidateText = block.text.slice(localStart, localEnd);
      if (group.requireConditionalListItems) {
        const items = candidateText
          .split(/(?=^ {0,3}-[\t ]+)/mu)
          .filter((item) => /^ {0,3}-[\t ]+/u.test(item));
        if (
          items.length === 0 ||
          items.some((item) => !CONDITION_MARKER.test(item))
        ) {
          return null;
        }
      }
      const conditionalDetailDefinition =
        group.kind === "conditional-report-extensions"
          ? (() => {
              const routeLabel = conditionalExtensionRouteLabel(candidateText);
              return routeLabel
                ? Object.freeze({
                    ...CONDITIONAL_DETAIL_DEFINITIONS[group.kind],
                    routeLabel,
                    recall: routeLabel,
                  })
                : null;
            })()
          : undefined;
      if (
        group.kind === "conditional-report-extensions" &&
        !conditionalDetailDefinition
      ) {
        return null;
      }
      groupRanges.push({
        start: block.start + localStart,
        end: block.start + localEnd,
        ...(conditionalDetailDefinition
          ? { conditionalDetailDefinition }
          : {}),
      });
    }

    const routeInsertionOffset = definition.routeAfter
      ? (() => {
          const localTrigger = lineMarkerOffset(block.text, definition.routeAfter);
          return localTrigger === -1
            ? null
            : block.start + localTrigger + definition.routeAfter.length;
        })()
      : groupRanges[0].start;
    if (routeInsertionOffset === null) {
      return null;
    }

    for (const range of groupRanges) {
      detailRanges.push({
        ...range,
        conditionalDetailKind: group.kind,
        routeInsertionOffset,
      });
    }
  }

  const orderedDetails = [...detailRanges].sort(
    (left, right) => left.start - right.start,
  );
  if (
    orderedDetails.some(
      (range, index) => index > 0 && orderedDetails[index - 1].end > range.start,
    )
  ) {
    return null;
  }

  const boundaries = [
    block.start,
    block.end,
    ...orderedDetails.flatMap((range) => [range.start, range.end]),
    ...orderedDetails.map((range) => range.routeInsertionOffset),
  ];
  return [...new Set(boundaries)]
    .filter((offset) => offset >= block.start && offset <= block.end)
    .sort((left, right) => left - right)
    .flatMap((start, index, sorted) => {
      const end = sorted[index + 1];
      if (end === undefined || end <= start) {
        return [];
      }
      const detail = orderedDetails.find(
        (range) => range.start === start && range.end === end,
      );
      return [{
        start,
        end,
        structuralType: detail ? "conditional-detail" : "block-fragment",
        ...(detail
          ? {
              conditionalDetailKind: detail.conditionalDetailKind,
              ...(detail.conditionalDetailDefinition
                ? {
                    conditionalDetailDefinition:
                      detail.conditionalDetailDefinition,
                  }
                : {}),
              routeInsertionOffset: detail.routeInsertionOffset,
            }
          : {}),
      }];
    });
}

function readableAnchor(value) {
  const slug = value
    .normalize("NFKD")
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
  return slug || `conditional-detail-${fnv1a(value)}`;
}

function decomposeGenericConditionalSubtree(input, block, headings) {
  const parentHeading = headings.find(
    (heading) => heading.offset >= block.start && heading.offset < block.end,
  );
  if (!parentHeading) {
    return null;
  }
  const candidates = headings.filter(
    (heading) =>
      heading.offset > parentHeading.offset &&
      heading.offset < block.end &&
      heading.level > parentHeading.level &&
      GENERIC_CONDITIONAL_DETAIL_HEADING.test(heading.title),
  );
  if (candidates.length !== 1) {
    return null;
  }

  const detailHeading = candidates[0];
  const precedingParagraphs = paragraphRanges(
    input,
    block.start,
    detailHeading.offset,
  );
  const triggerRange = precedingParagraphs.at(-1);
  const triggerText = triggerRange
    ? input.slice(triggerRange.start, triggerRange.end)
    : "";
  if (
    !CONDITION_MARKER.test(triggerText) ||
    !GENERIC_CONDITIONAL_DETAIL_TRIGGER_TOPIC.test(triggerText)
  ) {
    return null;
  }

  const nextPeer = headings.find(
    (heading) =>
      heading.offset > detailHeading.offset &&
      heading.offset < block.end &&
      heading.level <= detailHeading.level,
  );
  const detailEnd = nextPeer?.offset ?? block.end;
  const detailText = input.slice(detailHeading.offset, detailEnd);
  if (GENERIC_CONDITIONAL_DETAIL_GUARD.test(detailText)) {
    return null;
  }

  const anchor = readableAnchor(
    `${block.headingContext.at(-1) ?? "conditional"}-${detailHeading.title}`,
  );
  const detailDefinition = Object.freeze({
    category: "other",
    anchor,
    guideHeading: detailHeading.title,
    routeLabel: "When the adjacent authored conditional trigger applies",
    shortLabel: "adjacent authored conditional detail",
    recall: "When the adjacent authored conditional trigger applies",
  });

  return [
    {
      start: block.start,
      end: detailHeading.offset,
      structuralType: "block-fragment",
    },
    {
      start: detailHeading.offset,
      end: detailEnd,
      structuralType: "conditional-detail",
      conditionalDetailKind: `generic:${anchor}`,
      conditionalDetailDefinition: detailDefinition,
      routeInsertionOffset: detailHeading.offset,
    },
    ...(detailEnd < block.end
      ? [{
          start: detailEnd,
          end: block.end,
          structuralType: "block-fragment",
        }]
      : []),
  ];
}

function makeSourceSpan(
  input,
  headings,
  block,
  start,
  end,
  structuralType,
  sequence,
  metadata = {},
) {
  const text = input.slice(start, end);
  const localContext = headingContextAt(headings, start, end);
  const headingContext =
    localContext.length === 0 || localContext[0] === "Document"
      ? block.headingContext
      : localContext;
  return {
    id: `S${String(sequence).padStart(3, "0")}-${fnv1a(text)}`,
    parentBlockId: block.id,
    headingContext,
    structuralType,
    wholeParentBlock: start === block.start && end === block.end,
    text,
    start,
    end,
    ...metadata,
  };
}

function siblingHeadingRanges(block, headings) {
  const firstHeading = headings.find(
    (heading) =>
      heading.offset >= block.start && heading.offset < block.end,
  );
  if (!firstHeading) {
    return [{ start: block.start, end: block.end }];
  }

  const descendants = headings.filter(
    (heading) =>
      heading.offset > firstHeading.offset &&
      heading.offset < block.end &&
      heading.level > firstHeading.level,
  );
  const siblingLevel = [...new Set(descendants.map((heading) => heading.level))]
    .sort((left, right) => left - right)
    .find(
      (level) =>
        descendants.filter((heading) => heading.level === level).length >= 2,
    );

  if (!siblingLevel) {
    return [{ start: block.start, end: block.end }];
  }

  const starts = [
    block.start,
    ...descendants
      .filter((heading) => heading.level === siblingLevel)
      .map((heading) => heading.offset),
  ];
  return [...new Set(starts)]
    .sort((left, right) => left - right)
    .map((start, index, sorted) => ({
      start,
      end: sorted[index + 1] ?? block.end,
    }));
}

function decomposeStructuralRange(input, start, end) {
  const paragraphs = paragraphRanges(input, start, end);
  const headingPrefix = paragraphs[0] && isHeadingOnly(
    input.slice(paragraphs[0].start, paragraphs[0].end),
  )
    ? paragraphs[0]
    : null;
  const bodyStart = headingPrefix ? headingPrefix.end : start;
  const bodyLines = scanLines(input).filter(
    (line) =>
      line.start >= bodyStart &&
      line.start < end &&
      line.content.trim().length > 0,
  );
  const listItems = bodyLines.filter((line) =>
    /^ {0,3}[-+*][\t ]+\S/u.test(line.content),
  );

  if (
    listItems.length >= 2 &&
    listItems.length === bodyLines.length &&
    listItems.every((line) => hasIndependentInstruction(line.content))
  ) {
    return [
      ...(headingPrefix
        ? [{ ...headingPrefix, structuralType: "heading-context" }]
        : []),
      ...listItems.map((line) => ({
        start: line.start,
        end: Math.min(line.end, end),
        structuralType: "list-item",
      })),
    ];
  }

  const bodyParagraphs = headingPrefix ? paragraphs.slice(1) : paragraphs;
  if (
    bodyParagraphs.length >= 2 &&
    bodyParagraphs.every((range) =>
      CONDITION_MARKER.test(input.slice(range.start, range.end)),
    )
  ) {
    return [
      ...(headingPrefix
        ? [{ ...headingPrefix, structuralType: "heading-context" }]
        : []),
      ...bodyParagraphs.map((range) => ({
        ...range,
        structuralType: "paragraph",
      })),
    ];
  }

  return [{ start, end, structuralType: "block" }];
}

/**
 * Split major blocks only at already-authored, independently meaningful
 * structural boundaries. Sentences, shared lead-ins, procedures, exceptions,
 * qualifiers, and attached code remain intact.
 */
export function parseInstructionSpans(input) {
  assertMarkdownInput(input);
  const blocks = parseInstructionBlocks(input);
  const headings = scanHeadings(input);
  const ranges = blocks.flatMap((block) => {
    const mixedSectionRanges = decomposeMixedSection(block);
    if (mixedSectionRanges) {
      return mixedSectionRanges.map((candidate) => ({ ...candidate, block }));
    }
    const conditionalSubtreeRanges = decomposeGenericConditionalSubtree(
      input,
      block,
      headings,
    );
    if (conditionalSubtreeRanges) {
      return conditionalSubtreeRanges.map((candidate) => ({
        ...candidate,
        block,
      }));
    }
    return siblingHeadingRanges(block, headings).flatMap((range) =>
      decomposeStructuralRange(input, range.start, range.end).map(
        (candidate) => ({ ...candidate, block }),
      ),
    );
  });

  return ranges
    .filter((range) => input.slice(range.start, range.end).trim().length > 0)
    .map((range, index) =>
      makeSourceSpan(
        input,
        headings,
        range.block,
        range.start,
        range.end,
        range.structuralType,
        index + 1,
        {
          ...(range.conditionalDetailKind
            ? { conditionalDetailKind: range.conditionalDetailKind }
            : {}),
          ...(range.conditionalDetailDefinition
            ? {
                conditionalDetailDefinition:
                  range.conditionalDetailDefinition,
              }
            : {}),
          ...(Number.isSafeInteger(range.routeInsertionOffset)
            ? { routeInsertionOffset: range.routeInsertionOffset }
            : {}),
        },
      ),
    );
}

function countMatches(value, patterns) {
  return patterns.reduce(
    (count, pattern) => count + (pattern.test(value) ? 1 : 0),
    0,
  );
}

const CONDITION_MARKER =
  /(?:\b(?:when|whenever|if|only when|for\s+(?:every\s+)?[^.\n]{0,60}?tasks?|during|in case of|before)\b|(?:場合|とき|時に|時は|際に|際は|に限り|のみ|失敗したら|失敗時))/i;

const UNIVERSAL_RULE_MARKER =
  /(?:\b(?:always|never|must(?:\s+not)?|do not|don't|for every task|every task|all tasks|all work|before any change|at all times|repository-wide|repo-wide|global rules?|decision owner|final approval|final decision|authority boundary|ownership boundary|completion line|completion requirement|definition of done|prohibited|forbidden|safety|evidence)\b|(?:常に|必ず|してはいけない|やってはいけない|すべての作業|すべてのタスク|全タスク|いかなる場合も|最終判断|最終承認|承認|権限|禁止|完了条件|完了基準|完了|安全|証拠|破壊))/i;

const UNIVERSAL_HEADING_MARKER =
  /(?:\b(?:always|required|core rules?|every task|all tasks|do not|never|authority|decision owner|final approval|completion|definition of done|safety|prohibitions?|forbidden|evidence)\b|(?:常に|必須|基本ルール|すべての作業|すべてのタスク|全タスク|やってはいけない|権限|最終判断|最終承認|完了|安全|禁止|証拠))/i;

const ABSOLUTE_SCOPE_MARKER =
  /(?:\b(?:for every task|every task|all tasks|all work|before any change|at all times|repository-wide|repo-wide|global rules?|decision owner|final approval|final decision|authority boundary|ownership boundary|completion integrity|completion evidence|completion line|completion requirement|definition of done)\b|(?:すべての作業|すべてのタスク|全タスク|いかなる場合も|決定権者|最終判断|最終承認|権限境界|完了条件|完了基準))/i;

const NEGATED_UNIVERSAL_SCOPE_MARKER =
  /\b(?:is\s+)?not\s+(?:an?\s+)?(?:repository-wide|repo-wide|global)\s+rules?\b/i;

const CONDITIONAL_HANDOFF_TRIGGER_SYNTAX =
  /(?:\b(?:when|whenever|if|only when|involving|in case of)\b|(?:場合|とき|時に|時は|際に|際は|必要な場合))/iu;

const CONDITIONAL_HANDOFF_TRIGGER_TOPIC =
  /(?:\b(?:significant context|accumulated context|long(?:-running)? (?:context|discussion)|multiple decisions|continuation risk|handoff[- ]sensitive|raw history|history (?:has become|becomes|is) inefficient|repeated decisions|accumulated project state|handoff decision|compression decision|compaction decision)\b|(?:文脈.{0,24}長|長い文脈|継続リスク|履歴.{0,24}非効率|圧縮.{0,24}(?:判断|必要)|引き継ぎ.{0,24}(?:判断|必要)))/iu;

const CONDITIONAL_HANDOFF_UNIVERSAL_GUARD =
  /(?:\b(?:decision owner|final authority|final approval|final decision|authority boundary|ownership boundary|repository-wide safety|repo-wide safety|mandatory completion evidence|completion evidence (?:is|required)|for every task|every task|all tasks|for every response|every response|all responses)\b|(?:決定権者|最終権限|最終判断|最終承認|権限境界|すべてのタスク|全タスク|すべての応答|全応答|リポジトリ全体.{0,12}安全|完了証拠|完了条件))/iu;

const CONTEXT_HEADING =
  /(?:\b(?:background|context|contextual|conditional operations?|rationale|historical notes?|reference notes?)\b|条件付き|背景|履歴|理由|文脈|参考情報)/i;

function instructionClauses(text) {
  return text
    .split(/(?:\r\n|\r|\n)+|(?<=[.!?。！？])\s+/u)
    .map((clause) => clause.trim())
    .filter(Boolean);
}

function firstBodyParagraph(text) {
  const lines = text.split(/\r\n|\r|\n/u);
  let index = 0;
  if (/^ {0,3}##(?!#)[\t ]+\S/u.test(lines[index] ?? "")) {
    index += 1;
  }
  while (index < lines.length && lines[index].trim().length === 0) {
    index += 1;
  }
  const paragraph = [];
  while (index < lines.length && lines[index].trim().length > 0) {
    paragraph.push(lines[index]);
    index += 1;
  }
  return paragraph.join(" ").trim();
}

function conditionalHandoffSection(span) {
  const leafHeadingText = span.headingContext.at(-1) ?? "";
  const kind = CONDITIONAL_HANDOFF_SECTION_ORDER.find((candidate) =>
    CONDITIONAL_HANDOFF_SECTION_DEFINITIONS[candidate].heading.test(
      leafHeadingText,
    ),
  );
  if (!kind) {
    return null;
  }

  const leadingTrigger = firstBodyParagraph(span.text);
  const structurallyIndependent = Boolean(
    span.structuralType === "block" &&
      span.wholeParentBlock &&
      /^ {0,3}##(?!#)[\t ]+\S/u.test(span.text),
  );
  const explicitConditionalTrigger = Boolean(
    CONDITIONAL_HANDOFF_TRIGGER_SYNTAX.test(leadingTrigger) &&
      CONDITIONAL_HANDOFF_TRIGGER_TOPIC.test(leadingTrigger),
  );
  const hasUniversalGuard = CONDITIONAL_HANDOFF_UNIVERSAL_GUARD.test(
    span.text,
  );

  return {
    kind,
    leadingTrigger,
    eligible:
      structurallyIndependent &&
      explicitConditionalTrigger &&
      !hasUniversalGuard,
    structurallyIndependent,
    explicitConditionalTrigger,
    hasUniversalGuard,
  };
}

function compactConditionalHandoffRouteLabel(kind, leadingTrigger) {
  const normalized = leadingTrigger.replace(/[.!?。]+$/u, "");
  if (kind === "chat-continuation") {
    const trigger = /\bwhen\s+(.+)$/iu.exec(normalized)?.[1];
    return trigger ? `Chat continuation: ${trigger}` : normalized;
  }
  if (kind === "context-compression") {
    const trigger =
      /\binvolving\s+(.+?),\s+include a short Context Compression signal$/iu.exec(
        normalized,
      )?.[1];
    return trigger ? `Context compression: ${trigger}` : normalized;
  }
  return normalized;
}

function categoryMatches(value, definition) {
  return (
    definition.heading.test(value) ||
    definition.signals.some((signal) => signal.test(value))
  );
}

function normalizeCondition(value) {
  return value
    .replace(/^ {0,3}[-+*][\t ]+/u, "")
    .trim()
    .replace(/\s+/gu, " ")
    .toLocaleLowerCase("und");
}

function conditionPrefix(clause) {
  const normalized = clause.replace(/^ {0,3}[-+*][\t ]+/u, "").trim();
  if (!CONDITION_MARKER.test(normalized)) {
    return null;
  }
  const separator = normalized.search(/[,，、:：]/u);
  return separator === -1 ? normalized : normalized.slice(0, separator);
}

function matchingCategories(value) {
  return GUIDE_CATEGORIES.filter(
    (category) =>
      category !== "other" && categoryMatches(value, GUIDE_DEFINITIONS[category]),
  );
}

function obligationStrength(text) {
  if (
    /(?:\b(?:never|must\s+not|do not|don't|forbidden|prohibited)\b|(?:してはいけない|やってはいけない|禁止))/iu.test(
      text,
    )
  ) {
    return "PROHIBITION";
  }
  if (/(?:\b(?:must|always|required)\b|(?:必ず|常に|必須))/iu.test(text)) {
    return "REQUIRED";
  }
  if (/(?:\b(?:should|recommended)\b|(?:推奨|望ましい))/iu.test(text)) {
    return "ADVISORY";
  }
  if (/(?:\b(?:may|can|optional)\b|(?:任意|してもよい))/iu.test(text)) {
    return "PERMISSIVE";
  }
  return "UNSPECIFIED";
}

const UNIQUE_ATTACHMENT_MARKER =
  /(?:```|~~~|^ {0,3}\d+[.)][\t ]+|\b(?:unless|except(?:ion)?|however|example|for example|step\s+\d+)\b|(?:ただし|例外|例えば|手順|ステップ))/imu;

function duplicateEligibility(span, scopeClassification) {
  if (!["list-item", "paragraph"].includes(span.structuralType)) {
    return {
      eligible: false,
      reason: "not an independently decomposed sibling list item or paragraph",
    };
  }
  if (!["UNIVERSAL", "CONDITIONAL"].includes(scopeClassification)) {
    return { eligible: false, reason: "scope is not conservatively equivalent" };
  }
  if (UNIQUE_ATTACHMENT_MARKER.test(span.text)) {
    return {
      eligible: false,
      reason: "the occurrence has a unique attachment, qualifier, or procedure",
    };
  }
  return {
    eligible: true,
    reason:
      "exact body, equivalent scope, condition, and obligation strength; no unique attachment",
  };
}

function analyzeBlock(block) {
  const text = block.text;
  const conditionalHandoff = conditionalHandoffSection(block);
  const conditionalDetail = block.conditionalDetailKind
    ? block.conditionalDetailDefinition ??
      CONDITIONAL_DETAIL_DEFINITIONS[block.conditionalDetailKind]
    : null;
  const leafHeadingText = block.headingContext.at(-1) ?? "";
  const clauses = instructionClauses(text);
  const prefixes = clauses.map(conditionPrefix).filter(Boolean);
  const activationCategories = [
    ...new Set(prefixes.flatMap((prefix) => matchingCategories(prefix))),
  ];
  const headingCategories = matchingCategories(leafHeadingText);
  let selectedCategory = null;
  let selectedScore = 0;
  let selectedHeadingMatch = false;
  let selectedBodyHits = 0;

  for (const category of GUIDE_CATEGORIES.filter(
    (candidate) => candidate !== "other",
  )) {
    const definition = GUIDE_DEFINITIONS[category];
    const headingMatch = definition.heading.test(leafHeadingText);
    const bodyHits = countMatches(text, definition.signals);
    const score = (headingMatch ? 4 : 0) + bodyHits;

    if (score > selectedScore) {
      selectedCategory = category;
      selectedScore = score;
      selectedHeadingMatch = headingMatch;
      selectedBodyHits = bodyHits;
    }
  }

  const scoredCategory = selectedCategory;
  const activationAmbiguous = activationCategories.length > 1;
  if (activationCategories.length === 1) {
    selectedCategory = activationCategories[0];
  } else if (activationCategories.length === 0 && headingCategories.length === 1) {
    selectedCategory = headingCategories[0];
  }

  const selectedDefinition = selectedCategory
    ? GUIDE_DEFINITIONS[selectedCategory]
    : null;
  selectedHeadingMatch = Boolean(
    selectedDefinition && selectedDefinition.heading.test(leafHeadingText),
  );
  selectedBodyHits = selectedDefinition
    ? countMatches(text, selectedDefinition.signals)
    : 0;
  const explicitlyScopedHeading = Boolean(
    selectedHeadingMatch && !UNIVERSAL_HEADING_MARKER.test(leafHeadingText),
  );
  const categoryConditional = Boolean(
    selectedDefinition &&
      prefixes.some((prefix) => categoryMatches(prefix, selectedDefinition)),
  );
  const explicitlyScoped = explicitlyScopedHeading || categoryConditional;
  const hasUnqualifiedUniversal = clauses.some(
    (clause) =>
      !NEGATED_UNIVERSAL_SCOPE_MARKER.test(clause) &&
      (ABSOLUTE_SCOPE_MARKER.test(clause) ||
        (UNIVERSAL_RULE_MARKER.test(clause) &&
          !explicitlyScopedHeading &&
          !(
            selectedDefinition &&
            CONDITION_MARKER.test(clause) &&
            categoryMatches(clause, selectedDefinition)
          ))),
  );
  const bodyCategories = matchingCategories(text);
  const ownershipAmbiguous = Boolean(
    activationAmbiguous ||
      (activationCategories.length === 0 &&
        headingCategories.length !== 1 &&
        bodyCategories.length > 0),
  );
  const ambiguousCategory = Boolean(
    ownershipAmbiguous || (selectedCategory && !explicitlyScoped),
  );
  const contextualHeading = CONTEXT_HEADING.test(leafHeadingText);
  const clearlySpecialist =
    selectedHeadingMatch || selectedBodyHits >= 2 || categoryConditional;
  const moveConservative = Boolean(
    selectedCategory &&
      clearlySpecialist &&
      categoryConditional &&
      !ownershipAmbiguous &&
      !hasUnqualifiedUniversal,
  );
  const moveBalanced = Boolean(
    moveConservative ||
      (selectedCategory &&
        clearlySpecialist &&
        explicitlyScoped &&
        !ownershipAmbiguous &&
        !hasUnqualifiedUniversal),
  );
  const moveAggressive = Boolean(
    moveBalanced ||
      (!hasUnqualifiedUniversal &&
        !ambiguousCategory &&
        ((selectedCategory !== null && explicitlyScoped) || contextualHeading)),
  );

  let scopeClassification = "AMBIGUOUS";
  let conditionSignature = "UNCLEAR";
  if (hasUnqualifiedUniversal) {
    scopeClassification = "UNIVERSAL";
    conditionSignature = "GLOBAL";
  } else if (!ownershipAmbiguous && categoryConditional) {
    scopeClassification = "CONDITIONAL";
    conditionSignature = `${selectedCategory}:${prefixes
      .map(normalizeCondition)
      .join(" || ")}`;
  } else if (!ownershipAmbiguous && explicitlyScopedHeading) {
    scopeClassification = "CONDITIONAL";
    conditionSignature = `${selectedCategory}:heading:${normalizeCondition(
      leafHeadingText,
    )}`;
  } else if (scoredCategory === null && bodyCategories.length === 0) {
    scopeClassification = "UNQUALIFIED_ACTIVE";
    conditionSignature = "UNQUALIFIED";
  }
  const folding = duplicateEligibility(block, scopeClassification);

  const analysis = {
    category: selectedCategory ?? "other",
    scopeClassification,
    conditionSignature,
    obligationStrength: obligationStrength(text),
    ownershipAmbiguous,
    activationCategories,
    folding,
    move: {
      Conservative: moveConservative,
      Balanced: moveBalanced,
      Aggressive: moveAggressive,
    },
  };

  if (conditionalDetail) {
    return {
      ...analysis,
      category: conditionalDetail.category,
      scopeClassification: "CONDITIONAL",
      conditionSignature: `detail:${block.conditionalDetailKind}`,
      ownershipAmbiguous: false,
      activationCategories: [conditionalDetail.category],
      conditionalDetailKind: block.conditionalDetailKind,
      conditionalDetailDefinition: conditionalDetail,
      routeInsertionOffset: block.routeInsertionOffset,
      move: {
        Conservative: true,
        Balanced: true,
        Aggressive: true,
      },
    };
  }

  if (block.structuralType === "block-fragment") {
    return {
      ...analysis,
      move: {
        Conservative: false,
        Balanced: false,
        Aggressive: false,
      },
    };
  }

  if (conditionalHandoff?.eligible) {
    return {
      ...analysis,
      category: "handoff",
      scopeClassification: "CONDITIONAL",
      conditionSignature: `handoff:section:${conditionalHandoff.kind}`,
      ownershipAmbiguous: false,
      activationCategories: ["handoff"],
      conditionalHandoffKind: conditionalHandoff.kind,
      conditionalHandoffRouteLabel: compactConditionalHandoffRouteLabel(
        conditionalHandoff.kind,
        conditionalHandoff.leadingTrigger,
      ),
      move: {
        Conservative: true,
        Balanced: true,
        Aggressive: true,
      },
    };
  }

  if (conditionalHandoff) {
    return {
      ...analysis,
      scopeClassification:
        analysis.scopeClassification === "UNIVERSAL"
          ? "UNIVERSAL"
          : "AMBIGUOUS",
      conditionSignature:
        analysis.scopeClassification === "UNIVERSAL" ? "GLOBAL" : "UNCLEAR",
      ownershipAmbiguous:
        analysis.scopeClassification === "UNIVERSAL"
          ? analysis.ownershipAmbiguous
          : true,
      conditionalHandoffKind: null,
      move: {
        Conservative: false,
        Balanced: false,
        Aggressive: false,
      },
    };
  }

  return analysis;
}

function ensureFinalNewline(value) {
  return `${value.trimEnd()}\n`;
}

function normalizeExactBody(value) {
  const lines = value.replace(/\r\n?|\n/gu, "\n").split("\n");
  while (lines.length > 0 && lines[0].trim().length === 0) {
    lines.shift();
  }
  while (lines.length > 0 && lines.at(-1).trim().length === 0) {
    lines.pop();
  }
  return lines.join("\n");
}

function renderRepetitionSignal(decision) {
  if (!decision.duplicateGroup) {
    return "";
  }
  return `\n\nSource repetition: ${decision.duplicateGroup.occurrenceCount} equivalent occurrences were folded into this canonical rule.`;
}

function renderCanonicalSpan(decision) {
  return `${decision.span.text.trim()}${renderRepetitionSignal(decision)}`;
}

function renderGuideSourceSpan(decision, preserveWholeSection = false) {
  const content = preserveWholeSection
    ? decision.span.text
    : `${renderCanonicalSpan(decision)}\n`;
  return `<!-- source-span: ${decision.span.id} -->\n${content}<!-- /source-span: ${decision.span.id} -->`;
}

const SOURCE_BASE_CONTRACT = [
  "### Source Base Contract",
  "",
  "Relative file references and relative Markdown links inside a preserved moved source span are resolved from the directory containing the installed generated active `AGENTS.md` — the original source-file base — not from the generated guide's directory. This preserves the original reference base only; it does not establish that a target exists.",
].join("\n");

function decisionRouteSpec(decision, guidePath) {
  let definition;
  let inline = false;
  let insertionOffset = null;

  if (decision.analysis.conditionalDetailKind) {
    definition = decision.analysis.conditionalDetailDefinition;
    inline = true;
    insertionOffset = decision.analysis.routeInsertionOffset;
  } else if (decision.analysis.conditionalHandoffKind) {
    definition =
      CONDITIONAL_HANDOFF_SECTION_DEFINITIONS[
        decision.analysis.conditionalHandoffKind
      ];
  } else {
    return null;
  }

  const path = `${guidePath}#${definition.anchor}`;
  const routeLabel =
    decision.analysis.conditionalHandoffRouteLabel ?? definition.routeLabel;
  return {
    path,
    text: `${routeLabel} → read \`${path}\``,
    shortLabel:
      decision.analysis.conditionalHandoffRouteLabel ?? definition.shortLabel,
    recallCondition:
      decision.analysis.conditionalHandoffRouteLabel ?? definition.recall,
    guideHeading: definition.guideHeading,
    guideAnchor: definition.anchor,
    inline,
    insertionOffset,
    sourceStart: decision.span.start,
  };
}

function renderGuide(category, decisions) {
  const definition = GUIDE_DEFINITIONS[category];
  const guidePath = `agent-guides/${category}.md`;
  const ordinary = decisions.filter(
    (decision) => !decisionRouteSpec(decision, guidePath),
  );
  const routedGroups = new Map();
  for (const decision of decisions) {
    const spec = decisionRouteSpec(decision, guidePath);
    if (!spec) {
      continue;
    }
    const existing = routedGroups.get(spec.path) ?? {
      spec,
      decisions: [],
    };
    existing.decisions.push(decision);
    if (spec.sourceStart < existing.spec.sourceStart) {
      existing.spec = spec;
    }
    routedGroups.set(spec.path, existing);
  }

  const sections = [];
  if (ordinary.length > 0) {
    sections.push(
      `${SOURCE_BASE_CONTRACT}\n\n${ordinary
        .map((decision) => renderGuideSourceSpan(decision))
        .join("\n\n")}`,
    );
  }
  for (const group of [...routedGroups.values()].sort(
    (left, right) => left.spec.sourceStart - right.spec.sourceStart,
  )) {
    sections.push(
      `<a id="${group.spec.guideAnchor}"></a>\n## ${group.spec.guideHeading}\n\n${SOURCE_BASE_CONTRACT}\n\n${group.decisions
        .sort((left, right) => left.span.start - right.span.start)
        .map((decision) => renderGuideSourceSpan(decision, true))
        .join("\n\n")}`,
    );
  }
  const body = sections.join("\n\n");

  return ensureFinalNewline(
    `# ${definition.title}\n\n${body}\n\nCanonical receipt name: \`${category}\`.`,
  );
}

function buildGuideRoute(guide, decisions) {
  const routeSpecs = decisions
    .map((decision) => decisionRouteSpec(decision, guide.path))
    .filter(Boolean);
  if (routeSpecs.length === 0) {
    return {
      category: guide.category,
      path: guide.path,
      recallCondition: GUIDE_DEFINITIONS[guide.category].recall,
    };
  }

  const entries = [];
  if (
    decisions.some((decision) => !decisionRouteSpec(decision, guide.path))
  ) {
    entries.push({
      path: guide.path,
      text: `${GUIDE_DEFINITIONS[guide.category].routeLabel}: read \`${guide.path}\``,
      recallCondition: GUIDE_DEFINITIONS[guide.category].recall,
    });
  }
  const uniqueSpecs = new Map();
  for (const spec of routeSpecs) {
    const existing = uniqueSpecs.get(spec.path);
    if (!existing || spec.sourceStart < existing.sourceStart) {
      uniqueSpecs.set(spec.path, spec);
    }
  }
  for (const spec of [...uniqueSpecs.values()].sort(
    (left, right) => left.sourceStart - right.sourceStart,
  )) {
    entries.push({
      path: spec.path,
      text: spec.text,
      shortLabel: spec.shortLabel,
      recallCondition: spec.recallCondition,
      guideHeading: spec.guideHeading,
      guideAnchor: spec.guideAnchor,
      ...(spec.inline
        ? { inline: true, insertionOffset: spec.insertionOffset }
        : {}),
    });
  }

  return {
    category: guide.category,
    path: guide.path,
    recallCondition: entries
      .map((entry) => entry.recallCondition)
      .join("; "),
    entries,
  };
}

function addAuthoredExtensionTriggersToContinuationRoutes(routes, decisions) {
  const extensionDecision = decisions.find(
    (decision) =>
      decision.moved &&
      decision.analysis.conditionalDetailKind ===
        "conditional-report-extensions",
  );
  const triggers = extensionDecision
    ? conditionalExtensionTriggers(extensionDecision.span.text)
    : null;
  if (!triggers) {
    return routes;
  }

  const mappings = [
    {
      anchor: "chat-continuation",
      label: /^(?:Chat Continuation|チャット継続)$/iu,
    },
    {
      anchor: "context-compression",
      label:
        /^(?:Context Compression(?:[\t ]*\/[\t ]*Handoff)?|コンテキスト圧縮(?:[\t ]*\/[\t ]*ハンドオフ)?)$/iu,
    },
  ];

  return routes.map((route) => ({
    ...route,
    ...(route.entries
      ? {
          entries: route.entries.map((entry) => {
            const mapping = mappings.find(
              (candidate) => candidate.anchor === entry.guideAnchor,
            );
            const trigger = mapping
              ? triggers.find((candidate) =>
                  mapping.label.test(candidate.label),
                )
              : null;
            if (!trigger) {
              return entry;
            }
            const shortLabel = `${entry.shortLabel}; ${trigger.condition.replace(/^when\s+/iu, "")}`;
            return {
              ...entry,
              text: `${shortLabel} → read \`${entry.path}\``,
              shortLabel,
              recallCondition: `${entry.recallCondition}; ${trigger.condition}`,
            };
          }),
        }
      : {}),
  }));
}

function renderReceipt(guides) {
  const emitted = new Set(guides.map((guide) => guide.category));
  const orderedGuides = GUIDE_CATEGORIES.filter((category) =>
    emitted.has(category),
  );
  const suffix =
    orderedGuides.length === 0
      ? ""
      : ` Available guide order: ${orderedGuides.map((category) => `\`${category}\``).join(", ")}.`;
  return `## Lightweight Guidance Receipt\n\nEnd every response with \`🪶 Core only\`, or \`🪶 Core + <guides actually read>\` using \` · \` in canonical order.${suffix} This is a declaration, not proof.`;
}

function renderGlobalRoute(route) {
  if (!route.entries?.length) {
    return `- ${GUIDE_DEFINITIONS[route.category].routeLabel}: read \`${route.path}\``;
  }
  const entries = route.entries.filter((entry) => !entry.inline);
  if (entries.length === 0) {
    return "";
  }
  if (entries.length === 1) {
    return `- ${entries[0].text}`;
  }
  if (entries.every((entry) => entry.shortLabel)) {
    return entries
      .map((entry) => `- ${entry.shortLabel} → read \`${entry.path}\``)
      .join("\n");
  }
  return entries.map((entry) => `- ${entry.text}`).join("\n");
}

function renderActive(canonicalDecisions, routes, guides) {
  const inlineRoutesByOffset = new Map();
  for (const entry of routes.flatMap((route) => route.entries ?? [])) {
    if (!entry.inline) {
      continue;
    }
    const existing = inlineRoutesByOffset.get(entry.insertionOffset) ?? [];
    existing.push(entry);
    inlineRoutesByOffset.set(entry.insertionOffset, existing);
  }

  const activeParts = [];
  for (const decision of [...canonicalDecisions].sort(
    (left, right) => left.span.start - right.span.start,
  )) {
    if (!decision.moved) {
      activeParts.push(renderCanonicalSpan(decision));
    }
    const inlineEntries = inlineRoutesByOffset.get(decision.span.end) ?? [];
    for (const entry of inlineEntries) {
      activeParts.push(`- ${entry.text}`);
    }
  }
  const base = activeParts.filter(Boolean).join("\n\n") || "# AGENTS.md";

  const sections = [base];
  const renderedRoutes = routes
      .map(renderGlobalRoute)
      .filter(Boolean)
      .join("\n");
  if (renderedRoutes.length > 0) {
    sections.push(
      `## Conditional Guidance\n\n${renderedRoutes}`,
    );
  }
  sections.push(renderReceipt(guides));
  return ensureFinalNewline(sections.join("\n\n"));
}

function escapeTableCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function renderMoveMap(entries) {
  const rows = entries.map(
    (entry) =>
      `| ${escapeTableCell(entry.id)} | ${entry.sourceStart}–${entry.sourceEnd} | ${escapeTableCell(entry.headingContext)} | ${entry.disposition} | ${escapeTableCell(entry.canonicalSpanId)} | ${escapeTableCell(entry.destination)} | ${escapeTableCell(entry.collapsedSpanIds.join(", ") || "—")} | ${entry.repetitionCount} | ${escapeTableCell(entry.scopeClassification)} | ${escapeTableCell(entry.conditionSignature)} | ${escapeTableCell(entry.foldingReason)} |`,
  );

  return ensureFinalNewline(
    [
      "# Move Map",
      "",
      "Monotonicity metric: retained source characters (Unicode code points).",
      "",
      "| Source span | Source range | Original heading context | Disposition | Canonical source span | Canonical destination | Collapsed source spans | Repetition | Scope | Condition | Folding reason |",
      "|---|---:|---|---|---|---|---|---:|---|---|---|",
      ...rows,
    ].join("\n"),
  );
}

function countCharacters(value) {
  return Array.from(value).length;
}

function measureMarkdown(value) {
  const trimmed = value.trim();
  return {
    utf8Bytes: UTF8_ENCODER.encode(value).length,
    characters: countCharacters(value),
    lines: value.length === 0 ? 0 : (value.match(/\r\n|\r|\n/g)?.length ?? 0) + 1,
    words: trimmed.length === 0 ? 0 : trimmed.split(/\s+/u).length,
  };
}

function groupDecisionsForFolding(decisions) {
  const eligible = new Map();
  const exactCandidates = new Map();

  for (const decision of decisions) {
    const exactBody = normalizeExactBody(decision.span.text);
    const bodyKey = fnv1a(exactBody);
    const bodyBucket = exactCandidates.get(bodyKey) ?? [];
    bodyBucket.push(decision);
    exactCandidates.set(bodyKey, bodyBucket);

    if (!decision.analysis.folding.eligible) {
      continue;
    }
    const key = JSON.stringify([
      exactBody,
      decision.analysis.scopeClassification,
      decision.analysis.conditionSignature,
      decision.analysis.obligationStrength,
    ]);
    const bucket = eligible.get(key) ?? [];
    bucket.push(decision);
    eligible.set(key, bucket);
  }

  const duplicateGroups = [];
  for (const candidates of eligible.values()) {
    if (candidates.length < 2) {
      continue;
    }
    const ordered = [...candidates].sort((left, right) => {
      const leftPreferred =
        !left.moved && left.analysis.scopeClassification === "UNIVERSAL" ? 0 : 1;
      const rightPreferred =
        !right.moved && right.analysis.scopeClassification === "UNIVERSAL" ? 0 : 1;
      return leftPreferred - rightPreferred || left.span.start - right.span.start;
    });
    const canonical = ordered[0];
    const group = {
      id: `D${String(duplicateGroups.length + 1).padStart(3, "0")}-${fnv1a(
        normalizeExactBody(canonical.span.text),
      )}`,
      canonicalSpanId: canonical.span.id,
      destination: canonical.moved
        ? `agent-guides/${canonical.category}.md`
        : "AGENTS.md",
      occurrenceSpanIds: ordered.map((decision) => decision.span.id),
      collapsedSpanIds: ordered.slice(1).map((decision) => decision.span.id),
      occurrenceCount: ordered.length,
      scopeClassification: canonical.analysis.scopeClassification,
      conditionSignature: canonical.analysis.conditionSignature,
      obligationStrength: canonical.analysis.obligationStrength,
      foldingReason: canonical.analysis.folding.reason,
    };
    duplicateGroups.push(group);
    canonical.duplicateGroup = group;
    for (const collapsed of ordered.slice(1)) {
      collapsed.collapsedInto = canonical;
      collapsed.duplicateGroup = group;
    }
  }

  const potentialDuplicates = [];
  for (const candidates of exactCandidates.values()) {
    if (candidates.length < 2) {
      continue;
    }
    const candidateIds = candidates.map((decision) => decision.span.id).sort();
    const fullyFolded = duplicateGroups.some(
      (group) =>
        group.occurrenceSpanIds.length === candidateIds.length &&
        [...group.occurrenceSpanIds].sort().every(
          (id, index) => id === candidateIds[index],
        ),
    );
    if (!fullyFolded) {
      potentialDuplicates.push({
        exactBodyHash: fnv1a(normalizeExactBody(candidates[0].span.text)),
        spanIds: candidates.map((decision) => decision.span.id),
        reason:
          "Exact bodies were not all folded because scope, conditions, structure, or attachments were not conservatively equivalent.",
      });
    }
  }

  return { duplicateGroups, potentialDuplicates };
}

function buildResult(input, mode) {
  const blocks = parseInstructionBlocks(input);
  const spans = parseInstructionSpans(input);
  const decisions = spans.map((span) => {
    const analysis = analyzeBlock(span);
    return {
      span,
      analysis,
      category: analysis.category,
      moved: analysis.move[mode],
    };
  });
  const { duplicateGroups, potentialDuplicates } =
    groupDecisionsForFolding(decisions);
  const canonicalDecisions = decisions.filter(
    (decision) => !decision.collapsedInto,
  );
  const retainedDecisions = canonicalDecisions.filter(
    (decision) => !decision.moved,
  );
  const guideGroups = GUIDE_CATEGORIES.map((category) => {
    const categoryDecisions = canonicalDecisions
      .filter(
        (decision) => decision.moved && decision.category === category,
      );

    if (categoryDecisions.length === 0) {
      return null;
    }

    return {
      decisions: categoryDecisions,
      guide: {
        category,
        path: `agent-guides/${category}.md`,
        content: renderGuide(category, categoryDecisions),
        spanIds: categoryDecisions.map((decision) => decision.span.id),
        blockIds: categoryDecisions.map((decision) => decision.span.id),
      },
    };
  }).filter(Boolean);
  const guides = guideGroups.map((group) => group.guide);
  const routes = addAuthoredExtensionTriggersToContinuationRoutes(
    guideGroups.map((group) =>
      buildGuideRoute(group.guide, group.decisions),
    ),
    canonicalDecisions,
  );
  const activeContent = renderActive(canonicalDecisions, routes, guides);
  const entries = decisions.map((decision) => ({
    id: decision.span.id,
    sourceStart: decision.span.start,
    sourceEnd: decision.span.end,
    sourceBodyHash: fnv1a(normalizeExactBody(decision.span.text)),
    headingContext:
      decision.span.headingContext.join(" > ") || "Document root",
    structuralType: decision.span.structuralType,
    disposition: decision.collapsedInto
      ? "COLLAPSED_EXACT_DUPLICATE"
      : decision.moved
        ? "MOVED_TO_GUIDE"
        : "RETAINED_ACTIVE",
    result: decision.collapsedInto
      ? "COLLAPSED"
      : decision.moved
        ? "MOVED"
        : "RETAINED",
    canonicalSpanId: decision.collapsedInto
      ? decision.collapsedInto.span.id
      : decision.span.id,
    destination: decision.collapsedInto
      ? decision.duplicateGroup.destination
      : decision.moved
        ? `agent-guides/${decision.category}.md`
        : "AGENTS.md",
    collapsedSpanIds: decision.collapsedInto
      ? []
      : decision.duplicateGroup?.collapsedSpanIds ?? [],
    repetitionCount: decision.duplicateGroup?.occurrenceCount ?? 1,
    scopeClassification: decision.analysis.scopeClassification,
    conditionSignature: decision.analysis.conditionSignature,
    obligationStrength: decision.analysis.obligationStrength,
    foldingReason: decision.duplicateGroup
      ? decision.duplicateGroup.foldingReason
      : "not folded",
    recallCondition:
      (decision.collapsedInto?.moved ?? decision.moved)
        ? decision.analysis.conditionalDetailKind
          ? decision.analysis.conditionalDetailDefinition.recall
          : decision.analysis.conditionalHandoffKind
            ? CONDITIONAL_HANDOFF_SECTION_DEFINITIONS[
                decision.analysis.conditionalHandoffKind
              ].recall
          : GUIDE_DEFINITIONS[
              decision.collapsedInto?.category ?? decision.category
            ].recall
        : "Always loaded",
  }));

  const collapsedDecisions = decisions.filter(
    (decision) => decision.collapsedInto,
  );
  const movedDecisions = canonicalDecisions.filter(
    (decision) => decision.moved,
  );
  const retainedSourceCharacters = retainedDecisions.reduce(
    (total, decision) => total + countCharacters(decision.span.text),
    0,
  );
  const externalizedSourceCharacters = movedDecisions.reduce(
    (total, decision) => total + countCharacters(decision.span.text),
    0,
  );
  const exactDuplicateCharactersFolded = collapsedDecisions.reduce(
    (total, decision) =>
      total + countCharacters(normalizeExactBody(decision.span.text)),
    0,
  );

  return {
    mode,
    originalInput: input,
    activeAgentsMd: {
      path: "AGENTS.md",
      content: activeContent,
      retainedSpanIds: retainedDecisions.map((decision) => decision.span.id),
      retainedBlockIds: retainedDecisions.map((decision) => decision.span.id),
      routes,
    },
    guides,
    moveMap: {
      path: "move-map.md",
      content: renderMoveMap(entries),
      entries,
    },
    sourceAccounting: {
      dispositions: entries.map((entry) => ({
        sourceSpanId: entry.id,
        sourceStart: entry.sourceStart,
        sourceEnd: entry.sourceEnd,
        sourceBodyHash: entry.sourceBodyHash,
        structuralType: entry.structuralType,
        disposition: entry.disposition,
        canonicalSpanId: entry.canonicalSpanId,
        canonicalDestination: entry.destination,
        collapsedSpanIds: entry.collapsedSpanIds,
        repetitionCount: entry.repetitionCount,
        scopeClassification: entry.scopeClassification,
        conditionSignature: entry.conditionSignature,
        obligationStrength: entry.obligationStrength,
        foldingReason: entry.foldingReason,
      })),
      duplicateGroups,
      potentialDuplicates,
      ambiguousOwnershipSpanIds: decisions
        .filter((decision) => decision.analysis.ownershipAmbiguous)
        .map((decision) => decision.span.id),
    },
    counts: {
      monotonicityMetric:
        "retained source characters (Unicode code points)",
      before: measureMarkdown(input),
      after: measureMarkdown(activeContent),
      sourceBlocks: blocks.length,
      retainedBlocks: retainedDecisions.length,
      sourceSpans: spans.length,
      retainedSpans: retainedDecisions.length,
      movedSpans: movedDecisions.length,
      collapsedDuplicateOccurrences: collapsedDecisions.length,
      exactDuplicateCharactersFolded,
      retainedSourceCharacters,
      externalizedSourceCharacters,
      uniqueInstructionsDeleted: 0,
      unaccountedSourceSpans: 0,
    },
  };
}

function countOccurrences(value, needle) {
  if (needle.length === 0) {
    return 0;
  }
  return value.split(needle).length - 1;
}

function malformed(message) {
  fail("MALFORMED_RESULT", message);
}

function assertGeneratedInvariants(input, result) {
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    malformed("result must be an object");
  }
  if (result.originalInput !== input) {
    malformed("original input was not preserved byte-for-byte");
  }
  if (
    !result.activeAgentsMd ||
    result.activeAgentsMd.path !== "AGENTS.md" ||
    typeof result.activeAgentsMd.content !== "string" ||
    result.activeAgentsMd.content.trim().length === 0
  ) {
    malformed("active AGENTS.md is missing or empty");
  }
  if (!Array.isArray(result.guides)) {
    malformed("guides must be an array");
  }

  const guidePaths = new Set();
  const movedIds = [];
  for (const guide of result.guides) {
    if (
      !GUIDE_CATEGORIES.includes(guide.category) ||
      guide.path !== `agent-guides/${guide.category}.md` ||
      typeof guide.content !== "string" ||
      guide.content.trim().length === 0 ||
      !Array.isArray(guide.spanIds) ||
      guide.spanIds.length === 0 ||
      !Array.isArray(guide.blockIds) ||
      JSON.stringify(guide.blockIds) !== JSON.stringify(guide.spanIds)
    ) {
      malformed("an emitted guide is empty or outside the bounded schema");
    }
    if (guidePaths.has(guide.path)) {
      malformed(`duplicate guide path: ${guide.path}`);
    }
    guidePaths.add(guide.path);
    movedIds.push(...guide.spanIds);

    if (
      countOccurrences(
        guide.content,
        `Canonical receipt name: \`${guide.category}\`.`,
      ) !== 1
    ) {
      malformed(`guide ${guide.path} is missing its receipt instruction`);
    }
    if (!guide.content.includes(SOURCE_BASE_CONTRACT)) {
      malformed(`guide ${guide.path} is missing the source base contract`);
    }

    for (const spanId of guide.spanIds) {
      if (
        countOccurrences(
          guide.content,
          `<!-- source-span: ${spanId} -->`,
        ) !== 1
      ) {
        malformed(`moved source span ${spanId} is not present exactly once`);
      }
    }
  }

  const routes = result.activeAgentsMd.routes;
  if (!Array.isArray(routes) || routes.length !== result.guides.length) {
    malformed("active routes and emitted guides are not one-to-one");
  }
  for (const route of routes) {
    if (!guidePaths.has(route.path)) {
      malformed(`active route points to missing guide: ${route.path}`);
    }
    const routeEntries = route.entries?.length > 0
      ? route.entries
      : [{ path: route.path }];
    const seenPaths = new Set();
    for (const entry of routeEntries) {
      if (
        !entry ||
        typeof entry.path !== "string" ||
        seenPaths.has(entry.path) ||
        (entry.path !== route.path &&
          !entry.path.startsWith(`${route.path}#`)) ||
        countOccurrences(
          result.activeAgentsMd.content,
          `read \`${entry.path}\``,
        ) !== 1 ||
        (entry.inline &&
          (!Number.isSafeInteger(entry.insertionOffset) ||
            entry.insertionOffset < 0 ||
            entry.insertionOffset > input.length))
      ) {
        malformed(`guide ${route.path} has a malformed active route`);
      }
      seenPaths.add(entry.path);
      if (
        entry.guideHeading &&
        (!entry.guideAnchor ||
          countOccurrences(
            result.guides.find((guide) => guide.path === route.path).content,
            `<a id="${entry.guideAnchor}"></a>`,
          ) !== 1 ||
          !result.guides
            .find((guide) => guide.path === route.path)
            .content.includes(`## ${entry.guideHeading}`))
      ) {
        malformed(`guide ${route.path} is missing a stable route heading`);
      }
    }
  }

  if (
    countOccurrences(
      result.activeAgentsMd.content,
      "## Lightweight Guidance Receipt",
    ) !== 1 ||
    !result.activeAgentsMd.content.includes(
      "End every response with `🪶 Core only`, or `🪶 Core + <guides actually read>` using ` · ` in canonical order.",
    )
  ) {
    malformed("active AGENTS.md is missing the receipt contract");
  }

  if (
    !result.moveMap ||
    result.moveMap.path !== "move-map.md" ||
    typeof result.moveMap.content !== "string" ||
    !Array.isArray(result.moveMap.entries)
  ) {
    malformed("move-map.md is missing or malformed");
  }

  const spans = parseInstructionSpans(input);
  const spansById = new Map(spans.map((span) => [span.id, span]));
  let coveredThrough = 0;
  for (const span of spans) {
    if (
      span.start < coveredThrough ||
      input.slice(coveredThrough, span.start).trim().length > 0
    ) {
      malformed("source spans overlap or leave instruction text unaccounted");
    }
    coveredThrough = span.end;
  }
  if (input.slice(coveredThrough).trim().length > 0) {
    malformed("source spans leave trailing instruction text unaccounted");
  }

  for (const span of spans) {
    const requiresExactGuideCopy =
      span.structuralType === "conditional-detail" ||
      conditionalHandoffSection(span)?.eligible;
    if (!requiresExactGuideCopy) {
      continue;
    }
    const guide = result.guides.find((candidate) =>
      candidate.spanIds.includes(span.id),
    );
    if (!guide) {
      malformed(`byte-preserved source span has no guide: ${span.id}`);
    }
    const opener = `<!-- source-span: ${span.id} -->\n`;
    const closer = `<!-- /source-span: ${span.id} -->`;
    const contentStart = guide.content.indexOf(opener) + opener.length;
    const contentEnd = guide.content.indexOf(closer, contentStart);
    if (
      contentStart < opener.length ||
      contentEnd === -1 ||
      guide.content.slice(contentStart, contentEnd) !== span.text
    ) {
      malformed(`source span was not preserved byte-for-byte: ${span.id}`);
    }
  }
  const sourceIds = spans.map((span) => span.id);
  const entryIds = result.moveMap.entries.map((entry) => entry.id);
  const retainedIds = result.activeAgentsMd.retainedSpanIds;
  if (
    !Array.isArray(retainedIds) ||
    JSON.stringify(result.activeAgentsMd.retainedBlockIds) !==
      JSON.stringify(retainedIds)
  ) {
    malformed("retained source-span ledger is missing");
  }
  const collapsedIds = result.moveMap.entries
    .filter((entry) => entry.disposition === "COLLAPSED_EXACT_DUPLICATE")
    .map((entry) => entry.id);
  const dispositionIds = [...retainedIds, ...movedIds, ...collapsedIds];

  if (
    new Set(sourceIds).size !== sourceIds.length ||
    new Set(entryIds).size !== entryIds.length ||
    new Set(dispositionIds).size !== dispositionIds.length ||
    sourceIds.length !== entryIds.length ||
    sourceIds.length !== dispositionIds.length ||
    sourceIds.some((id) => !entryIds.includes(id)) ||
    sourceIds.some((id) => !dispositionIds.includes(id))
  ) {
    malformed("a source span disappeared or was assigned more than once");
  }

  const allowedDispositions = new Set([
    "RETAINED_ACTIVE",
    "MOVED_TO_GUIDE",
    "COLLAPSED_EXACT_DUPLICATE",
  ]);
  const entriesById = new Map(
    result.moveMap.entries.map((entry) => [entry.id, entry]),
  );
  for (const entry of result.moveMap.entries) {
    const sourceSpan = spansById.get(entry.id);
    if (
      !allowedDispositions.has(entry.disposition) ||
      !sourceIds.includes(entry.canonicalSpanId) ||
      entry.sourceStart !== sourceSpan.start ||
      entry.sourceEnd !== sourceSpan.end ||
      entry.sourceBodyHash !== fnv1a(normalizeExactBody(sourceSpan.text)) ||
      !Number.isSafeInteger(entry.repetitionCount) ||
      entry.repetitionCount < 1
    ) {
      malformed(`source-span disposition is malformed: ${entry.id}`);
    }
    const canonical = entriesById.get(entry.canonicalSpanId);
    if (!canonical || canonical.disposition === "COLLAPSED_EXACT_DUPLICATE") {
      malformed(`collapsed source span has no emitted canonical: ${entry.id}`);
    }
    if (
      entry.disposition === "COLLAPSED_EXACT_DUPLICATE" &&
      (entry.canonicalSpanId === entry.id ||
        entry.destination !== canonical.destination ||
        entry.repetitionCount < 2 ||
        entry.foldingReason === "not folded")
    ) {
      malformed(`collapsed source span is not traceable: ${entry.id}`);
    }
    if (
      entry.disposition !== "COLLAPSED_EXACT_DUPLICATE" &&
      entry.canonicalSpanId !== entry.id
    ) {
      malformed(`canonical source span points elsewhere: ${entry.id}`);
    }
  }

  if (
    !result.sourceAccounting ||
    !Array.isArray(result.sourceAccounting.dispositions) ||
    result.sourceAccounting.dispositions.length !== sourceIds.length ||
    !Array.isArray(result.sourceAccounting.duplicateGroups) ||
    !Array.isArray(result.sourceAccounting.potentialDuplicates) ||
    !Array.isArray(result.sourceAccounting.ambiguousOwnershipSpanIds)
  ) {
    malformed("source accounting is missing or malformed");
  }
  for (const group of result.sourceAccounting.duplicateGroups) {
    if (
      group.occurrenceCount < 2 ||
      group.occurrenceSpanIds.length !== group.occurrenceCount ||
      group.collapsedSpanIds.length !== group.occurrenceCount - 1 ||
      !group.occurrenceSpanIds.includes(group.canonicalSpanId)
    ) {
      malformed(`exact-duplicate group is malformed: ${group.id}`);
    }
    const canonical = entriesById.get(group.canonicalSpanId);
    if (!canonical || canonical.destination !== group.destination) {
      malformed(`exact-duplicate canonical destination is malformed: ${group.id}`);
    }
    const signal = `Source repetition: ${group.occurrenceCount} equivalent occurrences were folded into this canonical rule.`;
    const artifacts = [
      result.activeAgentsMd.content,
      ...result.guides.map((guide) => guide.content),
    ];
    if (
      artifacts.reduce(
        (total, content) => total + countOccurrences(content, signal),
        0,
      ) !==
      result.sourceAccounting.duplicateGroups.filter(
        (candidate) => candidate.occurrenceCount === group.occurrenceCount,
      ).length
    ) {
      malformed(`each canonical repetition signal must appear once: ${group.id}`);
    }
  }

  const retainedCharacters = retainedIds.reduce(
    (total, id) => total + countCharacters(spansById.get(id).text),
    0,
  );
  const externalizedCharacters = movedIds.reduce(
    (total, id) => total + countCharacters(spansById.get(id).text),
    0,
  );
  const foldedCharacters = collapsedIds.reduce(
    (total, id) =>
      total + countCharacters(normalizeExactBody(spansById.get(id).text)),
    0,
  );
  if (
    !result.counts ||
    result.counts.monotonicityMetric !==
      "retained source characters (Unicode code points)" ||
    JSON.stringify(result.counts.before) !==
      JSON.stringify(measureMarkdown(input)) ||
    JSON.stringify(result.counts.after) !==
      JSON.stringify(measureMarkdown(result.activeAgentsMd.content)) ||
    result.counts.sourceSpans !== spans.length ||
    result.counts.retainedSpans !== retainedIds.length ||
    result.counts.movedSpans !== movedIds.length ||
    result.counts.collapsedDuplicateOccurrences !== collapsedIds.length ||
    result.counts.retainedSourceCharacters !== retainedCharacters ||
    result.counts.externalizedSourceCharacters !== externalizedCharacters ||
    result.counts.exactDuplicateCharactersFolded !== foldedCharacters ||
    result.counts.uniqueInstructionsDeleted !== 0 ||
    result.counts.unaccountedSourceSpans !== 0
  ) {
    malformed("before/after counts are missing or inconsistent");
  }
}

/**
 * Assert that an externally supplied or internal result exactly matches the
 * canonical deterministic result for the given input and mode.
 */
export function assertValidCompactionResult(input, mode, candidate) {
  assertInput(input, mode);
  assertGeneratedInvariants(input, candidate);

  const expected = buildResult(input, mode);
  let actualJson;
  let expectedJson;
  try {
    actualJson = JSON.stringify(candidate);
    expectedJson = JSON.stringify(expected);
  } catch {
    malformed("result must be JSON-serializable");
  }

  if (actualJson !== expectedJson) {
    malformed("result does not match the canonical in-memory contract");
  }

  return true;
}

/**
 * Compact one non-empty AGENTS.md string using one exact mode.
 *
 * This function is pure with respect to repositories and files: it reads no
 * paths, performs no writes, and returns generated artifacts in memory.
 */
export function compactAgentsMd(input, mode) {
  assertInput(input, mode);
  const result = buildResult(input, mode);
  assertValidCompactionResult(input, mode, result);
  return result;
}
