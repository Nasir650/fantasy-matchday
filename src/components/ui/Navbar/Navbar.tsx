"use client";

import React, { useState } from 'react';
import { Link } from '@/navigation';
import styles from './Navbar.module.css';
import { Button } from '../Button/Button';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations('Navbar');

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                FANTASY<span className="text-primary">MATCHDAY</span>
            </Link>

            <div className={styles.mobileMenuBtn} onClick={toggleMenu}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>

            <ul className={clsx(styles.navLinks, isMobileMenuOpen && styles.active)}>
                <li><Link href="/#features" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>{t('features')}</Link></li>
                <li><Link href="/#how-it-works" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>{t('howItWorks')}</Link></li>
                <li><Link href="/leaderboard" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>{t('leaderboard')}</Link></li>
                <li><Link href="/lineup" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>{t('lineup')}</Link></li>
                <li><Link href="/login" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>{t('login')}</Link></li>
                <li>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button size="sm" className={styles.signUpBtn}>{t('signUp')}</Button>
                    </Link>
                </li>
                <li>
                    <LanguageSwitcher />
                </li>
            </ul>
        </nav>
    );
};
