'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const DAYS = [
    { key: 'wednesday', date: '09 Aug' },
    { key: 'yesterday', date: '10 Aug' },
    { key: 'today', date: '11 Aug' },
    { key: 'tomorrow', date: '12 Aug' },
    { key: 'sunday', date: '13 Aug' },
    { key: 'monday', date: '14 Aug' },
];

const MY_LEAGUES_MATCHES = [
    { time: 'Live', homeTeam: 'Spain', homeFlag: '🇪🇸', score: '2-1', awayTeam: 'Netherlands', awayFlag: '🇳🇱', isLive: true },
    { time: '13:40', homeTeam: 'Japan', homeFlag: '🇯🇵', score: '-', awayTeam: 'Sweden', awayFlag: '🇸🇪', isLive: false },
    { time: '18:20', homeTeam: 'Olympiakos', homeFlag: '🔴', score: '-', awayTeam: 'Genk', awayFlag: '🔵', isLive: false },
];

const PRIVATE_LEAGUES_MATCHES = [
    { time: '01:43', homeTeam: 'Spain', homeFlag: '🇪🇸', score: '-', awayTeam: 'Netherlands', awayFlag: '🇳🇱', isLive: false },
    { time: '13:40', homeTeam: 'Japan', homeFlag: '🇯🇵', score: '-', awayTeam: 'Sweden', awayFlag: '🇸🇪', isLive: false },
    { time: '18:20', homeTeam: 'Olympiakos', homeFlag: '🔴', score: '-', awayTeam: 'Genk', awayFlag: '🔵', isLive: false },
];

export default function LeaderboardPage() {
    const t = useTranslations('Leaderboard');
    const [activeDay, setActiveDay] = useState('today');

    return (
        <div className={styles.container}>
            {/* Title */}
            <h1 className={styles.pageTitle}>{t('title')}</h1>

            {/* Main Content Card */}
            <div className={styles.mainCard}>
                {/* Top Bar */}
                <div className={styles.topBar}>
                    <div className={styles.liveIndicator}>
                        <span className={styles.liveDot}></span>
                        Live
                        <span className={styles.liveCount}>[1]</span>
                    </div>

                    <div className={styles.searchBar}>
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.filterDropdown}>
                        {t('allMatches')}
                        <ChevronDown size={16} />
                    </div>
                </div>

                {/* Day Tabs */}
                <div className={styles.dayTabs}>
                    {DAYS.map((day) => (
                        <button
                            key={day.key}
                            className={`${styles.dayTab} ${activeDay === day.key ? styles.activeTab : ''}`}
                            onClick={() => setActiveDay(day.key)}
                        >
                            <span className={styles.dayName}>{t(`days.${day.key}`)}</span>
                            <span className={styles.dayDate}>{day.date}</span>
                        </button>
                    ))}
                    <button className={styles.calendarBtn}>
                        <Calendar size={16} />
                        <span>{t('viewCalendar')}</span>
                    </button>
                </div>

                {/* My Leagues Section */}
                <div className={styles.leagueSection}>
                    <div className={styles.leagueHeader}>
                        <div className={styles.leagueIcon}>⚽</div>
                        <span className={styles.leagueName}>{t('myLeagues')}</span>
                        <span className={styles.leagueInfo}>Quarter Finals</span>
                    </div>

                    <div className={styles.matchesList}>
                        {MY_LEAGUES_MATCHES.map((match, idx) => (
                            <div key={idx} className={styles.matchRow}>
                                <span className={`${styles.matchTime} ${match.isLive ? styles.liveTime : ''}`}>
                                    {match.time}
                                </span>
                                <div className={styles.matchTeams}>
                                    <span className={styles.teamName}>{match.homeTeam}</span>
                                    <span className={styles.teamFlag}>{match.homeFlag}</span>
                                    <span className={styles.matchScore}>{match.score}</span>
                                    <span className={styles.teamFlag}>{match.awayFlag}</span>
                                    <span className={styles.teamName}>{match.awayTeam}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Private Leagues Section */}
                <div className={styles.leagueSection}>
                    <div className={styles.leagueHeader}>
                        <div className={styles.leagueIcon}>🏆</div>
                        <span className={styles.leagueName}>{t('privateLeagues')}</span>
                        <span className={styles.leagueInfo}>Quarter Finals</span>
                    </div>

                    <div className={styles.matchesList}>
                        {PRIVATE_LEAGUES_MATCHES.map((match, idx) => (
                            <div key={idx} className={styles.matchRow}>
                                <span className={styles.matchTime}>{match.time}</span>
                                <div className={styles.matchTeams}>
                                    <span className={styles.teamName}>{match.homeTeam}</span>
                                    <span className={styles.teamFlag}>{match.homeFlag}</span>
                                    <span className={styles.matchScore}>{match.score}</span>
                                    <span className={styles.teamFlag}>{match.awayFlag}</span>
                                    <span className={styles.teamName}>{match.awayTeam}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
