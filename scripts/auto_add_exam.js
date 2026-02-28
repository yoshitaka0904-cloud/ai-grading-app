import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
    dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const geminiApiKey = process.env.VITE_GEMINI_API_KEY_V2 || process.env.VITE_GEMINI_API_KEY;

if (!supabaseUrl || !supabaseKey || !geminiApiKey) {
    console.error("Missing required environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_GEMINI_API_KEY)");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Custom json sanitizer
const sanitizeJson = (jsonString) => {
    if (!jsonString) return "";
    let clean = jsonString.trim();
    const firstBrace = clean.indexOf('{');
    const firstBracket = clean.indexOf('[');
    let startIndex = -1;
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) { startIndex = firstBrace; }
    else if (firstBracket !== -1) { startIndex = firstBracket; }

    if (startIndex !== -1) {
        const lastBrace = clean.lastIndexOf('}');
        const lastBracket = clean.lastIndexOf(']');
        let endIndex = -1;
        if (lastBrace > lastBracket) { endIndex = lastBrace; }
        else { endIndex = lastBracket; }
        if (endIndex !== -1 && endIndex > startIndex) {
            clean = clean.substring(startIndex, endIndex + 1);
        }
    }
    clean = clean.replace(/```json/g, "").replace(/```/g, "").trim();

    // Rescue closing missing
    const openBraces = (clean.match(/\{/g) || []).length;
    const closeBraces = (clean.match(/\}/g) || []).length;
    if (openBraces > closeBraces) clean += "}".repeat(openBraces - closeBraces);

    const openBrackets = (clean.match(/\[/g) || []).length;
    const closeBrackets = (clean.match(/\]/g) || []).length;
    if (openBrackets > closeBrackets) clean += "]".repeat(openBrackets - closeBrackets);

    return clean;
};

// Parse arguments
const args = process.argv.slice(2);
const params = {
    questionPdf: "",
    answerPdf: "",
    university: "",
    faculty: "",
    year: new Date().getFullYear().toString(),
    subject: "",
    subjectEn: "english",
    id: ""
};

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--") && i + 1 < args.length) {
        const key = arg.replace("--", "");
        if (Object.keys(params).includes(key)) {
            params[key] = args[i + 1];
            i++;
        }
    }
}

if (!params.questionPdf || !params.university || !params.faculty || !params.subject) {
    console.error("Usage: node scripts/auto_add_exam.js --questionPdf <path> [--answerPdf <path>] --university <str> --faculty <str> --year <num> --subject <str> --subjectEn <english|math|...>");
    process.exit(1);
}

// Generate an ID if not provided
if (!params.id) {
    const cleanUni = params.university.replace(/\\s+/g, '-').toLowerCase();
    const cleanFac = params.faculty.replace(/\\s+/g, '-').toLowerCase();
    params.id = `${cleanUni}-${cleanFac}-${params.year}-${params.subjectEn}`;
}

