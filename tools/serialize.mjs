// Serializes a poem object into a JS object literal matching poems.js's style,
// so generated entries read like the hand-written ones.

const s = (v) => JSON.stringify(v); // safe double-quoted, escaped string

export function serializePoem(p) {
  const line = (l) => {
    const chars = l.chars
      .map((c) => `{ c: ${s(c.c)}, p: ${s(c.p)}, m: ${s(c.m)} }`)
      .join(", ");
    return `      { text: ${s(l.text)}, pinyin: ${s(l.pinyin)}, translation: ${s(l.translation)},\n` +
           `        chars: [ ${chars} ] }`;
  };
  const lines = p.lines.map(line).join(",\n");
  return [
    `  {`,
    `    title: ${s(p.title)},`,
    `    titlePinyin: ${s(p.titlePinyin)},`,
    `    titleHanzi: ${s(p.titleHanzi)},`,
    `    author: ${s(p.author)},`,
    `    authorHanzi: ${s(p.authorHanzi)},`,
    `    dynasty: ${s(p.dynasty)},`,
    `    source: ${s(p.source)},`,
    `    lines: [\n${lines}\n    ],`,
    `    translation: ${s(p.translation)},`,
    `    note: ${s(p.note)}`,
    `  }`
  ].join("\n");
}
