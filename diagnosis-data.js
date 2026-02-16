/**
 * Tanet - 診断データ
 * 15問の質問と12タイプの定義
 */

// 診断質問データ
const QUESTIONS = [
    // フェーズ1: 興味・関心の質問
    {
        id: 1,
        category: "興味・関心",
        categoryIcon: "🔍",
        text: "新しいことを学ぶとき、最初に何をしたいですか？",
        type: "choice",
        options: [
            { id: "a", text: "実際に手を動かして試してみる", scores: { experimenter: 3, practical: 2 } },
            { id: "b", text: "本やネットで詳しく調べる", scores: { reader: 3, analyst: 2 } },
            { id: "c", text: "動画やビジュアルで理解する", scores: { visual: 3, curious: 1 } },
            { id: "d", text: "誰かに説明してもらう", scores: { auditory: 3, collaborative: 2 } }
        ]
    },
    {
        id: 2,
        category: "興味・関心",
        categoryIcon: "🔍",
        text: "休日に自由時間があるとき、どんな過ごし方が好きですか？",
        type: "choice",
        options: [
            { id: "a", text: "ものづくりや実験的なことをする", scores: { experimenter: 3, intuitive: 2 } },
            { id: "b", text: "ひとりで読書や勉強をする", scores: { independent: 3, reader: 2 } },
            { id: "c", text: "友達と一緒に何かをする", scores: { collaborative: 3, auditory: 1 } },
            { id: "d", text: "新しい場所や体験を探索する", scores: { curious: 3, experimenter: 1 } }
        ]
    },
    {
        id: 3,
        category: "興味・関心",
        categoryIcon: "🔍",
        text: "学校の授業で一番好きな瞬間は？",
        type: "choice",
        options: [
            { id: "a", text: "実験や実習をしているとき", scores: { experimenter: 3, practical: 2 } },
            { id: "b", text: "難しい問題が解けたとき", scores: { goal: 3, analyst: 2 } },
            { id: "c", text: "グループで話し合っているとき", scores: { collaborative: 3, auditory: 2 } },
            { id: "d", text: "新しい発見や知識を得たとき", scores: { curious: 3, visual: 1 } }
        ]
    },
    {
        id: 4,
        category: "興味・関心",
        categoryIcon: "🔍",
        text: "将来どんな仕事に興味がありますか？",
        type: "choice",
        options: [
            { id: "a", text: "何かを作り出す・発明する仕事", scores: { intuitive: 3, experimenter: 2 } },
            { id: "b", text: "データを分析・研究する仕事", scores: { analyst: 3, reader: 1 } },
            { id: "c", text: "人と関わり、教える仕事", scores: { collaborative: 3, auditory: 2 } },
            { id: "d", text: "実践的なスキルを活かす仕事", scores: { practical: 3, goal: 1 } }
        ]
    },
    {
        id: 5,
        category: "興味・関心",
        categoryIcon: "🔍",
        text: "勉強のモチベーションはどこから来ますか？",
        type: "choice",
        options: [
            { id: "a", text: "目標を達成したいため", scores: { goal: 3, repetitive: 1 } },
            { id: "b", text: "知らないことを知りたいため", scores: { curious: 3, reader: 1 } },
            { id: "c", text: "将来の役に立つから", scores: { practical: 3, goal: 1 } },
            { id: "d", text: "学ぶこと自体が楽しいから", scores: { intuitive: 3, experimenter: 1 } }
        ]
    },

    // フェーズ2: 学習スタイルの質問
    {
        id: 6,
        category: "学習スタイル",
        categoryIcon: "📖",
        text: "新しい科目を学ぶとき、どの方法が一番理解しやすいですか？",
        type: "choice",
        options: [
            { id: "a", text: "図やグラフで視覚的に理解する", scores: { visual: 3, analyst: 1 } },
            { id: "b", text: "声に出して読んだり、聞いたりする", scores: { auditory: 3, repetitive: 1 } },
            { id: "c", text: "ノートにまとめて書く", scores: { reader: 3, repetitive: 2 } },
            { id: "d", text: "問題を解きながら身につける", scores: { practical: 3, goal: 1 } }
        ]
    },
    {
        id: 7,
        category: "学習スタイル",
        categoryIcon: "📖",
        text: "勉強するときの環境はどちらが好きですか？",
        type: "choice",
        options: [
            { id: "a", text: "静かな場所でひとりで集中", scores: { independent: 3, reader: 1 } },
            { id: "b", text: "カフェなど適度な雑音がある場所", scores: { auditory: 2, intuitive: 1 } },
            { id: "c", text: "友達と一緒に勉強会", scores: { collaborative: 3, auditory: 1 } },
            { id: "d", text: "場所はこだわらない", scores: { practical: 1, independent: 1 } }
        ]
    },
    {
        id: 8,
        category: "学習スタイル",
        categoryIcon: "📖",
        text: "暗記をするとき、どんな方法をよく使いますか？",
        type: "choice",
        options: [
            { id: "a", text: "何度も繰り返し書いたり読んだりする", scores: { repetitive: 3, reader: 1 } },
            { id: "b", text: "イメージや語呂合わせを使う", scores: { visual: 3, intuitive: 2 } },
            { id: "c", text: "人に教えるつもりで整理する", scores: { auditory: 2, collaborative: 2 } },
            { id: "d", text: "問題を解きながら覚える", scores: { practical: 3, goal: 1 } }
        ]
    },
    {
        id: 9,
        category: "学習スタイル",
        categoryIcon: "📖",
        text: "わからない問題があったとき、どうしますか？",
        type: "choice",
        options: [
            { id: "a", text: "まず自分で調べて解決しようとする", scores: { independent: 3, analyst: 2 } },
            { id: "b", text: "すぐに先生や友達に聞く", scores: { collaborative: 3, auditory: 2 } },
            { id: "c", text: "しばらく考えてからヒントを探す", scores: { analyst: 3, intuitive: 1 } },
            { id: "d", text: "一旦飛ばして後で戻る", scores: { practical: 2, goal: 1 } }
        ]
    },
    {
        id: 10,
        category: "学習スタイル",
        categoryIcon: "📖",
        text: "長期間の学習計画を立てるとき、どうしますか？",
        type: "choice",
        options: [
            { id: "a", text: "細かくスケジュールを決める", scores: { goal: 3, repetitive: 2 } },
            { id: "b", text: "大まかな目標だけ決める", scores: { intuitive: 3, independent: 1 } },
            { id: "c", text: "その日の気分で決める", scores: { curious: 2, experimenter: 1 } },
            { id: "d", text: "テスト直前に集中してやる", scores: { practical: 2, goal: 1 } }
        ]
    },

    // フェーズ3: 課題・困りごとの質問
    {
        id: 11,
        category: "課題・困りごと",
        categoryIcon: "💭",
        text: "勉強していて一番困ることは何ですか？",
        type: "choice",
        options: [
            { id: "a", text: "集中力が続かない", scores: { experimenter: 2, visual: 2 } },
            { id: "b", text: "何から始めればいいかわからない", scores: { reader: 2, analyst: 2 } },
            { id: "c", text: "覚えたことをすぐ忘れてしまう", scores: { repetitive: 2, practical: 2 } },
            { id: "d", text: "やる気が出ない", scores: { goal: 2, collaborative: 2 } }
        ]
    },
    {
        id: 12,
        category: "課題・困りごと",
        categoryIcon: "💭",
        text: "テスト前の勉強で陥りがちなパターンは？",
        type: "choice",
        options: [
            { id: "a", text: "範囲を絞れずに全部やろうとする", scores: { curious: 2, reader: 2 } },
            { id: "b", text: "直前まで手をつけない", scores: { experimenter: 2, intuitive: 2 } },
            { id: "c", text: "同じところを何度も復習してしまう", scores: { repetitive: 3, goal: 1 } },
            { id: "d", text: "友達と話していて時間がなくなる", scores: { collaborative: 2, auditory: 2 } }
        ]
    },
    {
        id: 13,
        category: "課題・困りごと",
        categoryIcon: "💭",
        text: "授業中、どんなときに集中が切れますか？",
        type: "choice",
        options: [
            { id: "a", text: "内容が難しすぎるとき", scores: { visual: 2, practical: 2 } },
            { id: "b", text: "内容が簡単すぎるとき", scores: { curious: 3, independent: 1 } },
            { id: "c", text: "一方的な話を聞いているとき", scores: { experimenter: 3, collaborative: 1 } },
            { id: "d", text: "静かで刺激がないとき", scores: { auditory: 2, experimenter: 1 } }
        ]
    },
    {
        id: 14,
        category: "課題・困りごと",
        categoryIcon: "💭",
        text: "苦手な教科に対して、どう感じますか？",
        type: "choice",
        options: [
            { id: "a", text: "やり方を変えれば克服できると思う", scores: { intuitive: 3, practical: 1 } },
            { id: "b", text: "得意な人に教えてもらいたい", scores: { collaborative: 3, auditory: 1 } },
            { id: "c", text: "コツコツやればできるようになる", scores: { repetitive: 3, goal: 2 } },
            { id: "d", text: "興味を持てれば頑張れる", scores: { curious: 3, experimenter: 1 } }
        ]
    },
    {
        id: 15,
        category: "課題・困りごと",
        categoryIcon: "💭",
        text: "理想の授業はどんなものですか？",
        type: "choice",
        options: [
            { id: "a", text: "実験や体験が多い授業", scores: { experimenter: 3, practical: 2 } },
            { id: "b", text: "自分のペースで進められる授業", scores: { independent: 3, reader: 1 } },
            { id: "c", text: "ディスカッションが多い授業", scores: { collaborative: 3, auditory: 2 } },
            { id: "d", text: "ゲーム感覚で学べる授業", scores: { visual: 2, goal: 2, curious: 1 } }
        ]
    }
];

