// Auspicious plaque phrases (匾额 / 横批) — the short blessings Chinese families
// carve onto a wooden board or write on red paper and hang above a doorway,
// over the lintel (门楣), or in the main hall (中堂).
//
// The set mixes festive door blessings (春节 horizontal banners) with the
// classical hall- and study-plaque mottoes drawn from the 易经, 老子, and others.
//
// Schema per plaque (kept close to the poem schema so the same renderer/
// stroke-order writer work on both):
// {
//   phrase,            // the characters as hung, e.g. "家和万事兴"
//   pinyin,            // tone-marked reading
//   title,             // English rendering of the phrase
//   category,          // short tag, e.g. "Family & home"
//   chars: [ {c, p, m}, ... ],   // per-character gloss (tappable)
//   meaning,           // what the phrase wishes for
//   usage              // where it hangs and the custom/allusion behind it
// }

const PLAQUES = [
  {
    phrase: "家和万事兴",
    pinyin: "jiā hé wàn shì xīng",
    title: "A harmonious home prospers in all things",
    category: "Family & home",
    chars: [
      { c: "家", p: "jiā", m: "family / home" },
      { c: "和", p: "hé", m: "harmony / peace" },
      { c: "万", p: "wàn", m: "ten thousand / all" },
      { c: "事", p: "shì", m: "matters / affairs" },
      { c: "兴", p: "xīng", m: "to flourish / prosper" }
    ],
    meaning: "When a household lives in harmony, every undertaking flourishes — the most cherished of all domestic blessings, valuing family peace above wealth.",
    usage: "Hung in the main hall (中堂) or above the inner door. It is the phrase Chinese families reach for first when choosing a plaque for the home."
  },
  {
    phrase: "出入平安",
    pinyin: "chū rù píng ān",
    title: "Safe coming and going",
    category: "Door blessing",
    chars: [
      { c: "出", p: "chū", m: "to go out / leave" },
      { c: "入", p: "rù", m: "to enter / come in" },
      { c: "平", p: "píng", m: "level / peaceful" },
      { c: "安", p: "ān", m: "safe / at peace" }
    ],
    meaning: "May all who pass through this door be safe whether they are setting out or returning home.",
    usage: "Pasted right on the door or as a 横批 (horizontal banner) above it — a wish for the safety of everyone who crosses the threshold each day."
  },
  {
    phrase: "紫气东来",
    pinyin: "zǐ qì dōng lái",
    title: "Auspicious purple vapor comes from the east",
    category: "Door blessing",
    chars: [
      { c: "紫", p: "zǐ", m: "purple" },
      { c: "气", p: "qì", m: "vapor / energy / air" },
      { c: "东", p: "dōng", m: "east" },
      { c: "来", p: "lái", m: "to come / arrive" }
    ],
    meaning: "Good fortune is drawing near to the house.",
    usage: "A classic door-lintel plaque. From the legend of Laozi: a purple cloud drifting from the east heralded the sage's coming, so the phrase signals blessing approaching the home."
  },
  {
    phrase: "五福临门",
    pinyin: "wǔ fú lín mén",
    title: "May the Five Blessings arrive at your door",
    category: "Door blessing",
    chars: [
      { c: "五", p: "wǔ", m: "five" },
      { c: "福", p: "fú", m: "blessing / good fortune" },
      { c: "临", p: "lín", m: "to arrive / descend upon" },
      { c: "门", p: "mén", m: "door / gate" }
    ],
    meaning: "May all five of life's blessings — longevity, wealth, health, love of virtue, and a peaceful end — visit your household.",
    usage: "The Five Blessings (五福) are named in the Book of Documents (尚书). A favorite New Year banner wishing the whole set of them upon the family."
  },
  {
    phrase: "招财进宝",
    pinyin: "zhāo cái jìn bǎo",
    title: "Beckon wealth, usher in treasure",
    category: "Prosperity",
    chars: [
      { c: "招", p: "zhāo", m: "to beckon / attract" },
      { c: "财", p: "cái", m: "wealth / riches" },
      { c: "进", p: "jìn", m: "to bring in / advance" },
      { c: "宝", p: "bǎo", m: "treasure" }
    ],
    meaning: "A frank wish to draw in money and prosperity.",
    usage: "Beloved of shops and homes alike at New Year, and often written as a single fused glyph combining all four characters into one lucky design."
  },
  {
    phrase: "金玉满堂",
    pinyin: "jīn yù mǎn táng",
    title: "Gold and jade fill the hall",
    category: "Prosperity",
    chars: [
      { c: "金", p: "jīn", m: "gold" },
      { c: "玉", p: "yù", m: "jade" },
      { c: "满", p: "mǎn", m: "full / brimming" },
      { c: "堂", p: "táng", m: "hall" }
    ],
    meaning: "May riches and abundance fill the house.",
    usage: "The phrase appears in the Laozi (道德经). Hung in the main hall as a wish for lasting prosperity."
  },
  {
    phrase: "鸿运当头",
    pinyin: "hóng yùn dāng tóu",
    title: "Great fortune shines overhead",
    category: "Good fortune",
    chars: [
      { c: "鸿", p: "hóng", m: "grand / vast (lit. wild swan)" },
      { c: "运", p: "yùn", m: "luck / fortune" },
      { c: "当", p: "dāng", m: "to face / be right at" },
      { c: "头", p: "tóu", m: "head / top" }
    ],
    meaning: "Splendid luck is arriving right above you — your fortunes are on the rise.",
    usage: "A bright, upbeat New Year banner, often paired with red lanterns at the door."
  },
  {
    phrase: "吉祥如意",
    pinyin: "jí xiáng rú yì",
    title: "Good fortune and fulfilled wishes",
    category: "Good fortune",
    chars: [
      { c: "吉", p: "jí", m: "lucky / auspicious" },
      { c: "祥", p: "xiáng", m: "auspicious / blessed" },
      { c: "如", p: "rú", m: "according to" },
      { c: "意", p: "yì", m: "wish / intent" }
    ],
    meaning: "Auspiciousness, and may everything turn out as you wish.",
    usage: "One of the most universal four-character blessings — at home above the door, on gifts, and in New Year greetings."
  },
  {
    phrase: "万事如意",
    pinyin: "wàn shì rú yì",
    title: "May all things go as you wish",
    category: "Good fortune",
    chars: [
      { c: "万", p: "wàn", m: "ten thousand / all" },
      { c: "事", p: "shì", m: "matters / affairs" },
      { c: "如", p: "rú", m: "according to" },
      { c: "意", p: "yì", m: "wish / intent" }
    ],
    meaning: "May every one of your affairs unfold just as you hope.",
    usage: "A standard 横批 crowning a pair of New Year door couplets."
  },
  {
    phrase: "万象更新",
    pinyin: "wàn xiàng gēng xīn",
    title: "All things are made new",
    category: "New Year",
    chars: [
      { c: "万", p: "wàn", m: "ten thousand / all" },
      { c: "象", p: "xiàng", m: "phenomena / sights" },
      { c: "更", p: "gēng", m: "to renew / change" },
      { c: "新", p: "xīn", m: "new" }
    ],
    meaning: "With the turning of the year, the whole world takes on fresh life.",
    usage: "A quintessential Spring Festival banner, capturing the renewal the new year brings."
  },
  {
    phrase: "竹报平安",
    pinyin: "zhú bào píng ān",
    title: "Bamboo brings tidings of peace",
    category: "Door blessing",
    chars: [
      { c: "竹", p: "zhú", m: "bamboo" },
      { c: "报", p: "bào", m: "to report / announce" },
      { c: "平", p: "píng", m: "peaceful" },
      { c: "安", p: "ān", m: "safe / at peace" }
    ],
    meaning: "Word of safety and peace arrives at the home.",
    usage: "Burning bamboo — the ancestor of the firecracker — was thought to drive off ill fortune, so the phrase came to mean glad news of safety for the household."
  },
  {
    phrase: "国泰民安",
    pinyin: "guó tài mín ān",
    title: "The nation at peace, the people secure",
    category: "Peace",
    chars: [
      { c: "国", p: "guó", m: "nation / country" },
      { c: "泰", p: "tài", m: "peaceful / grand" },
      { c: "民", p: "mín", m: "the people" },
      { c: "安", p: "ān", m: "at peace / secure" }
    ],
    meaning: "May the country be tranquil and its people live in safety.",
    usage: "A dignified plaque seen on civic buildings and family halls alike, voicing a wish that reaches beyond the household."
  },
  {
    phrase: "福寿康宁",
    pinyin: "fú shòu kāng níng",
    title: "Blessing, long life, health, and peace",
    category: "Longevity",
    chars: [
      { c: "福", p: "fú", m: "blessing / good fortune" },
      { c: "寿", p: "shòu", m: "longevity / long life" },
      { c: "康", p: "kāng", m: "health / well-being" },
      { c: "宁", p: "níng", m: "tranquility / peace" }
    ],
    meaning: "The four things most wished for an elder — fortune, long life, health, and a calm heart.",
    usage: "A favorite for the homes of elders and for birthday celebrations (寿宴)."
  },
  {
    phrase: "一帆风顺",
    pinyin: "yī fān fēng shùn",
    title: "Smooth sailing all the way",
    category: "Good fortune",
    chars: [
      { c: "一", p: "yī", m: "one / a single" },
      { c: "帆", p: "fān", m: "sail" },
      { c: "风", p: "fēng", m: "wind" },
      { c: "顺", p: "shùn", m: "favorable / going smoothly" }
    ],
    meaning: "May you sail on with a fair wind behind you and meet no obstacles.",
    usage: "Hung for new ventures, graduations, and departures — a wish for an unobstructed road ahead."
  },
  {
    phrase: "室雅人和",
    pinyin: "shì yǎ rén hé",
    title: "An elegant home, people in harmony",
    category: "Scholar's hall",
    chars: [
      { c: "室", p: "shì", m: "room / home" },
      { c: "雅", p: "yǎ", m: "refined / elegant" },
      { c: "人", p: "rén", m: "person / people" },
      { c: "和", p: "hé", m: "harmony / accord" }
    ],
    meaning: "A home of quiet refinement where those within live in accord.",
    usage: "A scholarly plaque for the study or sitting room, prizing cultivated taste and gentle relations over show."
  },
  {
    phrase: "厚德载物",
    pinyin: "hòu dé zài wù",
    title: "Virtue ample enough to bear all things",
    category: "Scholar's hall",
    chars: [
      { c: "厚", p: "hòu", m: "thick / deep / generous" },
      { c: "德", p: "dé", m: "virtue / moral character" },
      { c: "载", p: "zài", m: "to carry / bear" },
      { c: "物", p: "wù", m: "things / all that exists" }
    ],
    meaning: "As the earth carries everything upon it, so should a person's virtue be broad enough to bear all things.",
    usage: "From the Book of Changes (易经, 坤卦). A revered motto for the study and hall, often paired with 自强不息 (\"strive without cease\")."
  },
  {
    phrase: "上善若水",
    pinyin: "shàng shàn ruò shuǐ",
    title: "The highest good is like water",
    category: "Scholar's hall",
    chars: [
      { c: "上", p: "shàng", m: "highest / supreme" },
      { c: "善", p: "shàn", m: "goodness / virtue" },
      { c: "若", p: "ruò", m: "to be like / resemble" },
      { c: "水", p: "shuǐ", m: "water" }
    ],
    meaning: "The finest virtue is like water — it nourishes all things yet contends with none.",
    usage: "From the Laozi (道德经). A contemplative plaque for the study, prizing humility and yielding strength."
  },
  {
    phrase: "宁静致远",
    pinyin: "níng jìng zhì yuǎn",
    title: "Through stillness one reaches far",
    category: "Scholar's hall",
    chars: [
      { c: "宁", p: "níng", m: "calm / tranquil" },
      { c: "静", p: "jìng", m: "still / quiet" },
      { c: "致", p: "zhì", m: "to attain / reach" },
      { c: "远", p: "yuǎn", m: "far / distant" }
    ],
    meaning: "Only a calm and quiet mind can set its sights on distant aims.",
    usage: "From Zhuge Liang's letter of admonition to his son (诫子书). The classic plaque for a scholar's desk."
  }
];
