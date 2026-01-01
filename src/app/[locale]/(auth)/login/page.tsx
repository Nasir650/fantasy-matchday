'use client';

import React from 'react';
import styles from './page.module.css';
import { Mail, Lock } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import registerImg from '@/images/register.png';

export default function LoginPage() {
    const t = useTranslations('Auth');

    return (
        <div className={styles.authPage}>
            {/* Left Side - Image */}
            <div className={styles.imageSection}>
                <Image
                    src={registerImg}
                    alt="Player"
                    className={styles.playerImage}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* Right Side - Form */}
            <div className={styles.formSection}>
                <div className={styles.gradientOrb}></div>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>{t('welcomeBack')}</h1>
                    <p className={styles.subtitle}>{t('loginSubtitle')}</p>

                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <Mail size={18} className={styles.inputIcon} />
                            <input
                                type="email"
                                placeholder={t('emailAddress')}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <Lock size={18} className={styles.inputIcon} />
                            <input
                                type="password"
                                placeholder={t('password')}
                                className={styles.input}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            {t('loginButton')}
                        </button>
                    </form>

                    <div className={styles.switchAuth}>
                        {t('noAccount')} <Link href="/register" className={styles.link}>{t('signUpButton')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
