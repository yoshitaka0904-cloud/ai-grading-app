import { GoogleGenerativeAI } from "@google/generative-ai";

const HIGH_REF_MODEL = "gemini-2.5-pro";

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

export const generateExamMasterData = async (subjectType, questionFiles, answerFiles, extraInfo) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API Key is not set in environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: HIGH_REF_MODEL,
      tools: [{ googleSearch: {} }]
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

    const questionFileDataArray = await Promise.all(questionFiles.map(file => fileToBase64(file)));
    const answerFileDataArray = await Promise.all(answerFiles.map(file => fileToBase64(file)));

    const questionInlineData = questionFileDataArray.map(fd => ({ inlineData: { mimeType: fd.mimeType, data: fd.data } }));
    const answerInlineData = answerFileDataArray.map(fd => ({ inlineData: { mimeType: fd.mimeType, data: fd.data } }));
    const outputId = extraInfo.id;

    // --- STEP 1: STRUCTURE & ANSWER EXTRACTION ---
    console.log(`[Step 1/2] Extracting structure and answers for ${outputId}...`);
    const step1Prompt = `
あなたは大学入試のデータ解析エキスパートです。
添付された「問題ファイル」と「解答ファイル」を厳密に分析し、試験の構造（大問・小問）、正解、配点のみを抽出してJSON形式で出力してください。

【厳格ルール】
1. Google検索を使用するか、または一般常識からこの試験（${outputId}）の「正確な配点情報」と「満点」を推測・調査してください。もし公式の配点が不明な場合は、満点を100点とし、問題の難易度や上記ルールに基づいて全ての小問に妥当な配点を割り振ってください。すべての小問の配点を足した合計値が必ず「満点」と完全に一致するように数学的な確認を行ってください。配点が0になったり空欄になることは絶対に避けてください。
2. 客観式問題（選択肢、または単語1つで完結する解答）については、"gradingCriteria" を絶対に含めないでください。空オブジェクト {} も禁止です。
3. 記述式問題（文を書かせる、または要素採点が必要なもの）に限り、"gradingCriteria" を作成してください。
4. 解答のハルシネーション（読み間違い）に細心の注意を払ってください。設問番号と解答が1対1で対応しているか何度も確認してください。
5. **重要：アスタリスク（*）記号を絶対に使用しないでください。** 太字やリスト表記が必要な場合は、他のマークダウン記法（# や - など）を使用するか、記号なしで表現してください。

${subjectSpecificRules}

【出力構造】
{
  "maxScore": 100, // 推測でも良いので必ず数値を入れる
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
          "points": 5, // 推測でも良いので必ず数値を入れる
          "explanation": "解説（1〜2文の簡潔なもの。なぜ正解になるか、なぜ他の選択肢が間違いかを端的に説明せよ）",
          "gradingCriteria": { // 記述式のみ
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

    const result1Stream = await model.generateContentStream([
      ...questionInlineData,
      ...answerInlineData,
      { text: step1Prompt }
    ]);

    let res1Text = "";
    for await (const chunk of result1Stream.stream) {
      res1Text += chunk.text();
    }

    const jsonMatch1 = res1Text.match(/\{[\s\S]*\}/);
    if (!jsonMatch1) throw new Error("Step 1 content missing JSON.");
    const structureData = JSON.parse(jsonMatch1[0]);

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

    // --- STEP 2: DETAILED ANALYSIS GENERATION (OPTIONAL) ---
    let detailedAnalysis = "";
    if (extraInfo.generateDetailed !== false) {
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

**問1 (1) 正解: 3**
設問は、Lauferさんがなぜ多くの訴訟を起こしたのかを問うています。
選択肢1は「個人的な利益のため」とありますが、第2段落で彼女の目的は権利擁護だと示唆されているため不適切です。
選択肢3の「法律の不遵守に注意を喚起するため」が、第2段落の活動内容と合致します。」

【対象とする試験構造】
${JSON.stringify(structureData, null, 2)}

出力は解説の本文（マークダウン）のみにしてください。JSONなどのコードブロックは不要です。
`;

      const result2Stream = await model.generateContentStream([
        ...questionInlineData,
        { text: step2Prompt }
      ]);

      for await (const chunk of result2Stream.stream) {
        detailedAnalysis += chunk.text();
      }
      detailedAnalysis = detailedAnalysis.trim();
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

export const regenerateQuestionExplanation = async (questionData, questionFiles = [], answerFiles = []) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API Key is not set in environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: HIGH_REF_MODEL,
      tools: [{ googleSearch: {} }] // Allow web search just in case
    });

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

    const resultStream = await model.generateContentStream([
      ...imageParts,
      { text: prompt }
    ]);

    let explanation = "";
    for await (const chunk of resultStream.stream) {
      explanation += chunk.text();
    }

    return explanation.trim();
  } catch (error) {
    console.error("Error regenerating explanation:", error);
    throw error;
  }
};
