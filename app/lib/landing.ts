/**
 * Localized landing pages at /es, /de, /fr ... one per language the iOS app
 * ships in. Each App Store locale's Marketing URL points at its language here.
 *
 * Copy was translated from the English block below with GPT-Sol (the same
 * model the app's string catalog uses) and checked for length and dashes.
 * Change the English first, then regenerate; never edit one language alone.
 */
export type LandingCopy = {
  metaTitle: string; metaDescription: string; eyebrow: string; h1: string; sub: string;
  f1t: string; f1b: string; f2t: string; f2b: string; f3t: string; f3b: string; f4t: string; f4b: string;
  ctaTitle: string; ctaBody: string; english: string;
};

/** URL slug, hreflang code and copy for each localized page. */
export const LANDINGS: { slug: string; hreflang: string; copy: LandingCopy }[] = [
  {
    "slug": "es",
    "hreflang": "es",
    "copy": {
      "metaTitle": "Dietly Fit: rutinas con IA y registro de entrenamientos",
      "metaDescription": "Dietly Fit crea tu rutina para gimnasio o casa, registra series, mide el nivel de cada músculo y registra comidas con una foto. Para iPhone y Android.",
      "eyebrow": "Rutinas con IA para el gimnasio y casa",
      "h1": "Entrena mejor. Mira cómo crece cada músculo.",
      "sub": "Dietly Fit crea tu rutina, registra cada serie y asigna un nivel a cada músculo para que siempre sepas qué entrenar después.",
      "f1t": "Registra cada serie",
      "f1b": "Anota series, repeticiones y peso en segundos, con tus registros de la semana pasada a la vista.",
      "f2t": "Cada músculo tiene su nivel",
      "f2b": "Cada músculo tiene un nivel, de Bronce a Diamante, que sube a medida que entrenas.",
      "f3t": "Registra tu comida con una foto",
      "f3b": "Haz una foto de tu comida y descubre sus calorías y proteínas en segundos.",
      "f4t": "Un entrenador con IA que se adapta a ti",
      "f4b": "Tu rutina se adapta a tu objetivo, al equipo que tienes y a tus horarios, tanto en el gimnasio como en casa.",
      "ctaTitle": "Empieza hoy tu primer entrenamiento",
      "ctaBody": "Disponible en iPhone y Android.",
      "english": "Lee más en inglés"
    }
  },
  {
    "slug": "de",
    "hreflang": "de",
    "copy": {
      "metaTitle": "Dietly Fit: KI-Trainingsplan & Workout-Tracker",
      "metaDescription": "KI-Trainingspläne für Gym und Zuhause. Tracke jeden Satz, steigere jeden Muskelrang und erfasse Mahlzeiten per Foto. Für iPhone und Android.",
      "eyebrow": "Dein KI-Trainingsplaner für Gym und Zuhause",
      "h1": "Trainiere smarter. Sieh, wie jeder Muskel wächst.",
      "sub": "Dietly Fit erstellt deinen Trainingsplan, trackt jeden Satz und zeigt dir den Rang jedes Muskels. So weißt du immer, was du als Nächstes trainieren solltest.",
      "f1t": "Tracke jeden Satz",
      "f1b": "Erfasse Sätze, Wiederholungen und Gewichte in Sekunden. Deine Werte aus der Vorwoche hast du dabei direkt im Blick.",
      "f2t": "Bring jeden Muskel aufs nächste Level",
      "f2b": "Jeder Muskel erhält einen Rang von Bronze bis Diamant. Je mehr du trainierst, desto höher steigt er.",
      "f3t": "Erfasse dein Essen per Foto",
      "f3b": "Fotografiere deine Mahlzeit und sieh in Sekunden, wie viele Kalorien und wie viel Protein sie enthält.",
      "f4t": "Ein KI-Coach, der sich dir anpasst",
      "f4b": "Dein Plan passt zu deinem Ziel, deiner Ausrüstung und deinem Zeitplan. Im Gym und zu Hause.",
      "ctaTitle": "Starte noch heute dein erstes Workout",
      "ctaBody": "Verfügbar für iPhone und Android.",
      "english": "Mehr auf Englisch lesen"
    }
  },
  {
    "slug": "fr",
    "hreflang": "fr",
    "copy": {
      "metaTitle": "Dietly Fit : coach IA et suivi de musculation",
      "metaDescription": "Dietly Fit crée ton programme, suit tes séries et le rang de tes muscles, analyse tes repas en photo. En salle ou chez toi, sur iPhone et Android.",
      "eyebrow": "Ton programme d'entraînement par IA, en salle ou à la maison",
      "h1": "Entraîne-toi mieux. Vois chaque muscle progresser.",
      "sub": "Dietly Fit crée ton programme, suit chaque série et attribue un rang à chaque muscle. Tu sais toujours quoi travailler à ta prochaine séance.",
      "f1t": "Suis chaque série",
      "f1b": "Enregistre tes séries, tes répétitions et tes charges en quelques secondes, avec les chiffres de la semaine dernière sous les yeux.",
      "f2t": "Fais monter chaque muscle en grade",
      "f2b": "Chaque muscle a son rang, de Bronze à Diamant, et monte en grade au fil de tes entraînements.",
      "f3t": "Ton repas en une photo",
      "f3b": "Prends ton repas en photo et découvre ses calories et ses protéines en quelques secondes.",
      "f4t": "Un coach IA qui s'adapte à toi",
      "f4b": "Ton programme s'adapte à ton objectif, à ton matériel et à ton emploi du temps, en salle comme à la maison.",
      "ctaTitle": "Lance ta première séance aujourd'hui",
      "ctaBody": "Disponible sur iPhone et Android.",
      "english": "En savoir plus en anglais"
    }
  },
  {
    "slug": "pt-br",
    "hreflang": "pt-BR",
    "copy": {
      "metaTitle": "Dietly Fit: treinos com IA e registro de exercícios",
      "metaDescription": "Dietly Fit cria treinos para academia ou casa, registra séries, mostra o nível de cada músculo e registra refeições por foto. No iPhone e Android.",
      "eyebrow": "Treinos com IA para academia e casa",
      "h1": "Treine melhor. Veja cada músculo crescer.",
      "sub": "O Dietly Fit monta seu treino, registra cada série e mostra o nível de cada músculo. Assim, você sempre sabe o que treinar a seguir.",
      "f1t": "Registre cada série",
      "f1b": "Registre séries, repetições e cargas em segundos, com os números da semana passada bem à sua frente.",
      "f2t": "Veja o nível de cada músculo",
      "f2b": "Cada músculo tem um nível, do Bronze ao Diamante, e sobe conforme você treina.",
      "f3t": "Fotografe sua refeição",
      "f3b": "Tire uma foto da sua comida e veja as calorias e a quantidade de proteína em segundos.",
      "f4t": "Um treinador com IA que se adapta a você",
      "f4b": "Seu treino se adapta ao seu objetivo, aos equipamentos disponíveis e à sua rotina, na academia ou em casa.",
      "ctaTitle": "Comece seu primeiro treino hoje",
      "ctaBody": "Disponível para iPhone e Android.",
      "english": "Leia mais em inglês"
    }
  },
  {
    "slug": "it",
    "hreflang": "it",
    "copy": {
      "metaTitle": "Dietly Fit: schede con IA e diario di allenamento",
      "metaDescription": "Dietly Fit crea la tua scheda per palestra o casa, registra ogni serie e i pasti da una foto e assegna un livello a ogni muscolo. Su iPhone e Android.",
      "eyebrow": "Schede di allenamento con IA per palestra e casa",
      "h1": "Allenati meglio. Guarda crescere ogni muscolo.",
      "sub": "Dietly Fit crea la tua scheda di allenamento, registra ogni serie e assegna un livello a ogni muscolo, così sai sempre cosa allenare la prossima volta.",
      "f1t": "Registra ogni serie",
      "f1b": "Annota serie, ripetizioni e pesi in pochi secondi, con i dati della settimana scorsa sempre sott’occhio.",
      "f2t": "Fai salire di livello ogni muscolo",
      "f2b": "Ogni muscolo ha un livello, da Bronzo a Diamante, che sale man mano che ti alleni.",
      "f3t": "Fotografa il tuo pasto",
      "f3b": "Scatta una foto al tuo piatto e scopri calorie e proteine in pochi secondi.",
      "f4t": "Un coach IA che si adatta a te",
      "f4b": "La tua scheda si adatta ai tuoi obiettivi, agli attrezzi che hai e al tempo a disposizione, in palestra o a casa.",
      "ctaTitle": "Inizia oggi il tuo primo allenamento",
      "ctaBody": "Disponibile su iPhone e Android.",
      "english": "Scopri di più in inglese"
    }
  },
  {
    "slug": "nl",
    "hreflang": "nl",
    "copy": {
      "metaTitle": "Dietly Fit: AI-trainingsplanner en fitnesslogboek",
      "metaDescription": "Dietly Fit plant je workouts, houdt sets en spierniveaus bij en logt maaltijden via foto's. Train thuis of in de sportschool. Voor iPhone en Android.",
      "eyebrow": "AI-trainingsplanner voor de sportschool en thuis",
      "h1": "Train slimmer. Zie elke spier groeien.",
      "sub": "Dietly Fit maakt je trainingsplan, houdt elke set bij en geeft elke spier een niveau. Zo weet je altijd wat je volgende training wordt.",
      "f1t": "Houd elke set bij",
      "f1b": "Log sets, herhalingen en gewicht in seconden, met je resultaten van vorige week direct in beeld.",
      "f2t": "Volg het niveau van elke spier",
      "f2b": "Elke spier krijgt een niveau van Brons tot Diamant. Hoe meer je traint, hoe hoger je komt.",
      "f3t": "Maak een foto van je maaltijd",
      "f3b": "Fotografeer je maaltijd en zie binnen enkele seconden hoeveel calorieën en eiwitten erin zitten.",
      "f4t": "Een AI-coach die zich aanpast",
      "f4b": "Je trainingsplan past bij je doel, je beschikbare apparatuur en je agenda, in de sportschool of thuis.",
      "ctaTitle": "Start vandaag met je eerste workout",
      "ctaBody": "Beschikbaar op iPhone en Android.",
      "english": "Lees meer in het Engels"
    }
  },
  {
    "slug": "tr",
    "hreflang": "tr",
    "copy": {
      "metaTitle": "Dietly Fit: Yapay Zekâ ile Antrenman Planı ve Takibi",
      "metaDescription": "Dietly Fit ev ve salon antrenmanlarını planlar, setlerini takip eder, kaslarına seviye verir, fotoğraftan öğün kaydeder. iPhone ve Android'de.",
      "eyebrow": "Ev ve salon için yapay zekâ destekli antrenman planı",
      "h1": "Daha akıllı antrenman yap. Her kasının gelişimini gör.",
      "sub": "Dietly Fit antrenman planını oluşturur, her setini takip eder ve her kasına seviye verir. Böylece sırada hangi kasını çalıştıracağını her zaman bilirsin.",
      "f1t": "Her setini takip et",
      "f1b": "Setlerini, tekrarlarını ve kullandığın ağırlıkları saniyeler içinde kaydet. Geçen haftaki değerlerin de hemen gözünün önünde olsun.",
      "f2t": "Her kasına bir seviye",
      "f2b": "Her kasın Bronz'dan Elmas'a uzanan bir seviye kazanır. Sen antrenman yaptıkça seviyesi yükselir.",
      "f3t": "Öğününü fotoğrafla kaydet",
      "f3b": "Yemeğinin fotoğrafını çek, kalori ve protein miktarını saniyeler içinde gör.",
      "f4t": "Sana uyum sağlayan yapay zekâ koçu",
      "f4b": "İster salonda ister evde, planın hedefine, ekipmanına ve programına göre şekillenir.",
      "ctaTitle": "İlk antrenmanına bugün başla",
      "ctaBody": "iPhone ve Android'de.",
      "english": "İngilizce daha fazla bilgi al"
    }
  },
  {
    "slug": "ja",
    "hreflang": "ja",
    "copy": {
      "metaTitle": "Dietly Fit：AI筋トレプラン＆トレーニング記録",
      "metaDescription": "Dietly Fitがジムでも自宅でも使える筋トレプランを作成。全セットを記録し、筋肉ごとのランクで成長をチェック。食事も写真で手軽に記録。iPhoneとAndroidで使えます。",
      "eyebrow": "ジムでも自宅でも。AIが筋トレプランを作成",
      "h1": "もっと賢く鍛えよう。筋肉ごとの成長を実感しよう。",
      "sub": "Dietly Fitが筋トレプランを作成し、全セットを記録。筋肉ごとのランクもわかるから、次にどこを鍛えるか迷わない。",
      "f1t": "すべてのセットを記録",
      "f1b": "セット数・回数・重量をサッと記録。先週の記録を見ながらトレーニングできる。",
      "f2t": "筋肉ごとにランクアップ",
      "f2b": "筋肉ごとにブロンズからダイヤモンドまでのランクを表示。鍛えるほどランクが上がる。",
      "f3t": "食事は写真で記録",
      "f3b": "食事を撮るだけで、カロリーとたんぱく質が数秒でわかる。",
      "f4t": "あなたに合わせるAIコーチ",
      "f4b": "目標も、使える器具も、スケジュールも考慮。ジムでも自宅でも、あなたに合ったプランで鍛えられる。",
      "ctaTitle": "今日、最初のトレーニングを始めよう",
      "ctaBody": "iPhoneとAndroidで使えます。",
      "english": "英語でもっと読む"
    }
  },
  {
    "slug": "ko",
    "hreflang": "ko",
    "copy": {
      "metaTitle": "Dietly Fit: AI 맞춤 운동 플래너와 운동 기록",
      "metaDescription": "헬스장에서도 집에서도, Dietly Fit으로 맞춤 운동 계획을 세우고 모든 세트와 근육별 등급을 기록하세요. 식단도 사진 한 장으로 간편하게. iPhone과 Android에서 만나보세요.",
      "eyebrow": "헬스장과 집에서 쓰는 AI 운동 플래너",
      "h1": "더 똑똑하게 운동하고, 근육별 성장을 한눈에.",
      "sub": "Dietly Fit이 운동 계획을 세우고, 모든 세트를 기록하고, 근육별 등급을 보여줘요. 다음에 어떤 운동을 할지 고민할 필요 없어요.",
      "f1t": "모든 세트를 빠짐없이",
      "f1b": "지난주 기록을 바로 보면서 세트, 횟수, 중량을 몇 초 만에 기록해요.",
      "f2t": "근육마다 나만의 등급",
      "f2b": "각 근육에 브론즈부터 다이아몬드까지 등급이 매겨져요. 운동을 이어갈수록 등급도 올라가요.",
      "f3t": "식단 기록은 사진 한 장으로",
      "f3b": "음식 사진을 찍으면 몇 초 만에 칼로리와 단백질을 확인할 수 있어요.",
      "f4t": "나에게 맞춰주는 AI 코치",
      "f4b": "헬스장에서도 집에서도, 내 목표와 운동 기구, 일정에 맞는 운동 계획을 세워줘요.",
      "ctaTitle": "오늘 첫 운동을 시작해요",
      "ctaBody": "iPhone과 Android에서 만나보세요.",
      "english": "영어로 자세히 보기"
    }
  },
  {
    "slug": "zh-hans",
    "hreflang": "zh-Hans",
    "copy": {
      "metaTitle": "Dietly Fit：AI 训练计划与健身记录",
      "metaDescription": "无论在健身房还是家里，Dietly Fit 都能为你定制训练计划，记录每组训练，为各肌群评定段位，还能拍照记录饮食。支持 iPhone 和 Android。",
      "eyebrow": "健身房、居家都能用的 AI 训练规划助手",
      "h1": "练得更聪明，看各肌群一步步变强。",
      "sub": "Dietly Fit 为你制定训练计划，记录每组训练，为各肌群评定段位，让你随时知道下一步该练什么。",
      "f1t": "每组训练，都有记录",
      "f1b": "几秒就能记下组数、次数和重量，上周的数据就在眼前，轻松对比进步。",
      "f2t": "各肌群，都有段位",
      "f2b": "从青铜到钻石，每个肌群都有自己的段位，随着训练不断升级。",
      "f3t": "拍张照，记录一餐",
      "f3b": "给食物拍张照，几秒就能查看热量和蛋白质含量。",
      "f4t": "懂你，也会调整的 AI 教练",
      "f4b": "根据你的目标、器材和时间安排定制计划，在健身房或家里都能练。",
      "ctaTitle": "今天就开始你的第一次训练",
      "ctaBody": "支持 iPhone 和 Android。",
      "english": "阅读更多英文内容"
    }
  },
  {
    "slug": "ru",
    "hreflang": "ru",
    "copy": {
      "metaTitle": "Dietly Fit: ИИ-план тренировок и фитнес-дневник",
      "metaDescription": "Dietly Fit составляет план для зала и дома, отслеживает подходы и прогресс мышц, считает калории по фото еды. Доступно на iPhone и Android.",
      "eyebrow": "План тренировок для зала и дома с ИИ",
      "h1": "Тренируйся с умом. Следи за ростом каждой мышцы.",
      "sub": "Dietly Fit составляет твой план тренировок, отслеживает каждый подход и присваивает мышцам ранги, чтобы ты всегда знал, что тренировать дальше.",
      "f1t": "Записывай каждый подход",
      "f1b": "Вноси подходы, повторения и вес за секунды. Результаты прошлой недели всегда перед глазами.",
      "f2t": "Повышай ранг каждой мышцы",
      "f2b": "У каждой мышцы свой ранг: от бронзы до алмаза. Тренируйся и повышай его.",
      "f3t": "Сфотографируй еду",
      "f3b": "Сделай фото своего блюда и узнай количество калорий и белка за секунды.",
      "f4t": "ИИ-тренер, который подстраивается под тебя",
      "f4b": "Твой план учитывает цель, доступное оборудование и расписание, где бы ты ни тренировался: в зале или дома.",
      "ctaTitle": "Начни первую тренировку уже сегодня",
      "ctaBody": "Доступно на iPhone и Android.",
      "english": "Подробнее на английском"
    }
  }
];

export const LANDING_UPDATED = "2026-11-08";

/** hreflang map for every localized page plus the English homepage. */
export const LANDING_ALTERNATES: Record<string, string> = {
  en: "/",
  "x-default": "/",
  ...Object.fromEntries(LANDINGS.map((l) => [l.hreflang, `/${l.slug}`])),
};
