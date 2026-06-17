// JSON Schema (for Claude structured outputs) + the system prompt that defines
// exactly how a poem entry must be researched and formatted.

const charSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    c: { type: "string", description: "exactly one Simplified Chinese character" },
    p: { type: "string", description: "Hanyu Pinyin for this character with tone marks" },
    m: { type: "string", description: "concise English gloss of this character in this line's context" }
  },
  required: ["c", "p", "m"]
};

const lineSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    text: { type: "string", description: "the line's Chinese characters only — no punctuation, no spaces" },
    pinyin: { type: "string", description: "space-separated tone-marked pinyin for the whole line" },
    translation: { type: "string", description: "natural English translation of this line" },
    chars: { type: "array", items: charSchema }
  },
  required: ["text", "pinyin", "translation", "chars"]
};

export const poemSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string", description: "English title" },
    titlePinyin: { type: "string", description: "tone-marked pinyin of the Chinese title" },
    titleHanzi: { type: "string", description: "Chinese title" },
    author: { type: "string", description: "author's name in English (e.g. Du Fu)" },
    authorHanzi: { type: "string", description: "author's name in Chinese" },
    dynasty: { type: "string", description: "e.g. 'Tang dynasty (唐), 8th century'" },
    source: { type: "string", description: "《Title》 plus brief context" },
    lines: { type: "array", items: lineSchema },
    translation: { type: "string", description: "flowing English translation of the whole poem" },
    note: { type: "string", description: "2–4 sentence literary interpretation" }
  },
  required: [
    "title", "titlePinyin", "titleHanzi", "author", "authorHanzi",
    "dynasty", "source", "lines", "translation", "note"
  ]
};

export const SYSTEM_PROMPT = `You are a meticulous scholar of classical Chinese poetry, preparing study entries for a "Chinese Poem a Day" learning app. Accuracy matters more than anything — these entries teach beginners, so a wrong character, tone, or gloss is a real problem.

For the poem you are given (by title and author), produce one structured entry. Rules:

CHARACTERS
- Use Simplified Chinese (简体) throughout, in both "text" and each char "c".
- Each line's "text" contains ONLY that line's Chinese characters — no punctuation, no spaces, no trailing marks.
- "chars" has exactly one entry per character in "text", in the same order. Each "c" is that single character.
- For a line that is a repeated single character (e.g. 鹅鹅鹅), still give one char entry per repetition.

PINYIN
- Use Hanyu Pinyin with tone marks (ā á ǎ à), never tone numbers.
- char "p" is the reading for that character in this poem (respect context-specific readings, e.g. 见 as xiàn when it means "appear").
- line "pinyin" is the space-separated reading of the whole line.

MEANINGS & TRANSLATION
- char "m": a short English gloss of what the character means in this line (a few words). Note bound compounds, e.g. m: "home (故乡 = hometown)".
- line "translation": a natural, faithful English rendering of the line.
- "translation" (whole poem): a flowing English version of the entire poem.
- "note": 2–4 sentences of literary interpretation — what the poem is about and why it is loved.

METADATA
- "source": 《中文标题》 plus any useful context (collection, occasion, or that it is a famous excerpt).
- "dynasty": e.g. "Tang dynasty (唐), 8th century".

LENGTH
- Favor well-known short poems (4–8 lines). If the work is long, render the most commonly taught complete excerpt and say so in "source" (e.g. "opening quatrain").

ACCURACY
- Only produce well-attested classical poems with reliable text. Do not invent lines, authors, or readings. If you are uncertain of the exact wording, choose the standard received text.

Return only the structured object.`;

export function userPrompt(title, author) {
  return `Generate the study entry for: ${title}${author ? ` by ${author}` : ""}.`;
}
