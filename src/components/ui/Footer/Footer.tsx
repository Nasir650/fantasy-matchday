'use client';

import React from 'react';
import styles from './Footer.module.css';
import { Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const Footer = () => {
    const t = useTranslations('Footer');

    return (
        <footer className={styles.footer}>
            {/* Main Footer Content */}
            <div className={styles.footerMain}>
                {/* Left Side - Newsletter */}
                <div className={styles.newsletter}>
                    <h4 className={styles.logo}>
                        FANTASY<span className={styles.logoHighlight}>MATCHDAY</span>
                    </h4>
                    <p className={styles.newsletterText}>
                        {t('newsletterText')}
                    </p>
                    <div className={styles.emailForm}>
                        <div className={styles.inputWrapper}>
                            <Mail size={18} className={styles.mailIcon} />
                            <input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                className={styles.emailInput}
                            />
                        </div>
                        <button className={styles.subscribeBtn}>{t('subscribe')}</button>
                    </div>
                    <p className={styles.policyText}>
                        {t('policyText')} <a href="#" className={styles.policyLink}>{t('policy')}</a>
                    </p>
                </div>

                {/* Right Side - Navigation Columns */}
                <div className={styles.navColumns}>
                    <div className={styles.navColumn}>
                        <h5 className={styles.columnTitle}>{t('platform')}</h5>
                        <ul className={styles.navList}>
                            <li><a href="#">{t('liveMatches')}</a></li>
                            <li><a href="#">{t('leagues')}</a></li>
                            <li><a href="#">{t('players')}</a></li>
                            <li><a href="#">{t('prizes')}</a></li>
                        </ul>
                    </div>

                    <div className={styles.navColumn}>
                        <h5 className={styles.columnTitle}>{t('support')}</h5>
                        <ul className={styles.navList}>
                            <li><a href="#">{t('helpCenter')}</a></li>
                            <li><a href="#">{t('contact')}</a></li>
                            <li><a href="#">{t('privacyPolicy')}</a></li>
                            <li><a href="#">{t('terms')}</a></li>
                        </ul>
                    </div>

                    <div className={styles.navColumn}>
                        <h5 className={styles.columnTitle}>{t('learnMore')}</h5>
                        <p className={styles.learnMoreText}>
                            {t('learnMoreText')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <h4 className={styles.logoSmall}>
                    FANTASY<span className={styles.logoHighlight}>MATCHDAY</span>
                </h4>

                <p className={styles.copyright}>
                    {t('copyright')}
                </p>

                <div className={styles.bottomLinks}>
                    <a href="#">{t('terms')}</a>
                    <a href="#">{t('accessibility')}</a>
                    <a href="#">{t('privacyCookies')}</a>
                </div>

                <div className={styles.socialLinks}>
                    <a href="#" className={styles.socialLink}><Facebook size={18} /></a>
                    <a href="#" className={styles.socialLink}><Instagram size={18} /></a>
                    <a href="#" className={styles.socialLink}><Youtube size={18} /></a>
                    <a href="#" className={styles.socialLink}><Twitter size={18} /></a>
                </div>
            </div>
        </footer>
    );
};
