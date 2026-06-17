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
  },

  {
    title: "Ode to the Goose",
    titlePinyin: "Yǒng É",
    titleHanzi: "咏鹅",
    author: "Luo Binwang",
    authorHanzi: "骆宾王",
    dynasty: "Tang dynasty (唐), said to be written at age 7",
    source: "《咏鹅》",
    lines: [
      { text: "鹅 鹅 鹅", pinyin: "é é é", translation: "Goose, goose, goose!",
        chars: [ { c: "鹅", p: "é", m: "goose" }, { c: "鹅", p: "é", m: "goose" }, { c: "鹅", p: "é", m: "goose" } ] },
      { text: "曲项向天歌", pinyin: "qū xiàng xiàng tiān gē", translation: "curved neck, you sing toward the sky.",
        chars: [ { c: "曲", p: "qū", m: "curved / bent" }, { c: "项", p: "xiàng", m: "neck" }, { c: "向", p: "xiàng", m: "toward" }, { c: "天", p: "tiān", m: "sky" }, { c: "歌", p: "gē", m: "to sing" } ] },
      { text: "白毛浮绿水", pinyin: "bái máo fú lǜ shuǐ", translation: "White feathers float on the green water,",
        chars: [ { c: "白", p: "bái", m: "white" }, { c: "毛", p: "máo", m: "feathers" }, { c: "浮", p: "fú", m: "to float" }, { c: "绿", p: "lǜ", m: "green" }, { c: "水", p: "shuǐ", m: "water" } ] },
      { text: "红掌拨清波", pinyin: "hóng zhǎng bō qīng bō", translation: "red webbed feet paddle the clear ripples.",
        chars: [ { c: "红", p: "hóng", m: "red" }, { c: "掌", p: "zhǎng", m: "webbed foot / palm" }, { c: "拨", p: "bō", m: "to paddle / push" }, { c: "清", p: "qīng", m: "clear" }, { c: "波", p: "bō", m: "ripples / waves" } ] }
    ],
    translation: "Goose, goose, goose — bending your neck you sing to the heavens. Your white feathers float on the green water, and your red webbed feet stir the clear ripples.",
    note: "Famously composed by the prodigy Luo Binwang as a young child. It is pure, bright observation: color against color (white on green, red on clear water) and a single playful image of a goose at home on the pond — usually the very first poem Chinese children learn."
  },

  {
    title: "Wind",
    titlePinyin: "Fēng",
    titleHanzi: "风",
    author: "Li Qiao",
    authorHanzi: "李峤",
    dynasty: "Tang dynasty (唐), 7th–8th century",
    source: "《风》 — a riddle-poem about the wind",
    lines: [
      { text: "解落三秋叶", pinyin: "jiě luò sān qiū yè", translation: "It can bring down the leaves of late autumn,",
        chars: [ { c: "解", p: "jiě", m: "able to / can" }, { c: "落", p: "luò", m: "to make fall" }, { c: "三", p: "sān", m: "third (三秋 = deep autumn)" }, { c: "秋", p: "qiū", m: "autumn" }, { c: "叶", p: "yè", m: "leaves" } ] },
      { text: "能开二月花", pinyin: "néng kāi èr yuè huā", translation: "and can open the flowers of the second month.",
        chars: [ { c: "能", p: "néng", m: "can" }, { c: "开", p: "kāi", m: "to open / make bloom" }, { c: "二", p: "èr", m: "second" }, { c: "月", p: "yuè", m: "month" }, { c: "花", p: "huā", m: "flowers" } ] },
      { text: "过江千尺浪", pinyin: "guò jiāng qiān chǐ làng", translation: "Crossing the river it raises thousand-foot waves;",
        chars: [ { c: "过", p: "guò", m: "to cross" }, { c: "江", p: "jiāng", m: "river" }, { c: "千", p: "qiān", m: "thousand" }, { c: "尺", p: "chǐ", m: "feet (unit)" }, { c: "浪", p: "làng", m: "waves" } ] },
      { text: "入竹万竿斜", pinyin: "rù zhú wàn gān xié", translation: "entering the bamboo, it bends ten thousand stalks.",
        chars: [ { c: "入", p: "rù", m: "to enter" }, { c: "竹", p: "zhú", m: "bamboo" }, { c: "万", p: "wàn", m: "ten thousand" }, { c: "竿", p: "gān", m: "stalks / poles" }, { c: "斜", p: "xié", m: "to slant / lean" } ] }
    ],
    translation: "It can strip the leaves in deep autumn and coax the blossoms open in spring; crossing the river it lifts thousand-foot waves, and sweeping through the grove it bends ten thousand bamboo stalks aslant.",
    note: "A riddle: the word 'wind' never appears in the body, yet every line is the wind's doing. Li Qiao defines an invisible force purely by its effects — destroyer of leaves, maker of flowers, raiser of waves — a clever, much-loved teaching poem."
  },

  {
    title: "A Painting",
    titlePinyin: "Huà",
    titleHanzi: "画",
    author: "Attributed to Wang Wei",
    authorHanzi: "王维",
    dynasty: "Tang dynasty (唐)",
    source: "《画》 — a riddle-poem describing a picture",
    lines: [
      { text: "远看山有色", pinyin: "yuǎn kàn shān yǒu sè", translation: "Seen from afar, the mountains have color;",
        chars: [ { c: "远", p: "yuǎn", m: "far" }, { c: "看", p: "kàn", m: "to look" }, { c: "山", p: "shān", m: "mountain" }, { c: "有", p: "yǒu", m: "to have" }, { c: "色", p: "sè", m: "color" } ] },
      { text: "近听水无声", pinyin: "jìn tīng shuǐ wú shēng", translation: "up close, the water makes no sound.",
        chars: [ { c: "近", p: "jìn", m: "near" }, { c: "听", p: "tīng", m: "to listen" }, { c: "水", p: "shuǐ", m: "water" }, { c: "无", p: "wú", m: "without" }, { c: "声", p: "shēng", m: "sound" } ] },
      { text: "春去花还在", pinyin: "chūn qù huā hái zài", translation: "Spring departs, yet the flowers remain;",
        chars: [ { c: "春", p: "chūn", m: "spring" }, { c: "去", p: "qù", m: "to leave / depart" }, { c: "花", p: "huā", m: "flowers" }, { c: "还", p: "hái", m: "still" }, { c: "在", p: "zài", m: "present / there" } ] },
      { text: "人来鸟不惊", pinyin: "rén lái niǎo bù jīng", translation: "people approach, and the birds aren't startled.",
        chars: [ { c: "人", p: "rén", m: "person" }, { c: "来", p: "lái", m: "to come" }, { c: "鸟", p: "niǎo", m: "bird" }, { c: "不", p: "bù", m: "not" }, { c: "惊", p: "jīng", m: "to be startled" } ] }
    ],
    translation: "From a distance the hills show their colors; up close the water runs without a sound. Spring has gone, but the flowers are still here; people draw near, yet the birds do not take fright.",
    note: "Another riddle: the answer is 'a painting.' Each line is a small paradox that only makes sense for a picture — color without distance haze, water without sound, flowers that outlast spring, birds that never fly away. Delightfully simple and clever."
  },

  {
    title: "A Quatrain (Two Orioles)",
    titlePinyin: "Jué Jù",
    titleHanzi: "绝句",
    author: "Du Fu",
    authorHanzi: "杜甫",
    dynasty: "Tang dynasty (唐), c. 764",
    source: "《绝句》(两个黄鹂鸣翠柳)",
    lines: [
      { text: "两个黄鹂鸣翠柳", pinyin: "liǎng gè huáng lí míng cuì liǔ", translation: "Two yellow orioles sing in the emerald willows;",
        chars: [ { c: "两", p: "liǎng", m: "two" }, { c: "个", p: "gè", m: "(measure word)" }, { c: "黄", p: "huáng", m: "yellow" }, { c: "鹂", p: "lí", m: "oriole" }, { c: "鸣", p: "míng", m: "to sing / cry" }, { c: "翠", p: "cuì", m: "emerald green" }, { c: "柳", p: "liǔ", m: "willow" } ] },
      { text: "一行白鹭上青天", pinyin: "yī háng bái lù shàng qīng tiān", translation: "a line of white egrets climbs the blue sky.",
        chars: [ { c: "一", p: "yī", m: "one" }, { c: "行", p: "háng", m: "a row / line" }, { c: "白", p: "bái", m: "white" }, { c: "鹭", p: "lù", m: "egret" }, { c: "上", p: "shàng", m: "to ascend" }, { c: "青", p: "qīng", m: "blue / azure" }, { c: "天", p: "tiān", m: "sky" } ] },
      { text: "窗含西岭千秋雪", pinyin: "chuāng hán xī lǐng qiān qiū xuě", translation: "My window frames the western ridge's thousand-autumn snow;",
        chars: [ { c: "窗", p: "chuāng", m: "window" }, { c: "含", p: "hán", m: "to hold / frame" }, { c: "西", p: "xī", m: "west" }, { c: "岭", p: "lǐng", m: "ridge" }, { c: "千", p: "qiān", m: "thousand" }, { c: "秋", p: "qiū", m: "autumns / years" }, { c: "雪", p: "xuě", m: "snow" } ] },
      { text: "门泊东吴万里船", pinyin: "mén bó dōng wú wàn lǐ chuán", translation: "at my gate are moored the boats from Wu, ten thousand li away.",
        chars: [ { c: "门", p: "mén", m: "gate / door" }, { c: "泊", p: "bó", m: "to moor / berth" }, { c: "东", p: "dōng", m: "east" }, { c: "吴", p: "wú", m: "Wu (region)" }, { c: "万", p: "wàn", m: "ten thousand" }, { c: "里", p: "lǐ", m: "li (distance)" }, { c: "船", p: "chuán", m: "boats" } ] }
    ],
    translation: "Two golden orioles sing among the emerald willows; a line of white egrets rises into the blue. My window frames the snows of a thousand autumns on the western peaks; at my door are moored the boats come ten thousand li from Wu.",
    note: "A perfectly balanced miniature: each line a framed picture, moving from near birdsong to far snow, from color to distance. The parallelism is exact (two/one, yellow/white, willow/sky), making it a classic example of the jueju form's compressed power."
  },

  {
    title: "Liangzhou Song",
    titlePinyin: "Liáng Zhōu Cí",
    titleHanzi: "凉州词",
    author: "Wang Zhihuan",
    authorHanzi: "王之涣",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《凉州词》",
    lines: [
      { text: "黄河远上白云间", pinyin: "huáng hé yuǎn shàng bái yún jiān", translation: "The Yellow River climbs far into the white clouds;",
        chars: [ { c: "黄", p: "huáng", m: "yellow" }, { c: "河", p: "hé", m: "river" }, { c: "远", p: "yuǎn", m: "far" }, { c: "上", p: "shàng", m: "to rise / go up" }, { c: "白", p: "bái", m: "white" }, { c: "云", p: "yún", m: "clouds" }, { c: "间", p: "jiān", m: "amid" } ] },
      { text: "一片孤城万仞山", pinyin: "yī piàn gū chéng wàn rèn shān", translation: "a single lone fort amid ten-thousand-foot peaks.",
        chars: [ { c: "一", p: "yī", m: "one" }, { c: "片", p: "piàn", m: "(measure: expanse)" }, { c: "孤", p: "gū", m: "lone" }, { c: "城", p: "chéng", m: "fort / walled town" }, { c: "万", p: "wàn", m: "ten thousand" }, { c: "仞", p: "rèn", m: "ren (a height unit)" }, { c: "山", p: "shān", m: "mountains" } ] },
      { text: "羌笛何须怨杨柳", pinyin: "qiāng dí hé xū yuàn yáng liǔ", translation: "Why should the Qiang flute lament the willow song?",
        chars: [ { c: "羌", p: "qiāng", m: "Qiang (a frontier people)" }, { c: "笛", p: "dí", m: "flute" }, { c: "何", p: "hé", m: "why" }, { c: "须", p: "xū", m: "need" }, { c: "怨", p: "yuàn", m: "to lament / resent" }, { c: "杨", p: "yáng", m: "poplar" }, { c: "柳", p: "liǔ", m: "willow ('Willow' = a parting tune)" } ] },
      { text: "春风不度玉门关", pinyin: "chūn fēng bù dù yù mén guān", translation: "the spring wind never crosses Jade Gate Pass.",
        chars: [ { c: "春", p: "chūn", m: "spring" }, { c: "风", p: "fēng", m: "wind" }, { c: "不", p: "bù", m: "not" }, { c: "度", p: "dù", m: "to cross / reach" }, { c: "玉", p: "yù", m: "jade" }, { c: "门", p: "mén", m: "gate" }, { c: "关", p: "guān", m: "pass (玉门关 = Jade Gate Pass)" } ] }
    ],
    translation: "The Yellow River winds up among the far white clouds; one lonely fort stands among peaks ten thousand feet high. Why should the Qiang flute mourn with the 'Willow' tune? — for the spring wind never makes it past the Jade Gate Pass.",
    note: "A frontier poem of stark grandeur and quiet sorrow. The lone garrison among vast mountains, the flute playing the parting song 'Breaking the Willow,' and the spring wind that cannot reach this far outpost all evoke the loneliness of soldiers exiled at the empire's edge."
  },

  {
    title: "Over the Frontier",
    titlePinyin: "Chū Sài",
    titleHanzi: "出塞",
    author: "Wang Changling",
    authorHanzi: "王昌龄",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《出塞》",
    lines: [
      { text: "秦时明月汉时关", pinyin: "qín shí míng yuè hàn shí guān", translation: "The bright moon of Qin times, the passes of Han times;",
        chars: [ { c: "秦", p: "qín", m: "Qin (dynasty)" }, { c: "时", p: "shí", m: "era / time" }, { c: "明", p: "míng", m: "bright" }, { c: "月", p: "yuè", m: "moon" }, { c: "汉", p: "hàn", m: "Han (dynasty)" }, { c: "时", p: "shí", m: "era / time" }, { c: "关", p: "guān", m: "frontier pass" } ] },
      { text: "万里长征人未还", pinyin: "wàn lǐ cháng zhēng rén wèi huán", translation: "from the ten-thousand-li campaign the men have not returned.",
        chars: [ { c: "万", p: "wàn", m: "ten thousand" }, { c: "里", p: "lǐ", m: "li (distance)" }, { c: "长", p: "cháng", m: "long" }, { c: "征", p: "zhēng", m: "campaign / expedition" }, { c: "人", p: "rén", m: "men" }, { c: "未", p: "wèi", m: "not yet" }, { c: "还", p: "huán", m: "to return" } ] },
      { text: "但使龙城飞将在", pinyin: "dàn shǐ lóng chéng fēi jiàng zài", translation: "If only the Flying General of Dragon City were here,",
        chars: [ { c: "但", p: "dàn", m: "if only" }, { c: "使", p: "shǐ", m: "to let / make it so" }, { c: "龙", p: "lóng", m: "dragon" }, { c: "城", p: "chéng", m: "city (龙城 = Dragon City)" }, { c: "飞", p: "fēi", m: "flying" }, { c: "将", p: "jiàng", m: "general (飞将 = the 'Flying General' Li Guang)" }, { c: "在", p: "zài", m: "to be present" } ] },
      { text: "不教胡马度阴山", pinyin: "bù jiào hú mǎ dù yīn shān", translation: "he'd never let the nomads' horses cross the Yin Mountains.",
        chars: [ { c: "不", p: "bù", m: "not" }, { c: "教", p: "jiào", m: "to let / allow" }, { c: "胡", p: "hú", m: "nomad / steppe peoples" }, { c: "马", p: "mǎ", m: "horses" }, { c: "度", p: "dù", m: "to cross" }, { c: "阴", p: "yīn", m: "Yin" }, { c: "山", p: "shān", m: "mountains (阴山 = Yin Mountains)" } ] }
    ],
    translation: "The same bright moon shone in Qin times, the same passes stood in Han times — yet from this thousand-mile campaign the soldiers still have not come home. If only the Flying General of Dragon City were still alive, no enemy horse would ever cross the Yin Mountains.",
    note: "One of the most admired frontier poems. The opening fuses centuries — the moon and the passes are timeless, but the wars and the unreturned dead repeat in every age. The longing for a great general like Li Guang is also a quiet reproach of the present's weak defense."
  },

  {
    title: "Seeing Off Yuan Er to Anxi",
    titlePinyin: "Sòng Yuán Èr Shǐ Ān Xī",
    titleHanzi: "送元二使安西",
    author: "Wang Wei",
    authorHanzi: "王维",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《送元二使安西》 — also sung as 《渭城曲》",
    lines: [
      { text: "渭城朝雨浥轻尘", pinyin: "wèi chéng zhāo yǔ yì qīng chén", translation: "Morning rain at Weicheng dampens the light dust;",
        chars: [ { c: "渭", p: "wèi", m: "Wei" }, { c: "城", p: "chéng", m: "town (渭城 = Weicheng)" }, { c: "朝", p: "zhāo", m: "morning" }, { c: "雨", p: "yǔ", m: "rain" }, { c: "浥", p: "yì", m: "to moisten" }, { c: "轻", p: "qīng", m: "light" }, { c: "尘", p: "chén", m: "dust" } ] },
      { text: "客舍青青柳色新", pinyin: "kè shè qīng qīng liǔ sè xīn", translation: "by the inn the willows are fresh and green again.",
        chars: [ { c: "客", p: "kè", m: "guest" }, { c: "舍", p: "shè", m: "lodge (客舍 = inn)" }, { c: "青", p: "qīng", m: "green" }, { c: "青", p: "qīng", m: "green (青青 = lush green)" }, { c: "柳", p: "liǔ", m: "willow" }, { c: "色", p: "sè", m: "color" }, { c: "新", p: "xīn", m: "new / fresh" } ] },
      { text: "劝君更尽一杯酒", pinyin: "quàn jūn gèng jìn yī bēi jiǔ", translation: "Let me urge you to drain one more cup of wine —",
        chars: [ { c: "劝", p: "quàn", m: "to urge" }, { c: "君", p: "jūn", m: "you (respectful)" }, { c: "更", p: "gèng", m: "once more" }, { c: "尽", p: "jìn", m: "to drain / finish" }, { c: "一", p: "yī", m: "one" }, { c: "杯", p: "bēi", m: "cup" }, { c: "酒", p: "jiǔ", m: "wine" } ] },
      { text: "西出阳关无故人", pinyin: "xī chū yáng guān wú gù rén", translation: "west of Yang Pass there will be no old friends.",
        chars: [ { c: "西", p: "xī", m: "west" }, { c: "出", p: "chū", m: "to go out beyond" }, { c: "阳", p: "yáng", m: "Yang" }, { c: "关", p: "guān", m: "pass (阳关 = Yang Pass)" }, { c: "无", p: "wú", m: "no" }, { c: "故", p: "gù", m: "old" }, { c: "人", p: "rén", m: "friends (故人 = old friends)" } ] }
    ],
    translation: "The morning rain at Weicheng has settled the light dust; beside the inn the willows are washed a fresh green. Come, drink one more cup of wine with me — once you pass west of the Yang Pass, there will be no old friends out there.",
    note: "The most famous farewell poem in Chinese, set to music as the 'Yangguan' melody and sung at partings for centuries. The fresh rain-washed scene only sharpens the ache of the final line: beyond the frontier lies a world without a single familiar face."
  },

  {
    title: "Seeing Off Meng Haoran at Yellow Crane Tower",
    titlePinyin: "Huáng Hè Lóu Sòng Mèng Hào Rán Zhī Guǎng Líng",
    titleHanzi: "黄鹤楼送孟浩然之广陵",
    author: "Li Bai",
    authorHanzi: "李白",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《黄鹤楼送孟浩然之广陵》",
    lines: [
      { text: "故人西辞黄鹤楼", pinyin: "gù rén xī cí huáng hè lóu", translation: "My old friend bids the Yellow Crane Tower farewell in the west,",
        chars: [ { c: "故", p: "gù", m: "old" }, { c: "人", p: "rén", m: "friend (故人 = old friend)" }, { c: "西", p: "xī", m: "in the west" }, { c: "辞", p: "cí", m: "to take leave of" }, { c: "黄", p: "huáng", m: "yellow" }, { c: "鹤", p: "hè", m: "crane" }, { c: "楼", p: "lóu", m: "tower (黄鹤楼 = Yellow Crane Tower)" } ] },
      { text: "烟花三月下扬州", pinyin: "yān huā sān yuè xià yáng zhōu", translation: "in misty-blossomed third month, sailing down to Yangzhou.",
        chars: [ { c: "烟", p: "yān", m: "mist" }, { c: "花", p: "huā", m: "blossoms (烟花 = misty spring blossoms)" }, { c: "三", p: "sān", m: "third" }, { c: "月", p: "yuè", m: "month" }, { c: "下", p: "xià", m: "to go downstream to" }, { c: "扬", p: "yáng", m: "Yang" }, { c: "州", p: "zhōu", m: "prefecture (扬州 = Yangzhou)" } ] },
      { text: "孤帆远影碧空尽", pinyin: "gū fān yuǎn yǐng bì kōng jìn", translation: "The lone sail's distant shape fades into the azure void,",
        chars: [ { c: "孤", p: "gū", m: "lone" }, { c: "帆", p: "fān", m: "sail" }, { c: "远", p: "yuǎn", m: "distant" }, { c: "影", p: "yǐng", m: "shadow / silhouette" }, { c: "碧", p: "bì", m: "azure" }, { c: "空", p: "kōng", m: "sky / void" }, { c: "尽", p: "jìn", m: "to vanish" } ] },
      { text: "唯见长江天际流", pinyin: "wéi jiàn cháng jiāng tiān jì liú", translation: "and I see only the Yangtze flowing to the edge of the sky.",
        chars: [ { c: "唯", p: "wéi", m: "only" }, { c: "见", p: "jiàn", m: "to see" }, { c: "长", p: "cháng", m: "long" }, { c: "江", p: "jiāng", m: "river (长江 = the Yangtze)" }, { c: "天", p: "tiān", m: "sky" }, { c: "际", p: "jì", m: "edge (天际 = horizon)" }, { c: "流", p: "liú", m: "to flow" } ] }
    ],
    translation: "My old friend leaves the Yellow Crane Tower and heads west, going down to Yangzhou in the third month of mist and blossoms. The lone sail's far silhouette melts into the blue emptiness, and all I see is the long river flowing to the sky's edge.",
    note: "A farewell told entirely through landscape. Li Bai never states his feeling; he simply watches the single sail shrink and vanish, then keeps staring at the empty river. The lingering gaze is the emotion — friendship measured by how long he cannot look away."
  },

  {
    title: "To Wang Lun",
    titlePinyin: "Zèng Wāng Lún",
    titleHanzi: "赠汪伦",
    author: "Li Bai",
    authorHanzi: "李白",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《赠汪伦》",
    lines: [
      { text: "李白乘舟将欲行", pinyin: "lǐ bái chéng zhōu jiāng yù xíng", translation: "Li Bai, aboard the boat, was just about to leave,",
        chars: [ { c: "李", p: "lǐ", m: "Li" }, { c: "白", p: "bái", m: "Bai (李白 = the poet himself)" }, { c: "乘", p: "chéng", m: "to board / ride" }, { c: "舟", p: "zhōu", m: "boat" }, { c: "将", p: "jiāng", m: "about to" }, { c: "欲", p: "yù", m: "to want to" }, { c: "行", p: "xíng", m: "to set off" } ] },
      { text: "忽闻岸上踏歌声", pinyin: "hū wén àn shàng tà gē shēng", translation: "when suddenly he heard, on the bank, the sound of stamping song.",
        chars: [ { c: "忽", p: "hū", m: "suddenly" }, { c: "闻", p: "wén", m: "to hear" }, { c: "岸", p: "àn", m: "shore / bank" }, { c: "上", p: "shàng", m: "on" }, { c: "踏", p: "tà", m: "to stamp / tread" }, { c: "歌", p: "gē", m: "song (踏歌 = song with stamping)" }, { c: "声", p: "shēng", m: "sound" } ] },
      { text: "桃花潭水深千尺", pinyin: "táo huā tán shuǐ shēn qiān chǐ", translation: "The water of Peach Blossom Pool is a thousand feet deep,",
        chars: [ { c: "桃", p: "táo", m: "peach" }, { c: "花", p: "huā", m: "blossom" }, { c: "潭", p: "tán", m: "deep pool (桃花潭 = Peach Blossom Pool)" }, { c: "水", p: "shuǐ", m: "water" }, { c: "深", p: "shēn", m: "deep" }, { c: "千", p: "qiān", m: "thousand" }, { c: "尺", p: "chǐ", m: "feet (unit)" } ] },
      { text: "不及汪伦送我情", pinyin: "bù jí wāng lún sòng wǒ qíng", translation: "yet not as deep as Wang Lun's love in seeing me off.",
        chars: [ { c: "不", p: "bù", m: "not" }, { c: "及", p: "jí", m: "to reach / match" }, { c: "汪", p: "wāng", m: "Wang" }, { c: "伦", p: "lún", m: "Lun (汪伦 = Wang Lun, his friend)" }, { c: "送", p: "sòng", m: "to see off" }, { c: "我", p: "wǒ", m: "me" }, { c: "情", p: "qíng", m: "feeling / affection" } ] }
    ],
    translation: "Li Bai was on the boat, on the point of setting off, when all at once he heard singing and stamping feet on the shore. The waters of Peach Blossom Pool may be a thousand feet deep, but they are not as deep as Wang Lun's love in coming to see me off.",
    note: "Warm, direct, and personal — Li Bai even names himself and his friend. The famous closing turns a real place (the deep pool) into a measuring stick for feeling: however deep the water, the friendship runs deeper. A model of heartfelt simplicity."
  },

  {
    title: "Coming Home, a Casual Verse",
    titlePinyin: "Huí Xiāng Ǒu Shū",
    titleHanzi: "回乡偶书",
    author: "He Zhizhang",
    authorHanzi: "贺知章",
    dynasty: "Tang dynasty (唐), early 8th century",
    source: "《回乡偶书》",
    lines: [
      { text: "少小离家老大回", pinyin: "shào xiǎo lí jiā lǎo dà huí", translation: "Young I left home, old I return;",
        chars: [ { c: "少", p: "shào", m: "young" }, { c: "小", p: "xiǎo", m: "little (少小 = in youth)" }, { c: "离", p: "lí", m: "to leave" }, { c: "家", p: "jiā", m: "home" }, { c: "老", p: "lǎo", m: "old" }, { c: "大", p: "dà", m: "grown (老大 = in old age)" }, { c: "回", p: "huí", m: "to return" } ] },
      { text: "乡音无改鬓毛衰", pinyin: "xiāng yīn wú gǎi bìn máo shuāi", translation: "my home accent unchanged, but my temple-hair grown thin.",
        chars: [ { c: "乡", p: "xiāng", m: "home / village" }, { c: "音", p: "yīn", m: "accent (乡音 = native accent)" }, { c: "无", p: "wú", m: "not" }, { c: "改", p: "gǎi", m: "to change" }, { c: "鬓", p: "bìn", m: "hair at the temples" }, { c: "毛", p: "máo", m: "hair" }, { c: "衰", p: "shuāi", m: "to thin / grey" } ] },
      { text: "儿童相见不相识", pinyin: "ér tóng xiāng jiàn bù xiāng shí", translation: "The children see me but do not know me,",
        chars: [ { c: "儿", p: "ér", m: "child" }, { c: "童", p: "tóng", m: "child (儿童 = children)" }, { c: "相", p: "xiāng", m: "(each other)" }, { c: "见", p: "jiàn", m: "to see / meet" }, { c: "不", p: "bù", m: "not" }, { c: "相", p: "xiāng", m: "(each other)" }, { c: "识", p: "shí", m: "to recognize" } ] },
      { text: "笑问客从何处来", pinyin: "xiào wèn kè cóng hé chù lái", translation: "and smiling ask: \"Stranger, where do you come from?\"",
        chars: [ { c: "笑", p: "xiào", m: "smiling" }, { c: "问", p: "wèn", m: "to ask" }, { c: "客", p: "kè", m: "guest / stranger" }, { c: "从", p: "cóng", m: "from" }, { c: "何", p: "hé", m: "what" }, { c: "处", p: "chù", m: "place" }, { c: "来", p: "lái", m: "to come" } ] }
    ],
    translation: "I left home young and come back old; my village accent is unchanged, though the hair at my temples has thinned. The children meet me without knowing who I am, and smiling, they ask, 'Where do you come from, sir?'",
    note: "He Zhizhang returned to his hometown after some fifty years away. The gentle sting lands in the last line: in the very place he calls home, the local children treat him as an outsider. Time has made the homecomer a stranger — homesickness answered, yet not."
  },

  {
    title: "Ode to the Willow",
    titlePinyin: "Yǒng Liǔ",
    titleHanzi: "咏柳",
    author: "He Zhizhang",
    authorHanzi: "贺知章",
    dynasty: "Tang dynasty (唐), early 8th century",
    source: "《咏柳》",
    lines: [
      { text: "碧玉妆成一树高", pinyin: "bì yù zhuāng chéng yī shù gāo", translation: "Dressed in green jade, the tall tree stands adorned;",
        chars: [ { c: "碧", p: "bì", m: "green" }, { c: "玉", p: "yù", m: "jade (碧玉 = green jade)" }, { c: "妆", p: "zhuāng", m: "to adorn" }, { c: "成", p: "chéng", m: "into" }, { c: "一", p: "yī", m: "a" }, { c: "树", p: "shù", m: "tree" }, { c: "高", p: "gāo", m: "tall" } ] },
      { text: "万条垂下绿丝绦", pinyin: "wàn tiáo chuí xià lǜ sī tāo", translation: "ten thousand strands hang down like green silk ribbons.",
        chars: [ { c: "万", p: "wàn", m: "ten thousand" }, { c: "条", p: "tiáo", m: "strands" }, { c: "垂", p: "chuí", m: "to hang down" }, { c: "下", p: "xià", m: "down" }, { c: "绿", p: "lǜ", m: "green" }, { c: "丝", p: "sī", m: "silk" }, { c: "绦", p: "tāo", m: "ribbon (丝绦 = silk ribbons)" } ] },
      { text: "不知细叶谁裁出", pinyin: "bù zhī xì yè shéi cái chū", translation: "Who, I wonder, cut out these slender leaves?",
        chars: [ { c: "不", p: "bù", m: "not" }, { c: "知", p: "zhī", m: "to know" }, { c: "细", p: "xì", m: "slender" }, { c: "叶", p: "yè", m: "leaves" }, { c: "谁", p: "shéi", m: "who" }, { c: "裁", p: "cái", m: "to cut / tailor" }, { c: "出", p: "chū", m: "out" } ] },
      { text: "二月春风似剪刀", pinyin: "èr yuè chūn fēng sì jiǎn dāo", translation: "The second-month spring breeze is like a pair of scissors.",
        chars: [ { c: "二", p: "èr", m: "second" }, { c: "月", p: "yuè", m: "month" }, { c: "春", p: "chūn", m: "spring" }, { c: "风", p: "fēng", m: "wind / breeze" }, { c: "似", p: "sì", m: "to resemble" }, { c: "剪", p: "jiǎn", m: "scissors" }, { c: "刀", p: "dāo", m: "blade (剪刀 = scissors)" } ] }
    ],
    translation: "The tall willow is decked out as if in green jade, its myriad drooping strands like ribbons of green silk. Who tailored these fine little leaves? — why, the spring breeze of the second month, working like a pair of scissors.",
    note: "A celebrated conceit: the willow is a figure adorned in jade, its branches silk ribbons, and finally the spring wind itself becomes the tailor's scissors that cut the delicate leaves. He Zhizhang turns ordinary spring growth into an act of loving craftsmanship."
  },

  {
    title: "Mooring at Night by Maple Bridge",
    titlePinyin: "Fēng Qiáo Yè Bó",
    titleHanzi: "枫桥夜泊",
    author: "Zhang Ji",
    authorHanzi: "张继",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《枫桥夜泊》",
    lines: [
      { text: "月落乌啼霜满天", pinyin: "yuè luò wū tí shuāng mǎn tiān", translation: "The moon sets, crows cry, frost fills the sky;",
        chars: [ { c: "月", p: "yuè", m: "moon" }, { c: "落", p: "luò", m: "to set" }, { c: "乌", p: "wū", m: "crow" }, { c: "啼", p: "tí", m: "to cry / caw" }, { c: "霜", p: "shuāng", m: "frost" }, { c: "满", p: "mǎn", m: "to fill" }, { c: "天", p: "tiān", m: "sky" } ] },
      { text: "江枫渔火对愁眠", pinyin: "jiāng fēng yú huǒ duì chóu mián", translation: "river maples and fishing lamps face my sorrowful sleep.",
        chars: [ { c: "江", p: "jiāng", m: "river" }, { c: "枫", p: "fēng", m: "maple" }, { c: "渔", p: "yú", m: "fishing" }, { c: "火", p: "huǒ", m: "lights (渔火 = fishing-boat lamps)" }, { c: "对", p: "duì", m: "facing" }, { c: "愁", p: "chóu", m: "sorrowful" }, { c: "眠", p: "mián", m: "sleep" } ] },
      { text: "姑苏城外寒山寺", pinyin: "gū sū chéng wài hán shān sì", translation: "Beyond the walls of Gusu, at Cold Mountain Temple,",
        chars: [ { c: "姑", p: "gū", m: "Gu" }, { c: "苏", p: "sū", m: "Su (姑苏 = Gusu / Suzhou)" }, { c: "城", p: "chéng", m: "city" }, { c: "外", p: "wài", m: "outside" }, { c: "寒", p: "hán", m: "cold" }, { c: "山", p: "shān", m: "mountain" }, { c: "寺", p: "sì", m: "temple (寒山寺 = Hanshan Temple)" } ] },
      { text: "夜半钟声到客船", pinyin: "yè bàn zhōng shēng dào kè chuán", translation: "the midnight bell's sound reaches the traveler's boat.",
        chars: [ { c: "夜", p: "yè", m: "night" }, { c: "半", p: "bàn", m: "half (夜半 = midnight)" }, { c: "钟", p: "zhōng", m: "bell" }, { c: "声", p: "shēng", m: "sound" }, { c: "到", p: "dào", m: "to reach" }, { c: "客", p: "kè", m: "traveler's" }, { c: "船", p: "chuán", m: "boat" } ] }
    ],
    translation: "The moon goes down, a crow caws, frost fills the air; by the river maples and fishing lamps I lie in restless, melancholy sleep. Outside the city of Gusu stands Cold Mountain Temple — and at midnight the toll of its bell drifts out to my traveler's boat.",
    note: "A masterpiece of night and loneliness. Every sense is engaged — the setting moon, the crow's cry, the cold, the dim lamps — and then the famous midnight bell, a single far-off sound that deepens the silence and the wanderer's sleepless sorrow."
  },

  {
    title: "A Mountain Walk",
    titlePinyin: "Shān Xíng",
    titleHanzi: "山行",
    author: "Du Mu",
    authorHanzi: "杜牧",
    dynasty: "Tang dynasty (唐), 9th century",
    source: "《山行》",
    lines: [
      { text: "远上寒山石径斜", pinyin: "yuǎn shàng hán shān shí jìng xié", translation: "Far up the cold mountain, the stone path slants;",
        chars: [ { c: "远", p: "yuǎn", m: "far" }, { c: "上", p: "shàng", m: "to go up" }, { c: "寒", p: "hán", m: "cold" }, { c: "山", p: "shān", m: "mountain" }, { c: "石", p: "shí", m: "stone" }, { c: "径", p: "jìng", m: "path" }, { c: "斜", p: "xié", m: "to slant" } ] },
      { text: "白云生处有人家", pinyin: "bái yún shēng chù yǒu rén jiā", translation: "where the white clouds form, there are people's homes.",
        chars: [ { c: "白", p: "bái", m: "white" }, { c: "云", p: "yún", m: "cloud" }, { c: "生", p: "shēng", m: "to arise / form" }, { c: "处", p: "chù", m: "place" }, { c: "有", p: "yǒu", m: "there is" }, { c: "人", p: "rén", m: "people's" }, { c: "家", p: "jiā", m: "homes" } ] },
      { text: "停车坐爱枫林晚", pinyin: "tíng chē zuò ài fēng lín wǎn", translation: "I stop the cart, simply for love of the maple wood at dusk —",
        chars: [ { c: "停", p: "tíng", m: "to stop" }, { c: "车", p: "chē", m: "cart / carriage" }, { c: "坐", p: "zuò", m: "because (here: simply because)" }, { c: "爱", p: "ài", m: "to love" }, { c: "枫", p: "fēng", m: "maple" }, { c: "林", p: "lín", m: "woods" }, { c: "晚", p: "wǎn", m: "evening" } ] },
      { text: "霜叶红于二月花", pinyin: "shuāng yè hóng yú èr yuè huā", translation: "the frosted leaves are redder than second-month flowers.",
        chars: [ { c: "霜", p: "shuāng", m: "frost" }, { c: "叶", p: "yè", m: "leaves" }, { c: "红", p: "hóng", m: "red" }, { c: "于", p: "yú", m: "than" }, { c: "二", p: "èr", m: "second" }, { c: "月", p: "yuè", m: "month" }, { c: "花", p: "huā", m: "flowers" } ] }
    ],
    translation: "Far up the cold mountain a stone path winds aslant; where the white clouds gather there are a few homes. I halt my cart simply because I love the maple wood at evening — its frost-touched leaves are redder than the flowers of spring.",
    note: "An autumn poem that refuses melancholy. Where others mourn the dying year, Du Mu stops just to admire it: the frosted maples blaze brighter than spring blossoms. The line 霜叶红于二月花 is beloved as a celebration of beauty that comes with age and cold."
  },

  {
    title: "Qingming (Tomb-Sweeping Day)",
    titlePinyin: "Qīng Míng",
    titleHanzi: "清明",
    author: "Du Mu",
    authorHanzi: "杜牧",
    dynasty: "Tang dynasty (唐), 9th century",
    source: "《清明》",
    lines: [
      { text: "清明时节雨纷纷", pinyin: "qīng míng shí jié yǔ fēn fēn", translation: "At the Qingming season the rain falls thick and fast;",
        chars: [ { c: "清", p: "qīng", m: "clear" }, { c: "明", p: "míng", m: "bright (清明 = Qingming Festival)" }, { c: "时", p: "shí", m: "time" }, { c: "节", p: "jié", m: "season (时节 = season)" }, { c: "雨", p: "yǔ", m: "rain" }, { c: "纷", p: "fēn", m: "falling" }, { c: "纷", p: "fēn", m: "thick (纷纷 = ceaseless)" } ] },
      { text: "路上行人欲断魂", pinyin: "lù shàng xíng rén yù duàn hún", translation: "on the road the travelers are heartbroken.",
        chars: [ { c: "路", p: "lù", m: "road" }, { c: "上", p: "shàng", m: "on" }, { c: "行", p: "xíng", m: "traveling" }, { c: "人", p: "rén", m: "people" }, { c: "欲", p: "yù", m: "about to" }, { c: "断", p: "duàn", m: "to break" }, { c: "魂", p: "hún", m: "soul (断魂 = heartbroken)" } ] },
      { text: "借问酒家何处有", pinyin: "jiè wèn jiǔ jiā hé chù yǒu", translation: "\"May I ask, where can a tavern be found?\"",
        chars: [ { c: "借", p: "jiè", m: "may I" }, { c: "问", p: "wèn", m: "to ask (借问 = may I ask)" }, { c: "酒", p: "jiǔ", m: "wine" }, { c: "家", p: "jiā", m: "house (酒家 = tavern)" }, { c: "何", p: "hé", m: "what" }, { c: "处", p: "chù", m: "place" }, { c: "有", p: "yǒu", m: "to have / be" } ] },
      { text: "牧童遥指杏花村", pinyin: "mù tóng yáo zhǐ xìng huā cūn", translation: "the herdboy points afar to Apricot Blossom Village.",
        chars: [ { c: "牧", p: "mù", m: "herding" }, { c: "童", p: "tóng", m: "boy (牧童 = herd boy)" }, { c: "遥", p: "yáo", m: "far off" }, { c: "指", p: "zhǐ", m: "to point" }, { c: "杏", p: "xìng", m: "apricot" }, { c: "花", p: "huā", m: "blossom" }, { c: "村", p: "cūn", m: "village (杏花村 = Apricot Blossom Village)" } ] }
    ],
    translation: "At Qingming the rain comes down without end, and the travelers on the road are sick at heart. 'Where, may I ask, can I find a tavern?' — and the herd-boy points off into the distance, to Apricot Blossom Village.",
    note: "Set on the festival when families tend ancestral graves, the poem moves from grief and grey rain to a small note of warmth: the promise of an inn at a village named for its blossoms. The herdboy's silent pointing finger is one of the most cherished images in Chinese verse."
  },

  {
    title: "Night Rain, Sent North",
    titlePinyin: "Yè Yǔ Jì Běi",
    titleHanzi: "夜雨寄北",
    author: "Li Shangyin",
    authorHanzi: "李商隐",
    dynasty: "Tang dynasty (唐), 9th century",
    source: "《夜雨寄北》",
    lines: [
      { text: "君问归期未有期", pinyin: "jūn wèn guī qī wèi yǒu qī", translation: "You ask when I'll return — there is no date yet;",
        chars: [ { c: "君", p: "jūn", m: "you" }, { c: "问", p: "wèn", m: "to ask" }, { c: "归", p: "guī", m: "to return" }, { c: "期", p: "qī", m: "date (归期 = return date)" }, { c: "未", p: "wèi", m: "not yet" }, { c: "有", p: "yǒu", m: "to have" }, { c: "期", p: "qī", m: "date" } ] },
      { text: "巴山夜雨涨秋池", pinyin: "bā shān yè yǔ zhǎng qiū chí", translation: "night rain on the Ba hills swells the autumn pools.",
        chars: [ { c: "巴", p: "bā", m: "Ba" }, { c: "山", p: "shān", m: "mountains (巴山 = Ba Mountains)" }, { c: "夜", p: "yè", m: "night" }, { c: "雨", p: "yǔ", m: "rain" }, { c: "涨", p: "zhǎng", m: "to swell / rise" }, { c: "秋", p: "qiū", m: "autumn" }, { c: "池", p: "chí", m: "pool" } ] },
      { text: "何当共剪西窗烛", pinyin: "hé dāng gòng jiǎn xī chuāng zhú", translation: "When shall we together trim the candle by the west window,",
        chars: [ { c: "何", p: "hé", m: "when" }, { c: "当", p: "dāng", m: "shall (何当 = when will)" }, { c: "共", p: "gòng", m: "together" }, { c: "剪", p: "jiǎn", m: "to trim" }, { c: "西", p: "xī", m: "west" }, { c: "窗", p: "chuāng", m: "window" }, { c: "烛", p: "zhú", m: "candle" } ] },
      { text: "却话巴山夜雨时", pinyin: "què huà bā shān yè yǔ shí", translation: "and talk back over this night of rain on the Ba hills?",
        chars: [ { c: "却", p: "què", m: "then / in turn" }, { c: "话", p: "huà", m: "to speak of" }, { c: "巴", p: "bā", m: "Ba" }, { c: "山", p: "shān", m: "mountains" }, { c: "夜", p: "yè", m: "night" }, { c: "雨", p: "yǔ", m: "rain" }, { c: "时", p: "shí", m: "time" } ] }
    ],
    translation: "You ask when I'll come home — I cannot yet say; tonight the rain on the Ba mountains brims the autumn pools. When will we sit together and trim the candle at the west window, and talk back over this very night of rain in the mountains?",
    note: "Written far from home to someone in the north (likely his wife), the poem folds time on itself: even now, in the lonely rain, the poet imagines a future reunion in which they will fondly recall this present loneliness. The repeated 'Ba mountains night rain' binds the two moments together."
  },

  {
    title: "Climbing the Leyou Plateau",
    titlePinyin: "Dēng Lè Yóu Yuán",
    titleHanzi: "登乐游原",
    author: "Li Shangyin",
    authorHanzi: "李商隐",
    dynasty: "Tang dynasty (唐), 9th century",
    source: "《登乐游原》",
    lines: [
      { text: "向晚意不适", pinyin: "xiàng wǎn yì bù shì", translation: "Toward evening my mood was ill at ease,",
        chars: [ { c: "向", p: "xiàng", m: "toward" }, { c: "晚", p: "wǎn", m: "evening (向晚 = toward dusk)" }, { c: "意", p: "yì", m: "mood" }, { c: "不", p: "bù", m: "not" }, { c: "适", p: "shì", m: "at ease" } ] },
      { text: "驱车登古原", pinyin: "qū chē dēng gǔ yuán", translation: "so I drove my cart up the ancient plateau.",
        chars: [ { c: "驱", p: "qū", m: "to drive" }, { c: "车", p: "chē", m: "cart" }, { c: "登", p: "dēng", m: "to climb" }, { c: "古", p: "gǔ", m: "ancient" }, { c: "原", p: "yuán", m: "plateau (古原 = the old plain)" } ] },
      { text: "夕阳无限好", pinyin: "xī yáng wú xiàn hǎo", translation: "The setting sun is boundlessly beautiful —",
        chars: [ { c: "夕", p: "xī", m: "evening / setting" }, { c: "阳", p: "yáng", m: "sun (夕阳 = sunset)" }, { c: "无", p: "wú", m: "without" }, { c: "限", p: "xiàn", m: "limit (无限 = boundless)" }, { c: "好", p: "hǎo", m: "lovely / good" } ] },
      { text: "只是近黄昏", pinyin: "zhǐ shì jìn huáng hūn", translation: "only, it is near to dusk.",
        chars: [ { c: "只", p: "zhǐ", m: "only" }, { c: "是", p: "shì", m: "it is" }, { c: "近", p: "jìn", m: "near" }, { c: "黄", p: "huáng", m: "yellow" }, { c: "昏", p: "hūn", m: "dusk (黄昏 = nightfall)" } ] }
    ],
    translation: "Feeling restless as evening came on, I drove my carriage up to the ancient plateau. The setting sun is lovely beyond all measure — it is only that dusk is so near.",
    note: "Four lines, and the last two are among the most quoted in all Chinese poetry: 夕阳无限好，只是近黄昏 — 'the sunset is infinitely beautiful, only it is near to dusk.' A perfect, ambiguous sigh: glory at its height is already shadowed by its ending."
  },

  {
    title: "Song of the Wandering Son",
    titlePinyin: "Yóu Zǐ Yín",
    titleHanzi: "游子吟",
    author: "Meng Jiao",
    authorHanzi: "孟郊",
    dynasty: "Tang dynasty (唐), 8th–9th century",
    source: "《游子吟》",
    lines: [
      { text: "慈母手中线", pinyin: "cí mǔ shǒu zhōng xiàn", translation: "The thread in a loving mother's hand —",
        chars: [ { c: "慈", p: "cí", m: "loving / kind" }, { c: "母", p: "mǔ", m: "mother (慈母 = loving mother)" }, { c: "手", p: "shǒu", m: "hand" }, { c: "中", p: "zhōng", m: "in" }, { c: "线", p: "xiàn", m: "thread" } ] },
      { text: "游子身上衣", pinyin: "yóu zǐ shēn shàng yī", translation: "becomes the coat on her traveling son's back.",
        chars: [ { c: "游", p: "yóu", m: "wandering" }, { c: "子", p: "zǐ", m: "son (游子 = traveler far from home)" }, { c: "身", p: "shēn", m: "body" }, { c: "上", p: "shàng", m: "on" }, { c: "衣", p: "yī", m: "clothes" } ] },
      { text: "临行密密缝", pinyin: "lín xíng mì mì féng", translation: "On the eve of his going she sews it close and tight,",
        chars: [ { c: "临", p: "lín", m: "on the point of" }, { c: "行", p: "xíng", m: "departing" }, { c: "密", p: "mì", m: "tight" }, { c: "密", p: "mì", m: "tight (密密 = stitch by close stitch)" }, { c: "缝", p: "féng", m: "to sew" } ] },
      { text: "意恐迟迟归", pinyin: "yì kǒng chí chí guī", translation: "fearing in her heart he'll be slow, slow to return.",
        chars: [ { c: "意", p: "yì", m: "in her heart" }, { c: "恐", p: "kǒng", m: "to fear" }, { c: "迟", p: "chí", m: "late" }, { c: "迟", p: "chí", m: "late (迟迟 = long delayed)" }, { c: "归", p: "guī", m: "to return" } ] },
      { text: "谁言寸草心", pinyin: "shéi yán cùn cǎo xīn", translation: "Who says that the heart of an inch-tall blade of grass",
        chars: [ { c: "谁", p: "shéi", m: "who" }, { c: "言", p: "yán", m: "to say" }, { c: "寸", p: "cùn", m: "an inch" }, { c: "草", p: "cǎo", m: "grass" }, { c: "心", p: "xīn", m: "heart (寸草心 = a tiny grass's heart)" } ] },
      { text: "报得三春晖", pinyin: "bào dé sān chūn huī", translation: "can ever repay the sunshine of all spring?",
        chars: [ { c: "报", p: "bào", m: "to repay" }, { c: "得", p: "dé", m: "to be able to" }, { c: "三", p: "sān", m: "three" }, { c: "春", p: "chūn", m: "spring (三春 = the whole spring)" }, { c: "晖", p: "huī", m: "sunshine (三春晖 = spring's warm light)" } ] }
    ],
    translation: "In a kind mother's hand is the thread that makes the clothes on her wandering son's back. As he is about to leave she sews them tight, stitch by careful stitch, afraid he will be long, long in coming home. Who can say that the heart of a small blade of grass could ever repay the warm sunlight of spring?",
    note: "The best-loved poem about a mother's love in the language. The image is humble — a mother sewing a coat before a journey — and the closing comparison is unforgettable: a child's gratitude is a blade of grass, the mother's love the whole spring sun. Memorized by generations as the very emblem of filial feeling."
  },

  {
    title: "Birdsong Brook",
    titlePinyin: "Niǎo Míng Jiàn",
    titleHanzi: "鸟鸣涧",
    author: "Wang Wei",
    authorHanzi: "王维",
    dynasty: "Tang dynasty (唐), 8th century",
    source: "《鸟鸣涧》",
    lines: [
      { text: "人闲桂花落", pinyin: "rén xián guì huā luò", translation: "Man at rest, the osmanthus flowers fall;",
        chars: [ { c: "人", p: "rén", m: "person" }, { c: "闲", p: "xián", m: "at rest / idle" }, { c: "桂", p: "guì", m: "osmanthus" }, { c: "花", p: "huā", m: "flowers" }, { c: "落", p: "luò", m: "to fall" } ] },
      { text: "夜静春山空", pinyin: "yè jìng chūn shān kōng", translation: "the night is still, the spring mountain empty.",
        chars: [ { c: "夜", p: "yè", m: "night" }, { c: "静", p: "jìng", m: "still / quiet" }, { c: "春", p: "chūn", m: "spring" }, { c: "山", p: "shān", m: "mountain" }, { c: "空", p: "kōng", m: "empty" } ] },
      { text: "月出惊山鸟", pinyin: "yuè chū jīng shān niǎo", translation: "The moon comes up and startles the mountain birds,",
        chars: [ { c: "月", p: "yuè", m: "moon" }, { c: "出", p: "chū", m: "to rise / emerge" }, { c: "惊", p: "jīng", m: "to startle" }, { c: "山", p: "shān", m: "mountain" }, { c: "鸟", p: "niǎo", m: "birds" } ] },
      { text: "时鸣春涧中", pinyin: "shí míng chūn jiàn zhōng", translation: "and now and then they call from the spring ravine.",
        chars: [ { c: "时", p: "shí", m: "from time to time" }, { c: "鸣", p: "míng", m: "to call / cry" }, { c: "春", p: "chūn", m: "spring" }, { c: "涧", p: "jiàn", m: "ravine / brook" }, { c: "中", p: "zhōng", m: "within" } ] }
    ],
    translation: "With the man at ease, the osmanthus blossoms drift down; the night is quiet, the spring hills empty. When the moon rises it startles the mountain birds, and from time to time they cry out in the spring ravine.",
    note: "Wang Wei conveys profound stillness through the tiniest motions — a falling petal, a moonrise, an occasional bird-call. The quiet is so complete that even moonlight can disturb a bird. A Zen-tinged jewel where emptiness (空) is alive and serene."
  },

  {
    title: "Written on the Wall of West Forest Temple",
    titlePinyin: "Tí Xī Lín Bì",
    titleHanzi: "题西林壁",
    author: "Su Shi",
    authorHanzi: "苏轼",
    dynasty: "Song dynasty (宋), 1084",
    source: "《题西林壁》",
    lines: [
      { text: "横看成岭侧成峰", pinyin: "héng kàn chéng lǐng cè chéng fēng", translation: "Seen head-on a ridge, from the side a peak;",
        chars: [ { c: "横", p: "héng", m: "crosswise / head-on" }, { c: "看", p: "kàn", m: "to view" }, { c: "成", p: "chéng", m: "becomes" }, { c: "岭", p: "lǐng", m: "ridge" }, { c: "侧", p: "cè", m: "from the side" }, { c: "成", p: "chéng", m: "becomes" }, { c: "峰", p: "fēng", m: "peak" } ] },
      { text: "远近高低各不同", pinyin: "yuǎn jìn gāo dī gè bù tóng", translation: "far, near, high, low — each view is different.",
        chars: [ { c: "远", p: "yuǎn", m: "far" }, { c: "近", p: "jìn", m: "near" }, { c: "高", p: "gāo", m: "high" }, { c: "低", p: "dī", m: "low" }, { c: "各", p: "gè", m: "each" }, { c: "不", p: "bù", m: "not" }, { c: "同", p: "tóng", m: "the same" } ] },
      { text: "不识庐山真面目", pinyin: "bù shí lú shān zhēn miàn mù", translation: "I cannot know Mount Lu's true face,",
        chars: [ { c: "不", p: "bù", m: "not" }, { c: "识", p: "shí", m: "to know" }, { c: "庐", p: "lú", m: "Lu" }, { c: "山", p: "shān", m: "mountain (庐山 = Mount Lu)" }, { c: "真", p: "zhēn", m: "true" }, { c: "面", p: "miàn", m: "face" }, { c: "目", p: "mù", m: "features (真面目 = true face)" } ] },
      { text: "只缘身在此山中", pinyin: "zhǐ yuán shēn zài cǐ shān zhōng", translation: "only because I am myself within this mountain.",
        chars: [ { c: "只", p: "zhǐ", m: "only" }, { c: "缘", p: "yuán", m: "because" }, { c: "身", p: "shēn", m: "self / body" }, { c: "在", p: "zài", m: "to be in" }, { c: "此", p: "cǐ", m: "this" }, { c: "山", p: "shān", m: "mountain" }, { c: "中", p: "zhōng", m: "within" } ] }
    ],
    translation: "Looked at from the front it is a ridge, from the side a peak; far and near, high and low, it never looks the same. I cannot make out the true face of Mount Lu — and that is simply because I am standing inside the mountain itself.",
    note: "Su Shi turns a sightseeing poem into philosophy. We cannot see the whole truth of something while we are caught up inside it; perspective limits us. The last two lines have become a proverb for the value of stepping back to gain clear sight."
  },

  {
    title: "New Year's Day",
    titlePinyin: "Yuán Rì",
    titleHanzi: "元日",
    author: "Wang Anshi",
    authorHanzi: "王安石",
    dynasty: "Song dynasty (宋), 11th century",
    source: "《元日》",
    lines: [
      { text: "爆竹声中一岁除", pinyin: "bào zhú shēng zhōng yī suì chú", translation: "Amid the firecrackers' noise the old year passes;",
        chars: [ { c: "爆", p: "bào", m: "to burst" }, { c: "竹", p: "zhú", m: "bamboo (爆竹 = firecrackers)" }, { c: "声", p: "shēng", m: "sound" }, { c: "中", p: "zhōng", m: "amid" }, { c: "一", p: "yī", m: "one" }, { c: "岁", p: "suì", m: "year" }, { c: "除", p: "chú", m: "to pass / be removed" } ] },
      { text: "春风送暖入屠苏", pinyin: "chūn fēng sòng nuǎn rù tú sū", translation: "the spring wind brings warmth into the New Year's wine.",
        chars: [ { c: "春", p: "chūn", m: "spring" }, { c: "风", p: "fēng", m: "wind" }, { c: "送", p: "sòng", m: "to send / bring" }, { c: "暖", p: "nuǎn", m: "warmth" }, { c: "入", p: "rù", m: "into" }, { c: "屠", p: "tú", m: "Tu" }, { c: "苏", p: "sū", m: "Su (屠苏 = New Year tusu wine)" } ] },
      { text: "千门万户曈曈日", pinyin: "qiān mén wàn hù tóng tóng rì", translation: "On a thousand doors, ten thousand homes, the bright new sun;",
        chars: [ { c: "千", p: "qiān", m: "thousand" }, { c: "门", p: "mén", m: "doors" }, { c: "万", p: "wàn", m: "ten thousand" }, { c: "户", p: "hù", m: "households" }, { c: "曈", p: "tóng", m: "bright" }, { c: "曈", p: "tóng", m: "bright (曈曈 = glowing)" }, { c: "日", p: "rì", m: "sun" } ] },
      { text: "总把新桃换旧符", pinyin: "zǒng bǎ xīn táo huàn jiù fú", translation: "all replace old charms with new peachwood tablets.",
        chars: [ { c: "总", p: "zǒng", m: "all / always" }, { c: "把", p: "bǎ", m: "to take" }, { c: "新", p: "xīn", m: "new" }, { c: "桃", p: "táo", m: "peachwood (charm)" }, { c: "换", p: "huàn", m: "to replace" }, { c: "旧", p: "jiù", m: "old" }, { c: "符", p: "fú", m: "charm (桃符 = peachwood door-charms)" } ] }
    ],
    translation: "As the firecrackers crackle, the old year departs; the spring breeze carries warmth into the tusu wine. On a thousand gates and ten thousand homes the new sun glows, and everyone takes down the old door-charms and puts up the new.",
    note: "A bright, festive picture of Lunar New Year's Day, full of its customs — firecrackers, tusu wine, and replacing the peachwood charms (ancestors of today's spring couplets). Wang Anshi, then leading sweeping reforms, also reads the renewal as a hopeful image of the new replacing the old."
  },

  {
    title: "Plum Blossoms",
    titlePinyin: "Méi Huā",
    titleHanzi: "梅花",
    author: "Wang Anshi",
    authorHanzi: "王安石",
    dynasty: "Song dynasty (宋), 11th century",
    source: "《梅花》",
    lines: [
      { text: "墙角数枝梅", pinyin: "qiáng jiǎo shù zhī méi", translation: "At a corner of the wall, a few sprigs of plum;",
        chars: [ { c: "墙", p: "qiáng", m: "wall" }, { c: "角", p: "jiǎo", m: "corner" }, { c: "数", p: "shù", m: "several" }, { c: "枝", p: "zhī", m: "sprigs / branches" }, { c: "梅", p: "méi", m: "plum blossom" } ] },
      { text: "凌寒独自开", pinyin: "líng hán dú zì kāi", translation: "braving the cold, they bloom all alone.",
        chars: [ { c: "凌", p: "líng", m: "to brave / rise above" }, { c: "寒", p: "hán", m: "cold" }, { c: "独", p: "dú", m: "alone" }, { c: "自", p: "zì", m: "by itself" }, { c: "开", p: "kāi", m: "to bloom" } ] },
      { text: "遥知不是雪", pinyin: "yáo zhī bù shì xuě", translation: "From afar I know it is not snow,",
        chars: [ { c: "遥", p: "yáo", m: "from afar" }, { c: "知", p: "zhī", m: "to know" }, { c: "不", p: "bù", m: "not" }, { c: "是", p: "shì", m: "to be" }, { c: "雪", p: "xuě", m: "snow" } ] },
      { text: "为有暗香来", pinyin: "wèi yǒu àn xiāng lái", translation: "because a hidden fragrance comes drifting near.",
        chars: [ { c: "为", p: "wèi", m: "because" }, { c: "有", p: "yǒu", m: "there is" }, { c: "暗", p: "àn", m: "hidden / faint" }, { c: "香", p: "xiāng", m: "fragrance (暗香 = subtle scent)" }, { c: "来", p: "lái", m: "to come / drift" } ] }
    ],
    translation: "In the corner by the wall, a few branches of plum blossom brave the cold and bloom all on their own. From a distance I can tell they are not snow — because a faint, hidden fragrance comes drifting over.",
    note: "The plum, first to flower in the bitter cold, is the classic emblem of integrity that endures hardship. Wang Anshi distinguishes the white blossoms from snow not by sight but by scent — the quiet perfume that gives away true character even from afar."
  },

  {
    title: "Little Pond",
    titlePinyin: "Xiǎo Chí",
    titleHanzi: "小池",
    author: "Yang Wanli",
    authorHanzi: "杨万里",
    dynasty: "Song dynasty (宋), 12th century",
    source: "《小池》",
    lines: [
      { text: "泉眼无声惜细流", pinyin: "quán yǎn wú shēng xī xì liú", translation: "The spring's mouth, soundless, hoards its slender trickle;",
        chars: [ { c: "泉", p: "quán", m: "spring" }, { c: "眼", p: "yǎn", m: "eye (泉眼 = a spring's source)" }, { c: "无", p: "wú", m: "without" }, { c: "声", p: "shēng", m: "sound" }, { c: "惜", p: "xī", m: "to cherish / be sparing of" }, { c: "细", p: "xì", m: "thin" }, { c: "流", p: "liú", m: "trickle / flow" } ] },
      { text: "树阴照水爱晴柔", pinyin: "shù yīn zhào shuǐ ài qíng róu", translation: "tree shade mirrored in the water loves the gentle sun.",
        chars: [ { c: "树", p: "shù", m: "tree" }, { c: "阴", p: "yīn", m: "shade (树阴 = tree shade)" }, { c: "照", p: "zhào", m: "to mirror / shine on" }, { c: "水", p: "shuǐ", m: "water" }, { c: "爱", p: "ài", m: "to love" }, { c: "晴", p: "qíng", m: "fine / sunny" }, { c: "柔", p: "róu", m: "softness" } ] },
      { text: "小荷才露尖尖角", pinyin: "xiǎo hé cái lù jiān jiān jiǎo", translation: "A little lotus just shows its sharp pointed tip,",
        chars: [ { c: "小", p: "xiǎo", m: "small" }, { c: "荷", p: "hé", m: "lotus" }, { c: "才", p: "cái", m: "just" }, { c: "露", p: "lù", m: "to reveal" }, { c: "尖", p: "jiān", m: "pointed" }, { c: "尖", p: "jiān", m: "pointed (尖尖 = sharp little)" }, { c: "角", p: "jiǎo", m: "tip / horn" } ] },
      { text: "早有蜻蜓立上头", pinyin: "zǎo yǒu qīng tíng lì shàng tóu", translation: "and already a dragonfly is perched upon its top.",
        chars: [ { c: "早", p: "zǎo", m: "already / early" }, { c: "有", p: "yǒu", m: "there is" }, { c: "蜻", p: "qīng", m: "(dragonfly)" }, { c: "蜓", p: "tíng", m: "(蜻蜓 = dragonfly)" }, { c: "立", p: "lì", m: "to stand / perch" }, { c: "上", p: "shàng", m: "on" }, { c: "头", p: "tóu", m: "top" } ] }
    ],
    translation: "The eye of the spring trickles soundlessly, as if loath to spare its thin stream; the shade of the trees, mirrored on the water, loves the soft fair weather. The little lotus has only just pushed up its sharp green tip — and already a dragonfly has come to perch on top.",
    note: "A tender close-up of early summer, alive with small affections — the spring 'cherishes' its trickle, the shade 'loves' the gentle light. The final image of a dragonfly alighting the instant the lotus tip appears is a perfect snapshot of nature's quick, delicate timing."
  },

  {
    title: "Song of Chile",
    titlePinyin: "Chì Lè Gē",
    titleHanzi: "敕勒歌",
    author: "Anonymous (Northern folk song)",
    authorHanzi: "北朝民歌",
    dynasty: "Northern Dynasties (南北朝), 6th century",
    source: "《敕勒歌》 — a Xianbei-era steppe ballad",
    lines: [
      { text: "敕勒川", pinyin: "chì lè chuān", translation: "The Chile plain,",
        chars: [ { c: "敕", p: "chì", m: "Chi" }, { c: "勒", p: "lè", m: "le (敕勒 = the Chile people)" }, { c: "川", p: "chuān", m: "plain / river-flat" } ] },
      { text: "阴山下", pinyin: "yīn shān xià", translation: "below the Yin Mountains.",
        chars: [ { c: "阴", p: "yīn", m: "Yin" }, { c: "山", p: "shān", m: "mountains (阴山 = Yin Mountains)" }, { c: "下", p: "xià", m: "below" } ] },
      { text: "天似穹庐", pinyin: "tiān sì qióng lú", translation: "The sky is like a domed tent,",
        chars: [ { c: "天", p: "tiān", m: "sky" }, { c: "似", p: "sì", m: "like" }, { c: "穹", p: "qióng", m: "domed / vaulted" }, { c: "庐", p: "lú", m: "tent (穹庐 = a round yurt)" } ] },
      { text: "笼盖四野", pinyin: "lǒng gài sì yě", translation: "covering all the wilds on every side.",
        chars: [ { c: "笼", p: "lǒng", m: "to enclose" }, { c: "盖", p: "gài", m: "to cover" }, { c: "四", p: "sì", m: "four" }, { c: "野", p: "yě", m: "wilds (四野 = all directions)" } ] },
      { text: "天苍苍", pinyin: "tiān cāng cāng", translation: "The sky a boundless blue,",
        chars: [ { c: "天", p: "tiān", m: "sky" }, { c: "苍", p: "cāng", m: "blue-grey" }, { c: "苍", p: "cāng", m: "vast (苍苍 = deep boundless blue)" } ] },
      { text: "野茫茫", pinyin: "yě máng máng", translation: "the plain a vast expanse;",
        chars: [ { c: "野", p: "yě", m: "plain / wilds" }, { c: "茫", p: "máng", m: "vast" }, { c: "茫", p: "máng", m: "vast (茫茫 = endless)" } ] },
      { text: "风吹草低见牛羊", pinyin: "fēng chuī cǎo dī xiàn niú yáng", translation: "the wind bends the grass low, and the cattle and sheep appear.",
        chars: [ { c: "风", p: "fēng", m: "wind" }, { c: "吹", p: "chuī", m: "to blow" }, { c: "草", p: "cǎo", m: "grass" }, { c: "低", p: "dī", m: "low" }, { c: "见", p: "xiàn", m: "to appear / reveal (read xiàn)" }, { c: "牛", p: "niú", m: "cattle" }, { c: "羊", p: "yáng", m: "sheep" } ] }
    ],
    translation: "On the Chile plain, beneath the Yin Mountains, the sky is like a great round tent that covers the wilds on every side. The heavens are a vast deep blue, the grassland endless — and when the wind blows the grass low, the cattle and sheep appear.",
    note: "Not a scholar's poem but a nomad steppe song, translated into Chinese in the Northern Dynasties. Its sweep is unmatched: the sky as a herder's tent over a boundless plain, and the unforgettable final line where wind parts the grass to reveal the grazing herds. A hymn to the grassland's openness."
  },

  {
    title: "Song on Climbing You Prefecture Tower",
    titlePinyin: "Dēng Yōu Zhōu Tái Gē",
    titleHanzi: "登幽州台歌",
    author: "Chen Zi'ang",
    authorHanzi: "陈子昂",
    dynasty: "Tang dynasty (唐), c. 696",
    source: "《登幽州台歌》",
    lines: [
      { text: "前不见古人", pinyin: "qián bù jiàn gǔ rén", translation: "Before me, I see no ancient men;",
        chars: [ { c: "前", p: "qián", m: "before / ahead" }, { c: "不", p: "bù", m: "not" }, { c: "见", p: "jiàn", m: "to see" }, { c: "古", p: "gǔ", m: "ancient" }, { c: "人", p: "rén", m: "people (古人 = the ancients)" } ] },
      { text: "后不见来者", pinyin: "hòu bù jiàn lái zhě", translation: "behind me, I see none yet to come.",
        chars: [ { c: "后", p: "hòu", m: "after / behind" }, { c: "不", p: "bù", m: "not" }, { c: "见", p: "jiàn", m: "to see" }, { c: "来", p: "lái", m: "coming" }, { c: "者", p: "zhě", m: "ones (来者 = those to come)" } ] },
      { text: "念天地之悠悠", pinyin: "niàn tiān dì zhī yōu yōu", translation: "Pondering the boundlessness of heaven and earth,",
        chars: [ { c: "念", p: "niàn", m: "to ponder" }, { c: "天", p: "tiān", m: "heaven" }, { c: "地", p: "dì", m: "earth (天地 = the cosmos)" }, { c: "之", p: "zhī", m: "'s (possessive)" }, { c: "悠", p: "yōu", m: "vast / far" }, { c: "悠", p: "yōu", m: "vast (悠悠 = endless)" } ] },
      { text: "独怆然而涕下", pinyin: "dú chuàng rán ér tì xià", translation: "alone and grieving, I let my tears fall.",
        chars: [ { c: "独", p: "dú", m: "alone" }, { c: "怆", p: "chuàng", m: "grieved" }, { c: "然", p: "rán", m: "-ly (怆然 = sorrowfully)" }, { c: "而", p: "ér", m: "and" }, { c: "涕", p: "tì", m: "tears" }, { c: "下", p: "xià", m: "to fall" } ] }
    ],
    translation: "Looking back, I cannot see the men of old; looking ahead, I cannot see those yet to come. Brooding on heaven and earth, so vast and without end, alone I am overwhelmed with grief, and my tears come down.",
    note: "Standing on an ancient tower, Chen Zi'ang feels the loneliness of a single human life set against infinite time — the great men of the past are gone, the great men of the future not yet born, and he stands alone in the immense between. A foundational expression of cosmic solitude in Chinese poetry."
  }
];

if (typeof module !== "undefined") module.exports = POEMS;
