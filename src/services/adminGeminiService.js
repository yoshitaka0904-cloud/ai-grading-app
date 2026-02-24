import { GoogleGenerativeAI } from "@google/generative-ai";

const MODELS = {
  PRIMARY: "gemini-2.0-flash",
  FALLBACK: "gemini-1.5-flash"
};

export const sanitizeJson = (jsonString) => {
  if (!jsonString) return "";

  let clean = jsonString.trim();

  // Primary rescue: Find the first and last JSON-like characters to strip conversational filler
  const firstBrace = clean.indexOf('{');
  const firstBracket = clean.indexOf('[');
  let startIndex = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIndex = firstBrace;
  } else if (firstBracket !== -1) {
    startIndex = firstBracket;
  }

  if (startIndex !== -1) {
    const lastBrace = clean.lastIndexOf('}');
    const lastBracket = clean.lastIndexOf(']');
    let endIndex = -1;
    if (lastBrace > lastBracket) {
      endIndex = lastBrace;
    } else {
      endIndex = lastBracket;
    }

    if (endIndex !== -1 && endIndex > startIndex) {
      clean = clean.substring(startIndex, endIndex + 1);
    }
  }

  // Remove markdown code blocks if present (legacy fallback)
  clean = clean.replace(/```json/g, "").replace(/```/g, "").trim();

  // Rescue for truncation: Add missing closing brackets/braces
  const openBraces = (clean.match(/\{/g) || []).length;
  const closeBraces = (clean.match(/\}/g) || []).length;
  if (openBraces > closeBraces) {
    clean += "}".repeat(openBraces - closeBraces);
  }

  const openBrackets = (clean.match(/\[/g) || []).length;
  const closeBrackets = (clean.match(/\]/g) || []).length;
  if (openBrackets > closeBrackets) {
    clean += "]".repeat(openBrackets - closeBrackets);
  }

  return clean;
};

