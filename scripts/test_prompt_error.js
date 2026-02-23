import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

async function testPromptError() {
    try {
        const outputId = "test-123";
        const subjectSpecificRules = "A < B < C < D";
        const step1Prompt = `
あなたは大学入試のデータ解析エキスパートです。
添付された「問題ファイル」と「解答ファイル」を厳密に分析し、試験の構造（大問・小問）、正解、配点のみを抽出してJSON形式で出力してください。

【厳格ルール】
1. Google検索を使用するか、または一般常識からこの試験（${outputId}）の「正確な配点情報」と「満点」を推測・調査してください。もし公式の配点が不明な場合は、満点を100点とし、問題の難易度や上記ルールに基づいて全ての小問に妥当な配点を割り振ってください。配点が0になったり空欄になることは絶対に避けてください。
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
          "explanation": "この問題の解き方を、以下の要素を全て含めて4-6文で詳しく説明せよ：\\n 1. なぜその答えになるのか（根拠となる部分を具体的に引用）\\n 2. 他の選択肢がなぜ間違っているか（消去法の思考プロセス）\\n 3. 受験生が再現できる解法の手順\\n ※ 単語だけの羅列や、1文の簡潔すぎる説明は不可。論理的な文章として記述すること。",
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

        console.log("Sending Step 1 request...");
        // Mock the PDF with a tiny text string just to see if the PROMPT itself crashes it
        const result1 = await model.generateContent([
            { text: "This is a fake PDF content. Question 1: What is 1+1? Answer: 2. Question 2: Explain history of Japan." },
            { text: step1Prompt }
        ]);
        const res1Text = result1.response.text();
        console.log("Step 1 succeeded. Result length:", res1Text.length);
    } catch (err) {
        console.error("Step 1 Error:", err);
    }
}

testPromptError();