const run = async () => {
    console.log(`Starting automated ingestion for: ${params.id}`);

    // 1. Read files
    console.log("Reading PDF files...");
    const qBuffer = fs.readFileSync(params.questionPdf);
    let aBuffer = null;
    if (params.answerPdf) {
        aBuffer = fs.readFileSync(params.answerPdf);
    }

    const imageParts = [
        { inlineData: { mimeType: "application/pdf", data: qBuffer.toString("base64") } }
    ];
    if (aBuffer) {
        imageParts.push({ inlineData: { mimeType: "application/pdf", data: aBuffer.toString("base64") } });
    }

    // 2. Generate Master Data (Structure)
    console.log("Generating master structure data with Gemini...");
    const modelOptions = {
        model: "gemini-2.0-flash", // We use 2.0-flash for speed and context support
        generationConfig: {
            responseMimeType: "application/json",
        },
        tools: [{ googleSearchRetrieval: {} }]
    };

    let subjectSpecificRules = "";
    if (params.subjectEn === 'social' || params.subjectEn === 'history' || params.subjectEn === 'japanese-history') {
        subjectSpecificRules = `
【社会科目 採点・配点設計ルール（絶対固定）】

あなたは、難関大学入試（早稲田・慶應レベル）の社会問題において、配点設計および採点構造を運用する専門担当者である。
ただし、設問パターンの分類・配点の序列・論述の採点原理は、すでにユーザーによって厳密に定義されている。
あなたの役割は、以下に示すユーザー定義を一切変更・補正・一般化せず、そのまま適用することである。

⸻
【0. ユーザー定義（絶対固定）】
① 設問の大分類（2種）：選択問題（マーク）、記述問題（自力記入）
② 設問の小分類（5パターン）
A．選択問題（1つ選択）
B．選択問題（2つ選択）
C．記述問題（歴史用語）
D．論述問題（短・20字以内）
E．論述問題（長・30字以上）

③ 配点の序列（小 → 大）
配点は必ず以下の順序関係を保つこと：
 1. 選択問題（1つ選択） [低]
 2. 記述問題（歴史用語）
 3. 選択問題（2つ選択）
 4. 論述問題（短）
 5. 論述問題（長） [高]
※ この大小関係は絶対に逆転させてはならない。

④ 論述問題の採点原理（固定）
・模範回答は複数の「要素」に分解される。各要素は同価値。
・要素充足のみを基準とし比例配点を行う。表現の巧拙は評価対象としない。

⸻
【内部実行ルール】
・2-1設問分類: 各設問をA〜Eのいずれかに必ず分類。
・2-2配点割当: ③で定義された序列を絶対条件として割り振る。同一タイプ内での微調整は可だが、タイプ間の配点逆転は禁止。
・2-3論述要素: 模範回答を要素に分解し要素数を明示。

※ 重要: 本システムでは最終出力として必ず指定された JSON フォーマットが必要です。
この厳密なルールに基づいて配点（points）や解説文としての思考プロセスを計算・処理した上で、各小問単位の JSON オブジェクトに反映してください。
`;
    }

    const structurePrompt = `あなたは大学入試の専門講師です。
提供された問題ファイル（および解答ファイル）をもとに、この試験の構造（大問・小問）を分析し、JSON形式のスキーマを出力してください。
Google検索ツールを使用して、「${params.university} ${params.faculty} ${params.subject} ${params.year}年 配点満点」などを検索し、正確な満点や大問ごとの配点予想を反映してください。
${subjectSpecificRules}

【出力要件】
{
  "max_score": 100,
  "structure": [
    {
      "id": "1",
      "no": "第1問",
      "instruction": "次の英文を読み、下の問いに答えよ。",
      "passage": "本文テキスト（抽出できれば）",
      "type": "reading_comprehension",
      "questions": [
        {
          "id": "1-1",
          "no": "問1",
          "type": "selection",
          "question_text": "下線部(1)の意味として最も適切なものを選べ",
          "options": ["A", "B", "C", "D"],
          "points": 5,
          "correctAnswer": "A",
          "explanation": "解説（ここにA〜Eの分類や配点理由などの思考プロセスを含めてもよい）"
        }
      ]
    }
  ]
}
要件：
- max_scoreは検索結果に基づく合計満点。
- typeは "selection"(選択問題) または "text"(記述問題) が基本。
- 抽出できない箇所は推測で補うか空欄にするが、構造は崩さないこと。
出力はJSONのみとしてください。`;

    const modelJson = genAI.getGenerativeModel(modelOptions);
    let masterDataResult;
    try {
        const result = await modelJson.generateContent([structurePrompt, ...imageParts]);
        const text = result.response.text();
        const cleanJson = sanitizeJson(text);
        if (!cleanJson) throw new Error("Empty JSON returned");
        masterDataResult = JSON.parse(cleanJson);
        console.log("Master data successfully generated.");
    } catch (err) {
        console.error("Failed to generate master data. Exiting...", err);
        process.exit(1);
    }

    // 3. Generate Detailed Analysis
    console.log("Generating detailed overall explanation with Gemini...");
    const textModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let analysisPrompt = "";
    if (params.subjectEn === 'english') {
        analysisPrompt = `あなたは、難関大学入試（早稲田・慶應レベル）の英語長文問題を解く専門家である。
目的は「答え」ではなく、受験生が同じやり方を再現できるレベルで、
設問準備・読解・解答の思考プロセスを口語体でなく文語体で完全に言語化することである。

────────────────
【最重要前提】

・設問準備 → 読解 → 設問処理は分離されていない
・解説は「実際に問題を解いている時系列」で書く
・本文解説では、必ず英文を引用しながら進める
・日本語の解説は、必ず直前に引用した英文に対応させる
・箇条書き・矢印・処理ログ風の書き方は禁止
・受験生が「英文 ↔ 解説」を往復できる文章にする

────────────────
【0. 入力】

以下が与えられる：
・本文（段落番号つき推奨）※添付画像（PDF）を参照
・設問（番号つき・選択肢つき）※添付画像（PDF）及び以下の構造データを参照
・（任意）ユーザー指定の正解 ※以下の構造データを参照

【試験データ構造】
${JSON.stringify({ maxScore: masterDataResult.max_score, structure: masterDataResult.structure }, null, 2)}

────────────────
【1. 内部実行ルール（※出力しないが必ず実行）】

### 1-1. 設問準備（読む前）

本文を読む前に、全設問を確認し、各設問について次のみを行う：

・設問タイプの把握（傍線部説明／定義／NOT／比喩／理由 など）
・「どの段落まで読めば解けるか」の見通し
・読解中に意識すべき観点（But／抽象→具体／評価語 など）

重要：
・この段階では答えを作らない
・やるのは「読み方の設計」だけ

### 1-2. 読解（解きながら読む）

各段落について、必ず以下の流れで処理する：

A. 段落に入る前に、今どの設問を意識しているかを確認  
B. 英文を **一文ずつ引用** する  
C. その英文を読んだ瞬間に頭の中で行っている判断を、日本語の文章で説明する  
D. 次の英文で、理解がどう修正・更新されたかを書く  
E. But／疑問文／言い換え／抽象↔具体が出た場合は、必ず意味づけを言語化する  
F. 段落を読み終えた時点で、
   ・段落の趣旨
   ・本文全体における役割
   を文章でまとめる
G. この時点で解ける設問があれば、
   「ここまで読めばこの設問に必要な情報はそろっている」
   という自然な日本語で示す

重要：
・いきなり段落要約から入らない
・必ず「英文 → 思考 → 英文 → 思考」の流れを守る

### 1-3. 選択肢処理

選択肢問題は、正解探しではなく「誤りの言語化」で処理する。

・各誤選択肢について、
  - 本文のどこがズレているか
  - ズレの種類（言い過ぎ／範囲ズレ／主語述語ズレ／抽象化しすぎ等）
を短い文章で明確に説明する。

────────────────
【2. 出力順（絶対厳守）】

以下の順番を必ず守る。

① 解答一覧  
② 設問準備フェーズ（文章で）  
③ 読みながら解くプロセス（段落ごと・英文引用必須）  
④ 設問ごとの解答プロセス  
⑤ 本文全文和訳  
⑥ 完全解説（①〜④を統合した時系列の最終版）

────────────────
【3. 各出力の詳細】

①【解答一覧】
・ユーザー指定の解答をそのまま列挙
・理由は書かない

②【設問準備フェーズ】
・箇条書きは禁止
・各設問について
  「この設問は何を聞いており、どこをどう読めば解けそうか」
  を文章で説明する

③【読みながら解くプロセス】
・必ず英文を引用しながら進める
・一文ごとに
  「この文を読んだ時点ではこう理解する」
  「次の文でこの理解がこう変わる」
  を書く
・設問との接続は自然な文章で行う

④【設問ごとの解答プロセス】
・どの段落・どの英文を根拠にしたかを明示
・他の選択肢がなぜ違うかを本文ベースで説明

⑤【本文全文和訳】
・自然な日本語
・逐語訳ではないが情報は落とさない
・解説は入れない

⑥【完全解説】
・設問準備 → 読解 → 解答が
  実際の頭の中でどう往復しているかを、
  一続きの文章として再構成する
・時系列を絶対に崩さない

────────────────
【4. 禁止事項】

・箇条書き中心の解説
・処理ログ風の羅列
・英文を示さずに日本語だけで説明すること
・参考書的なまとめ先行の解説
・「なんとなく」「感覚的に」などの曖昧表現
・アスタリスク（*）記号は一切使用しないこと（太字等はHTMLタグや他の記号で代用するか使用を控える）

以上のルールに従い、すべてMarkdownで記述し、コードブロック(\`\`\`markdown など)で全体を囲まず、直接本文のみを出力してください。`;
    } else {
        analysisPrompt = `あなたは大学入試の専門講師です。提供された問題と解答のファイル、および抽出された構造データをもとに、試験の「全体詳細解説（Markdown形式）」を作成してください。

【試験データ構造】
${JSON.stringify({ maxScore: masterDataResult.max_score, structure: masterDataResult.structure }, null, 2)}

【要件】
1. 受験生が復習する際に役立つよう、大問ごとに丁寧な解説を記述すること。
2. マークダウン形式（見出し、箇条書き、太字等）を用いて読みやすく構造化すること。
3. コードブロック表記(\`\`\`markdown など)で全体を囲まないこと。本文のみを出力すること。

出力は解説本文（Markdown）のみを返してください。`;
    }

    let detailedAnalysis = "";
    try {
        const dlResult = await textModel.generateContent([analysisPrompt, ...imageParts]);
        detailedAnalysis = dlResult.response.text();
        console.log("Detailed explanation generated.");
    } catch (err) {
        console.warn("Failed to generate detailed analysis, continuing...", err);
    }

    // 4. Upload Question PDF to Supabase Storage
    console.log("Uploading PDF to Supabase Storage...");
    const fileExt = params.questionPdf.split('.').pop().toLowerCase();
    const fileName = `${params.id}_${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('exam-pdfs')
        .upload(filePath, qBuffer, { contentType: 'application/pdf', upsert: true });

    let finalPdfUrl = "";
    if (uploadError) {
        console.error("Storage upload error:", uploadError);
    } else {
        const { data: { publicUrl } } = supabase.storage.from('exam-pdfs').getPublicUrl(filePath);
        finalPdfUrl = publicUrl;
        console.log(`PDF uploaded: ${finalPdfUrl}`);
    }

    // 5. Insert Exam Data to Supabase Data Table
    console.log("Saving exam data to database...");
    const payload = {
        id: params.id,
        university: params.university,
        university_id: 1, // Defaulting or could parse intelligently
        faculty: params.faculty,
        faculty_id: "general",
        year: parseInt(params.year),
        subject: params.subject,
        subject_en: params.subjectEn,
        type: "pdf",
        pdf_path: finalPdfUrl,
        max_score: masterDataResult.max_score || 100,
        detailed_analysis: detailedAnalysis,
        structure: masterDataResult.structure,
        updated_at: new Date().toISOString()
    };

    const { data: dbData, error: dbError } = await supabase.from("exams").upsert([payload]).select();

    if (dbError) {
        console.error("Failed to save to database:", dbError);
        process.exit(1);
    } else {
        console.log(`✅ Successfully automated ingestion!\nExam ID: ${params.id}`);
        console.log(`You can now review it at: /admin/exam/${params.id}`);
    }
};

run();