// 12タイプの定義
const LEARNING_TYPES = {
    experimenter: {
        id: "experimenter",
        name: "実験・体感型",
        subtitle: "クリエイター",
        icon: "🧪",
        color: "#f59e0b",
        description: "実際に手を動かして試すことで理解が深まるタイプ。理論よりも実践を重視し、体験を通じた学びが最も効果的です。失敗を恐れず、試行錯誤しながら学ぶことで、知識を確実に身につけていきます。",
        traits: ["行動力がある", "好奇心旺盛", "創造的", "実験好き", "体験重視"],
        strategies: [
            "実験や実習がある授業を積極的に選ぶ",
            "理論を学んだらすぐに実践してみる",
            "ものづくりやプロジェクト型の学習を取り入れる",
            "失敗を恐れず、試行錯誤を楽しむ"
        ],
        hashtags: ["#体験学習", "#実験大好き", "#手を動かして学ぶ", "#クリエイター気質", "#理論より実践"]
    },
    analyst: {
        id: "analyst",
        name: "分析・論理型",
        subtitle: "リサーチャー",
        icon: "📊",
        color: "#3b82f6",
        description: "データや論理的な説明を通じて理解するタイプ。物事の仕組みや因果関係を明確にすることで、深い理解を得られます。根拠に基づいた学習を好み、体系的に知識を整理していきます。",
        traits: ["論理的思考", "分析力が高い", "根拠重視", "体系的", "批判的思考"],
        strategies: [
            "なぜそうなるのか、理由を常に考える",
            "フローチャートや因果関係図を活用する",
            "データや統計を使って理解を深める",
            "仮説を立てて検証する習慣をつける"
        ],
        hashtags: ["#ロジカルシンキング", "#データ分析", "#なぜを追求", "#理系脳", "#論理的思考"]
    },
    visual: {
        id: "visual",
        name: "視覚・映像型",
        subtitle: "ビジュアライザー",
        icon: "🎨",
        color: "#ec4899",
        description: "図やイラスト、動画などの視覚的な情報から学ぶのが得意なタイプ。教科書の文字だけでなく、ビジュアルと組み合わせることで理解が格段に深まります。カラフルなノートづくりも効果的です。",
        traits: ["視覚的記憶", "イメージ力", "色彩感覚", "空間認識", "図解力"],
        strategies: [
            "マインドマップや図解でノートを作る",
            "動画教材やビジュアル資料を活用する",
            "カラーペンを使って情報を整理する",
            "頭の中でイメージしながら学習する"
        ],
        hashtags: ["#ビジュアル学習", "#図解ノート", "#動画で学ぶ", "#カラフルノート", "#イメージ記憶"]
    },
    auditory: {
        id: "auditory",
        name: "聴覚・対話型",
        subtitle: "コミュニケーター",
        icon: "💬",
        color: "#10b981",
        description: "聞いて理解し、話すことで記憶を定着させるタイプ。講義や説明を聞くこと、そして自分で声に出して説明することで学びが深まります。ディスカッションを通じた学習が最も効果的です。",
        traits: ["傾聴力", "表現力", "コミュニケーション上手", "音声記憶", "対話好き"],
        strategies: [
            "音声教材やポッドキャストを活用する",
            "学んだことを声に出して復習する",
            "友達に教えるつもりで説明してみる",
            "グループ学習やディスカッションに参加する"
        ],
        hashtags: ["#音声学習", "#ディスカッション", "#教え合い", "#聞いて覚える", "#対話で学ぶ"]
    },
    reader: {
        id: "reader",
        name: "読書・文章型",
        subtitle: "スカラー",
        icon: "📖",
        color: "#8b5cf6",
        description: "文章を読んで理解し、書くことで知識を定着させるタイプ。教科書や参考書をじっくり読み込み、ノートにまとめることで深い理解を得られます。一人で集中して学ぶ時間が大切です。",
        traits: ["読解力", "文章力", "内省的", "集中力", "知識欲"],
        strategies: [
            "参考書や問題集を徹底的に読み込む",
            "自分の言葉でノートにまとめる",
            "静かな環境で集中して学習する",
            "多読で語彙力と理解力を高める"
        ],
        hashtags: ["#読書家", "#ノートまとめ", "#独学派", "#じっくり学ぶ", "#本の虫"]
    },
    practical: {
        id: "practical",
        name: "実践・応用型",
        subtitle: "プラクティショナー",
        icon: "🔧",
        color: "#ef4444",
        description: "学んだことをすぐに実践に活かしたいタイプ。「これが何の役に立つのか」を常に意識し、実用的な知識やスキルを重視します。問題を解きながら学ぶ、アウトプット重視の学習が効果的です。",
        traits: ["実用主義", "効率重視", "問題解決力", "アウトプット志向", "結果重視"],
        strategies: [
            "問題演習を中心に学習を進める",
            "学んだことを実生活で応用してみる",
            "資格取得など具体的な目標を設定する",
            "即効性のある学習法を選ぶ"
        ],
        hashtags: ["#即実践", "#問題演習", "#使える知識", "#効率重視", "#アウトプット学習"]
    },
    collaborative: {
        id: "collaborative",
        name: "協調・チーム型",
        subtitle: "コラボレーター",
        icon: "👥",
        color: "#06b6d4",
        description: "仲間と一緒に学ぶことでモチベーションが上がるタイプ。教え合ったり議論することで理解が深まります。一人で勉強するよりも、グループ学習やペア学習で力を発揮します。",
        traits: ["協調性", "チームワーク", "教え上手", "社交的", "励まし合い"],
        strategies: [
            "勉強会やグループ学習を積極的に行う",
            "友達と問題を出し合って復習する",
            "わからないところをすぐに質問できる環境を作る",
            "オンライン学習コミュニティに参加する"
        ],
        hashtags: ["#仲間と学ぶ", "#勉強会", "#教え合い", "#グループ学習", "#学び仲間"]
    },
    independent: {
        id: "independent",
        name: "独立・自律型",
        subtitle: "エクスプローラー",
        icon: "🧭",
        color: "#84cc16",
        description: "自分のペースで、自分なりの方法で学ぶことを好むタイプ。他人に合わせるよりも、独自の学習計画で進めたほうが効果的。自己管理能力が高く、主体的に学習を進められます。",
        traits: ["自律性", "自己管理", "マイペース", "独創性", "主体性"],
        strategies: [
            "自分だけの学習スケジュールを作成する",
            "オンライン教材で自分のペースで学ぶ",
            "学習方法を自分流にカスタマイズする",
            "定期的な自己評価と振り返りを行う"
        ],
        hashtags: ["#自学自習", "#マイペース学習", "#独学スタイル", "#自己管理", "#自分流"]
    },
    goal: {
        id: "goal",
        name: "目標・達成型",
        subtitle: "ストライバー",
        icon: "🎯",
        color: "#f97316",
        description: "明確な目標があると力を発揮するタイプ。テストの点数、資格取得、志望校合格など、具体的なゴールに向かって計画的に努力できます。達成感がさらなる学習意欲につながります。",
        traits: ["目標志向", "計画性", "達成欲", "努力家", "粘り強い"],
        strategies: [
            "短期・中期・長期の目標を明確に設定する",
            "進捗を可視化して達成感を得る",
            "ご褒美システムでモチベーションを維持する",
            "目標達成のためのマイルストーンを設定する"
        ],
        hashtags: ["#目標達成", "#計画的学習", "#合格へ一直線", "#努力の天才", "#達成感"]
    },
    curious: {
        id: "curious",
        name: "好奇心・発見型",
        subtitle: "アドベンチャラー",
        icon: "🔍",
        color: "#14b8a6",
        description: "興味を持ったことへの探究心が強いタイプ。「なぜ？」「どうして？」という問いを大切にし、知識を深堀りすることで学びが広がります。新しい発見への喜びが学習の原動力です。",
        traits: ["好奇心旺盛", "探究心", "発見好き", "質問上手", "知識欲"],
        strategies: [
            "興味のあるテーマから学習を始める",
            "関連知識を調べて学びを広げる",
            "疑問をリストアップして調べる習慣をつける",
            "日常の「なぜ？」を学習につなげる"
        ],
        hashtags: ["#好奇心", "#深掘り学習", "#なぜなに", "#発見の喜び", "#探究者"]
    },
    repetitive: {
        id: "repetitive",
        name: "反復・定着型",
        subtitle: "マスター",
        icon: "🔄",
        color: "#a855f7",
        description: "繰り返し学習することで確実に知識を定着させるタイプ。一度で覚えようとせず、何度も復習することで長期記憶に定着させます。基礎を固めてから応用に進む、堅実な学習スタイルです。",
        traits: ["継続力", "着実", "基礎重視", "復習好き", "定着力"],
        strategies: [
            "間隔を空けた復習スケジュールを立てる",
            "基礎を完璧にしてから応用に進む",
            "同じ問題を何度も解いて定着させる",
            "暗記カードやアプリで反復練習する"
        ],
        hashtags: ["#反復学習", "#基礎固め", "#コツコツ", "#復習マスター", "#着実に前進"]
    },
    intuitive: {
        id: "intuitive",
        name: "直感・創造型",
        subtitle: "イノベーター",
        icon: "💡",
        color: "#eab308",
        description: "直感やひらめきを大切にするタイプ。既存の枠にとらわれず、独自の視点で物事を捉えます。創造的なアプローチで問題を解決し、新しいアイデアを生み出すことが得意です。",
        traits: ["創造性", "ひらめき", "柔軟性", "独創的", "革新的"],
        strategies: [
            "自由な発想でアイデアを広げる",
            "異なる分野の知識を組み合わせる",
            "型にはまらない学習方法を試す",
            "ブレインストーミングで発想を広げる"
        ],
        hashtags: ["#ひらめき", "#創造的思考", "#アイデアマン", "#イノベーター", "#発想力"]
    }
};

