import React from 'react';

const RecruitmentBanner = ({ sticky = false }) => {
    const bannerClass = sticky ? 'sticky-banner' : 'static-banner';

    return (
        <div className={`recruitment-banner ${bannerClass}`}>
            <style>
                {`
                .recruitment-banner {
                    display: flex;
                    position: relative;
                    overflow: hidden;
                    color: white;
                    z-index: 1000;
                    box-sizing: border-box;
                    transition: all 0.3s ease;
                }
                .sticky-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 0.3rem 1rem;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
                    animation: slideUpBannerMicro 0.6s ease-out;
                }
                @keyframes slideUpBannerMicro {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .static-banner {
                    margin: 2rem auto;
                    padding: 1.25rem 1rem;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                    max-width: 800px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                }
                .banner-content {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 0.8rem;
                    z-index: 1;
                }
                .line-section {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.3rem 0.75rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 1;
                }
                .banner-badge {
                    background: #fbbf24;
                    color: #0f172a;
                    padding: 0.05rem 0.25rem;
                    border-radius: 2px;
                    font-weight: 900;
                    font-size: 0.6rem;
                }
                .banner-title {
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #f8fafc;
                    white-space: nowrap;
                }
                .banner-tagline {
                    font-size: 0.9rem;
                    font-weight: 900;
                    margin: 0;
                    color: #fff;
                    white-space: nowrap;
                }
                .btn-success-line-micro {
                    background: #06c755;
                    color: white;
                    border: none;
                    padding: 0.3rem 0.6rem;
                    border-radius: 4px;
                    font-weight: 800;
                    font-size: 0.7rem;
                    cursor: pointer;
                    white-space: nowrap;
                }
                @media (max-width: 768px) {
                    .sticky-banner {
                        flex-direction: column;
                        padding: 0.6rem;
                        gap: 0.4rem;
                    }
                    .banner-content {
                        flex-direction: column;
                        gap: 0.2rem;
                    }
                    .banner-tagline {
                        font-size: 0.85rem;
                    }
                }
                `}
            </style>

            <div className="banner-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span className="banner-badge">SE</span>
                    <span className="banner-title">Success Edge</span>
                </div>
                <h3 className="banner-tagline">
                    早慶GMARCH合格率 <span style={{ color: '#fbbf24' }}>140%</span>
                </h3>
            </div>

            <div className="line-section">
                <img src="/images/line-icon.png" alt="LINE" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#fff' }}>無料LINE相談</div>
                    <button className="btn-success-line-micro" onClick={() => window.open('https://lin.ee/ihaPWfv', '_blank')}>
                        友だち追加
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecruitmentBanner;
