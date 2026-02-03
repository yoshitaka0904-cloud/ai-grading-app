export const universities = [
  {
    id: 3,
    name: "早稲田大学",
    type: "私立",
    faculties: [
      {
        id: "law",
        name: "法学部",
        exams: [
          {
            id: "waseda-law-jpn-2025",
            year: 2025,
            subject: "日本史",
            subjectEn: "japanesehistory",
            type: "pdf",
            pdfPath: "/exam_data/12_2025_ippan_nihonshi.pdf",
            structure: [
              {
                "id": "I",
                "label": "[I]",
                "instruction": "次の文を読み、後の問に答えなさい。",
                "questions": [
                  {
                    "id": "I-1",
                    "label": "1",
                    "type": "text",
                    "correctAnswer": "高地性",
                    "points": 4,
                    "explanation": "弥生時代の中後期、争いの増加にともない防御性が重視され、丘陵や山上につくられた集落は高地性集落と呼ばれる。"
                  },
                  {
                    "id": "I-2",
                    "label": "2",
                    "type": "text",
                    "correctAnswer": "大神神社",
                    "points": 4,
                    "explanation": "三輪山を神体とし、本殿を持たず拝殿から神体を拝む形式の神社は奈良県の大神神社である。"
                  },
                  {
                    "id": "I-3",
                    "label": "3 (B)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "あ",
                    "points": 3,
                    "explanation": "平安時代初期の山岳寺院建築として知られるのは室生寺金堂である。他の選択肢は平安時代中期以降または末期の建築物である。"
                  },
                  {
                    "id": "I-4",
                    "label": "4 (C)",
                    "type": "text",
                    "correctAnswer": "修験道",
                    "points": 4,
                    "explanation": "山岳での修行により呪力を体得しようとする宗教は修験道である。大峰山や白山はその代表的な霊場とされる。"
                  },
                  {
                    "id": "I-5",
                    "label": "5 (下線b)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "う, お",
                    "points": 6,
                    "explanation": "下線bは武家法（中世法）に関する文脈である。あ・いは御成敗式目と建武式目に関する記述だが、廃止したは誤り。う・おは正しい。えは織田信長ではなく豊臣秀吉の楽市令が有名。"
                  },
                  {
                    "id": "I-6",
                    "label": "6 (下線c)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "う, え",
                    "points": 6,
                    "explanation": "下線cは荘園に関する文脈。あは初期荘園の増加を促したため誤り。いは延喜の荘園整理令は醍醐天皇ではなく宇多天皇の時代。うは正しい。えは八条院領はのちに大覚寺統に引き継がれたため正しい。おは関東御領ではなく関東知行国（関東御分国）の国衙領。"
                  },
                  {
                    "id": "I-7",
                    "label": "7 (下線d)",
                    "type": "text",
                    "correctAnswer": "揚浜",
                    "points": 4,
                    "explanation": "海面より高い位置に塩田を設け、海水を汲み上げて塩をつくる製塩方法は揚浜（揚浜式塩田）である。"
                  },
                  {
                    "id": "I-8",
                    "label": "8 (下線e)",
                    "type": "text",
                    "correctAnswer": "刈敷",
                    "points": 4,
                    "explanation": "草や木の葉などを刈り取って地中に埋めて肥料とすることを刈敷という。"
                  },
                  {
                    "id": "I-9",
                    "label": "9 (D)",
                    "type": "text",
                    "correctAnswer": "大徳寺",
                    "points": 4,
                    "explanation": "16世紀初頭につくられた枯山水庭園の代表作、大仙院の庭園がある寺院は京都の大徳寺である。"
                  },
                  {
                    "id": "I-10",
                    "label": "10 (下線)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "お",
                    "points": 3,
                    "explanation": "下線は足利義満の東国視察の文脈。あ・い・うは正しい。えは足利成氏は、幕府（足利義政）と対立していた関東管領上杉憲忠を倒したため誤り。おは足利義政が政知を堀越に派遣したのは古河公方足利成氏を討つためではない（対立のため）。正しくは、古河公方に対抗するために派遣した。"
                  }
                ]
              },
              {
                "id": "II",
                "label": "[II]",
                "instruction": "次の文を読み、後の問に答えなさい。",
                "questions": [
                  {
                    "id": "II-1",
                    "label": "1 (下線a)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "い",
                    "points": 3,
                    "explanation": "下線a（文禄・慶長の役後、活字本刊行の時期）の出来事の年代順。③サン=フェリペ号事件(1596) → ①糸割符制度(1604) → ④回答兼刷還使(1607) → ⑤慶長遣欧使節(1613) → ②オランダとの貿易許可(1609または1617)。"
                  },
                  {
                    "id": "II-2",
                    "label": "2 (A)",
                    "type": "text",
                    "correctAnswer": "後陽成",
                    "points": 4,
                    "explanation": "慶長年間に勅命で数種の書物が出版された慶長勅版を発行させたのは後陽成天皇である。"
                  },
                  {
                    "id": "II-3",
                    "label": "3 (B)",
                    "type": "text",
                    "correctAnswer": "平家物語",
                    "points": 4,
                    "explanation": "南蛮貿易がさかんに行われる中で刊行されたキリシタン版の軍記物語は『平家物語』である（『天草版平家物語』）。"
                  },
                  {
                    "id": "II-4",
                    "label": "4 (下線b)",
                    "type": "text",
                    "correctAnswer": "懐徳堂",
                    "points": 4,
                    "explanation": "18世紀前半に大坂町人の出資で設立され、富永仲基らを生んだ学塾は懐徳堂である。"
                  },
                  {
                    "id": "II-5",
                    "label": "5 (下線c)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "う",
                    "points": 3,
                    "explanation": "下線cは浄瑠璃や歌舞伎の脚本に関する文脈。うは歌舞伎の語りは義太夫節ではなく、義太夫節は人形浄瑠璃の語りであるため誤り。"
                  },
                  {
                    "id": "II-6",
                    "label": "6 (下線d)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "え",
                    "points": 3,
                    "explanation": "下線dは18世紀半ば以降の江戸の出版業が隆盛した時代の文化。あは野々村仁清は元禄以前。いは渋川春海。うは松尾芭蕉は元禄時代。えは山脇東洋は18世紀半ば（宝暦年間）に『蔵志』を著したため正しい。おは貝原益軒は元禄時代。"
                  },
                  {
                    "id": "II-7",
                    "label": "7 (下線e)",
                    "type": "text",
                    "correctAnswer": "菱川師宣",
                    "points": 4,
                    "explanation": "肉筆画「見返り美人図」の画家は菱川師宣である。"
                  },
                  {
                    "id": "II-8",
                    "label": "8 (C)",
                    "type": "text",
                    "correctAnswer": "読本",
                    "points": 4,
                    "explanation": "文章主体の歴史や伝説を題材にした小説の系統で、曲亭馬琴の作品などが評判を得たのは読本である。"
                  },
                  {
                    "id": "II-9",
                    "label": "9 (下線f)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "い, お",
                    "points": 6,
                    "explanation": "下線fは寛政の改革。あ・い・う・えは正しい。おは株仲間の解散を命じたのは天保の改革（水野忠邦）であるため誤り。"
                  },
                  {
                    "id": "II-10",
                    "label": "10 (D・E)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "え",
                    "points": 3,
                    "explanation": "寛政の改革で弾圧されたのは、海岸防備を説いた『海国兵談』の著者である林子平である。"
                  }
                ]
              },
              {
                "id": "III",
                "label": "[III]",
                "instruction": "次の資料は、ある1人の人物の日記からの抜粋である(一部表記を改めている)。これらを読み、後の問に答えなさい。",
                "questions": [
                  {
                    "id": "III-1",
                    "label": "1 (A)",
                    "type": "text",
                    "correctAnswer": "加藤友三郎",
                    "points": 4,
                    "explanation": "1922年3月16日の記述は、摂政（裕仁親王）が海軍大臣でもあった加藤友三郎からワシントン会議の報告を受けた様子を示す。"
                  },
                  {
                    "id": "III-2",
                    "label": "2 (A)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "え",
                    "points": 3,
                    "explanation": "加藤友三郎が主席全権として参加したのはワシントン会議（1921-22）。あ：ジュネーブ会議（1927）。い：ヴェルサイユ会議（1919）。う：ロンドン海軍軍縮条約の論争。え：ワシントン海軍軍縮条約により戦艦「土佐」などの建設が中止された。"
                  },
                  {
                    "id": "III-3",
                    "label": "3 (下線a)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "え",
                    "points": 3,
                    "explanation": "下線aは1923年9月13日、関東大震災直後の出来事。えは虎ノ門事件であり、震災の直後（12月）に発生した。"
                  },
                  {
                    "id": "III-4",
                    "label": "4 (B)",
                    "type": "text",
                    "correctAnswer": "清浦奎吾",
                    "points": 4,
                    "explanation": "1924年6月の記述は、第2次護憲運動による清浦奎吾内閣の総辞職と、後継の加藤高明内閣の組閣交渉の状況を示している。"
                  },
                  {
                    "id": "III-5",
                    "label": "5 (下線b)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "う",
                    "points": 3,
                    "explanation": "下線bは第2次護憲運動。う：革新倶楽部は立憲国民党の後身だが、憲政会に吸収されたのは1925年ではなく1927年であるため誤り。"
                  },
                  {
                    "id": "III-6",
                    "label": "6 (下線c)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "お",
                    "points": 3,
                    "explanation": "下線cの人物は岡田啓介海軍大臣。お：岡田啓介内閣は軍部大臣現役武官制を復活させていない（復活させたのは広田弘毅内閣）。"
                  },
                  {
                    "id": "III-7",
                    "label": "7 (C)",
                    "type": "text",
                    "correctAnswer": "済南",
                    "points": 4,
                    "explanation": "第2次山東出兵の際に日本軍が国民革命軍と交戦した地名は済南である（済南事件）。"
                  },
                  {
                    "id": "III-8",
                    "label": "8 (下線d)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "あ",
                    "points": 3,
                    "explanation": "下線dは田中義一首相（1929年6月27日の記述）。あ：田中義一は桂太郎、寺内正毅の後継者とは評価されない（山県有朋の後継者とは見なされる）。"
                  },
                  {
                    "id": "III-9",
                    "label": "9 (下線e)",
                    "type": "text",
                    "correctAnswer": "河本大作",
                    "points": 4,
                    "explanation": "張作霖爆殺事件の首謀者として停職処分を受けた陸軍大佐は河本大作である。"
                  },
                  {
                    "id": "III-10",
                    "label": "10",
                    "type": "text",
                    "correctAnswer": "牧野伸顕",
                    "points": 4,
                    "explanation": "第1次西園寺内閣の文部大臣として文展を開催したのは牧野伸顕である。"
                  }
                ]
              },
              {
                "id": "IV",
                "label": "[IV]",
                "instruction": "次の文を読み、後の問に答えなさい。",
                "questions": [
                  {
                    "id": "IV-1",
                    "label": "1 (下線a)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "い",
                    "points": 3,
                    "explanation": "下線aは占領期。ラジオ放送の再開は占領期だが、テレビ放送の開始はサンフランシスコ平和条約発効（1952年）後の1953年であるため、誤り。"
                  },
                  {
                    "id": "IV-2",
                    "label": "2 (A)",
                    "type": "text",
                    "correctAnswer": "幣原喜重郎",
                    "points": 4,
                    "explanation": "東久邇宮稔彦内閣の後に首相に就任し、五大改革指令を実行したのは幣原喜重郎である。"
                  },
                  {
                    "id": "IV-3",
                    "label": "3 (下線b)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "う",
                    "points": 3,
                    "explanation": "五大改革指令は、婦人参政権の付与、労働組合結成の奨励、教育制度の改革、秘密警察の廃止、経済機構の民主化（財閥解体など）である。国家神道の解体は五大改革指令に含まれない。"
                  },
                  {
                    "id": "IV-4",
                    "label": "4 (下線c)",
                    "type": "text",
                    "correctAnswer": "過度経済力集中排除法",
                    "points": 4,
                    "explanation": "財閥解体の一環として、巨大独占企業を分割するために制定された法令は過度経済力集中排除法である。"
                  },
                  {
                    "id": "IV-5",
                    "label": "5 (下線d)",
                    "type": "text",
                    "correctAnswer": "北大西洋条約機構",
                    "points": 4,
                    "explanation": "アメリカと西欧諸国で結成された共同防衛組織はNATO（北大西洋条約機構）である。"
                  },
                  {
                    "id": "IV-6",
                    "label": "6 (下線e)",
                    "type": "text",
                    "correctAnswer": "経済安定九原則",
                    "points": 4,
                    "explanation": "インフレを抑えて日本経済を自立させるために総司令部が指示した引締め政策は経済安定九原則である。"
                  },
                  {
                    "id": "IV-7",
                    "label": "7 (B)",
                    "type": "text",
                    "correctAnswer": "警察予備隊",
                    "points": 4,
                    "explanation": "朝鮮戦争勃発後の軍事的空白を埋めるため、総司令部の指令で新設された組織は警察予備隊である。"
                  },
                  {
                    "id": "IV-8",
                    "label": "8 (下線f)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "え",
                    "points": 3,
                    "explanation": "下線fはサンフランシスコ平和条約。あ・い・う・おは誤り。えは正しい（フィリピン、インドネシア、ビルマとは締結）。"
                  },
                  {
                    "id": "IV-9",
                    "label": "9 (C)",
                    "type": "text",
                    "correctAnswer": "極東国際軍事",
                    "points": 4,
                    "explanation": "極東における重大な戦争犯罪人の審理と処罰のために設置された裁判所は極東国際軍事裁判所である。"
                  },
                  {
                    "id": "IV-10",
                    "label": "10 (下線g)",
                    "type": "selection",
                    "options": ["あ", "い", "う", "え", "お"],
                    "correctAnswer": "え",
                    "points": 3,
                    "explanation": "下線gは国交の回復や正常化。え：日本と朝鮮民主主義人民共和国（北朝鮮）との間では、2025年時点でも国交正常化交渉は正式には行われていない。"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "pse",
        name: "政治経済学部",
        exams: [
          { id: "waseda-pse-eng-2024", year: 2024, subject: "英語" }
        ]
      },
      {
        id: "sci-eng",
        name: "理工学部",
        exams: [
          { id: "waseda-sci-math-2024", year: 2024, subject: "数学" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "慶應義塾大学",
    type: "私立",
    faculties: [
      {
        id: "law",
        name: "法学部",
        exams: [
          {
            "id": "keio-law-hist-2025",
            "year": 2025,
            "subject": "日本史",
            "subjectEn": "japanese_history",
            "type": "pdf",
            "pdfPath": "/exam_data/_nfs_root_prod_httpd_www.toshin-kakomon.com_ex_data_2025_9q_j02_j9q252001m0.pdf",
            "timeLimitMinutes": 90,
            "structure": [
              {
                "id": "I",
                "label": "問題I",
                "instruction": "次の本文を読み、空欄 (1)(2) から (31)(32) に入る最も適切な語句を語群より選び、その番号をマークシート解答用紙の所定の欄にマークしなさい。また、下線部(ア) から (エ)に関連する設問1から4について、それぞれの指示に従って番号を選び、マークシート解答用紙の (33)(34) から (39)(40) にマークしなさい。",
                "questions": [
                  {
                    "id": "I-1-2",
                    "label": "(1)(2)",
                    "type": "text",
                    "correctAnswer": "06",
                    "points": 2,
                    "explanation": "将軍足利義政の時、コシャマインが蜂起した。 (語群06: 足利義政)"
                  },
                  {
                    "id": "I-3-4",
                    "label": "(3)(4)",
                    "type": "text",
                    "correctAnswer": "52",
                    "points": 2,
                    "explanation": "ロシア船ディアナ号の艦長ゴローニンが国後島に上陸し捕らえられた。 (語群52: ディアナ)"
                  },
                  {
                    "id": "I-5-6",
                    "label": "(5)(6)",
                    "type": "text",
                    "correctAnswer": "19",
                    "points": 2,
                    "explanation": "樺太・千島交換条約を締結した日本側特命全権公使は榎本武揚である。 (語群19: 榎本武揚)"
                  },
                  {
                    "id": "I-7-8",
                    "label": "(7)(8)",
                    "type": "text",
                    "correctAnswer": "41",
                    "points": 2,
                    "explanation": "樺太・千島交換条約によって千島列島は占守島を北端として日本領になった。 (語群41: 占守)"
                  },
                  {
                    "id": "I-9-10",
                    "label": "(9)(10)",
                    "type": "text",
                    "correctAnswer": "59",
                    "points": 2,
                    "explanation": "1920年に日本兵と日本人住民が殺害された事件はニコラエフスク事件。 (語群59: ニコラエフスク)"
                  },
                  {
                    "id": "I-11-12",
                    "label": "(11)(12)",
                    "type": "text",
                    "correctAnswer": "36",
                    "points": 2,
                    "explanation": "日清戦争後の沖縄領有に関する対立を調停するため、前アメリカ大統領グラントが先島諸島を清の領有とする案を出したが不成立に終わった。 (語群36: 先島諸島)"
                  },
                  {
                    "id": "I-13-14",
                    "label": "(13)(14)",
                    "type": "text",
                    "correctAnswer": "32",
                    "points": 2,
                    "explanation": "台湾総督府第4代総督の児玉源太郎のとき土地調査事業に着手した。 (語群32: 児玉源太郎)"
                  },
                  {
                    "id": "I-15-16",
                    "label": "(15)(16)",
                    "type": "text",
                    "correctAnswer": "73",
                    "points": 2,
                    "explanation": "『帝国主義下の台湾』を著し、植民政策を実証的に分析したキリスト教徒は矢内原忠雄である。 (語群73: 矢内原忠雄)"
                  },
                  {
                    "id": "I-17-18",
                    "label": "(17)(18)",
                    "type": "text",
                    "correctAnswer": "01",
                    "points": 2,
                    "explanation": "沖縄返還の時期について数年内に合意すべきであるとの意見交換をしたのは日本の首相とアメリカ大統領L. ジョンソンである。 (語群01: L. ジョンソン)"
                  },
                  {
                    "id": "I-19-20",
                    "label": "(19)(20)",
                    "type": "text",
                    "correctAnswer": "14",
                    "points": 2,
                    "explanation": "日露戦争は日本が仁川沖のロシア艦隊と旅順のロシア艦隊を奇襲攻撃して始まった。 (語群14: 仁川)"
                  },
                  {
                    "id": "I-21-22",
                    "label": "(21)(22)",
                    "type": "text",
                    "correctAnswer": "76",
                    "points": 2,
                    "explanation": "日露戦争は日本が仁川沖のロシア艦隊と旅順のロシア艦隊を奇襲攻撃して始まった。 (語群76: 旅順)"
                  },
                  {
                    "id": "I-23-24",
                    "label": "(23)(24)",
                    "type": "text",
                    "correctAnswer": "75",
                    "points": 2,
                    "explanation": "日露戦争開戦前の非戦論者は内村鑑三であり、彼は『万朝報』に寄稿した。 (語群75: 万朝報)"
                  },
                  {
                    "id": "I-25-26",
                    "label": "(25)(26)",
                    "type": "text",
                    "correctAnswer": "60",
                    "points": 2,
                    "explanation": "東遊運動は日仏協約の締結の影響もあり、留学生の国外退去という結末を迎えた。 (語群60: 日仏協約)"
                  },
                  {
                    "id": "I-27-28",
                    "label": "(27)(28)",
                    "type": "text",
                    "correctAnswer": "40",
                    "points": 2,
                    "explanation": "三・一独立運動の後、大韓民国臨時政府が結成された都市は上海である。 (語群40: 上海)"
                  },
                  {
                    "id": "I-29-30",
                    "label": "(29)(30)",
                    "type": "text",
                    "correctAnswer": "23",
                    "points": 2,
                    "explanation": "第二次世界大戦中に朝鮮の独立が言及された会談はカイロ会談である。 (語群23: カイロ)"
                  },
                  {
                    "id": "I-31-32",
                    "label": "(31)(32)",
                    "type": "text",
                    "correctAnswer": "10",
                    "points": 2,
                    "explanation": "竹島問題を顕在化させた大韓民国の当時の大統領は李承晩である。 (語群10: 李承晩)"
                  },
                  {
                    "id": "I-Q1",
                    "label": "設問1 (33)(34)",
                    "type": "text",
                    "correctAnswer": "49",
                    "points": 2,
                    "explanation": "『アイヌ神謡集』をまとめた人物は知里幸恵である。 (語群49: 知里幸恵)"
                  },
                  {
                    "id": "I-Q2",
                    "label": "設問2 (35)(36)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05", "06", "07", "08"],
                    "correctAnswer": "05",
                    "points": 2,
                    "explanation": "日清戦争における出来事の時系列は、(b)豊島沖海戦 → (a)黄海海戦 → (c)大連占領 → (d)威海衛占領の順である。 (選択肢05)"
                  },
                  {
                    "id": "I-Q3",
                    "label": "設問3 (37)(38)",
                    "type": "text",
                    "correctAnswer": "35",
                    "points": 2,
                    "explanation": "「条約に依り兵を出して変に備へしめ...」という「日清戦争の宣戦詔書」の文言は、朝鮮の開港をめぐる紛争時に締結された済物浦条約を指している。 (語群35: 済物浦条約)"
                  },
                  {
                    "id": "I-Q4",
                    "label": "設問4 (39)(40)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04"],
                    "correctAnswer": "02",
                    "points": 2,
                    "explanation": "竹島が閣議決定によって島根県に編入されたのは日露戦争の最中であり、時系列で「日韓議定書 → [01] → 第1次日韓協約 → [02] → 日本海海戦 → [03] → 第2次日韓協約 → [04] 第3次日韓協約」の間の [02] の時期である。 (選択肢02)"
                  }
                ]
              },
              {
                "id": "II",
                "label": "問題II",
                "instruction": "近現代の日本の政党政治に関する以下の史料AからDを読み、設問1から20について、それぞれの指示に従って番号を選び、マークシート解答用紙の所定の欄にマークしなさい。",
                "questions": [
                  {
                    "id": "II-Q1",
                    "label": "設問1 (41)(42)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "05",
                    "points": 2,
                    "explanation": "史料Aは、大日本帝国憲法発布時の首相黒田清隆の演説文である。黒田は条約改正交渉にあたっていた大隈重信外相が反対派の襲撃により負傷し、首相の職を辞した。 (選択肢05)"
                  },
                  {
                    "id": "II-Q2",
                    "label": "設問2 (43)(44)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "空欄(k)は天皇を指す。天皇は帝国議会を召集するとともに、両議院の解散を命じることができるとされた。 (選択肢04)"
                  },
                  {
                    "id": "II-Q3",
                    "label": "設問3 (45)(46)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "01",
                    "points": 2,
                    "explanation": "国会開設の勅諭(1881年)以降、大日本帝国憲法発布(1889年)までに政府が取り組んだこととして、大審院の設置は1875年（明治8年）と時期が合わない。 (選択肢01)"
                  },
                  {
                    "id": "II-Q4",
                    "label": "設問4 (47)(48)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "大日本帝国憲法は欽定憲法だが、その改正には帝国議会の議決が必要とされた。 (選択肢04)"
                  },
                  {
                    "id": "II-Q5",
                    "label": "設問5 (49)(50)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "02",
                    "points": 2,
                    "explanation": "大日本帝国憲法で臣民の権利として定められていないのは生存権である。 (選択肢02)"
                  },
                  {
                    "id": "II-Q6",
                    "label": "設問6 (51)(52)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "03",
                    "points": 2,
                    "explanation": "史料Bは首相経験者（桂太郎）によって発表された新政党（立憲同志会）の設立趣旨である。桂太郎は日清戦争後に板垣退助を内相に迎え、自由党と連携した。 (選択肢03)"
                  },
                  {
                    "id": "II-Q7",
                    "label": "設問7 (53)(54)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "大日本帝国憲法発布から立憲同志会設立までの間に結成された政党として、立憲国民党(1910)は適切だが、立憲自由党(1890)は自由党と改称されたため時期が合わない。 (選択肢04)"
                  },
                  {
                    "id": "II-Q8",
                    "label": "設問8 (55)(56)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "05",
                    "points": 2,
                    "explanation": "空欄(X)は憲法上の大権に属する任免の対象となる「国務大臣」の役職を指す。 (選択肢05)"
                  },
                  {
                    "id": "II-Q9",
                    "label": "設問9 (57)(58)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "01",
                    "points": 2,
                    "explanation": "立憲同志会が設立された当時、文官任用令が改正され、高級官吏の任用資格規定は削除されたのではなく緩和された。 (選択肢01)"
                  },
                  {
                    "id": "II-Q10",
                    "label": "設問10 (59)(60)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "立憲同志会はロンドン海軍軍備制限条約の締結の際、当時の内閣が統帥権を干犯したと批判した。 (選択肢04)"
                  },
                  {
                    "id": "II-Q11",
                    "label": "設問11 (61)(62)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "史料Cは鳩山一郎による演説文であり、鳩山内閣の期間中に日華平和条約が締結された。 (選択肢04)"
                  },
                  {
                    "id": "II-Q12",
                    "label": "設問12 (63)(64)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "空欄(Y)は保守合同によって結成された自由民主党と対立した日本民主党を指す。 (選択肢04)"
                  },
                  {
                    "id": "II-Q13",
                    "label": "設問13 (65)(66)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "当該期間(終戦から10年、1945年〜1955年)の総選挙の結果、1953年4月の総選挙の結果、鳩山一郎が吉田茂に代わって首相に就任した。 (選択肢04)"
                  },
                  {
                    "id": "II-Q14",
                    "label": "設問14 (67)(68)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "04",
                    "points": 2,
                    "explanation": "GHQによる占領政策を古い順に並べたとき、3番目にくるのは二・一ゼネストの中止命令である。 (選択肢04)"
                  },
                  {
                    "id": "II-Q15",
                    "label": "設問15 (69)(70)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "05",
                    "points": 2,
                    "explanation": "保守合同によって結成された政党は自由民主党である。自由民主党は1994年には村山富市内閣の与党として政権に復帰したが、それ以降は他党と連立政権を構成し、2000年代からは公明党も連立に加わった。 (選択肢05)"
                  },
                  {
                    "id": "II-Q16",
                    "label": "設問16 (71)(72)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "05",
                    "points": 2,
                    "explanation": "史料Dはリクルート事件発覚後の政治改革に関する有識者会議の提言であり、当時の首相は竹下登である。 (選択肢05)"
                  },
                  {
                    "id": "II-Q17",
                    "label": "設問17 (73)(74)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "03",
                    "points": 2,
                    "explanation": "リクルート事件発覚以降の出来事を古い順に並べたとき、3番目にくるのは宇野宗佑内閣のもとで実施された参議院議員選挙において自由民主党が大敗し、同内閣は総辞職したである。 (選択肢03)"
                  },
                  {
                    "id": "II-Q18",
                    "label": "設問18 (75)(76)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "02",
                    "points": 2,
                    "explanation": "日本国憲法のもとでも二院制は維持されたが、マッカーサー草案 (GHQ草案)では当初、一院制とされていた。 (選択肢02)"
                  },
                  {
                    "id": "II-Q19",
                    "label": "設問19 (77)(78)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "05",
                    "points": 2,
                    "explanation": "自衛隊がPKOで派遣された国・地域として適切でないのはペルシア湾である。 (選択肢05)"
                  },
                  {
                    "id": "II-Q20",
                    "label": "設問20 (79)(80)",
                    "type": "selection",
                    "options": ["01", "02", "03", "04", "05"],
                    "correctAnswer": "03",
                    "points": 2,
                    "explanation": "史料Dが提出された後の政治改革に向けた動きに関する説明として、日本社会党は細川護熙内閣の与党であったが、その後を受けた羽田孜内閣では野党に転じたは適切である。 (選択肢03)"
                  }
                ]
              },
              {
                "id": "III",
                "label": "問題III",
                "instruction": "史料AからEを読み、(X) が開いた宗教の名称とその特徴を簡潔に述べた上で、この宗教と朝廷の関係について、200字以内で説明しなさい。",
                "questions": [
                  {
                    "id": "III-Q1",
                    "label": "記述 (200字以内)",
                    "type": "text",
                    "correctAnswer": "「三教指帰」で儒教・道教に対する仏教の優位性を論じ、「性霊集」から恒武天皇の恩寵を受けたことが知られる。入唐求法し、大日如来を中心とする密教の根本道場として東寺を嵯峨天皇に賜った。風信帖から空海と最澄の交流が知られ、密教をもって鎮護国家を祈願し朝廷を守護し、加持祈祷により現世利益もたらしたため、貴族・朝廷の保護を受けた。",
                    "points": 20,
                    "explanation": "空海（X）が開いた真言宗の特徴（大日如来中心、密教）と、東寺下賜などに象徴される朝廷との関係を説明する記述問題である。"
                  }
                ]
              },
              {
                "id": "IV",
                "label": "問題IV",
                "instruction": "享保期において、米および諸色 (米以外の諸商品)の物価はどのような状況が続いていたか、また、その状況により旗本・御家人が経済的に困窮するのはなぜか。そして、幕府は元文金銀の発行によって、旗本・御家人の経済状況を改善するために、どのようなしくみで物価調整することをねらったか。次の (1)・(2) の文章と史料を読んだ上で、280字以内で説明しなさい。",
                "questions": [
                  {
                    "id": "IV-Q1",
                    "label": "記述 (280字以内)",
                    "type": "text",
                    "correctAnswer": "豊作による米価の下落、諸商品の高騰といった状況が続き、都市で生活する旗本・御家人は、俸禄米を換金して商品を購入していたため、収入の減少、支出の増加に直面した。商品の高騰の背景には、東日本で主に金貨が、西日本で主に銀貨が用いられるなかでの、銀貨の価値に対する金貨の下落があったこともあったため、元文金銀への改鋳時には、金貨よりも銀貨の品位を大きく引き下げて金銀安で真貨幣に誘導し、大坂からの諸商品を高値で移入しようとした。良質の正徳・享保金銀、悪貨の元禄金銀の中間の質となる元文金銀への改鋳時には、貨幣量を増やす措置もとり、貨幣価値の下落による米価の上昇もねらった。",
                    "points": 25,
                    "explanation": "享保期の物価状況（米安諸色高）が旗本・御家人を困窮させた理由と、元文金銀の改鋳による幕府の物価調整の仕組み（貨幣価値を下落させ米価上昇を促す仕組み）を説明する記述問題である。"
                  }
                ]
              }
            ]
          },
          {
            "id": "keio-law-eng-2025",
            "year": 2025,
            "subject": "英語",
            "subjectEn": "english",
            "type": "pdf",
            "pdfPath": "/exam_data/_nfs_root_prod_httpd_www.toshin-kakomon.com_ex_data_2025_9q_e02_e9q252001m0.pdf",
            "timeLimitMinutes": 80,
            "structure": [
              {
                "id": "I",
                "label": "I.",
                "instruction": "[A] Questions (1)-(5) below each contain a set of five words. The five words in each set are missing the same pair of letters. Choose the correct pair from the list (1-8) in the box below them to insert into the underlined space, and mark the appropriate number on your answer sheet. [B] In each of the following sentences (6)-(10), a word has been removed and replaced with an underlined space. Choose the most appropriate word from the list (1-4) below each sentence to insert into the underlined space to complete that sentence.",
                "questions": [
                  {
                    "id": "I-A-1",
                    "label": "(1)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "correctAnswer": "8",
                    "points": 1,
                    "explanation": "共通して入る綴りは 'ue' (8)。clue, duet, fuel, cruel, flute, fluent."
                  },
                  {
                    "id": "I-A-2",
                    "label": "(2)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "correctAnswer": "4",
                    "points": 1,
                    "explanation": "共通して入る綴りは 'ia' (4)。dial, diary, trial, liar, giant."
                  },
                  {
                    "id": "I-A-3",
                    "label": "(3)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "correctAnswer": "3",
                    "points": 1,
                    "explanation": "共通して入る綴りは 'ei' (3)。deity, trellis, feign, height, drone."
                  },
                  {
                    "id": "I-A-4",
                    "label": "(4)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "correctAnswer": "1",
                    "points": 1,
                    "explanation": "共通して入る綴りは 'ai' (1)。rain, hair, veil, vain, seize."
                  },
                  {
                    "id": "I-A-5",
                    "label": "(5)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "correctAnswer": "5",
                    "points": 1,
                    "explanation": "共通して入る綴りは 'ie' (5)。hiel (hie), friend, lynch, science, flight."
                  },
                  {
                    "id": "I-B-6",
                    "label": "(6)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "4",
                    "points": 1,
                    "explanation": "level 'with' (〜に対して率直に話す)。"
                  },
                  {
                    "id": "I-B-7",
                    "label": "(7)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "4",
                    "points": 1,
                    "explanation": "fall 'through' (失敗に終わる)。"
                  },
                  {
                    "id": "I-B-8",
                    "label": "(8)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "4",
                    "points": 1,
                    "explanation": "cook 'up' (でっちあげる、捏造する)。"
                  },
                  {
                    "id": "I-B-9",
                    "label": "(9)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 1,
                    "explanation": "wind 'down' (くつろぐ、落ち着く)。"
                  },
                  {
                    "id": "I-B-10",
                    "label": "(10)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 1,
                    "explanation": "bank 'on' (〜を当てにする、頼る)。"
                  }
                ]
              },
              {
                "id": "II",
                "label": "II.",
                "instruction": "Read the text below and answer the questions that follow. (下線部の語と定義を照合せよ。)",
                "questions": [
                  {
                    "id": "II-11",
                    "label": "(11) charlatanry",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "7",
                    "points": 2,
                    "explanation": "charlatanry (いかさま) は定義7 (the act of pretending... to possess skills or knowledge that one does not have) に一致する。"
                  },
                  {
                    "id": "II-12",
                    "label": "(12) wont",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "9",
                    "points": 2,
                    "explanation": "wont (〜する習慣がある) は定義9 (accustomed; to have the habit of doing something; to do something often) に一致する。"
                  },
                  {
                    "id": "II-13",
                    "label": "(13) redolent",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "redolent (を思わせる) は定義5 (evocative or suggestive; having the qualities that make one think of something else) に一致する。"
                  },
                  {
                    "id": "II-14",
                    "label": "(14) prestidigitation",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "prestidigitation (手品) は定義2 (tricks performed in a very skillful way using the hands) に一致する。"
                  },
                  {
                    "id": "II-15",
                    "label": "(15) festooned",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "0",
                    "points": 2,
                    "explanation": "festooned (飾り付けられた) は定義0 (to adorn or decorate a room or other place) に一致する。"
                  },
                  {
                    "id": "II-16",
                    "label": "(16) paraphernalia",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "8",
                    "points": 2,
                    "explanation": "paraphernalia (道具一式) は定義8 (objects or articles of equipment designed or needed for, or connected with, a particular activity) に一致する。"
                  },
                  {
                    "id": "II-17",
                    "label": "(17) arcane",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "1",
                    "points": 2,
                    "explanation": "arcane (難解な、秘密の) は定義1 (obscure, mysterious; known by, or knowable to, only a few people) に一致する。"
                  },
                  {
                    "id": "II-18",
                    "label": "(18) emblazoned",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "4",
                    "points": 2,
                    "explanation": "emblazoned (装飾された、紋章が描かれた) は定義4 (to inscribe something on a surface; to print something in a very noticeable way) に一致する。"
                  },
                  {
                    "id": "II-19",
                    "label": "(19) flamboyant",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "6",
                    "points": 2,
                    "explanation": "flamboyant (華々しい) は定義6 (marked by or given to strikingly elaborate display or behavior; enjoying attracting others' attention) に一致する。"
                  },
                  {
                    "id": "II-20",
                    "label": "(20) transmogrify",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "transmogrify (一変させる) は定義3 (to alter, change or be changed greatly) に一致する。"
                  }
                ]
              },
              {
                "id": "III",
                "label": "III.",
                "instruction": "In the dialogue that follows, words have been removed and replaced by spaces numbered (21)-(30). From the boxed lists [A] and [B] on the next page, choose the most appropriate word or phrase to fill in each of the underlined bracketed numbers and the boxed bracketed numbers, respectively. All choices must be used; the choices should be made to produce the most natural conversation overall.",
                "questions": [
                  {
                    "id": "III-21",
                    "label": "(21)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "4",
                    "points": 2,
                    "explanation": "JackyがTomについて話したことに対し、Tomが皮肉交じりに「悪い話じゃないといいね (Nothing bad), I hope?」と尋ねている。"
                  },
                  {
                    "id": "III-22",
                    "label": "(22)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "Tomとの出会いについて「とても嬉しい」と言われた後、Susanが「私も同じく (Likewise)」と返す。"
                  },
                  {
                    "id": "III-23",
                    "label": "(23)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "Susanに自己紹介を求められたTomが、「例えば何を知りたい (Such as)?」と尋ねる。"
                  },
                  {
                    "id": "III-24",
                    "label": "(24)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "「あなたはあまり外出しないのね?」というSusanの推測に対し、Tomが「そんなことはない (I wouldn't say that)」と否定し、映画館やライブに行くことを説明する。"
                  },
                  {
                    "id": "III-25",
                    "label": "(25)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "1",
                    "points": 2,
                    "explanation": "Taylor Swiftの話題の後、「Taylor Swiftが好きだということとは別に (Aside from liking Taylor Swift)、他に興味のあることはある?」と話題を変える。"
                  },
                  {
                    "id": "III-26",
                    "label": "(26)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "Tomの「悪い話じゃないといいね」という皮肉に対し、「ばかげてる (Don't be silly)、もちろん違うわ (of course not)」と返す。"
                  },
                  {
                    "id": "III-27",
                    "label": "(27)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "1",
                    "points": 2,
                    "explanation": "「自分について少し教えて (tell me a bit about yourself)」と尋ねる。"
                  },
                  {
                    "id": "III-28",
                    "label": "(28)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "4",
                    "points": 2,
                    "explanation": "「何から始めればいいか分からない (why not start with) any hobbies?」と提案する。"
                  },
                  {
                    "id": "III-29",
                    "label": "(29)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "「あなたは外出するのが好きなタイプではないのね (So, you're not one for going out much then?)」と推測する。"
                  },
                  {
                    "id": "III-30",
                    "label": "(30)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "「私はハイカーと呼べるほどではない (not what you'd call a serious hiker)」と謙遜する。"
                  }
                ]
              },
              {
                "id": "IV",
                "label": "IV.",
                "instruction": "The sequence of remarks below, numbered (31)-(39), are those made by an interviewer, Hannah Kowszun, talking online to feminist moral philosopher and author, Kate Manne... Manne's responses that follow have been rearranged and numbered (1-9). Choose the number of the response that most appropriately follows each remark to produce the most natural conversation overall, and mark that number on your answer sheet. All numbers must be used.",
                "questions": [
                  {
                    "id": "IV-31",
                    "label": "(31)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "4",
                    "points": 2,
                    "explanation": "「一世代に一人の思想家」という評価に対し、謙遜しつつも「そのような個人主義的な考え方はしない」と答える (4)。"
                  },
                  {
                    "id": "IV-32",
                    "label": "(32)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "9",
                    "points": 2,
                    "explanation": "「『私は今の私になるように作られた』とはどういう意味か」という質問に対し、両親が幼い頃から知的成長を促したという前向きな回答をする (9)。"
                  },
                  {
                    "id": "IV-33",
                    "label": "(33)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "高校時代の虐待的な経験が知的以外にも影響を与えたかという問いに対し、「トラウマが自分を形作った」と認める (2)。"
                  },
                  {
                    "id": "IV-34",
                    "label": "(34)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "7",
                    "points": 2,
                    "explanation": "最新の著書で個人的な経験を語らない理由に対し、「物語の中心に自分を置くと気が散る」ため、必要不可欠な場合を除き避けていると説明する (7)。"
                  },
                  {
                    "id": "IV-35",
                    "label": "(35)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "8",
                    "points": 2,
                    "explanation": "宗教的でない場合、何が正しくて何が間違っているかという感覚をどこで得ているかという問いに対し、「基本的な身体的な必要性」が道徳的な基盤であると答える (8)。"
                  },
                  {
                    "id": "IV-36",
                    "label": "(36)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "6",
                    "points": 2,
                    "explanation": "自身を活動家と見なすかという問いに対し、「特に固執しているアイデンティティではない」としつつも、社会正義に関心があると答える (6)。"
                  },
                  {
                    "id": "IV-37",
                    "label": "(37)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "男性の権利意識に挑戦する上で男性が果たすべき役割について、彼らが特権を活かして問題を真剣に受け止め、声なき声に力を与えることができると答える (3)。"
                  },
                  {
                    "id": "IV-38",
                    "label": "(38)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "1",
                    "points": 2,
                    "explanation": "大学の哲学の役職に女性が少ない理由として、この分野の文化が女性にとって社会的に禁じられていることを実践することになり、その結果、性差別を受けることが多いと指摘する (1)。"
                  },
                  {
                    "id": "IV-39",
                    "label": "(39)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "今後の研究テーマについて、人々が直面している不正義を特定できないようにされている状況に関心があり、社会的な前提に疑問を呈するツールを追求したいと述べる (5)。"
                  }
                ]
              },
              {
                "id": "V",
                "label": "V",
                "instruction": "Read the text and answer the questions that follow.",
                "questions": [
                  {
                    "id": "V-40",
                    "label": "(40)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "段落[A]の情報に基づき、政府の提案を受け入れると「将来の提携機会、信頼性、ブランドイメージへの損害」を理由に一部のインフルエンサーが拒否したため、「政府のオファーを受け入れると信頼性を損なうと感じたインフルエンサーがいた」 (5) が最も確実に言える。"
                  },
                  {
                    "id": "V-41",
                    "label": "(41)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6"],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "文章の論理的な流れに合うように空欄を埋める。(3)憲法は売買されるべきではない (原則) → (2)これは商品やサービスではない (根拠) → (4)最も重要なのは、憲法は広告されるべきではない (結論) → (1)これは私たちの未来の販売だ (強調) → (6)売買されている者がすでにいるという事実に対する皮肉と拒否 (拒否の表明)。正しい順序は 3, 2, 4, 1, 6 である。"
                  },
                  {
                    "id": "V-42",
                    "label": "(42)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "段落[C]では、「政治家とインフルエンサーは、ブランドプロパガンダを流し、フォロワーを増やし、世論を揺るがすなど、共通の習慣や目標を持っている」と述べているため、(2) が適切。"
                  },
                  {
                    "id": "V-43",
                    "label": "(43) Prepositions",
                    "type": "selection",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    "correctAnswer": "9",
                    "points": 2,
                    "explanation": "段落[D]の空欄に前置詞を挿入する。 of, within, over, in, during, into の順序 (9) が文脈に合う。 (of) cult, (within) influence, (over) to, (in) his, (during) his, (into) influence."
                  },
                  {
                    "id": "V-44",
                    "label": "(44) Second word (Y)",
                    "type": "text",
                    "correctAnswer": "contend",
                    "points": 2,
                    "explanation": "単語Yは、'contend' (44)と'experienced' (45)を含む10語の並び替え問題で、2番目の単語は 'contend'。元の順序は force, contend, experienced, to, for, a, of, the, most, with。"
                  },
                  {
                    "id": "V-45",
                    "label": "(45) Sixth word (Y)",
                    "type": "text",
                    "correctAnswer": "a",
                    "points": 2,
                    "explanation": "単語Yの並び替え問題で、6番目の単語は 'a'。"
                  },
                  {
                    "id": "V-46",
                    "label": "(46)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "段落[F]は、インフルエンサーの階層構造を批判的に描き、フォロワーの少ない者は「虚空に投稿する」と述べているため、著者はどちらの側にも属さない批評家である可能性が高い (5)。"
                  },
                  {
                    "id": "V-47",
                    "label": "(47) Verbs",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5", "6"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "段落[G]の動詞の適切な順序は represents, backed, exist, implies, sold, represent (5)。"
                  },
                  {
                    "id": "V-48",
                    "label": "(48)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "技術史家Hicksのコメントの文脈から、「力の移行に関するものでないときに革命と呼ぶこと (a revolution when it's not about power changing hands)」 (2) には慎重になる、が適切。"
                  },
                  {
                    "id": "V-49",
                    "label": "(49)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "1",
                    "points": 2,
                    "explanation": "技術は基本的に「保守的であり、現状を維持するために機能する (conservative in nature and works to preserve the status quo)」 (1) という理論が適切。"
                  },
                  {
                    "id": "V-50",
                    "label": "(50)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "4",
                    "points": 2,
                    "explanation": "技術の広範な採用は、「進歩の表面的な外観を与えながらも (despite giving off the superficial appearance of advancement)」、社会の進歩を妨げると続くのが適切。"
                  },
                  {
                    "id": "V-51",
                    "label": "(51)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "5",
                    "points": 2,
                    "explanation": "Hicksが「革命」に疑問を呈する文脈で、「革命が起こったのなら、米国や他国のコンピューター化が誰が支配するかを変えたはずだ (the computerization of the US and other nations changed who was in control)」 (5) が適切。"
                  },
                  {
                    "id": "V-52",
                    "label": "(52)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "革命は起こらず、「すでに権力を持っていた人々の手に権力を集中させただけだ (concentrated power in the hands of the people who already had it)」 (3) が適切。"
                  },
                  {
                    "id": "V-53",
                    "label": "(53)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "1",
                    "points": 2,
                    "explanation": "全体として、インフルエンサーとプラットフォームが持つ影響力を批判的に分析し、それらが民主化をもたらすという見方（希望）に疑問を呈しているため、「ソーシャルメディアインフルエンサーとプラットフォーム：権力移行への希望はあるか？ (Social Media Influencers and Platforms: Is There Hope for a Power Shift?)」 (1) が最も適切なタイトルである。"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "commerce",
        name: "商学部",
        exams: [
          {
            "id": "keio-commerce-eng-2025",
            "year": 2025,
            "subject": "英語",
            "subjectEn": "english",
            "type": "pdf",
            "pdfPath": "/exam_data/__data_2025_9q_e06_e9q256001m0.pdf",
            "timeLimitMinutes": 80,
            "structure": [
              {
                "id": "I",
                "label": "I",
                "instruction": "次の英文を読み、(1)~(10) の設問について最も適切なものを選択肢1~4から選び、その番号を解答用紙A (マークシート)の解答欄 (1)~(10) にマークしなさい。",
                "questions": [
                  { "id": "I-1", "label": "(1)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "「道具すら必要ないほど簡単に魚を捕まえられたと私たちは思う」という文脈で、仮定を表す 'would have' (4) が適切。'It (1) been very easy' とある。" },
                  { "id": "I-2", "label": "(2)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "雨が戻り、彼らは再び狩りを始め、魚の骨は稀になった。これは哺乳類の場合と同様に ('as did mammals')、以前の生活に戻ったことを示す。" },
                  { "id": "I-3", "label": "(3)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "Dr. Petragliaは71,000年から54,000年前に砂漠が広がり、「ブルーハイウェイの回廊はほとんど存在しなかった ('nonexistent')」 (2) と主張している。" },
                  { "id": "I-4", "label": "(4)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "前の文で「多くの研究者は、このような過酷な変化が、人々が古い慣習を使い続けることができる避難場所へと追いやったと想定している」とあり、その古い慣習は、変化以前に行っていた「狩猟 ('hunting')」 (2) を指している。" },
                  { "id": "I-5", "label": "(5)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "グリーンハイウェイ仮説は、人々が植物に覆われた湿潤な時期に、通常の生存戦術（狩猟）を用いながら移動したというもの。したがって「湿潤な時期に狩猟した ('hunted during wet periods')」 (4) が最も適切。" },
                  { "id": "I-6", "label": "(6)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "Dr. Kappelmanは、単一の場所の発見がすべてを代表するわけではないと認めつつ、他の研究者が同様の場所を見つけるための比較のポイントを提供していると述べており、さらに研究が必要であることを意味しているため、'he recognizes that more studies need to be conducted in other regions' (3) が適切。" },
                  { "id": "I-7", "label": "(7)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "Shinfa-Metema 1での発見は、トバ噴火後の乾燥期に哺乳類の狩猟を止め魚釣りに適応し、雨が戻って狩猟を再開したことを示しているため、'People hunted during wet periods and fished during dry periods' (1) が最も合致する。" },
                  { "id": "I-8", "label": "(8)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "研究チームの発見は、石器が槍先ではなく鏃（矢じり）であることを示唆しており、これが正しければ「弓術が以前考えられていたよりも早く狩猟に使用されていた ('archery was used for hunting earlier than previously thought')」 (3) ことになる。" },
                  { "id": "I-9", "label": "(9)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "Shinfa-Metema 1の人々は、環境の変化（トバ噴火後の乾燥化）に応じて哺乳類の狩猟から魚釣りに食生活を変えたため、'The people at Shinfa-Metema 1 altered their diet based on environmental changes' (2) が正しい。" },
                  { "id": "I-10", "label": "(10)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "この文章の主なアイデアは、古代の人々がトバ噴火のような大きな環境ショックに直面しても、革新と創造性によって適応し生き残ったという点にあるため、'Adaptable Ancient Humans' (4) が最も適切。" }
                ]
              },
              {
                "id": "II",
                "label": "II",
                "instruction": "次の英文を読み、(11) ~ (19) の設問について最も適切なものを選択肢1~4から選び、その番号を解答用紙A (マークシート)の解答欄 (11)~(19) にマークしなさい。",
                "questions": [
                  { "id": "II-11", "label": "(11)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "古典・啓蒙思想家は幸福を美徳の追求、つまり「良い行いをすること ('being good')」 (1) と定義した。" },
                  { "id": "II-12", "label": "(12)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "ストア派の教えは、外部の出来事を制御しようとするのをやめ、「自分自身で制御できる唯一の ('only')」 (4) もの、つまり思考、欲望、感情、行動に焦点を当てることである。" },
                  { "id": "II-13", "label": "(13)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "キケロの引用は、幸福の「達成そのものではなく、より高い幸福の探求」が、あらゆる富や名誉、肉体的快楽を超えた賞であると述べているため、「幸せを感じるよりも意味がある ('more meaningful')」 (4) ことを示唆している。" },
                  { "id": "II-14", "label": "(14)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「放棄し、楽しめ ('Renounce and enjoy')」は、「自己中心的な生活を送ることを控えること ('refraining from living a self-centered life')」 (3) によって幸福がもたらされることを示唆している。" },
                  { "id": "II-15", "label": "(15)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "現代の社会心理学者は、感情的知性（Emotional Intelligence）を自己の感情を管理し、他者と共感し、課題を克服する能力と定義しており、これは創設者たちが追求した美徳と一致するため、「幸福の追求を助ける ('helps us in our pursuit of happiness')」 (1) ことが示唆される。" },
                  { "id": "II-16", "label": "(16)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "プラトンの比喩では、御者（理性を表す）が情熱的な馬と高貴な馬の2頭を御し、同じ方向に引かせることが目標であるため、'Reason should guide the passionate and noble parts of the soul' (4) が最も意味を捉えている。" },
                  { "id": "II-17", "label": "(17)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "ストア派は感情の制御を重視し、幸福の達成を教えの中心に置いていたため、「ストア派が見過ごした概念である ('It is a concept that the Stoics overlooked')」 (4) は著者の見解と一致しない。" },
                  { "id": "II-18", "label": "(18)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "創設者たちは、東洋の知恵の伝統からのテキストを読むことも含め、幸福の追求に取り組んだと述べているため、'The Founders did not limit their studies of wisdom to that of the West' (2) が一致する。" },
                  { "id": "II-19", "label": "(19)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "文章は、古典的な美徳に関する思想がアメリカ合衆国建国の父たち（Founders）の幸福の追求にどのように影響を与えたかを主題としているため、'The Pursuit of Happiness: How Classical Writers on Virtue Influenced the Founders' (4) が最も適切。" }
                ]
              },
              {
                "id": "III",
                "label": "III",
                "instruction": "次の英文を読み、(20) ~ (29) の設問について最も適切なものを選択肢1~4から選び、その番号を解答用紙A (マークシート)の解答欄 (20)~(29) にマークしなさい。",
                "questions": [
                  { "id": "III-20", "label": "(20)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "ダッチスーパーのイノベーションのニュースがソーシャルメディアプラットフォームRedditに「広まった ('spread')」 (2) という文脈で、'spread' が適切。" },
                  { "id": "III-21", "label": "(21)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「私自身のことを言えば ('Speaking for myself')」 (3) という文脈で、'for' が適切。" },
                  { "id": "III-22", "label": "(22)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "「問題はセルフチェックアウトによるレジ係の代替というより、むしろ ('rather than')、そのような代替を魅力的にする人間の仕事の腐食である」という文脈で、'rather than' (4) が適切。" },
                  { "id": "III-23", "label": "(23)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "チャットチェックアウトは、機械化に「適応できない ('unable')」 (3) 人々を管理するために店が必要としたことを「選択」として再ラベル付けした可能性があるという文脈で、'unable' が適切。" },
                  { "id": "III-24", "label": "(24)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "セルフチェックアウトの普及は「作業とコントロールを労働者から消費者に移した」とあることから、「より多くの買い物客がレジ係の役割を引き受けることになった ('It required more shoppers to take on the role of cashier')」 (2) が結果として正しい。" },
                  { "id": "III-25", "label": "(25)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "セルフチェックアウトの傾向に続いて、一人暮らしの増加や離婚率の上昇が例として挙げられていることから、「レジの傾向は社会の一般的な傾向を反映している ('Trends in checkout lanes reflect general trends in society')」 (1) が意味として最も適切。" },
                  { "id": "III-26", "label": "(26)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "「彼ら（レジ係と機械）自身や顧客にとって、彼ら（レジ係）が実行するタスクが互いにどれほど異なっているのかが明らかでない」という文脈であるため、'cashiers and machines' (1) が適切。" },
                  { "id": "III-27", "label": "(27)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "Redditのコメントは、オランダのスーパーが収益を優先していること、ほとんどの買い物客が迅速なチェックアウトに慣れていること、レジでの遅延にイライラすること、そしてレジ係がスキャンデバイスに置き換えられていることなど、メディアの好意的な報道に異議を唱える理由を述べているが、「この技術的解決策がオランダの新聞によって宣伝された ('This technological solution was promoted by Dutch newspapers')」 (2) は、異議を唱えた理由として与えられていない。" },
                  { "id": "III-28", "label": "(28)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "著者は、セルフチェックアウトへの移行は、人間関係の喪失を伴うレジ係の仕事の腐食によって魅力的にされたものであり、この現象をより広範な人間関係の衰退の兆候として捉えているため、'This social phenomenon is but one manifestation of a widespread decline in human interactions' (1) が合意する見解。" },
                  { "id": "III-29", "label": "(29)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "この文章は、レジ係とのチャットレーンが、デジタル化が進む世界での孤独に対する小さなジェスチャーとして導入されたことを中心に議論し、買い物における人間的なつながりの腐食に焦点を当てているため、'Chat Checkout: Creating Human Connections through Shopping' (2) が最も適切。" }
                ]
              },
              {
                "id": "IV",
                "label": "IV",
                "instruction": "次の英文 (30) ~ (36) の空所に入る最も適切なものを選択肢1~4から選び、その番号を解答用紙A(マークシート) の解答欄 (30)~(36) にマークしなさい。",
                "questions": [
                  { "id": "IV-30", "label": "(30)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "「彼らが自力でエッセイを書いたかどうか、疑わしい ('questionable as to') (30)。」という文脈で、'questionable as to' (2) が適切。'I find it questionable as to whether...' で「〜かどうか疑わしいと思う」という意味になる。" },
                  { "id": "IV-31", "label": "(31)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "「特に断りがない限り ('unless otherwise noted') (4)、すべての授業はこのキャンパスで行われる。」という文脈で、'unless' が適切。" },
                  { "id": "IV-32", "label": "(32)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "「メキシコに住み始める前に、子供たちはスペイン語を磨く/復習する ('brush up') (1) 必要がある。」という文脈で、'brush up' が適切。" },
                  { "id": "IV-33", "label": "(33)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "「私たちはただ探しているだけで、何も見つからないと思っていた」という文脈で、'We were just out looking to see what we could find' (2) が適切。" },
                  { "id": "IV-34", "label": "(34)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「19世紀イタリア美術の主要人物の紹介に「続いて ('followed by')」(3) 20世紀美術の概観を提供する」という文脈で、'followed by' が適切。" },
                  { "id": "IV-35", "label": "(35)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「自然を回復するための資金が、市職員の賃金決済に流用される」という文脈で、資金を「取っておく/確保する ('set aside')」 (3) の過去分詞形 'set aside' が適切。" },
                  { "id": "IV-36", "label": "(36)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「来週の会議で新しいプロジェクトについてチームと話す ('talk to') (3) のはどうですか？」という文脈で、'talk to' が適切。" }
                ]
              },
              {
                "id": "V",
                "label": "V",
                "instruction": "次の英文の空所 (37) ~ (42) に入る最も適切なものを選択肢1~4から選び、その番号を解答用紙A(マークシート)の解答欄 (37)~(42) にマークしなさい。",
                "questions": [
                  { "id": "V-37", "label": "(37)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "「洗練されたコンピュータープログラムが、要求に応じて ('on demand') (2) 詩を書いたり、量子力学を説明したりできる」という文脈で、'on demand' が適切。" },
                  { "id": "V-38", "label": "(38)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "「技術の進歩は、古い能力を損なうことと同様に ('as it is to undermine old abilities') (1)、新しい学習の必要性を生み出す可能性が高い」という文脈で、'as it is to undermine' が適切。" },
                  { "id": "V-39", "label": "(39)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「紙の発明は、個人が一生かかっても記憶できないほどの知識の「爆発的な増加 ('explosion')」 (3) をもたらした」という文脈で、'explosion' が適切。" },
                  { "id": "V-40", "label": "(40)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「21世紀の技術は、タイピストや電話交換手の必要性を「減らした ('reduced')」 (3) 一方で、ソフトウェア開発者などの急増を生み出した」という文脈で、'reduced' が適切。" },
                  { "id": "V-41", "label": "(41)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "「将来の世代にとって不可欠なものとして「終わる ('end')」 (1) であろう特定のスキルや知識について推測するのは避ける」という文脈で、'end up'（結局〜になる）の 'end' が適切。" },
                  { "id": "V-42", "label": "(42)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "3", "points": 2, "explanation": "「学習のプロセスへの洞察は、より関連性が高くなり、「より少なく ('less')」 (3) なることはないだろう」という文脈で、'less' が適切。" }
                ]
              },
              {
                "id": "VI",
                "label": "VI",
                "instruction": "次の英文 (43) ~ (46) を読み、それぞれの設問について最も適切なものを選択肢1~4から選び、その番号を解答用紙A (マークシート) の解答欄 (43)~(46) にマークしなさい。",
                "questions": [
                  { "id": "VI-43", "label": "(43)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "2", "points": 2, "explanation": "脳は通常の会話を理解するように進化しているが、大学の講義は階層的に構成されており、その構造を把握しないと意味の層を理解できないため、「階層的な構造を把握しない限り、講義を完全に理解することはできない ('You will not fully understand a lecture unless you grasp its hierarchical structure')」 (2) が要点を最もよく捉えている。" },
                  { "id": "VI-44", "label": "(44)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "中央銀行のインフレ抑制能力への信頼が、労働者や企業の行動を通じて、インフレ抑制につながるという論理であるため、「中央銀行のインフレ管理能力への信頼は、実際の経済行動に影響を与える ('So confidence in your central bank's ability to manage inflation affects actual economic behavior')」 (4) が論理的に続く。" },
                  { "id": "VI-45", "label": "(45)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "1", "points": 2, "explanation": "高い増税を行った国々（ベルギー、デンマーク、フィンランド）の経済成長率が、増税をあまり行わなかった米国と同じであったという証拠が示されているため、「増税が必ずしも経済成長を妨げない ('Evidence indicates that higher taxes do not necessarily stunt economic growth')」 (1) が、現実が人々が考えるほど深刻ではない理由として最も適切。" },
                  { "id": "VI-46", "label": "(46)", "type": "selection", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "points": 2, "explanation": "GDPの欠点として、国内労働やその他の無給労働を省略すること (2)、有害な経済活動を含むこと (1)、不平等に鈍感であること、集合的福祉に貢献しない購入を含むこと、富裕社会では追加の利益が減少すること (3) が述べられているが、「浪費家（big spenders）の一般人口への経済的影響を過小評価している」 (4) は述べられていない。" }
                ]
              },
              {
                "id": "VII",
                "label": "VII",
                "instruction": "次の英文を読み、空所(a)~( f )に入る、文脈の上で最も適した動詞を下記の必要に応じて語形を変えて解答欄に記入しなさい。ただし、各解答欄に記入する語は一語のみとし、同じ動詞を二回以上選んではいけない。",
                "questions": [
                  { "id": "VII-a", "label": "(a)", "type": "text", "correctAnswer": "supposed", "points": 2, "explanation": "「成功したリーダーはすべての答えを自分で見つけられると、いつも「思い込んでいた ('supposed')」」という文脈で、'suppose' の過去形が適切。" },
                  { "id": "VII-b", "label": "(b)", "type": "text", "correctAnswer": "making", "points": 2, "explanation": "「賢くて、みんなにそれを「知らしめる/確実にさせる ('making')」 (b) ことが、彼らの最も顕著な特徴であるように思われた」という文脈で、'make' の現在分詞形が適切。" },
                  { "id": "VII-c", "label": "(c)", "type": "text", "correctAnswer": "revered", "points": 2, "explanation": "「初期のキャリアでは、大衆は著名なビジネスリーダーの知性などを「尊敬した ('revered')」 (c)」という文脈で、'revere' の過去形が適切。" },
                  { "id": "VII-d", "label": "(d)", "type": "text", "correctAnswer": "avoiding", "points": 2, "explanation": "「彼らは、他の誰も見なかった、しかし会社の没落をもたらしたであろうリスクを「回避している ('avoiding')」 (d) 天才と見なされた」という文脈で、'avoid' の現在分詞形が適切。" },
                  { "id": "VII-e", "label": "(e)", "type": "text", "correctAnswer": "saves", "points": 2, "explanation": "「単独で崩壊寸前の会社を「救う ('saves')」 (e) リーダー・ヒーロー」という文脈で、'save' の三人称単数現在形が適切。" },
                  { "id": "VII-f", "label": "(f)", "type": "text", "correctAnswer": "utilizing", "points": 2, "explanation": "「私たちが作成し、会社で戦略的に「活用している ('utilizing')」 (f) リーダーシップ哲学」という文脈で、'utilize' の現在分詞形が適切。" }
                ]
              },
              {
                "id": "VIII",
                "label": "VIII",
                "instruction": "次の英文を読み、空所(a)~ ( e )に入る、文脈の上で最も適した名詞を解答欄に記入しなさい。下記の動詞群の最も適切な名詞形のみを使用すること。ただし~ing 形は使用してはいけない。また、同じ動詞を二回以上選んではいけない。",
                "questions": [
                  { "id": "VIII-a", "label": "(a)", "type": "text", "correctAnswer": "attention", "points": 2, "explanation": "「景気循環は19世紀初頭以来、エコノミストの「関心/注意 ('attention')」 (a) を占めてきた」という文脈で、'attend' の名詞形 'attention' が適切。" },
                  { "id": "VIII-b", "label": "(b)", "type": "text", "correctAnswer": "expansions", "points": 2, "explanation": "「景気循環のピークと谷、つまり多くの「拡大期 ('expansions')」 (b) と不況の特定」という文脈で、'expand' の名詞形の複数形 'expansions' が適切。" },
                  { "id": "VIII-c", "label": "(c)", "type": "text", "correctAnswer": "announcement", "points": 2, "explanation": "「転換点が明確に識別可能になるまで待つため、これらの日付の公的な「発表 ('announcement')」 (c) は転換点に達した後になる」という文脈で、'announce' の名詞形 'announcement' が適切。" },
                  { "id": "VIII-d", "label": "(d)", "type": "text", "correctAnswer": "consumption", "points": 2, "explanation": "「NBERが使用する指標には、実質個人「消費 ('consumption')」 (d)、総工業生産などが含まれる」という文脈で、'consume' の名詞形 'consumption' が適切。" },
                  { "id": "VIII-e", "label": "(e)", "type": "text", "correctAnswer": "definition", "points": 2, "explanation": "「複数の指標を使用する根拠は、NBERの不況の「定義 ('definition')」 (e) を反映している」という文脈で、'define' の名詞形 'definition' が適切。" }
                ]
              }
            ]
          },
          {
            "id": "keio-commerce-geo-2025",
            "year": 2025,
            "subject": "地理",
            "subjectEn": "geography",
            "type": "pdf",
            "pdfPath": "/exam_data/_data_2025_9q_o01_o9q251001m0.pdf",
            "timeLimitMinutes": 100,
            "structure": [
              {
                "id": "I",
                "label": "I.",
                "instruction": "次の文章を読み、後の設問に答えなさい。",
                "questions": [
                  {
                    "id": "I-1-2",
                    "label": "(1)(2)",
                    "type": "text",
                    "correctAnswer": "51",
                    "points": 2,
                    "explanation": "カタルーニャ州の州都で自動車産業が盛んな都市はバルセロナ (51)。"
                  },
                  {
                    "id": "I-3-4",
                    "label": "(3)(4)",
                    "type": "text",
                    "correctAnswer": "52",
                    "points": 2,
                    "explanation": "旧共産主義国でEU加盟後自動車生産が伸びた内陸国はハンガリー (52)。"
                  },
                  {
                    "id": "I-5-6",
                    "label": "(5)(6)",
                    "type": "text",
                    "correctAnswer": "14",
                    "points": 2,
                    "explanation": "ドイツ国内をメインにEU各地の主要都市を結ぶ鉄道はICE (14)。"
                  },
                  {
                    "id": "I-7-8",
                    "label": "(7)(8)",
                    "type": "text",
                    "correctAnswer": "21",
                    "points": 2,
                    "explanation": "自動車メーカーの企業城下町として知られる都市はヴォルフスブルク (21)。"
                  },
                  {
                    "id": "I-9-10",
                    "label": "(9)(10)",
                    "type": "text",
                    "correctAnswer": "19",
                    "points": 2,
                    "explanation": "自動車生産に不可欠な良質な鉄鉱石の産出地はイェリヴァレ (19)。"
                  },
                  {
                    "id": "I-11-12",
                    "label": "(11)(12)",
                    "type": "text",
                    "correctAnswer": "60",
                    "points": 2,
                    "explanation": "シンガポールは1965年にマレーシア (60) から分離独立した。"
                  },
                  {
                    "id": "I-13-14",
                    "label": "(13)(14)",
                    "type": "text",
                    "correctAnswer": "35",
                    "points": 2,
                    "explanation": "シンガポールで工業化の典型例とされる工業団地はジュロン (35)。"
                  },
                  {
                    "id": "I-15-16",
                    "label": "(15)(16)",
                    "type": "text",
                    "correctAnswer": "62",
                    "points": 2,
                    "explanation": "2016年の統計でシンガポールについで人口密度が高い国はモナコ公国 (62)。"
                  },
                  {
                    "id": "I-17-18",
                    "label": "(17)(18)",
                    "type": "text",
                    "correctAnswer": "46",
                    "points": 2,
                    "explanation": "アメリカ合衆国でF1が開催されたラスヴェガスがある州はネヴァダ (46) 州。"
                  },
                  {
                    "id": "I-19-20",
                    "label": "(19)(20)",
                    "type": "text",
                    "correctAnswer": "13",
                    "points": 2,
                    "explanation": "テキサス州オースチン近郊の気候区分は温暖湿潤気候（Cfa）(13)。"
                  },
                  {
                    "id": "I-21-22",
                    "label": "(21)(22)",
                    "type": "text",
                    "correctAnswer": "66",
                    "points": 2,
                    "explanation": "1960年までブラジルの首都だった都市はリオデジャネイロ (66)。"
                  },
                  {
                    "id": "I-23-24",
                    "label": "(23)(24)",
                    "type": "text",
                    "correctAnswer": "34",
                    "points": 2,
                    "explanation": "ミシガン湖の西岸に面した都市で、F1開催候補地とされる都市はシカゴ (34)。"
                  },
                  {
                    "id": "I-25-26",
                    "label": "(25)(26)",
                    "type": "text",
                    "correctAnswer": "44",
                    "points": 2,
                    "explanation": "アルメニアとアゼルバイジャンの紛争はナゴルノ=カラバフ (44) 紛争。"
                  },
                  {
                    "id": "I-27-28",
                    "label": "(27)(28)",
                    "type": "text",
                    "correctAnswer": "37",
                    "points": 2,
                    "explanation": "黒海に面したロシアの保養地で、かつてオリンピックも開催された都市はソチ (37)。"
                  },
                  {
                    "id": "I-29-30",
                    "label": "(29)(30)",
                    "type": "text",
                    "correctAnswer": "22",
                    "points": 2,
                    "explanation": "F1が2022年から中止されている理由となった紛争はウクライナ (22) 紛争。"
                  },
                  {
                    "id": "I-31-32",
                    "label": "(31)(32)",
                    "type": "text",
                    "correctAnswer": "25",
                    "points": 2,
                    "explanation": "輸出総額に占める天然ガスの割合が5割を超える国はカタール (25)。"
                  },
                  {
                    "id": "I-33-34",
                    "label": "(33)(34)",
                    "type": "text",
                    "correctAnswer": "16",
                    "points": 2,
                    "explanation": "アラブ首長国連邦の首都はアブダビ (16)。"
                  },
                  {
                    "id": "I-35-36",
                    "label": "(35)(36)",
                    "type": "text",
                    "correctAnswer": "65",
                    "points": 2,
                    "explanation": "イスラム教の五行のうち、1年の中で行う時期が決まっている巡礼ともう一つは断食（ラマダーン）(65)。"
                  },
                  {
                    "id": "I-37-38",
                    "label": "(37)(38)",
                    "type": "text",
                    "correctAnswer": "17",
                    "points": 2,
                    "explanation": "ブラジルにつぐ世界第2位のバイオ燃料生産国はアメリカ合衆国 (17)。"
                  },
                  {
                    "id": "I-39-40",
                    "label": "(39)(40)",
                    "type": "text",
                    "correctAnswer": "32",
                    "points": 2,
                    "explanation": "ブラジルで主としてバイオエタノールの原料とされるのはサトウキビ (32)。"
                  },
                  {
                    "id": "I-41-42",
                    "label": "(41)(42)",
                    "type": "text",
                    "correctAnswer": "55",
                    "points": 2,
                    "explanation": "ガソリンとバイオエタノールのどちらでも走行可能な車はフレックス燃料車 (55)。"
                  },
                  {
                    "id": "I-Q2",
                    "label": "問2 (43)",
                    "type": "selection",
                    "options": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "correctAnswer": "4",
                    "points": 2,
                    "explanation": "2018年のアジアの自動車生産台数で、上位から2番目は日本である。 (語群4)"
                  },
                  {
                    "id": "I-Q3",
                    "label": "問3 (44)",
                    "type": "selection",
                    "options": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "南米の経済統合MERCOSURに加盟しているが、2024年4月1日時点で資格が停止されている国はベネズエラである。 (語群3)"
                  },
                  {
                    "id": "I-Q4",
                    "label": "問4",
                    "type": "text",
                    "correctAnswer": "アップル",
                    "points": 0,
                    "explanation": "GAFAの中で2018年の売上高に占めるハードウェアの割合が最も高い企業はアップルである。"
                  },
                  {
                    "id": "I-Q5",
                    "label": "問5 (C・T)",
                    "type": "text",
                    "correctAnswer": "トルコ",
                    "points": 0,
                    "explanation": "BTCパイプラインのCとTの都市が属する国のうち、CはCeyhan（トルコ）を指す。"
                  },
                  {
                    "id": "I-Q6",
                    "label": "問6 (記述)",
                    "type": "text",
                    "correctAnswer": "生産拡大に伴い過伐採・過耕作が進むほか、食料生産と競合し作物の価格が高騰する。",
                    "points": 0,
                    "explanation": "バイオ燃料の生産拡大が、人々の生活と地球環境に及ぼす「負」の影響（40字以内）を問う記述問題である。"
                  }
                ]
              },
              {
                "id": "II",
                "label": "II.",
                "instruction": "次の文章を読み、後の設問に答えなさい。",
                "questions": [
                  {
                    "id": "II-45-46",
                    "label": "(45)(46)",
                    "type": "text",
                    "correctAnswer": "18",
                    "points": 2,
                    "explanation": "正解は語群の「アルパカ」(18)の番号である。"
                  },
                  {
                    "id": "II-47-48",
                    "label": "(47)(48)",
                    "type": "text",
                    "correctAnswer": "17",
                    "points": 2,
                    "explanation": "正解は語群の「アオザイ」(17)の番号である。"
                  },
                  {
                    "id": "II-49-50",
                    "label": "(49)(50)",
                    "type": "text",
                    "correctAnswer": "39",
                    "points": 2,
                    "explanation": "正解は語群の「高(たか)」(39)の番号である。"
                  },
                  {
                    "id": "II-51-52",
                    "label": "(51)(52)",
                    "type": "text",
                    "correctAnswer": "48",
                    "points": 2,
                    "explanation": "正解は語群の「低(ひく)」(48)の番号である。"
                  },
                  {
                    "id": "II-53-54",
                    "label": "(53)(54)",
                    "type": "text",
                    "correctAnswer": "12",
                    "points": 2,
                    "explanation": "正解は語群の「70」(12)の番号である。"
                  },
                  {
                    "id": "II-55-56",
                    "label": "(55)(56)",
                    "type": "text",
                    "correctAnswer": "28",
                    "points": 2,
                    "explanation": "正解は語群の「玄武岩」(28)の番号である。"
                  },
                  {
                    "id": "II-57-58",
                    "label": "(57)(58)",
                    "type": "text",
                    "correctAnswer": "24",
                    "points": 2,
                    "explanation": "正解は語群の「間帯土壌」(24)の番号である。"
                  },
                  {
                    "id": "II-59-60",
                    "label": "(59)(60)",
                    "type": "text",
                    "correctAnswer": "35",
                    "points": 2,
                    "explanation": "正解は語群の「水力」(35)の番号である。"
                  },
                  {
                    "id": "II-61-62",
                    "label": "(61)(62)",
                    "type": "text",
                    "correctAnswer": "57",
                    "points": 2,
                    "explanation": "正解は語群の「ランカシャー」(57)の番号である。"
                  },
                  {
                    "id": "II-63-64",
                    "label": "(63)(64)",
                    "type": "text",
                    "correctAnswer": "51",
                    "points": 2,
                    "explanation": "正解は語群の「マージー」(51)の番号である。"
                  },
                  {
                    "id": "II-65-66",
                    "label": "(65)(66)",
                    "type": "text",
                    "correctAnswer": "58",
                    "points": 2,
                    "explanation": "正解は語群の「労働力指向」(58)の番号である。"
                  },
                  {
                    "id": "II-67-68",
                    "label": "(67)(68)",
                    "type": "text",
                    "correctAnswer": "43",
                    "points": 2,
                    "explanation": "正解は語群の「中国」(43)の番号である。"
                  },
                  {
                    "id": "II-69-70",
                    "label": "(69)(70)",
                    "type": "text",
                    "correctAnswer": "20",
                    "points": 2,
                    "explanation": "正解は語群の「インドネシア」(20)の番号である。"
                  },
                  {
                    "id": "II-71-72",
                    "label": "(71)(72)",
                    "type": "text",
                    "correctAnswer": "38",
                    "points": 2,
                    "explanation": "正解は語群の「タイ」(38)の番号である。"
                  },
                  {
                    "id": "II-73-74",
                    "label": "(73)(74)",
                    "type": "text",
                    "correctAnswer": "15",
                    "points": 2,
                    "explanation": "正解は語群の「AFTA」(15)の番号である。"
                  },
                  {
                    "id": "II-75-76",
                    "label": "(75)(76)",
                    "type": "text",
                    "correctAnswer": "34",
                    "points": 2,
                    "explanation": "正解は語群の「人件費」(34)の番号である。"
                  },
                  {
                    "id": "II-77-78",
                    "label": "(77)(78)",
                    "type": "text",
                    "correctAnswer": "40",
                    "points": 2,
                    "explanation": "正解は語群の「ダッカ」(40)の番号である。"
                  },
                  {
                    "id": "II-79-80",
                    "label": "(79)(80)",
                    "type": "text",
                    "correctAnswer": "25",
                    "points": 2,
                    "explanation": "正解は語群の「京都議定書」(25)の番号である。"
                  },
                  {
                    "id": "II-81-82",
                    "label": "(81)(82)",
                    "type": "text",
                    "correctAnswer": "46",
                    "points": 2,
                    "explanation": "正解は語群の「パリ協定」(46)の番号である。"
                  },
                  {
                    "id": "II-Q2",
                    "label": "問2 (83)",
                    "type": "selection",
                    "options": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "2016年の世界の繊維生産において、最も割合が高い繊維はポリエステルである。"
                  },
                  {
                    "id": "II-Q3",
                    "label": "問3 (84)",
                    "type": "selection",
                    "options": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "correctAnswer": "2",
                    "points": 2,
                    "explanation": "2019年時点で東南アジア地域における輸出品のうち「衣類」の割合が50%を超える国はカンボジアである。"
                  },
                  {
                    "id": "II-Q4",
                    "label": "問4",
                    "type": "text",
                    "correctAnswer": "ハイサーグラフ",
                    "points": 0,
                    "explanation": "気候の特徴を視覚的にとらえるグラフの名称を問う記述問題である。"
                  },
                  {
                    "id": "II-Q5",
                    "label": "問5 (記述)",
                    "type": "text",
                    "correctAnswer": "生産工程を外部に委託し、自社では製造設備を持たない企業。",
                    "points": 0,
                    "explanation": "「ファブレス企業」の説明（30字以内）を問う記述問題である。"
                  },
                  {
                    "id": "II-Q6",
                    "label": "問6 (記述)",
                    "type": "text",
                    "correctAnswer": "ウォーターフットプリント",
                    "points": 0,
                    "explanation": "水の総量を的確にとらえるために考案された概念の名称を問う記述問題である。"
                  }
                ]
              },
              {
                "id": "III",
                "label": "III.",
                "instruction": "次の文章を読み、後の設問に答えなさい。",
                "questions": [
                  {
                    "id": "III-85-86",
                    "label": "(85)(86)",
                    "type": "text",
                    "correctAnswer": "32",
                    "points": 2,
                    "explanation": "正解は語群の「人口」(32)の番号である。"
                  },
                  {
                    "id": "III-87-88",
                    "label": "(87)(88)",
                    "type": "text",
                    "correctAnswer": "54",
                    "points": 2,
                    "explanation": "正解は語群の「リスボン」(54)の番号である。"
                  },
                  {
                    "id": "III-89-90",
                    "label": "(89)(90)",
                    "type": "text",
                    "correctAnswer": "25",
                    "points": 2,
                    "explanation": "正解は語群の「サミット」(25)の番号である。"
                  },
                  {
                    "id": "III-91-92",
                    "label": "(91)(92)",
                    "type": "text",
                    "correctAnswer": "12",
                    "points": 2,
                    "explanation": "正解は語群の「40-60」(12)の番号である。"
                  },
                  {
                    "id": "III-93-94",
                    "label": "(93)(94)",
                    "type": "text",
                    "correctAnswer": "27",
                    "points": 2,
                    "explanation": "正解は語群の「三圃式農業」(27)の番号である。"
                  },
                  {
                    "id": "III-95-96",
                    "label": "(95)(96)",
                    "type": "text",
                    "correctAnswer": "22",
                    "points": 2,
                    "explanation": "正解は語群の「高温乾燥」(22)の番号である。"
                  },
                  {
                    "id": "III-97-98",
                    "label": "(97)(98)",
                    "type": "text",
                    "correctAnswer": "39",
                    "points": 2,
                    "explanation": "正解は語群の「デンマーク」(39)の番号である。"
                  },
                  {
                    "id": "III-99-100",
                    "label": "(99)(100)",
                    "type": "text",
                    "correctAnswer": "29",
                    "points": 2,
                    "explanation": "正解は語群の「集約的農業」(29)の番号である。"
                  },
                  {
                    "id": "III-101-102",
                    "label": "(101)(102)",
                    "type": "text",
                    "correctAnswer": "37",
                    "points": 2,
                    "explanation": "正解は語群の「チューネン」(37)の番号である。"
                  },
                  {
                    "id": "III-103-104",
                    "label": "(103)(104)",
                    "type": "text",
                    "correctAnswer": "40",
                    "points": 2,
                    "explanation": "正解は語群の「トウモロコシ」(40)の番号である。"
                  },
                  {
                    "id": "III-105-106",
                    "label": "(105)(106)",
                    "type": "text",
                    "correctAnswer": "57",
                    "points": 2,
                    "explanation": "正解は語群の「ルーラル・ツーリズム」(57)の番号である。"
                  },
                  {
                    "id": "III-107-108",
                    "label": "(107)(108)",
                    "type": "text",
                    "correctAnswer": "58",
                    "points": 2,
                    "explanation": "正解は語群の「ロレーヌ」(58)の番号である。"
                  },
                  {
                    "id": "III-109-110",
                    "label": "(109)(110)",
                    "type": "text",
                    "correctAnswer": "15",
                    "points": 2,
                    "explanation": "正解は語群の「ウェーバー」(15)の番号である。"
                  },
                  {
                    "id": "III-111-112",
                    "label": "(111)(112)",
                    "type": "text",
                    "correctAnswer": "26",
                    "points": 2,
                    "explanation": "正解は語群の「サンベルト」(26)の番号である。"
                  },
                  {
                    "id": "III-113-114",
                    "label": "(113)(114)",
                    "type": "text",
                    "correctAnswer": "46",
                    "points": 2,
                    "explanation": "正解は語群の「ボローニャ」(46)の番号である。"
                  },
                  {
                    "id": "III-115-116",
                    "label": "(115)(116)",
                    "type": "text",
                    "correctAnswer": "19",
                    "points": 2,
                    "explanation": "正解は語群の「革製品」(19)の番号である。"
                  },
                  {
                    "id": "III-117-118",
                    "label": "(117)(118)",
                    "type": "text",
                    "correctAnswer": "17",
                    "points": 2,
                    "explanation": "正解は語群の「エストニア」(17)の番号である。"
                  },
                  {
                    "id": "III-119-120",
                    "label": "(119)(120)",
                    "type": "text",
                    "correctAnswer": "20",
                    "points": 2,
                    "explanation": "正解は語群の「結束基金」(20)の番号である。"
                  },
                  {
                    "id": "III-121-122",
                    "label": "(121)(122)",
                    "type": "text",
                    "correctAnswer": "44",
                    "points": 2,
                    "explanation": "正解は語群の「ハンガリー」(44)の番号である。"
                  },
                  {
                    "id": "III-Q2",
                    "label": "問2 (123)",
                    "type": "selection",
                    "options": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "correctAnswer": "1",
                    "points": 2,
                    "explanation": "肉類に関する食料自給率が100%未満の国はイギリスである。"
                  },
                  {
                    "id": "III-Q3",
                    "label": "問3 (124)",
                    "type": "selection",
                    "options": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "correctAnswer": "3",
                    "points": 2,
                    "explanation": "2019年のEU (イギリスを含む)の域内貿易比率は6割以上7割未満である。"
                  },
                  {
                    "id": "III-Q4",
                    "label": "問4",
                    "type": "text",
                    "correctAnswer": "ガストアルバイター",
                    "points": 0,
                    "explanation": "1960年代にトルコなどから来た外国人労働者のドイツ語での名称を問う記述問題である。"
                  },
                  {
                    "id": "III-Q5",
                    "label": "問5",
                    "type": "text",
                    "correctAnswer": "医薬品",
                    "points": 0,
                    "explanation": "2020年のEU諸国から日本への輸入で最も金額の割合が大きい貿易品を問う記述問題である。"
                  },
                  {
                    "id": "III-Q6",
                    "label": "問6 (記述)",
                    "type": "text",
                    "correctAnswer": "企業の拠点のEU域内への移転や、移民の減少に伴う労働人口の減少が懸念される。",
                    "points": 0,
                    "explanation": "EU離脱によりイギリスにとって懸念されると思われること（企業、労働者および人口の観点から40字以内）を問う記述問題である。"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "econ",
        name: "経済学部",
        exams: [
          { id: "keio-econ-eng-2024", year: 2024, subject: "英語" },
          {
            "id": "keio-econ-eng-2025",
            "year": 2025,
            "subject": "英語",
            "subjectEn": "english",
            "type": "pdf",
            "pdfPath": "/exam_data/_data_2025_9q_e07_e9q257001m0.pdf",
            "structure": [
              {
                "id": "I",
                "label": "1",
                "instruction": "Read the following article and answer the questions as indicated. (次の英文を読んで、指示に従い問いに答えなさい)",
                "questions": [
                  {
                    "id": "I-1",
                    "label": "[1]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "批評の対象となっていたダムの「利点 (benefits)」に人々が気づかなくなったという文脈で、'benefits' (2) が適切。 [cite: 952]"
                  },
                  {
                    "id": "I-2",
                    "label": "[2]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "ダムは人為的な (human-made) 気候変動の猛威に対する解決策であるという文脈で、'a human-made' (2) が適切。 [cite: 956]"
                  },
                  {
                    "id": "I-3",
                    "label": "[3]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "「〜であろうとなかろうと」という譲歩の意味を表す 'be it' (2) が適切。 [cite: 960]"
                  },
                  {
                    "id": "I-4",
                    "label": "[4]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "古代文明が灌漑システムを築いた歴史的背景を踏まえ、「人類社会の歴史と発展がダムと強く結びついている」 (3) が結論として適切。 [cite: 963]"
                  },
                  {
                    "id": "I-5",
                    "label": "5 (Paragraph 4)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "第4段落では、大規模経済圏（中国、米国、インド、日本、ブラジル）に多くのダムがあることを示し、ダムの数が国の経済発展と一致していることを示唆しているため、(3)が最も適切。 [cite: 964, 965, 1007]"
                  },
                  {
                    "id": "I-6",
                    "label": "[6]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "タービンがジェネレーターを「駆動させる (drives)」という文脈で、'drives' (3) が適切。 [cite: 972]"
                  },
                  {
                    "id": "I-7",
                    "label": "[7]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "ジェネレーターは機械エネルギーを電気エネルギーに「変換する (converts)」という文脈で、'converts' (2) が適切。 [cite: 972]"
                  },
                  {
                    "id": "I-8",
                    "label": "[8]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "5",
                    "points": 3,
                    "explanation": "発電された電気が私たちの家に「電力を供給する (powers)」という文脈で、'powers' (5) が適切。 [cite: 972]"
                  },
                  {
                    "id": "I-9",
                    "label": "[9]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "風力や太陽光が水力発電よりも普及しているのは、石炭などの化石燃料よりも「経済的な (economic)」魅力があるため。 [cite: 976, 977]"
                  },
                  {
                    "id": "I-10",
                    "label": "[10]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "1",
                    "points": 3,
                    "explanation": "ポンプ式水力発電 (pumped storage hydropower) は、昼間に太陽光発電から得た余剰エネルギーを貯蔵し、日没後にアクセスできるため、「太陽光発電と並行して (alongside solar energy)」 (1) が特にうまく機能する。 [cite: 979, 982]"
                  },
                  {
                    "id": "I-11",
                    "label": "[11]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "1",
                    "points": 3,
                    "explanation": "より適切で多様なダムで、重要な水資源を人間のさまざまなニーズのために「最大化する (maximize)」ことができるという文脈で、'maximize' (1) が適切。 [cite: 985]"
                  }
                ]
              },
              {
                "id": "II",
                "label": "2",
                "instruction": "Read the following article and answer the questions as indicated. (次の英文を読んで、指示に従い問いに答えなさい)",
                "questions": [
                  {
                    "id": "II-12",
                    "label": "[12]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "ダムを「人類の傲慢さの証 (testaments to the boundlessness of human arrogance)」として正しく見なすべきだという批判的な文脈で、'It's about time' (そろそろ〜する頃だ) (2) が適切。 [cite: 1041]"
                  },
                  {
                    "id": "II-13",
                    "label": "13 (Paragraph 2)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "4",
                    "points": 3,
                    "explanation": "フーバーダムは現在、何百万人もの人々に電力と水を提供しているが、気候変動による貯水量の減少に脆弱になっているため、「ダムによって提供される資源はいずれ減少する可能性があり、人々に害を及ぼす可能性がある」 (4) という主張に著者は最も同意する可能性が高い。 [cite: 1046, 1047]"
                  },
                  {
                    "id": "II-14",
                    "label": "[14]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "発展途上国へのメガダム建設資金提供は、「ホスト国が適切に維持できるという保証なしに (with no assurances that host nations can properly maintain them)」行うのは無責任であるという文脈で、'with no assurances that' (3) が適切。 [cite: 1051]"
                  },
                  {
                    "id": "II-15",
                    "label": "[15]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "1",
                    "points": 3,
                    "explanation": "汚職の文脈で、プロジェクトマネージャーや独裁者が建設契約を獲得するために、多国籍企業の「影響力のある職員と仲良くする/協力する (get along)」という文脈で、'get along' (1) が適切。 [cite: 1099, 1055]"
                  },
                  {
                    "id": "II-16",
                    "label": "[16]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "建設の遅延が資金増額を必要とすることから、プロジェクトマネージャーは「予期せぬ」遅延を「でっち上げる/捏造する (make up)」という文脈で、'make up' (2) が適切。 [cite: 1100, 1056]"
                  },
                  {
                    "id": "II-17",
                    "label": "[17]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4", "5"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "建設費の増加は、腐敗した政治家に「利益をもたらし/報いる (pay off)」という文脈で、'pay off' (3) が適切。 [cite: 1101, 1057]"
                  },
                  {
                    "id": "II-18",
                    "label": "[18]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "三峡ダム建設により多くの住民が移住し、考古学的な遺跡が水没し、コミュニティが多様な文化を失ったという文脈から、「移住させられた人々の遺産と文化の喪失」 (3) が適切。 [cite: 1060, 1062, 1063]"
                  },
                  {
                    "id": "II-19",
                    "label": "19 ('the elephant in the room')",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "ダムが野生生物の生息地に害を及ぼすという「圧倒的な証拠」があるにもかかわらず、「めったに言及されない (rarely mentioned)」という文脈であるため、「最大ではあるが、最も話されない問題」 (3) が意味として最も近い。 [cite: 1064, 1065, 1112]"
                  },
                  {
                    "id": "II-20",
                    "label": "[20]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "ダムが気候変動に影響を与えるという事実は、研究不足の分野に起因するため、研究者にとっても「すぐには明らかではない (is not immediately obvious)」 (2)。 [cite: 1070]"
                  },
                  {
                    "id": "II-21",
                    "label": "[21]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "一部の政府がダムの撤去を建設よりも速いペースで開始したという事実に対し、「その減少が長く続くことを願う (Long may that decrease)」 (3) が、著者の批判的な視点から見て最も適切な表現。 [cite: 1077, 1118]"
                  },
                  {
                    "id": "II-22",
                    "label": "22",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "Wallsは「政府が水路からダムを撤去する必要がある」と明言しているが [cite: 1077]、Beeverはダムの「より適切で多様な種類」を求めており、撤去の必要性については述べていないため、Wallsのみが同意する (2)。 [cite: 985, 1130]"
                  },
                  {
                    "id": "II-23",
                    "label": "23",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "4",
                    "points": 3,
                    "explanation": "Beeverは水力発電が「クリーンエネルギーの最も広く使用されている形態」だと述べているが [cite: 955, 973]、Wallsはダムが「熱帯地域では石炭火力発電所よりも汚染物質が多い」と推定している [cite: 1072]。したがって、どちらも無条件には同意しない (4)。 [cite: 1132]"
                  }
                ]
              },
              {
                "id": "III",
                "label": "3",
                "instruction": "Read the following article and answer the questions as indicated. (次の英文を読んで、指示に従い問いに答えなさい)",
                "questions": [
                  {
                    "id": "III-24",
                    "label": "[24]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "1",
                    "points": 3,
                    "explanation": "CO2濃度の上昇と過去の表面温度の上昇の記録に続く文脈で、「世界の気候パターンがこれを反映している (Global climate patterns reflect this)」 (1) が最も自然な流れ。 [cite: 1144, 1145, 1201]"
                  },
                  {
                    "id": "III-25",
                    "label": "[25]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "4",
                    "points": 3,
                    "explanation": "原子力発電は、ウラン採掘などの費用や廃棄物の貯蔵費用を考慮する必要がある。これは、タービンの95%がリサイクル可能な風力発電とは「適切に対比されるべき (should suitably be contrasted with)」 (4) という文脈。 [cite: 1150, 1151, 1210]"
                  },
                  {
                    "id": "III-26",
                    "label": "[26]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "バイオガスは、土地利用に関して農業と「競合する (competes)」という文脈で、'competes' (2) が適切。 [cite: 1155, 1212]"
                  },
                  {
                    "id": "III-27",
                    "label": "[27]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "風力や太陽光は「断続的な (Intermittent)」電源であり、水力発電とは異なり、「気候条件によって制限されるため (since they are limited by climatic conditions)」 (3)、貯蔵に依存するという文脈。 [cite: 1158, 1217]"
                  },
                  {
                    "id": "III-28",
                    "label": "[28]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "Bottle Rock Power Plantの潜在能力はカリフォルニア州のエネルギー需要の20%に相当する900MWだが、現在は55MWを生産している。 $55\\text{MW} / 900\\text{MW} \\approx 0.061$ であり、20%の約6%強。潜在需要の $20\\%$ の $6.1\\%$ を計算すると、 $0.061 \\times 20\\% \\approx 1.22\\%$ となり、最も近いのは $1\\%$ (2)。 [cite: 1163, 1164, 1220]"
                  },
                  {
                    "id": "III-29",
                    "label": "[29]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "環太平洋火山帯（Ring of Fire）の国々は地熱発電の潜在力があり、インドネシア、フィリピン、コスタリカは状況を「活用した/開発した (exploited)」良い例であるという文脈で、'exploited' (3) が適切。 [cite: 1169, 1223]"
                  },
                  {
                    "id": "III-30",
                    "label": "[30]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "地熱発電の初期費用が高いという批判に対し、「長期的に考えれば、そのような初期費用は、実際には支払うべき小さな代償ではないか (However, thinking long term, might such initial costs be, in reality, a small price to pay?)」 (2) という反論を導く文が適切。 [cite: 1177, 1229]"
                  },
                  {
                    "id": "III-31",
                    "label": "[31]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "1",
                    "points": 3,
                    "explanation": "地震の発生の後に、「そのような地震の原因を発見することは通常可能であり (it is usually possible to discover the causes of such quakes)」、流体（蒸気）の過剰消費と関連しているという文脈で、'it is usually possible to discover the causes of such quakes' (1) が適切。 [cite: 1180, 1181, 1233]"
                  },
                  {
                    "id": "III-32",
                    "label": "[32]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "1",
                    "points": 3,
                    "explanation": "ヒートポンプは、プラントが「政府の助成金 (government subsidies)」 (1) なしで運営できることが鍵となる利点であるという文脈で、'government subsidies' が適切。 [cite: 1189, 1192, 1238]"
                  },
                  {
                    "id": "III-33",
                    "label": "[33]",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "地熱発電は「どのように管理されても (however it is managed)」、温泉の水圧を変えるリスクがあるという譲歩の文脈で、'however it is managed' (2) が適切。 [cite: 1197, 1244]"
                  }
                ]
              },
              {
                "id": "IV",
                "label": "4",
                "instruction": "Read the following letter to the editor and answer the questions (a-d) as indicated. (次の投書を読み、指示に従い問いに答えなさい)",
                "questions": [
                  {
                    "id": "IV-a",
                    "label": "(a)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "4",
                    "points": 3,
                    "explanation": "Urgee (Section 3) は、サンタローザが廃水 (wastewater) を地熱発電所に送っていることに言及し [cite: 1183, 1184]、太田 (Section 4) は廃水を含むあらゆる有機廃棄物を電力に変換することの利益を述べている [cite: 1254]。両方に言及されているのは「再生可能エネルギーにおける廃水 (wastewater) の利用」 (4)。"
                  },
                  {
                    "id": "IV-b",
                    "label": "(b)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "2",
                    "points": 3,
                    "explanation": "Urgeeは「全ての関連する生産と将来のコスト」を考慮すべきだと主張しているのに対し [cite: 1148]、太田は有機廃棄物処理にはすでに設備投資がされているため「生産コストは予測可能である」と述べている [cite: 1254]。そのため、太田は Urgee の将来コストへの注力を、コスト計算の難しさを理由に批判する可能性が高い。よって (2)。"
                  },
                  {
                    "id": "IV-c",
                    "label": "(c)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "Urgee は、CO2排出による世界的な気温上昇や化石燃料への依存増大を述べている [cite: 1143, 1144]。太田も再生可能エネルギー導入の必要性に触れている [cite: 1252]。しかし、「再生可能エネルギー導入への政治的圧力」 (3) については、どちらの筆者も直接的な言及をしていない。"
                  },
                  {
                    "id": "IV-d",
                    "label": "(d)",
                    "type": "selection",
                    "options": ["1", "2", "3", "4"],
                    "correctAnswer": "3",
                    "points": 3,
                    "explanation": "1, 2, 4は両者が同意する内容（持続可能性、現状のエネルギーシステムの変更、健全な経済論理の必要性）である。しかし、「地方自治体が主な担い手になるべきだ」 (3) という点について、Urgeeはフィンランドの例で国庫補助金 (national subsidies) に言及しており [cite: 1192]、太田はデンマークの成功 (country of Denmark) に言及しているため [cite: 1253]、地方自治体を主要な主体とする主張には同意しない可能性が高い。"
                  }
                ]
              },
              {
                "id": "V",
                "label": "5",
                "instruction": "Choose one of the questions below and write an essay in response. (以下の設問(A), (B)の中から一つ選んで、問題文~を基にして、自分の意見を英語で論じなさい。)",
                "questions": [
                  {
                    "id": "V-A",
                    "label": "(A) Should the Japanese government support dam building? Why or why not?",
                    "type": "text",
                    "correctAnswer": "（英作文。指示に準じた意見文。）",
                    "points": 0,
                    "explanation": "英作文（記述式）。"
                  },
                  {
                    "id": "V-B",
                    "label": "(B) Should the Japanese government support energy projects alternative to fossil fuels? Why or why not?",
                    "type": "text",
                    "correctAnswer": "（英作文。指示に準じた意見文。）",
                    "points": 0,
                    "explanation": "英作文（記述式）。"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "sci-tech",
        name: "理工学部",
        exams: [
          { id: "keio-sci-math-2024", year: 2024, subject: "数学" }
        ]
      }
    ]
  },
  {
    id: 'meiji',
    name: "明治大学",
    type: "私立",
    faculties: []
  },
  {
    id: 'aoyama',
    name: "青山学院大学",
    type: "私立",
    faculties: []
  },
  {
    id: 'rikkyo',
    name: "立教大学",
    type: "私立",
    faculties: []
  },
  {
    id: 'chuo',
    name: "中央大学",
    type: "私立",
    faculties: []
  },
  {
    id: 'hosei',
    name: "法政大学",
    type: "私立",
    faculties: [
      {
        id: "law",
        name: "法学部",
        exams: [
          {
            id: "hosei-law-eng-2025",
            year: 2025,
            subject: "English",
            subjectEn: "english",
            type: "pdf",
            pdfPath: "/exam_data/hosei_english_2024.pdf",
            structure: []
          }
        ]
      }
    ]
  },
  {
    id: 'nihon',
    name: "日本大学",
    type: "私立",
    faculties: []
  },
  {
    id: 'toyo',
    name: "東洋大学",
    type: "私立",
    faculties: []
  },
  {
    id: 'komazawa',
    name: "駒澤大学",
    type: "私立",
    faculties: []
  },
  {
    id: 'senshu',
    name: "専修大学",
    type: "私立",
    faculties: []
  }
];
