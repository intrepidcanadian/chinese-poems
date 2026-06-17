// Curated set of famous Chinese poems (古诗).
// Each poem rotates as the "Poem of the Day". Data is hand-checked:
//   - pinyin uses tone marks
//   - every character has an individual gloss (the "interpretation of the characters")
//   - each line has an English translation
//   - whole-poem translation + literary note + author/dynasty/source
//
// Schema per poem:
// {
//   title, titlePinyin, author, authorHanzi, dynasty, source,
//   lines: [ { text, pinyin, translation, chars: [ {c, p, m}, ... ] }, ... ],
//   translation: "full poem translation",
//   note: "literary interpretation"
// }

const POEMS = [
  {
    title: "Quiet Night Thoughts",
    titlePinyin: "Jìng Yè Sī",
    titleHanzi: "静夜思",
    author: "Li Bai",
    authorHanzi: "李白",
    dynasty: "Tang dynasty (唐), c. 8th century",
    source: "《静夜思》 — one of the most memorized poems in the Chinese language",
    lines: [
      { text: "床前明月光", pinyin: "chuáng qián míng yuè guāng", translation: "Before my bed, the bright moonlight —",
        chars: [
          { c: "床", p: "chuáng", m: "bed" },
          { c: "前", p: "qián", m: "before / in front of" },
          { c: "明", p: "míng", m: "bright" },
          { c: "月", p: "yuè", m: "moon" },
          { c: "光", p: "guāng", m: "light" } ] },
      { text: "疑是地上霜", pinyin: "yí shì dì shàng shuāng", translation: "I wonder if it is frost upon the ground.",
        chars: [
          { c: "疑", p: "yí", m: "to suspect / seem" },
          { c: "是", p: "shì", m: "to be / is" },
          { c: "地", p: "dì", m: "ground / earth" },
          { c: "上", p: "shàng", m: "on / upon" },
          { c: "霜", p: "shuāng", m: "frost" } ] },
      { text: "举头望明月", pinyin: "jǔ tóu wàng míng yuè", translation: "I raise my head to gaze at the bright moon,",
        chars: [
          { c: "举", p: "jǔ", m: "to raise / lift" },
          { c: "头", p: "tóu", m: "head" },
          { c: "望", p: "wàng", m: "to gaze into the distance" },
          { c: "明", p: "míng", m: "bright" },
          { c: "月", p: "yuè", m: "moon" } ] },
      { text: "低头思故乡", pinyin: "dī tóu sī gù xiāng", translation: "I lower my head and long for home.",
        chars: [
          { c: "低", p: "dī", m: "to lower" },
          { c: "头", p: "tóu", m: "head" },
          { c: "思", p: "sī", m: "to think of / miss" },
          { c: "故", p: "gù", m: "old / former" },
          { c: "乡", p: "xiāng", m: "hometown / native village" } ] }
    ],
    translation: "Bright moonlight spills before my bed — for a moment I take it for frost on the ground. I lift my head toward the shining moon, then bow it again, lost in thoughts of home.",
    note: "Li Bai turns the simplest scene — moonlight mistaken for frost — into a sudden ache of homesickness. The mirrored gestures 举头 (raise head) and 低头 (lower head) trace the whole arc of the feeling: looking up at the same moon that shines over one's distant home, then looking down into longing."
  },

  {
    title: "Spring Morning",
    titlePinyin: "Chūn Xiǎo",
    titleHanzi: "春晓",
    author: "Meng Haoran",
    authorHanzi: "孟浩然",
    dynasty: "Tang dynasty (唐), early 8th century",
    source: "《春晓》",
    lines: [
      { text: "春眠不觉晓", pinyin: "chūn mián bù jué xiǎo", translation: "Asleep in spring, I missed the dawn;",
        chars: [
          { c: "春", p: "chūn", m: "spring" },
          { c: "眠", p: "mián", m: "to sleep" },
          { c: "不", p: "bù", m: "not" },
          { c: "觉", p: "jué", m: "to notice / become aware" },
          { c: "晓", p: "xiǎo", m: "daybreak / dawn" } ] },
      { text: "处处闻啼鸟", pinyin: "chù chù wén tí niǎo", translation: "everywhere I hear the singing birds.",
        chars: [
          { c: "处", p: "chù", m: "place" },
          { c: "处", p: "chù", m: "place (处处 = everywhere)" },
          { c: "闻", p: "wén", m: "to hear" },
          { c: "啼", p: "tí", m: "to chirp / cry (of birds)" },
          { c: "鸟", p: "niǎo", m: "bird(s)" } ] },
      { text: "夜来风雨声", pinyin: "yè lái fēng yǔ shēng", translation: "In the night came the sound of wind and rain —",
        chars: [
          { c: "夜", p: "yè", m: "night" },
          { c: "来", p: "lái", m: "to come" },
          { c: "风", p: "fēng", m: "wind" },
          { c: "雨", p: "yǔ", m: "rain" },
          { c: "声", p: "shēng", m: "sound" } ] },
      { text: "花落知多少", pinyin: "huā luò zhī duō shǎo", translation: "how many blossoms, I wonder, have fallen?",
        chars: [
          { c: "花", p: "huā", m: "flower / blossom" },
          { c: "落", p: "luò", m: "to fall" },
          { c: "知", p: "zhī", m: "to know" },
          { c: "多", p: "duō", m: "many / much" },
          { c: "少", p: "shǎo", m: "few (多少 = how many)" } ] }
    ],
    translation: "Spring sleep is so sweet I don't notice the dawn; all around me I hear birdsong. Last night there was the sound of wind and rain — who knows how many blossoms have fallen?",
    note: "A poem about waking, not about action. The speaker never even rises; the whole spring world arrives through sound — birds at the window, remembered rain in the dark. The gentle final question carries a touch of tenderness for the fragile, falling blossoms."
  },

  {
    title: "Climbing Stork Tower",
    titlePinyin: "Dēng Guàn Què Lóu",
    titleHanzi: "登鹳雀楼",
    author: "Wang Zhihuan",
    authorHanzi: "王之涣",
    dynasty: "Tang dynasty (唐), early 8th century",
    source: "《登鹳雀楼》",
    lines: [
      { text: "白日依山尽", pinyin: "bái rì yī shān jìn", translation: "The white sun sinks behind the mountains,",
        chars: [
          { c: "白", p: "bái", m: "white" },
          { c: "日", p: "rì", m: "sun" },
          { c: "依", p: "yī", m: "to lean against / along" },
          { c: "山", p: "shān", m: "mountain" },
          { c: "尽", p: "jìn", m: "to end / be used up" } ] },
      { text: "黄河入海流", pinyin: "huáng hé rù hǎi liú", translation: "the Yellow River flows on into the sea.",
        chars: [
          { c: "黄", p: "huáng", m: "yellow" },
          { c: "河", p: "hé", m: "river (黄河 = Yellow River)" },
          { c: "入", p: "rù", m: "to enter" },
          { c: "海", p: "hǎi", m: "sea" },
          { c: "流", p: "liú", m: "to flow" } ] },
      { text: "欲穷千里目", pinyin: "yù qióng qiān lǐ mù", translation: "To stretch your gaze a thousand li,",
        chars: [
          { c: "欲", p: "yù", m: "to wish / want to" },
          { c: "穷", p: "qióng", m: "to exhaust / reach the limit of" },
          { c: "千", p: "qiān", m: "thousand" },
          { c: "里", p: "lǐ", m: "li (a unit of distance)" },
          { c: "目", p: "mù", m: "eye / sight" } ] },
      { text: "更上一层楼", pinyin: "gèng shàng yī céng lóu", translation: "climb one more storey of the tower.",
        chars: [
          { c: "更", p: "gèng", m: "still more / further" },
          { c: "上", p: "shàng", m: "to go up" },
          { c: "一", p: "yī", m: "one" },
          { c: "层", p: "céng", m: "storey / level" },
          { c: "楼", p: "lóu", m: "tower / multi-storey building" } ] }
    ],
    translation: "The white sun leans on the mountains and is gone; the Yellow River pours into the sea. If you long to see a thousand li farther, climb one more flight of the tower.",
    note: "The first two lines paint a vast landscape; the last two turn it into one of China's most quoted lines about ambition — 更上一层楼, 'go up one more floor.' To see further, raise your vantage point. It is used to this day as encouragement to keep striving."
  },

  {
    title: "Longing (Red Beans)",
    titlePinyin: "Xiāng Sī",
    titleHanzi: "相思",
    author: "Wang Wei",
    authorHanzi: "王维",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《相思》 — also known as 红豆 (Red Beans)",
    lines: [
      { text: "红豆生南国", pinyin: "hóng dòu shēng nán guó", translation: "Red beans grow in the southern land;",
        chars: [
          { c: "红", p: "hóng", m: "red" },
          { c: "豆", p: "dòu", m: "bean (红豆 = red bean, the 'love pea')" },
          { c: "生", p: "shēng", m: "to grow / be born" },
          { c: "南", p: "nán", m: "south" },
          { c: "国", p: "guó", m: "land / country" } ] },
      { text: "春来发几枝", pinyin: "chūn lái fā jǐ zhī", translation: "when spring comes, how many sprigs will sprout?",
        chars: [
          { c: "春", p: "chūn", m: "spring" },
          { c: "来", p: "lái", m: "to come / arrive" },
          { c: "发", p: "fā", m: "to put forth / sprout" },
          { c: "几", p: "jǐ", m: "how many / a few" },
          { c: "枝", p: "zhī", m: "branch / sprig" } ] },
      { text: "愿君多采撷", pinyin: "yuàn jūn duō cǎi xié", translation: "I wish you would gather many of them,",
        chars: [
          { c: "愿", p: "yuàn", m: "to wish / hope" },
          { c: "君", p: "jūn", m: "you (respectful)" },
          { c: "多", p: "duō", m: "many / much" },
          { c: "采", p: "cǎi", m: "to pick / pluck" },
          { c: "撷", p: "xié", m: "to gather (采撷 = to pick)" } ] },
      { text: "此物最相思", pinyin: "cǐ wù zuì xiāng sī", translation: "for nothing speaks of longing more than these.",
        chars: [
          { c: "此", p: "cǐ", m: "this" },
          { c: "物", p: "wù", m: "thing" },
          { c: "最", p: "zuì", m: "most" },
          { c: "相", p: "xiāng", m: "mutual / each other" },
          { c: "思", p: "sī", m: "to long for (相思 = lovesick longing)" } ] }
    ],
    translation: "Red beans grow in the southern land; when spring comes, how many shoots appear? Gather as many as you can, my friend — no thing carries longing like these.",
    note: "The red bean (红豆) is the traditional Chinese token of love and remembrance. Wang Wei never names the beloved or the parting; he lets a single small object hold all the feeling. Sending or keeping red beans means 'I am thinking of you.'"
  },

  {
    title: "River Snow",
    titlePinyin: "Jiāng Xuě",
    titleHanzi: "江雪",
    author: "Liu Zongyuan",
    authorHanzi: "柳宗元",
    dynasty: "Tang dynasty (唐), early 9th century",
    source: "《江雪》",
    lines: [
      { text: "千山鸟飞绝", pinyin: "qiān shān niǎo fēi jué", translation: "A thousand hills, and no bird flies;",
        chars: [
          { c: "千", p: "qiān", m: "thousand" },
          { c: "山", p: "shān", m: "mountain / hill" },
          { c: "鸟", p: "niǎo", m: "bird" },
          { c: "飞", p: "fēi", m: "to fly" },
          { c: "绝", p: "jué", m: "cut off / vanished" } ] },
      { text: "万径人踪灭", pinyin: "wàn jìng rén zōng miè", translation: "ten thousand paths, no human trace.",
        chars: [
          { c: "万", p: "wàn", m: "ten thousand" },
          { c: "径", p: "jìng", m: "path / trail" },
          { c: "人", p: "rén", m: "person / human" },
          { c: "踪", p: "zōng", m: "trace / footprint" },
          { c: "灭", p: "miè", m: "to be extinguished / disappear" } ] },
      { text: "孤舟蓑笠翁", pinyin: "gū zhōu suō lì wēng", translation: "A lone boat, an old man in straw cape and hat,",
        chars: [
          { c: "孤", p: "gū", m: "solitary / lone" },
          { c: "舟", p: "zhōu", m: "boat" },
          { c: "蓑", p: "suō", m: "straw rain-cape" },
          { c: "笠", p: "lì", m: "bamboo rain-hat" },
          { c: "翁", p: "wēng", m: "old man" } ] },
      { text: "独钓寒江雪", pinyin: "dú diào hán jiāng xuě", translation: "alone, fishing the cold river snow.",
        chars: [
          { c: "独", p: "dú", m: "alone" },
          { c: "钓", p: "diào", m: "to fish (with hook and line)" },
          { c: "寒", p: "hán", m: "cold" },
          { c: "江", p: "jiāng", m: "river" },
          { c: "雪", p: "xuě", m: "snow" } ] }
    ],
    translation: "Over a thousand hills, the flight of birds has ceased; on ten thousand paths, all human tracks are gone. In a lone boat, an old man in straw cape and hat fishes alone in the cold river snow.",
    note: "A landscape emptied of all life except one figure. Written after Liu Zongyuan was exiled from court, the silent, frozen scene mirrors his isolation — yet the lone fisherman, unmoved in the snow, is also an image of serene, unbroken resolve. The first characters of the four lines (千万孤独) can be read as 'utterly alone.'"
  },

  {
    title: "Compassion for the Farmer",
    titlePinyin: "Mǐn Nóng",
    titleHanzi: "悯农",
    author: "Li Shen",
    authorHanzi: "李绅",
    dynasty: "Tang dynasty (唐), c. 800",
    source: "《悯农》(其二) — second of two poems",
    lines: [
      { text: "锄禾日当午", pinyin: "chú hé rì dāng wǔ", translation: "Hoeing grain under the noonday sun,",
        chars: [
          { c: "锄", p: "chú", m: "to hoe" },
          { c: "禾", p: "hé", m: "standing grain / crops" },
          { c: "日", p: "rì", m: "sun" },
          { c: "当", p: "dāng", m: "at (the time of)" },
          { c: "午", p: "wǔ", m: "noon" } ] },
      { text: "汗滴禾下土", pinyin: "hàn dī hé xià tǔ", translation: "sweat drips onto the soil beneath the grain.",
        chars: [
          { c: "汗", p: "hàn", m: "sweat" },
          { c: "滴", p: "dī", m: "to drip" },
          { c: "禾", p: "hé", m: "grain / crop" },
          { c: "下", p: "xià", m: "below / under" },
          { c: "土", p: "tǔ", m: "soil / earth" } ] },
      { text: "谁知盘中餐", pinyin: "shéi zhī pán zhōng cān", translation: "Who realizes that the food upon the plate,",
        chars: [
          { c: "谁", p: "shéi", m: "who" },
          { c: "知", p: "zhī", m: "to know / realize" },
          { c: "盘", p: "pán", m: "plate / dish" },
          { c: "中", p: "zhōng", m: "in / within" },
          { c: "餐", p: "cān", m: "meal / food" } ] },
      { text: "粒粒皆辛苦", pinyin: "lì lì jiē xīn kǔ", translation: "grain by grain, is all hard, bitter toil?",
        chars: [
          { c: "粒", p: "lì", m: "grain (measure word)" },
          { c: "粒", p: "lì", m: "grain (粒粒 = every single grain)" },
          { c: "皆", p: "jiē", m: "all / every" },
          { c: "辛", p: "xīn", m: "toil / hardship" },
          { c: "苦", p: "kǔ", m: "bitter / suffering (辛苦 = hard toil)" } ] }
    ],
    translation: "He hoes the grain as the sun stands at noon; his sweat drips down into the earth below. Who, looking at the food on the plate, knows that every single grain is bitter toil?",
    note: "Taught to nearly every Chinese child, this poem makes a moral plea for the farmer's labor. The closing line — 粒粒皆辛苦, 'every grain is hard toil' — is quoted whenever someone wastes food, a reminder of the human cost behind an ordinary meal."
  },

  {
    title: "Deer Enclosure",
    titlePinyin: "Lù Zhài",
    titleHanzi: "鹿柴",
    author: "Wang Wei",
    authorHanzi: "王维",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《鹿柴》 — from the Wang River sequence (辋川集)",
    lines: [
      { text: "空山不见人", pinyin: "kōng shān bù jiàn rén", translation: "Empty mountain — no one to be seen,",
        chars: [
          { c: "空", p: "kōng", m: "empty" },
          { c: "山", p: "shān", m: "mountain" },
          { c: "不", p: "bù", m: "not" },
          { c: "见", p: "jiàn", m: "to see" },
          { c: "人", p: "rén", m: "person" } ] },
      { text: "但闻人语响", pinyin: "dàn wén rén yǔ xiǎng", translation: "yet voices of people are heard echoing.",
        chars: [
          { c: "但", p: "dàn", m: "only / yet" },
          { c: "闻", p: "wén", m: "to hear" },
          { c: "人", p: "rén", m: "person / people" },
          { c: "语", p: "yǔ", m: "speech / words" },
          { c: "响", p: "xiǎng", m: "to echo / resound" } ] },
      { text: "返景入深林", pinyin: "fǎn jǐng rù shēn lín", translation: "Returning light enters the deep forest,",
        chars: [
          { c: "返", p: "fǎn", m: "to return" },
          { c: "景", p: "jǐng", m: "sunlight / scene (here: reflected light)" },
          { c: "入", p: "rù", m: "to enter" },
          { c: "深", p: "shēn", m: "deep" },
          { c: "林", p: "lín", m: "forest / woods" } ] },
      { text: "复照青苔上", pinyin: "fù zhào qīng tái shàng", translation: "and shines again upon the green moss.",
        chars: [
          { c: "复", p: "fù", m: "again / once more" },
          { c: "照", p: "zhào", m: "to shine on / illuminate" },
          { c: "青", p: "qīng", m: "green / blue-green" },
          { c: "苔", p: "tái", m: "moss" },
          { c: "上", p: "shàng", m: "on / upon" } ] }
    ],
    translation: "On the empty mountain no one can be seen, yet the echo of human voices is heard. Light slants back into the deep forest and shines once more on the green moss.",
    note: "Wang Wei, a devout Buddhist, captures stillness through tiny disturbances: an unseen voice, a last ray of evening light touching moss. The 'emptiness' (空) is not mere absence but a tranquil, luminous presence — a hallmark of his quiet, meditative style."
  },

  {
    title: "Seeking the Hermit in Vain",
    titlePinyin: "Xún Yǐn Zhě Bù Yù",
    titleHanzi: "寻隐者不遇",
    author: "Jia Dao",
    authorHanzi: "贾岛",
    dynasty: "Tang dynasty (唐), 9th century",
    source: "《寻隐者不遇》",
    lines: [
      { text: "松下问童子", pinyin: "sōng xià wèn tóng zǐ", translation: "Beneath the pines I asked the young boy;",
        chars: [
          { c: "松", p: "sōng", m: "pine tree" },
          { c: "下", p: "xià", m: "under / beneath" },
          { c: "问", p: "wèn", m: "to ask" },
          { c: "童", p: "tóng", m: "child / youth" },
          { c: "子", p: "zǐ", m: "boy (童子 = young servant boy)" } ] },
      { text: "言师采药去", pinyin: "yán shī cǎi yào qù", translation: "he said his master went to gather herbs.",
        chars: [
          { c: "言", p: "yán", m: "to say" },
          { c: "师", p: "shī", m: "master / teacher" },
          { c: "采", p: "cǎi", m: "to pick / gather" },
          { c: "药", p: "yào", m: "medicinal herbs" },
          { c: "去", p: "qù", m: "to go / has gone" } ] },
      { text: "只在此山中", pinyin: "zhǐ zài cǐ shān zhōng", translation: "\"He is only here, within this mountain,",
        chars: [
          { c: "只", p: "zhǐ", m: "only" },
          { c: "在", p: "zài", m: "to be at / in" },
          { c: "此", p: "cǐ", m: "this" },
          { c: "山", p: "shān", m: "mountain" },
          { c: "中", p: "zhōng", m: "within" } ] },
      { text: "云深不知处", pinyin: "yún shēn bù zhī chù", translation: "but the clouds are deep — I cannot say where.\"",
        chars: [
          { c: "云", p: "yún", m: "cloud" },
          { c: "深", p: "shēn", m: "deep / dense" },
          { c: "不", p: "bù", m: "not" },
          { c: "知", p: "zhī", m: "to know" },
          { c: "处", p: "chù", m: "place / whereabouts" } ] }
    ],
    translation: "Under the pines I asked the boy; he said his master had gone to gather herbs. \"He is somewhere on this very mountain — but the clouds are so deep, I don't know where.\"",
    note: "The whole poem is a tiny dialogue, and the hermit never appears. Jia Dao, famous for painstakingly weighing each word, lets the cloud-wrapped mountain stand for the recluse himself: present yet unreachable, exactly the elusive freedom the seeker admires."
  },

  {
    title: "Gazing at Lushan Waterfall",
    titlePinyin: "Wàng Lú Shān Pù Bù",
    titleHanzi: "望庐山瀑布",
    author: "Li Bai",
    authorHanzi: "李白",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《望庐山瀑布》",
    lines: [
      { text: "日照香炉生紫烟", pinyin: "rì zhào xiāng lú shēng zǐ yān", translation: "Sunlight on Incense Burner Peak breeds purple mist;",
        chars: [
          { c: "日", p: "rì", m: "sun" },
          { c: "照", p: "zhào", m: "to shine on" },
          { c: "香", p: "xiāng", m: "incense / fragrant" },
          { c: "炉", p: "lú", m: "burner (香炉峰 = Incense Burner Peak)" },
          { c: "生", p: "shēng", m: "to give rise to" },
          { c: "紫", p: "zǐ", m: "purple" },
          { c: "烟", p: "yān", m: "mist / smoke" } ] },
      { text: "遥看瀑布挂前川", pinyin: "yáo kàn pù bù guà qián chuān", translation: "from afar the waterfall hangs before the river.",
        chars: [
          { c: "遥", p: "yáo", m: "distant / far" },
          { c: "看", p: "kàn", m: "to look / watch" },
          { c: "瀑", p: "pù", m: "waterfall" },
          { c: "布", p: "bù", m: "cloth (瀑布 = waterfall, lit. 'cascade of cloth')" },
          { c: "挂", p: "guà", m: "to hang" },
          { c: "前", p: "qián", m: "in front" },
          { c: "川", p: "chuān", m: "river / stream" } ] },
      { text: "飞流直下三千尺", pinyin: "fēi liú zhí xià sān qiān chǐ", translation: "A flying torrent plunges straight down three thousand feet —",
        chars: [
          { c: "飞", p: "fēi", m: "to fly" },
          { c: "流", p: "liú", m: "flow / current" },
          { c: "直", p: "zhí", m: "straight" },
          { c: "下", p: "xià", m: "down" },
          { c: "三", p: "sān", m: "three" },
          { c: "千", p: "qiān", m: "thousand" },
          { c: "尺", p: "chǐ", m: "chi (a 'foot', unit of length)" } ] },
      { text: "疑是银河落九天", pinyin: "yí shì yín hé luò jiǔ tiān", translation: "could it be the Milky Way, falling from highest heaven?",
        chars: [
          { c: "疑", p: "yí", m: "to suspect / wonder" },
          { c: "是", p: "shì", m: "to be / is" },
          { c: "银", p: "yín", m: "silver" },
          { c: "河", p: "hé", m: "river (银河 = the Milky Way, 'Silver River')" },
          { c: "落", p: "luò", m: "to fall" },
          { c: "九", p: "jiǔ", m: "nine" },
          { c: "天", p: "tiān", m: "heaven / sky (九天 = the highest heaven)" } ] }
    ],
    translation: "Sunlight kindles purple mist on Incense Burner Peak; far off, the waterfall hangs like a curtain before the river. The flying water plunges three thousand feet straight down — I half believe it is the Milky Way tumbling out of the ninth heaven.",
    note: "Li Bai's gift for the grand and the fantastic is on full display. The waterfall is first a hanging silk curtain, then a torrent of three thousand feet, then nothing less than the Milky Way pouring out of the sky — each image more cosmic than the last."
  },

  {
    title: "Leaving Baidi at Dawn",
    titlePinyin: "Zǎo Fā Bái Dì Chéng",
    titleHanzi: "早发白帝城",
    author: "Li Bai",
    authorHanzi: "李白",
    dynasty: "Tang dynasty (唐), 759 CE",
    source: "《早发白帝城》",
    lines: [
      { text: "朝辞白帝彩云间", pinyin: "zhāo cí bái dì cǎi yún jiān", translation: "At dawn I left Baidi amid the colored clouds;",
        chars: [
          { c: "朝", p: "zhāo", m: "morning / dawn" },
          { c: "辞", p: "cí", m: "to take leave of / depart" },
          { c: "白", p: "bái", m: "white" },
          { c: "帝", p: "dì", m: "emperor (白帝城 = Baidi City)" },
          { c: "彩", p: "cǎi", m: "colorful" },
          { c: "云", p: "yún", m: "cloud" },
          { c: "间", p: "jiān", m: "amid / among" } ] },
      { text: "千里江陵一日还", pinyin: "qiān lǐ jiāng líng yī rì huán", translation: "a thousand li to Jiangling, returned in a single day.",
        chars: [
          { c: "千", p: "qiān", m: "thousand" },
          { c: "里", p: "lǐ", m: "li (unit of distance)" },
          { c: "江", p: "jiāng", m: "river" },
          { c: "陵", p: "líng", m: "hill (江陵 = Jiangling, a city)" },
          { c: "一", p: "yī", m: "one" },
          { c: "日", p: "rì", m: "day" },
          { c: "还", p: "huán", m: "to return" } ] },
      { text: "两岸猿声啼不住", pinyin: "liǎng àn yuán shēng tí bù zhù", translation: "From both banks the cries of gibbons never cease,",
        chars: [
          { c: "两", p: "liǎng", m: "two / both" },
          { c: "岸", p: "àn", m: "(river)bank" },
          { c: "猿", p: "yuán", m: "ape / gibbon" },
          { c: "声", p: "shēng", m: "sound / cry" },
          { c: "啼", p: "tí", m: "to cry / call" },
          { c: "不", p: "bù", m: "not" },
          { c: "住", p: "zhù", m: "to stop (啼不住 = cry without stopping)" } ] },
      { text: "轻舟已过万重山", pinyin: "qīng zhōu yǐ guò wàn chóng shān", translation: "and my light boat has already passed ten thousand peaks.",
        chars: [
          { c: "轻", p: "qīng", m: "light / nimble" },
          { c: "舟", p: "zhōu", m: "boat" },
          { c: "已", p: "yǐ", m: "already" },
          { c: "过", p: "guò", m: "to pass" },
          { c: "万", p: "wàn", m: "ten thousand" },
          { c: "重", p: "chóng", m: "layer / fold (万重 = countless layers)" },
          { c: "山", p: "shān", m: "mountain" } ] }
    ],
    translation: "At dawn I took leave of Baidi high in the rosy clouds, and covered the thousand li to Jiangling in a single day. While the gibbons on both shores were still crying without pause, my light boat had already slipped past ten thousand peaks.",
    note: "Written when Li Bai, exiled, was suddenly pardoned and could sail home, the poem races with joy. The boat seems to fly down the Yangtze gorges so fast that the apes' cries blur together — exhilaration turned into pure speed and lightness (轻舟, 'light boat')."
  },

  {
    title: "Thinking of My Brothers on the Double Ninth",
    titlePinyin: "Jiǔ Yuè Jiǔ Rì Yì Shān Dōng Xiōng Dì",
    titleHanzi: "九月九日忆山东兄弟",
    author: "Wang Wei",
    authorHanzi: "王维",
    dynasty: "Tang dynasty (唐), written at age 17",
    source: "《九月九日忆山东兄弟》",
    lines: [
      { text: "独在异乡为异客", pinyin: "dú zài yì xiāng wéi yì kè", translation: "Alone in a strange land, a stranger and guest,",
        chars: [
          { c: "独", p: "dú", m: "alone" },
          { c: "在", p: "zài", m: "to be in / at" },
          { c: "异", p: "yì", m: "foreign / strange" },
          { c: "乡", p: "xiāng", m: "land / region (异乡 = foreign land)" },
          { c: "为", p: "wéi", m: "to be / as" },
          { c: "异", p: "yì", m: "strange" },
          { c: "客", p: "kè", m: "guest / stranger" } ] },
      { text: "每逢佳节倍思亲", pinyin: "měi féng jiā jié bèi sī qīn", translation: "each festival deepens my longing for kin.",
        chars: [
          { c: "每", p: "měi", m: "every / each" },
          { c: "逢", p: "féng", m: "to meet / come upon" },
          { c: "佳", p: "jiā", m: "fine / festive" },
          { c: "节", p: "jié", m: "festival (佳节 = a festive day)" },
          { c: "倍", p: "bèi", m: "doubly / all the more" },
          { c: "思", p: "sī", m: "to long for" },
          { c: "亲", p: "qīn", m: "family / kin" } ] },
      { text: "遥知兄弟登高处", pinyin: "yáo zhī xiōng dì dēng gāo chù", translation: "From afar I know my brothers climb the heights,",
        chars: [
          { c: "遥", p: "yáo", m: "distant / from afar" },
          { c: "知", p: "zhī", m: "to know" },
          { c: "兄", p: "xiōng", m: "elder brother" },
          { c: "弟", p: "dì", m: "younger brother (兄弟 = brothers)" },
          { c: "登", p: "dēng", m: "to climb / ascend" },
          { c: "高", p: "gāo", m: "high" },
          { c: "处", p: "chù", m: "place / heights" } ] },
      { text: "遍插茱萸少一人", pinyin: "biàn chā zhū yú shǎo yī rén", translation: "wearing dogwood — each but one, with me away.",
        chars: [
          { c: "遍", p: "biàn", m: "everywhere / all" },
          { c: "插", p: "chā", m: "to insert / wear (in the hair)" },
          { c: "茱", p: "zhū", m: "dogwood" },
          { c: "萸", p: "yú", m: "dogwood (茱萸 = cornel/dogwood sprigs)" },
          { c: "少", p: "shǎo", m: "to be short of / missing" },
          { c: "一", p: "yī", m: "one" },
          { c: "人", p: "rén", m: "person" } ] }
    ],
    translation: "Alone in a foreign land, a stranger among strangers, with each festival my longing for family doubles. From far away I can picture my brothers climbing to the heights, each wearing a sprig of dogwood — and finding one of them is missing: me.",
    note: "Written by a homesick teenager on the Double Ninth Festival (重阳节), when families climb hills and wear dogwood for protection. The famous line 每逢佳节倍思亲 — 'every festival doubles the longing for kin' — is quoted by anyone far from home on a holiday. The final turn imagines the family noticing his absence, making the loneliness mutual."
  },

  {
    title: "Grass — Farewell on the Ancient Plain",
    titlePinyin: "Fù Dé Gǔ Yuán Cǎo Sòng Bié",
    titleHanzi: "赋得古原草送别",
    author: "Bai Juyi",
    authorHanzi: "白居易",
    dynasty: "Tang dynasty (唐), written at age 16",
    source: "《赋得古原草送别》 — opening quatrain (the most-quoted part)",
    lines: [
      { text: "离离原上草", pinyin: "lí lí yuán shàng cǎo", translation: "Lush and spreading, grass upon the plain,",
        chars: [
          { c: "离", p: "lí", m: "lush / luxuriant" },
          { c: "离", p: "lí", m: "(离离 = thick and flourishing)" },
          { c: "原", p: "yuán", m: "plain / grassland" },
          { c: "上", p: "shàng", m: "on / upon" },
          { c: "草", p: "cǎo", m: "grass" } ] },
      { text: "一岁一枯荣", pinyin: "yī suì yī kū róng", translation: "once each year it withers and grows green again.",
        chars: [
          { c: "一", p: "yī", m: "one / once" },
          { c: "岁", p: "suì", m: "year" },
          { c: "一", p: "yī", m: "one / once" },
          { c: "枯", p: "kū", m: "to wither" },
          { c: "荣", p: "róng", m: "to flourish (枯荣 = wither and thrive)" } ] },
      { text: "野火烧不尽", pinyin: "yě huǒ shāo bù jìn", translation: "Wildfire can never burn it all away;",
        chars: [
          { c: "野", p: "yě", m: "wild / open country" },
          { c: "火", p: "huǒ", m: "fire (野火 = wildfire)" },
          { c: "烧", p: "shāo", m: "to burn" },
          { c: "不", p: "bù", m: "not" },
          { c: "尽", p: "jìn", m: "to exhaust / finish (烧不尽 = can't burn up)" } ] },
      { text: "春风吹又生", pinyin: "chūn fēng chuī yòu shēng", translation: "the spring wind blows, and it lives once more.",
        chars: [
          { c: "春", p: "chūn", m: "spring" },
          { c: "风", p: "fēng", m: "wind (春风 = spring breeze)" },
          { c: "吹", p: "chuī", m: "to blow" },
          { c: "又", p: "yòu", m: "again" },
          { c: "生", p: "shēng", m: "to grow / come to life" } ] }
    ],
    translation: "Thick and lush, the grass across the ancient plain withers and revives once every year. Wildfire can never burn it all away — when the spring wind blows, it springs to life again.",
    note: "Bai Juyi wrote this as a teenager, and the third and fourth lines became immortal: 野火烧不尽，春风吹又生 — 'wildfire cannot burn it all; the spring wind brings it back.' It is the great Chinese image of resilience, used for anything that refuses to be destroyed and renews itself against all odds."
  }
];

if (typeof module !== "undefined") module.exports = POEMS;
