'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

interface Player {
    id: number;
    name: string;
    number: number;
    x: number;
    y: number;
}

const PORTUGAL_PLAYERS: Player[] = [
    { id: 1, name: 'Diogo Costa', number: 1, x: 5, y: 50 },
    { id: 2, name: 'João Cancelo', number: 2, x: 20, y: 80 },
    { id: 3, name: 'Pepe', number: 3, x: 15, y: 60 },
    { id: 4, name: 'Rúben Dias', number: 4, x: 15, y: 40 },
    { id: 5, name: 'Nuno Mendes', number: 5, x: 20, y: 20 },
    { id: 6, name: 'Vitinha', number: 6, x: 30, y: 70 },
    { id: 7, name: 'Bruno Fernandes', number: 7, x: 28, y: 50 },
    { id: 8, name: 'Bernardo Silva', number: 8, x: 30, y: 30 },
    { id: 9, name: 'Gonçalo Ramos', number: 9, x: 42, y: 80 },
    { id: 10, name: 'Cristiano Ronaldo', number: 10, x: 40, y: 50 },
    { id: 11, name: 'Rafael Leão', number: 11, x: 42, y: 20 },
];

const BELGIUM_PLAYERS: Player[] = [
    { id: 12, name: 'Thibaut Courtois', number: 1, x: 95, y: 50 },
    { id: 13, name: 'Timothy Castagne', number: 2, x: 80, y: 25 },
    { id: 14, name: 'Jan Vertonghen', number: 3, x: 85, y: 60 },
    { id: 15, name: 'Wout Faes', number: 4, x: 80, y: 75 },
    { id: 16, name: 'Axel Witsel', number: 5, x: 70, y: 85 },
    { id: 17, name: 'Youri Tielemans', number: 6, x: 72, y: 60 },
    { id: 18, name: 'Kevin De Bruyne', number: 7, x: 72, y: 40 },
    { id: 19, name: 'Leandro Trossard', number: 8, x: 70, y: 15 },
    { id: 20, name: 'Romelu Lukaku', number: 9, x: 58, y: 85 },
    { id: 21, name: 'Jérémy Doku', number: 10, x: 55, y: 50 },
    { id: 22, name: 'Dries Mertens', number: 11, x: 58, y: 15 },
];

export default function LineupPage() {
    const t = useTranslations('Lineup');
    const [portugalPlayers, setPortugalPlayers] = useState(PORTUGAL_PLAYERS);
    const [belgiumPlayers, setBelgiumPlayers] = useState(BELGIUM_PLAYERS);
    const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
    const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);

    const handleDragStart = (player: Player, team: 'portugal' | 'belgium') => {
        setDraggedPlayer({ ...player, team } as any);
    };

    const handleDrag = (e: React.DragEvent, playerId: number, team: 'portugal' | 'belgium') => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        if (!draggedPlayer) return;

        const pitch = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - pitch.left) / pitch.width) * 100;
        const y = ((e.clientY - pitch.top) / pitch.height) * 100;

        const updatePlayers = (players: Player[]) =>
            players.map(p => p.id === draggedPlayer.id ? { ...p, x, y } : p);

        if ((draggedPlayer as any).team === 'portugal') {
            setPortugalPlayers(updatePlayers(portugalPlayers));
        } else {
            setBelgiumPlayers(updatePlayers(belgiumPlayers));
        }
        setDraggedPlayer(null);
    };

    const renderPlayer = (player: Player, team: 'portugal' | 'belgium') => (
        <div
            key={player.id}
            className={`${styles.player} ${team === 'portugal' ? styles.redPlayer : styles.yellowPlayer}`}
            style={{ left: `${player.x}%`, top: `${player.y}%` }}
            draggable
            onDragStart={() => handleDragStart(player, team)}
            onMouseEnter={() => setHoveredPlayer(player)}
            onMouseLeave={() => setHoveredPlayer(null)}
        >
            {player.number}
            {hoveredPlayer?.id === player.id && (
                <div className={styles.tooltip}>{player.name}</div>
            )}
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>{t('title')}</h1>

            {/* Teams Header */}
            <div className={styles.teamsHeader}>
                <div className={styles.team}>
                    <span className={styles.teamFlag}>🇵🇹</span>
                    <div className={styles.teamInfo}>
                        <span className={styles.teamName}>Portugal</span>
                        <span className={styles.formation}>4-3-3</span>
                    </div>
                </div>
                <span className={styles.matchStatus}>FT</span>
                <div className={styles.team}>
                    <div className={styles.teamInfo}>
                        <span className={styles.teamName}>Belgium</span>
                        <span className={styles.formation}>3-4-3</span>
                    </div>
                    <span className={styles.teamFlag}>🇧🇪</span>
                </div>
            </div>

            {/* Soccer Pitch */}
            <div
                className={styles.pitch}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                {/* Pitch Markings */}
                <div className={styles.halfLine}></div>
                <div className={styles.centerCircle}></div>
                <div className={styles.leftBox}></div>
                <div className={styles.rightBox}></div>
                <div className={styles.leftGoalBox}></div>
                <div className={styles.rightGoalBox}></div>

                {/* Players */}
                {portugalPlayers.map(p => renderPlayer(p, 'portugal'))}
                {belgiumPlayers.map(p => renderPlayer(p, 'belgium'))}
            </div>
        </div>
    );
}