// --- RETRY UTILITY FOR 429 ERRORS ---
const withRetry = async (fn, maxRetries = 10, initialDelay = 5000) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      // Check for 429 in various formats
      const isRateLimit = (error.status === 429) ||
        (error.message?.includes("429")) ||
        (error.message?.includes("Resource exhausted")) ||
        (error.message?.includes("Too many requests"));

      if (isRateLimit && attempt < maxRetries) {
        // Exponential backoff: 5s, 10s, 20s, 40s...
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.warn(`[GeminiService] Rate limit hit (429/TooManyRequests). Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};

// Helper function to convert File to base64 and preserve mimeType
// For images, we resize/compress them to avoid payload size errors
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const isImage = file.type.startsWith('image/');

    if (isImage) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          // Max dimensions
          const MAX_WIDTH = 1600;
          const MAX_HEIGHT = 1600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // Get high quality jpeg (smaller than uncompressed image)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          const base64String = dataUrl.split(',')[1];
          resolve({ data: base64String, mimeType: 'image/jpeg' });
        };
        img.onerror = () => reject(new Error('Failed to load image for compression'));
        img.src = e.target.result;
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);

    } else {
      // For PDFs
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve({ data: base64String, mimeType: file.type });
      };
      reader.onerror = error => reject(error);
    }
  });
};

export const generateExamMasterData = async (apiKey, subjectType, questionFiles, answerFiles, extraInfo) => {
  try {
    console.log("[AdminGeminiService] Using model:", MODELS.PRIMARY);
    console.log("[AdminGeminiService] API Key check:", apiKey ? "Set (length: " + apiKey.length + ")" : "Not found");

    if (!apiKey) {
      console.error("[AdminGeminiService] CRITICAL: apiKey parameter is missing");
      throw new Error("Gemini API Key is not set. Please check your .env file and restart the dev server.");
    }

    let genAI;
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (err) {
      console.error("[AdminGeminiService] Failed to initialize GoogleGenerativeAI:", err);
      throw new Error("Gemini APIの初期化に失敗しました。APIキーが正しくない可能性があります。");
    }

    let model;
    try {
      model = genAI.getGenerativeModel({
        model: MODELS.PRIMARY,
        // tools: [{ googleSearch: {} }]
      });
    } catch (err) {
      console.error("[AdminGeminiService] Failed to get generative model:", err);
      throw new Error(`モデル "${MODELS.PRIMARY}" の読み込みに失敗しました。`);
    }

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

    const questionFileDataArray = await Promise.all(questionFiles.map(file => fileToBase64(file)));
    const answerFileDataArray = await Promise.all(answerFiles.map(file => fileToBase64(file)));

    const questionInlineData = questionFileDataArray.map(fd => ({ inlineData: { mimeType: fd.mimeType, data: fd.data } }));
    const answerInlineData = answerFileDataArray.map(fd => ({ inlineData: { mimeType: fd.mimeType, data: fd.data } }));
    const outputId = extraInfo.id;

    // --- STEP 1a: OVERVIEW EXTRACTION ---
    console.log(`[Step 1/3] Extracting high-level exam structure for ${outputId}...`);
    const step1aPrompt = `
あなたは大学入試のデータ解析エキスパートです。
添付されたファイルを分析し、試験の全体構造（大問のIDとラベルのみ）と、公表されている「満点」を抽出してください。
また、各社の大手予備校の推測配点や一般的な配点配分に基づき、各大問に合計何点を配分すべきかを推測してください。

【厳格ルール】
1. JSON形式のみを出力してください。
2. アスタリスク（*）記号を絶対に使用しないでください。
3. 全ての大問の 推測配分 (allocatedPoints) の合計が、必ず 'maxScore' と一致するように調整してください。
${subjectSpecificRules}

【出力構造】
{
  "maxScore": 100,
  "sections": [
    {
      "id": "I",
      "label": "第1問（長文読解）",
      "allocatedPoints": 40
    }
  ]
}
`;

    const result1a = await withRetry(() => model.generateContent({
      contents: [{
        role: 'user', parts: [
          ...questionInlineData.map(d => ({ inlineData: d.inlineData })),
          ...answerInlineData.map(d => ({ inlineData: d.inlineData })),
          { text: step1aPrompt }
        ]
      }],
      generationConfig: { responseMimeType: "application/json" }
    }));

    const overviewText = result1a.response.text();
    const overviewData = JSON.parse(sanitizeJson(overviewText));
    console.log(`[Step 1a] Structure found: ${overviewData.sections.length} sections. Total points: ${overviewData.maxScore}`);

    // --- STEP 1b: DETAILED SECTION-BY-SECTION EXTRACTION ---
    const fullSections = [];
    for (let i = 0; i < overviewData.sections.length; i++) {
      const s = overviewData.sections[i];
      console.log(`[Step 2/3] Extracting details for Section ${s.id} (${i + 1}/${overviewData.sections.length})...`);

      // Add a mandatory delay between sections to avoid hitting RPM (Requests Per Minute) limits
      if (i > 0) {
        console.log(`[Step 2/3] Waiting 5s to stay within rate limits...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }

      const step1bPrompt = `
添付されたファイルを再度分析し、「大問 ${s.id} （${s.label}）」に含まれるすべての小問について、正解、配点、簡潔な解説のみを抽出してください。

【厳格ルール】
1. この大問には「合計 ${s.allocatedPoints} 点」を割り振る必要があります。小問ごとの配点の合計が必ず ${s.allocatedPoints} になるように調整してください。
2. 客観式問題には "gradingCriteria" を含めないでください。
3. 記述式問題にのみ "gradingCriteria" を作成してください。
4. アスタリスク（*）記号を絶対に使用しないでください。
5. JSONの配列のみ（[ ... ]）を出力してください。
${subjectSpecificRules}

【出力構造】
[
  {
    "id": "小問ID",
    "label": "小問ラベル",
    "type": "selection | text",
    "options": ["a", "b", "c", "d"],
    "correctAnswer": "正解",
    "points": 5,
    "explanation": "この問題の解き方を、以下の要素を全て含めて4-6文で詳しく説明してください：\\n1. なぜその答えになるのか（根拠となる本文の記述を具体的に引用）\\n2. 他の選択肢がなぜ間違っているか（消去法の思考プロセス）\\n3. 受験生が再現できる解法の手順\\n※ 単語だけの羅列や、1-2文の簡潔すぎる説明は不可。論理的な文章として記述すること。",
    "gradingCriteria": { // 記述式のみ
      "keywords": ["必須語1"],
      "elements": ["採点要素1"],
      "elementCount": 1,
      "description": "採点基準"
    }
  }
]
`;

      const result1b = await withRetry(() => model.generateContent({
        contents: [{
          role: 'user', parts: [
            ...questionInlineData.map(d => ({ inlineData: d.inlineData })),
            ...answerInlineData.map(d => ({ inlineData: d.inlineData })),
            { text: step1bPrompt }
          ]
        }],
        generationConfig: { responseMimeType: "application/json" }
      }));

      const sectionDataRaw = result1b.response.text();
      const sectionDataSanitized = sanitizeJson(sectionDataRaw);

      let sectionQuestions;
      try {
        sectionQuestions = JSON.parse(sectionDataSanitized);
      } catch (err) {
        console.error(`[AdminGeminiService] Failed to parse questions for Section ${s.id}`);
        console.error(`[AdminGeminiService] Sanitized Content:`, sectionDataSanitized);
        throw new Error(`大問 ${s.id} の解析に失敗しました。AIの回答が正しくありません。`);
      }

      fullSections.push({
        ...s,
        questions: sectionQuestions
      });
    }

    const structureData = {
      maxScore: overviewData.maxScore,
      structure: fullSections
    };

    // --- STEP 1.5: MATH NORMALIZATION FOR POINTS ---
    // LLMs often fail to make a long list of numbers sum exactly to the max score.
    // We mathematically normalize the points here to perfectly match maxScore.
    let currentTotal = 0;
    structureData.structure.forEach(sec => {
      sec.questions.forEach(q => {
        currentTotal += (parseInt(q.points) || 0);
      });
    });

    const targetTotal = parseInt(structureData.maxScore) || 100;

    if (currentTotal > 0 && currentTotal !== targetTotal) {
      console.log(`[Step 1.5] Normalizing points. AI Total: ${currentTotal}, Target: ${targetTotal}`);
      const ratio = targetTotal / currentTotal;
      let newTotal = 0;

      // First pass: proportional multiplication
      structureData.structure.forEach(sec => {
        sec.questions.forEach(q => {
          let orig = parseInt(q.points) || 0;
          let newVal = Math.round(orig * ratio);
          if (newVal === 0 && orig > 0) newVal = 1; // Never round down to 0 points completely
          q.points = newVal;
          newTotal += newVal;
        });
      });

      // Second pass: distribute the remaining difference (+/- 1 point) across the highest-value questions
      let diff = targetTotal - newTotal;
      if (diff !== 0) {
        let flatQs = [];
        structureData.structure.forEach(sec => sec.questions.forEach(q => flatQs.push(q)));
        // Sort descending so larger questions absorb the rounding differences
        flatQs.sort((a, b) => b.points - a.points);

        let i = 0;
        let safeguards = 0;
        while (diff > 0 && safeguards < 1000) {
          flatQs[i % flatQs.length].points += 1;
          diff--;
          i++;
          safeguards++;
        }

        i = 0; safeguards = 0;
        while (diff < 0 && safeguards < 1000) {
          if (flatQs[i % flatQs.length].points > 1) {
            flatQs[i % flatQs.length].points -= 1;
            diff++;
          }
          i++;
          safeguards++;
        }
      }
      console.log(`[Step 1.5] Normalization complete. Points now exactly sum to ${targetTotal}.`);
    }

    // --- STEP 3: DETAILED ANALYSIS GENERATION (OPTIONAL) ---
    let detailedAnalysis = "";
    if (extraInfo.generateDetailed !== false) {
      console.log(`[Step 3/3] Writing high-quality detailed analysis for ${outputId}...`);
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

**問1 (1) 正解: 3**
設問は、Lauferさんがなぜ多くの訴訟を起こしたのかを問うています。
選択肢1は「個人的な利益のため」とありますが、第2段落で彼女の目的は権利擁護だと示唆されているため不適切です。
選択肢3の「法律の不遵守に注意を喚起するため」が、第2段落の活動内容と合致します。」

【対象とする試験構造】
${JSON.stringify(structureData, null, 2)}

出力は解説の本文（マークダウン）のみにしてください。JSONなどのコードブロックは不要です。
`;

      const result2 = await withRetry(() => model.generateContent([
        ...questionInlineData,
        { text: step2Prompt }
      ]));

      detailedAnalysis = result2.response.text().trim();
      if (!detailedAnalysis) throw new Error("Step 2 analysis content represents empty string.");
    } else {
      console.log(`[Step 2/2] Skipping detailed analysis as requested.`);
      detailedAnalysis = "ここに詳細解説を入力してください（自動生成はスキップされました）。";
    }

    // --- FINAL ASSEMBLY ---
    const finalJson = {
      id: outputId,
      university: extraInfo.university || '大学名',
      university_id: extraInfo.universityId || 0,
      faculty: extraInfo.faculty || '学部名',
      faculty_id: extraInfo.facultyId || 'faculty',
      year: extraInfo.year || 2025,
      subject: extraInfo.subject || '科目名',
      subject_en: subjectType,
      type: "pdf",
      // Assuming pdf is manually uploaded to a bucket later, or just a generic path
      pdf_path: `/exam_data/${questionFiles[0]?.name || 'unknown'}`,
      max_score: structureData.maxScore,
      detailed_analysis: detailedAnalysis,
      structure: structureData.structure
    };

    return finalJson;
  } catch (error) {
    console.error("Error generating exam master data:", error);
    throw error;
  }
};

export const regenerateQuestionExplanation = async (apiKey, questionData, questionFiles = [], answerFiles = []) => {
  try {
    console.log("[AdminGeminiService] Explanation - API Key check:", apiKey ? "Set" : "Not found");

    if (!apiKey) {
      throw new Error("Gemini API Key is not set.");
    }

    let genAI;
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (err) {
      throw new Error("Gemini APIの初期化に失敗しました。");
    }

    let model;
    try {
      model = genAI.getGenerativeModel({
        model: MODELS.PRIMARY,
        // tools: [{ googleSearch: {} }] // Allow web search just in case
      });
    } catch (err) {
      throw new Error(`モデル "${MODELS.PRIMARY}" の読み出しに失敗しました。`);
    }

    const imageParts = [];
    if (questionFiles && questionFiles.length > 0) {
      const qDataArray = await Promise.all(questionFiles.map(file => fileToBase64(file)));
      qDataArray.forEach(fd => imageParts.push({ inlineData: { mimeType: fd.mimeType, data: fd.data } }));
    }
    if (answerFiles && answerFiles.length > 0) {
      const aDataArray = await Promise.all(answerFiles.map(file => fileToBase64(file)));
      aDataArray.forEach(fd => imageParts.push({ inlineData: { mimeType: fd.mimeType, data: fd.data } }));
    }

    const prompt = `
あなたは大学入試の専門講師です。
以下の特定の問題について、受験生が納得できる詳細でわかりやすい解説を執筆してください。

【対象の問題データ】
${JSON.stringify(questionData, null, 2)}

【要件】
1. なぜその答えになるのか、論理的なプロセスを解説すること。
2. 選択問題であれば、正解以外の選択肢がなぜ間違っているのかも明確にすること。
3. 添付した問題画像・PDFの参照が必要な場合は、画像/PDFから該当箇所を探して解説に含めること。
4. アスタリスク（*）記号は一切使用禁止。マークダウン（# など）は見やすく使って構いません。

出力は解説の本文（マークダウン）のみにしてください。
`;

    // Use non-streaming for better error reporting and to avoid stream parsing issues
    const result = await withRetry(() => model.generateContent([
      prompt,
      ...imageParts
    ]));

    const text = result.response.text();
    console.log("[AdminGeminiService] Raw Explanation Response:", text.substring(0, 500) + "...");

    // Clean up response (remove markdown code blocks if present)
    const cleanedText = text.replace(/```markdown\n?|```\n?|```/g, '').trim();
    return cleanedText;
  } catch (error) {
    console.error("Error regenerating explanation:", error);
    throw error;
  }
};
