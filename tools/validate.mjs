// Validates a generated poem object against the schema invariants the app relies on.
// The most important check: each line's `chars` array must align 1:1 with the
// Chinese characters in that line's `text` (same count, same characters, in order).

const PUNCT = /[\s　，。、；：？！,.“”"'‘’（）()《》〈〉「」【】—–…·]/g;

const STRING_FIELDS = [
  "title", "titlePinyin", "titleHanzi", "author",
  "authorHanzi", "dynasty", "source", "translation", "note"
];

export function cleanText(text) {
  return [...String(text).replace(PUNCT, "")];
}

export function validatePoem(poem, label = "") {
  const errors = [];
  const where = label ? `[${label}] ` : "";

  if (!poem || typeof poem !== "object") {
    return { ok: false, errors: [`${where}not an object`] };
  }
  for (const f of STRING_FIELDS) {
    if (typeof poem[f] !== "string" || !poem[f].trim()) {
      errors.push(`${where}missing/empty field: ${f}`);
    }
  }
  if (!Array.isArray(poem.lines) || poem.lines.length === 0) {
    errors.push(`${where}lines must be a non-empty array`);
    return { ok: errors.length === 0, errors };
  }

  poem.lines.forEach((line, i) => {
    const ln = `${where}line ${i + 1}`;
    if (!line || typeof line !== "object") { errors.push(`${ln}: not an object`); return; }
    for (const f of ["text", "pinyin", "translation"]) {
      if (typeof line[f] !== "string" || !line[f].trim()) errors.push(`${ln}: missing/empty ${f}`);
    }
    if (!Array.isArray(line.chars) || line.chars.length === 0) {
      errors.push(`${ln}: chars must be a non-empty array`);
      return;
    }
    const textChars = cleanText(line.text || "");
    if (textChars.length !== line.chars.length) {
      errors.push(`${ln}: char count mismatch — text has ${textChars.length} characters but chars[] has ${line.chars.length} ("${line.text}")`);
    }
    line.chars.forEach((ch, j) => {
      if (!ch || typeof ch !== "object") { errors.push(`${ln} char ${j + 1}: not an object`); return; }
      for (const f of ["c", "p", "m"]) {
        if (typeof ch[f] !== "string" || !ch[f].trim()) errors.push(`${ln} char ${j + 1}: missing/empty ${f}`);
      }
      if (typeof ch.c === "string" && [...ch.c].length !== 1) {
        errors.push(`${ln} char ${j + 1}: c must be a single character, got "${ch.c}"`);
      }
      if (textChars[j] !== undefined && ch.c !== textChars[j]) {
        errors.push(`${ln} char ${j + 1}: c "${ch.c}" does not match text character "${textChars[j]}" at that position`);
      }
    });
  });

  return { ok: errors.length === 0, errors };
}
