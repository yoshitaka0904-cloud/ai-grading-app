import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

/**
 * Higher-level model for complex reasoning and writing.
 */
const HIGH_REF_MODEL = "gemini-2.5-pro";

async function generateExamMaster(subjectType, questionPdfPath, answerPdfPath, outputId, extraInfo = {}) {
  const model = genAI.getGenerativeModel({
    model: HIGH_REF_MODEL,
  });

  const isEnglish = subjectType === 'english';
  const isSocial = subjectType === 'social';

  let subjectSpecificRules = "";

  if (isEnglish) {
    subjectSpecificRules = `
【英語科目 配点優先順位（絶対遵守）】
1. 内容一致問題（選択肢が完全な英文であり、論旨を問うもの）
2. 説明問題（選択肢が完全な英文であり、局所的な理由説明など）
3. 非完全英文選択肢問題・長文外大問（単語挿入、文法等）
※ この優先順位を保持し、内容一致問題に最も高い配点を割り振ること。
`;
  } else if (isSocial) {
    subjectSpecificRules = `
【社会科目 設問分類と配点序列（絶対固定）】
A．選択問題（1つ選択）：配点 低
B．選択問題（2つ選択）：配点 中（Cより高い）
C．記述問題（用語）：配点 低（Aより高くBより低い）
D．論述問題（短・20字以内）：配点 高
E．論述問題（長・30字以上）：配点 最高
※ 配点序列: A < C < B < D < E を絶対に守ること。
`;
  }

  const questionPdfData = fs.readFileSync(questionPdfPath).toString('base64');
  const answerPdfData = fs.readFileSync(answerPdfPath).toString('base64');

  // --- STEP 1: STRUCTURE & ANSWER EXTRACTION ---
  console.log(`[Step 1/2] Extracting structure and answers for ${outputId}...`);
  const step1Prompt = `
あなたは大学入試のデータ解析エキスパートです。
添付された「問題PDF」と「解答PDF」を厳密に分析し、試験の構造（大問・小問）、正解、配点のみを抽出してJSON形式で出力してください。

【厳格ルール】
1. Google検索を使用して、この試験（${outputId}）の「正確な配点情報」と「満点」を調査してください。
2. 客観式問題（選択肢、または単語1つで完結する解答）については、"gradingCriteria" を絶対に含めないでください。空オブジェクト {} も禁止です。
3. 記述式問題（文を書かせる、または要素採点が必要なもの）に限り、"gradingCriteria" を作成してください。
4. 解答のハルシネーション（読み間違い）に細心の注意を払ってください。設問番号と解答が1対1で対応しているか何度も確認してください。
5. **重要：アスタリスク（*）記号を絶対に使用しないでください。** 太字やリスト表記が必要な場合は、他のマークダウン記法（# や - など）を使用するか、記号なしで表現してください。

${subjectSpecificRules}

【出力構造】
{
  "maxScore": 100,
  "structure": [
    {
      "id": "大問ID",
      "label": "大問ラベル",
      "questions": [
        {
          "id": "小問ID",
          "label": "小問ラベル",
          "type": "selection | text",
          "options": ["a", "b", "c", "d"],
          "correctAnswer": "正解",
          "points": 5,
          "explanation": "この問題の解き方を、以下の要素を全て含めて4-6文で詳しく説明せよ：\\n            1. なぜその答えになるのか（根拠となる本文の記述を具体的に引用）\\n            2. 他の選択肢がなぜ間違っているか（消去法の思考プロセス）\\n            3. 受験生が再現できる解法の手順\\n            ※ 単語だけの羅列や、1-2文の簡潔すぎる説明は不可。論理的な文章として記述すること。",
          "gradingCriteria": { // 記述式のみ。不要な場合はこのキー自体を削除
            "keywords": ["必須語1"],
            "elements": ["採点要素1"],
            "elementCount": 1,
            "description": "採点基準"
          }
        }
      ]
    }
  ]
}
JSONのみを出力してください。
`;

  const result1 = await model.generateContent([
    { inlineData: { mimeType: "application/pdf", data: questionPdfData } },
    { inlineData: { mimeType: "application/pdf", data: answerPdfData } },
    { text: step1Prompt }
  ]);

  const res1Text = result1.response.text();
  const jsonMatch1 = res1Text.match(/\{[\s\S]*\}/);
  if (!jsonMatch1) throw new Error("Step 1 content missing JSON.");
  const structureData = JSON.parse(jsonMatch1[0]);

  // --- STEP 2: DETAILED ANALYSIS GENERATION ---
  console.log(`[Step 2/2] Writing high-quality detailed analysis for ${outputId}...`);
  const step2Prompt = `
あなたは、難関大学入試の専門講師です。
以下の試験について、受験生が「なるほど、こう解けばいいのか」と感動し、完全に再現できるレベルの「詳細な思考プロセス解説」を執筆してください。

【絶対遵守事項】以下の7項目を全て満たさない解説は不合格です。

1. **時系列**: 生徒が実際に解く順番（リード文を読む→本文を読む→設問に当たる）で記述せよ。
   例：「まず第1段落を読むと、〇〇という情報が提示されます。この時点で、△△という仮説を立てます。」

2. **文単位の解釈**: 長文の核となる英文を具体的に引用し、その瞬間にプロがどう考え、どう仮説を立てたかを言語化せよ。
   例：「\`However, defenders of the informal "like" draw attention to...\`という文に注目しましょう。\`However\`という逆接のマーカーから、ここからが擁護派のターンだと分かります。」

3. **思考の更新**: 次のパラグラフを読んだ際に、理解がどう深まったか、または修正されたかを記述せよ。
   例：「第3段落まで読んだ時点では〇〇だと思っていましたが、第4段落の\`But\`以降で、実は△△という対立構造があることが明らかになります。」

4. **論理マーカーの活用**: But, For example, In conclusionなどの繋ぎ言葉が、読解にどう貢献するかを明示せよ。
   例：「\`For example\`という具体例のマーカーが出てきたので、直前の抽象的な主張を具体化する内容が続くと予測できます。」

5. **選択肢の徹底排除**: 正解への誘導だけでなく、不正解の選択肢が「なぜ、どのように」間違っているのか（言い過ぎ、不一致、記述なし等）を論理的に論破せよ。
   例：「選択肢1は『satisfied』とありますが、本文では彼女が不満を抱いていたと明記されているため、真逆の内容で誤りです。選択肢2は...」

6. **脱AI表記**: アスタリスク（*）記号は一切使用禁止。文中の強調は「」などの括弧や、適切な見出しを活用して表現せよ。AI特有の箇条書きスタイルを避け、流麗な日本語の解説記事として執筆せよ。

7. **文章構成**: 単なる箇条書きではなく、プロの解説記事として読める流麗な日本語（マークダウン形式）で執筆せよ。各大問ごとに、本文読解→設問解説の流れで構成すること。

【悪い例】（このような簡潔すぎる解説は不可）
「大問1は障害者の権利に関する文章です。設問は本文の内容を問うものです。各選択肢を本文と照らし合わせて正解を選びましょう。」

【良い例】（このレベルの詳細さが必須）
「### 大問I 長文読解

この長文は、Deborah Lauferという障害を持つ女性が、ホテルのウェブサイトにアクセシビリティ情報が不足しているとして多数の訴訟を起こした事例に関するニュース記事です。

#### 本文読解と思考プロセス

**第1・2段落：問題提起**
まず第1段落では、Lauferさんが車椅子で利用できるホテルを探すのに苦労し、時には車中泊を余儀なくされたという個人的な経験が語られます。\\\`she slept in her car after arriving at a hotel to find she could not access the property.\\\`という一文は、彼女の絶望感と、問題の深刻さを物語っています。

続く第2段落で、彼女の具体的な行動が説明されます。\\\`filed hundreds of disability discrimination lawsuits against hotels she never planned to visit.\\\`とあります。これは、個人的な旅行のためではなく、社会制度を問うための行動、いわゆる「テスター」としての活動なのだと理解できます。

**第3・4段落：賛成論と反対論**
第3段落は、彼女の支持者の意見です。\\\`They draw parallels to Black civil rights advocates who intentionally rode segregated buses...\\\`とあります。これは、彼女の行動を歴史的な公民権運動になぞらえ、その正当性を主張する強力な論拠です。

しかし、第4段落の冒頭に\\\`But\\\`という逆接のマーカーがあります。ここから反対意見が始まると予測できますね。ホテル側の弁護士は、\\\`unlike the in-person work of civil rights advocates... Laufer was never directly interacting with the property owners\\\`と反論します。オンラインでの調査と、物理的に現場に赴く行動との違いを問題にしているわけです。

#### 設問解説

**(問1)(ア)** 下線部\\\`on behalf of the broader disabled community\\\`は「より広範な障害者コミュニティを代表して／のために」という意味です。選択肢2の\\\`for the benefit of people with various difficulties\\\`が最も意味が近いです。選択肢1は「近所での地位」、3は「すべてのコミュニティ」、4は「オンライン予約をする旅行者」に言及しており、文脈から外れています。このように、まず句の基本的な意味を理解し、各選択肢を文脈と照らし合わせることで正解を導き出します。」

【対象とする試験構造】
${JSON.stringify(structureData, null, 2)}

【重要】上記の「良い例」のような、詳細で論理的な解説を執筆してください。
出力は解説の本文（マークダウン）のみにしてください。JSONなどのコードブロックは不要です。
`;

  const result2 = await model.generateContent([
    { inlineData: { mimeType: "application/pdf", data: questionPdfData } },
    { text: step2Prompt }
  ]);

  const detailedAnalysis = result2.response.text().trim();
  if (!detailedAnalysis) throw new Error("Step 2 analysis content represents empty string.");

  // --- FINAL ASSEMBLY ---
  const finalJson = {
    id: outputId,
    university: extraInfo.university || '大学名',
    universityId: extraInfo.universityId || 0,
    faculty: extraInfo.faculty || '学部名',
    facultyId: extraInfo.facultyId || 'faculty',
    year: extraInfo.year || 2025,
    subject: extraInfo.subject || '科目名',
    subjectEn: subjectType,
    type: "pdf",
    pdfPath: `/exam_data/${path.basename(questionPdfPath)}`,
    maxScore: structureData.maxScore,
    detailedAnalysis: detailedAnalysis, // Simply assign the text
    structure: structureData.structure
  };

  const outputPath = path.join(process.cwd(), 'src/data/exams', `${outputId}.json`);
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(finalJson, null, 2));
  console.log(`Successfully generated high-quality master data: ${outputPath}`);
}

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log("Usage: node scripts/generate_exam_master.js <english|social> <q_pdf> <a_pdf> <id> [uni] [uniId] [faculty] [year] [subject]");
  process.exit(1);
}

generateExamMaster(args[0], args[1], args[2], args[3], {
  university: args[4],
  universityId: parseInt(args[5]),
  faculty: args[6],
  year: parseInt(args[7]),
  subject: args[8]
});