// おすすめ授業データ（モックアップ）
const RECOMMENDED_LESSONS = {
    experimenter: [
        { id: 1, title: "化学実験ラボ：色の変化を観察しよう", icon: "🔬", instructor: "山田先生" },
        { id: 2, title: "電子工作入門：LEDで遊ぼう", icon: "💡", instructor: "佐藤先生" }
    ],
    analyst: [
        { id: 3, title: "データサイエンス入門", icon: "📊", instructor: "田中先生" },
        { id: 4, title: "論理パズルで鍛える思考力", icon: "🧩", instructor: "鈴木先生" }
    ],
    visual: [
        { id: 5, title: "マインドマップで覚える日本史", icon: "🗾", instructor: "高橋先生" },
        { id: 6, title: "図解でわかる生物学", icon: "🧬", instructor: "伊藤先生" }
    ],
    auditory: [
        { id: 7, title: "英語リスニングマスター", icon: "🎧", instructor: "Wilson先生" },
        { id: 8, title: "ディベートで学ぶ現代社会", icon: "💬", instructor: "渡辺先生" }
    ],
    reader: [
        { id: 9, title: "読解力アップ講座", icon: "📚", instructor: "中村先生" },
        { id: 10, title: "論文の書き方基礎", icon: "✍️", instructor: "小林先生" }
    ],
    practical: [
        { id: 11, title: "数学問題演習100", icon: "🔢", instructor: "加藤先生" },
        { id: 12, title: "即実践：プログラミング", icon: "💻", instructor: "吉田先生" }
    ],
    collaborative: [
        { id: 13, title: "グループワーク英会話", icon: "🌍", instructor: "Smith先生" },
        { id: 14, title: "チームで挑戦：科学オリンピック対策", icon: "🏅", instructor: "山口先生" }
    ],
    independent: [
        { id: 15, title: "自習力を高める学習計画術", icon: "📋", instructor: "松本先生" },
        { id: 16, title: "オンライン自学自習：数学", icon: "🔢", instructor: "井上先生" }
    ],
    goal: [
        { id: 17, title: "志望校合格プログラム", icon: "🎓", instructor: "木村先生" },
        { id: 18, title: "資格取得への最短ルート", icon: "📜", instructor: "林先生" }
    ],
    curious: [
        { id: 19, title: "科学の不思議を探る", icon: "🔭", instructor: "清水先生" },
        { id: 20, title: "世界の謎を解き明かす地理学", icon: "🌏", instructor: "斉藤先生" }
    ],
    repetitive: [
        { id: 21, title: "暗記マスター：英単語1000", icon: "📝", instructor: "森先生" },
        { id: 22, title: "基礎からの数学復習講座", icon: "📐", instructor: "原田先生" }
    ],
    intuitive: [
        { id: 23, title: "発想力トレーニング", icon: "🎨", instructor: "岡田先生" },
        { id: 24, title: "クリエイティブライティング", icon: "✨", instructor: "藤井先生" }
    ]
};
