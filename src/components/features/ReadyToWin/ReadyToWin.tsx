'use client';

import React from 'react';
import styles from './ReadyToWin.module.css';
import { Button } from '../../ui/Button/Button';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export const ReadyToWin = () => {
    const t = useTranslations('ReadyToWin');

    return (
        <section className={styles.section}>
            <div className={styles.bgImage}></div>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h2 className={styles.title}>
                    {t('titlePrefix')} <span className={styles.highlight}>{t('titleHighlight')}</span>
                </h2>
                <Link href="/register">
                    <Button size="lg">{t('startPlaying')}</Button>
                </Link>
            </div>
        </section>
    );
};
