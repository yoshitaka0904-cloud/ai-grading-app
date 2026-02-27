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
    const trimmedKey = apiKey?.trim();
    console.log("[AdminGeminiService] Using model:", MODELS.PRIMARY);

    if (!trimmedKey) {
      console.error("[AdminGeminiService] CRITICAL: apiKey parameter is empty or undefined");
      throw new Error("Gemini API Key is not set. .env.localファイルを確認し、開発サーバーを再起動（Ctrl+Cして npm run dev）してください。");
    }

    let genAI;
    try {
      genAI = new GoogleGenerativeAI(trimmedKey);
    } catch (err) {
      console.error("[AdminGeminiService] Failed to initialize GoogleGenerativeAI:", err);
      throw new Error("Gemini APIの初期化に失敗しました。APIキーの形式が正しくない可能性があります。");
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

    // --- STAGE 0: FULL OCR TRANSCRIPTION (The Foundation) ---
    console.log(`[Stage 0] Transcribing all documents to text...`);
    const ocrPrompt = `
あなたはプロのデータ入力スペシャリスト兼入試分析官です。
提供されたすべての画像（問題と解答）を詳細に読み取り、試験内容を「欠落なく、正確に」マークダウン形式のテキストとして書き出してください。

【出力要件】
1. ページの順序を守り、ページ番号または「第1問」「問題」などの見出しで区切ること。
2. 小問の記号（問1、(a)、1..等）や選択肢の内容を正確に書き起こすこと。
3. 表や特殊な配置も、可能な限りテキストで理解できるように記述すること。
4. 本文、設問、解答のすべてを含めること。
5. 出力はテキストのみとしてください（Markdown形式が好ましい）。

このテキストは、以降のすべての詳細解析の「唯一のソース」となります。
`;

    const ocrResult = await withRetry(() => model.generateContent({
      contents: [{
        role: 'user', parts: [
          ...questionInlineData.map(d => ({ inlineData: d.inlineData })),
          ...answerInlineData.map(d => ({ inlineData: d.inlineData })),
          { text: ocrPrompt }
        ]
      }]
    }));

    const transcribedText = ocrResult.response.text();
    console.log(`[Stage 0] Transcription complete. Length: ${transcribedText.length} characters.`);

    // --- STEP 1a: OVERVIEW EXTRACTION (Using transcribed text) ---
    console.log(`[Step 1/3] Extracting high-level exam structure for ${outputId}...`);
    const step1aPrompt = `
以下の試験内容（テキストデータ）を分析し、試験の全体構造（大問のIDとラベルのみ）と、公表されている「満点」を抽出してください。
また、各社の大手予備校の推測配点や一般的な配点配分に基づき、各大問に合計何点を配分すべきかを推測してください。

【解析対象データ】
${transcribedText}

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

    const result1a = await withRetry(() => model.generateContent(step1aPrompt), 5, 3000);

    const overviewText = result1a.response.text();
    const overviewData = JSON.parse(sanitizeJson(overviewText));
    console.log(`[Step 1a] Structure found: ${overviewData.sections.length} sections. Total points: ${overviewData.maxScore}`);

    // Add a small delay between text-only requests
    await new Promise(resolve => setTimeout(resolve, 2000));

    // --- STEP 1b: ALL SECTIONS IN ONE REQUEST ---
    // Instead of sending one request per section (which causes 429 rate limit errors),
    // we send a single request asking the AI to extract all sections at once.
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(`[Step 2/3] Extracting ALL ${overviewData.sections.length} sections in a single request...`);

    const sectionsSummary = overviewData.sections.map(s =>
      `- 大問 ${s.id}（${s.label}）: 合計 ${s.allocatedPoints} 点`
    ).join('\n');

    const step1bPrompt = `
以下の試験内容（テキストデータ）を分析し、すべての大問・小問について、正解と配点のみを抽出してください。

【解析対象データ】
${transcribedText}

【大問一覧と配点指示】
${sectionsSummary}

【厳格ルール】
1. 各大問の小問配点の合計は、上記で指定した点数と一致させること。
2. 小問の正解と配点のみ、explanationフィールドは必ず空文字列を設定すること。
3. アスタリスク（*）記号を絶対に使用しないでください。
4. 以下のJSON構造のみを出力してください（コードブロックなし）。
5. gradingCriteriaフィールドは一切含めないでください。
${subjectSpecificRules}

【出力構造】
[
  {
    "id": "I",
    "label": "大問ラベル",
    "allocatedPoints": 40,
    "questions": [
      {
        "id": "小問ID",
        "label": "小問ラベル",
        "type": "selection",
        "options": ["a", "b", "c", "d"],
        "correctAnswer": "正解",
        "points": 5,
        "explanation": ""
      }
    ]
  }
]
`;

    const result1b = await withRetry(() => model.generateContent({
      contents: [{ role: 'user', parts: [{ text: step1bPrompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    }), 10, 5000);
    const allSectionsRaw = result1b.response.text();
    const allSectionsSanitized = sanitizeJson(allSectionsRaw);

    let parsedSections;
    try {
      parsedSections = JSON.parse(allSectionsSanitized);
    } catch (err) {
      console.error('[AdminGeminiService] Failed to parse all sections. Raw length:', allSectionsSanitized.length);
      console.error('[AdminGeminiService] First 1000 chars:', allSectionsSanitized.substring(0, 1000));
      console.error('[AdminGeminiService] Last 200 chars:', allSectionsSanitized.slice(-200));
      throw new Error(`全セクションの解析に失敗しました。AIの回答が正しいJSON形式ではありません。(解析: ${err.message})`);
    }

    console.log(`[Step 2/3] Successfully extracted ${parsedSections.length} sections.`);

    // Support both flat (old) and the new sections-with-questions format
    const fullSections = parsedSections.map(sec => ({
      id: sec.id,
      label: sec.label,
      allocatedPoints: sec.allocatedPoints,
      questions: sec.questions || []
    }));

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

    // --- STEP 3: DETAILED ANALYSIS ---
    // Detailed per-question explanations are now generated on-demand
    // via the 'Regenerate' button in the Admin Editor. Skipping here for reliability.
    console.log(`[Step 3/3] Skipping detailed analysis - will be generated on-demand.`);
    const detailedAnalysis = "第1問から各設問の「再生成」ボタンを押して解説を生成してください。";

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
    const trimmedKey = apiKey?.trim();
    console.log("[AdminGeminiService] Explanation - Using model:", MODELS.PRIMARY);
    console.log("[AdminGeminiService] API Key check:", trimmedKey ? `Set (length: ${trimmedKey.length}, starts with: ${trimmedKey.substring(0, 7)}..., ends with: ...${trimmedKey.substring(trimmedKey.length - 4)})` : "Not found");

    if (!apiKey) {
      throw new Error("Gemini API Key is not set.");
    }

    let genAI;
    try {
      genAI = new GoogleGenerativeAI(trimmedKey);
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
