-- 1. Profiles table (ユーザー情報)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT,
    first_choice_university TEXT,
    grade TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Exam Results table (試験結果)
CREATE TABLE IF NOT EXISTS exam_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    university_name TEXT NOT NULL,
    exam_subject TEXT NOT NULL,
    exam_year INTEGER DEFAULT 2025,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    pass_probability TEXT,
    weakness_analysis TEXT,
    question_feedback JSONB,
    answers JSONB,
    section_scores JSONB, -- 大問別得点
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Grading Reports table (採点ミス報告)
CREATE TABLE IF NOT EXISTS grading_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    university_name TEXT NOT NULL,
    exam_subject TEXT NOT NULL,
    question_id TEXT NOT NULL,
    user_answer TEXT,
    correct_answer TEXT,
    ai_explanation TEXT,
    user_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) の設定
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE grading_reports ENABLE ROW LEVEL SECURITY;

-- 自分のデータのみアクセス可能にするポリシー
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own results" ON exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own reports" ON grading_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reports" ON grading_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
