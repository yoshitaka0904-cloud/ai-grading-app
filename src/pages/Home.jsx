import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniversityCard from '../components/UniversityCard';
import { getUniversities } from '../data/examRegistry';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../services/authService';
import RecruitmentBanner from '../components/RecruitmentBanner';

const Home = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const universities = getUniversities();

    const openAuthModal = () => {
        document.dispatchEvent(new CustomEvent('openAuthModal'));
    };

    return (
        <div className="container">
            <header style={{ marginBottom: '3rem' }}>
                {/* Auth UI */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                    {loading ? (
                        <div style={{ color: '#888' }}>読み込み中...</div>
                    ) : user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/dashboard')}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            >
                                マイページ
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={signOut}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            >
                                ログアウト
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={openAuthModal}
                            style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                        >
                            ログイン / 登録
                        </button>
                    )}
                </div>

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                        zIndex: -1,
                        pointerEvents: 'none'
                    }} />

                    <div className="animate-slide-up" style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        background: 'var(--color-accent-primary)',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        letterSpacing: '0.1em'
                    }}>
                        私大の英語・社会の採点に特化
                    </div>
                    <br />
                    <h1 className="animate-slide-up" style={{
                        fontSize: '4rem',
                        color: 'var(--color-accent-primary)',
                        marginBottom: '1.5rem',
                        fontWeight: '900',
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-heading)',
                        borderBottom: '2px solid var(--color-silver-light)',
                        display: 'inline-block',
                        paddingBottom: '0.5rem'
                    }}>
                        AI入試採点
                    </h1>
                    <p className="animate-slide-up delay-100" style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '1.4rem',
                        marginBottom: '2rem',
                        maxWidth: '800px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.8'
                    }}>
                        志望校の過去問をAIが即座に採点・分析。<br />
                        あなたの専属コーチとして、合格への最短ルートをサポートします。
                    </p>
                </div>

                {/* Features */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '2rem',
                    marginBottom: '8rem'
                }}>
                    <div className="glass-panel animate-fade-in delay-100" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📝</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>1. 過去問を解く</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                            志望校の過去問を選択し、実際の試験と同じ形式で解答します。
                        </p>
                    </div>
                    <div className="glass-panel animate-fade-in delay-200" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🤖</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>2. AIが即座に採点</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                            AIが解答を分析し、数秒で採点結果と詳細なフィードバックを提供します。
                        </p>
                    </div>
                    <div className="glass-panel animate-fade-in delay-300" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>💬</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>3. AI先生に質問</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                            解説でわからなかった点は、チャットでAI先生に何度でも質問できます。
                        </p>
                    </div>
                    <div className="glass-panel animate-fade-in delay-300" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📊</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>4. 弱点を克服</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                            苦手分野を特定し、あなただけの対策アドバイスで得点アップを狙います。
                        </p>
                    </div>
                </div>

                {/* Registration CTA */}
                {!user && (
                    <div className="glass-panel" style={{
                        padding: '4rem',
                        textAlign: 'center',
                        marginBottom: '6rem',
                        background: '#ffffff',
                        borderTop: '4px solid var(--color-accent-primary)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
                    }}>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: 'var(--color-accent-primary)' }}>
                            学習データを保存して、<span style={{ borderBottom: '2px solid var(--color-accent-primary)' }}>成長を可視化</span>しよう
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
                            無料の会員登録をすると、採点結果が自動で保存され、<br />
                            過去の成績推移や詳細な分析レポートをいつでも確認できます。
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                className="btn btn-primary"
                                onClick={openAuthModal}
                                style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', borderRadius: '50px' }}
                            >
                                メールアドレスで登録（無料）
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Sticky Recruitment Banner */}
            <RecruitmentBanner sticky={true} />

            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center', marginTop: '5rem' }}>対応大学一覧</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem'
            }}>
                {universities.map(uni => (
                    <UniversityCard key={uni.id} university={uni} />
                ))}
            </div>
        </div>
    );
};

export default Home;
