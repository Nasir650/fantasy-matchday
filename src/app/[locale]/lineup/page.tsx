'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

// --- Types ---

interface Player {
    id: number;
    name: string;
    number: number;
    position: 'GK' | 'DEF' | 'MID' | 'FWD';
    team: 'Home' | 'Away';
    rating: number; // For bot logic
}

interface DraftPick {
    round: number;
    teamIndex: number; // 0=User, 1-3=Bots
    player: Player;
}

type GameState = 'LOBBY' | 'DRAFT' | 'MATCH' | 'RESULT';
type DraftPhase = 'ROUND_1' | 'ROUND_2' | 'ROUND_3' | 'COMPLETE';

// --- Mock Data ---

const MOCK_PLAYERS: Player[] = [
    { id: 1, name: 'Diogo Costa', number: 1, position: 'GK', team: 'Home', rating: 85 },
    { id: 2, name: 'João Cancelo', number: 2, position: 'DEF', team: 'Home', rating: 88 },
    { id: 3, name: 'Pepe', number: 3, position: 'DEF', team: 'Home', rating: 82 },
    { id: 4, name: 'Rúben Dias', number: 4, position: 'DEF', team: 'Home', rating: 89 },
    { id: 5, name: 'Bruno Fernandes', number: 8, position: 'MID', team: 'Home', rating: 90 },
    { id: 6, name: 'Bernardo Silva', number: 10, position: 'MID', team: 'Home', rating: 88 },
    { id: 7, name: 'Cristiano Ronaldo', number: 7, position: 'FWD', team: 'Home', rating: 86 },
    { id: 8, name: 'Rafael Leão', number: 11, position: 'FWD', team: 'Home', rating: 87 },
    { id: 12, name: 'Thibaut Courtois', number: 1, position: 'GK', team: 'Away', rating: 91 },
    { id: 13, name: 'Jan Vertonghen', number: 5, position: 'DEF', team: 'Away', rating: 80 },
    { id: 14, name: 'Kevin De Bruyne', number: 17, position: 'MID', team: 'Away', rating: 92 },
    { id: 15, name: 'Romelu Lukaku', number: 9, position: 'FWD', team: 'Away', rating: 85 },
    { id: 16, name: 'Jérémy Doku', number: 11, position: 'FWD', team: 'Away', rating: 84 },
    { id: 17, name: 'Youri Tielemans', number: 8, position: 'MID', team: 'Away', rating: 83 },
    { id: 18, name: 'Amadou Onana', number: 6, position: 'MID', team: 'Away', rating: 82 },
    { id: 19, name: 'Wout Faes', number: 4, position: 'DEF', team: 'Away', rating: 79 },
    { id: 9, name: 'Vitinha', number: 6, position: 'MID', team: 'Home', rating: 84 },
    { id: 10, name: 'João Palhinha', number: 15, position: 'MID', team: 'Home', rating: 83 },
    { id: 20, name: 'Leandro Trossard', number: 19, position: 'FWD', team: 'Away', rating: 83 },
    { id: 21, name: 'Antonio Silva', number: 14, position: 'DEF', team: 'Home', rating: 81 },
];

const BOT_NAMES = ['Bot 1', 'Bot 2', 'Bot 3'];

export default function GamePage() {
    const t = useTranslations('Lineup'); // You might want to create a new translation namespace 'Game'

    // --- State ---
    const [gameState, setGameState] = useState<GameState>('LOBBY');
    const [draftPhase, setDraftPhase] = useState<DraftPhase>('ROUND_1');
    const [availablePlayers, setAvailablePlayers] = useState<Player[]>(MOCK_PLAYERS);
    const [userSquad, setUserSquad] = useState<Player[]>([]);
    const [botSquads, setBotSquads] = useState<Player[][]>([[], [], []]); // 3 bots
    const [draftHistory, setDraftHistory] = useState<DraftPick[]>([]);
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0); // 0-3
    const [matchScore, setMatchScore] = useState(0); // Simple score for now

    // --- Lobby Logic ---
    useEffect(() => {
        if (gameState === 'LOBBY') {
            const timer = setTimeout(() => {
                setGameState('DRAFT');
            }, 3000); // Simulate finding match after 3s
            return () => clearTimeout(timer);
        }
    }, [gameState]);

    // --- Draft Logic ---

    // Round Order Configuration
    const getTurnOrderHelper = (phase: DraftPhase) => {
        // Round 1: 0, 1, 2, 3
        // Round 2: 3, 2, 1, 0 (Snake)
        // Round 3: Random (Simplifying to 0, 1, 2, 3 for now or Random)
        // For simplicity let's do:
        // R1: [0, 1, 2, 3]
        // R2: [3, 2, 1, 0]
        // R3: [1, 3, 0, 2] (Random shuffle example)
        if (phase === 'ROUND_1') return [0, 1, 2, 3];
        if (phase === 'ROUND_2') return [3, 2, 1, 0];
        return [1, 3, 0, 2]; // Fixed random for R3 for deterministic simple example
    };

    const [roundOrder, setRoundOrder] = useState<number[]>(getTurnOrderHelper('ROUND_1'));
    const [pickInRound, setPickInRound] = useState(0); // 0 to 3

    useEffect(() => {
        if (gameState !== 'DRAFT') return;

        const activeTeamIndex = roundOrder[pickInRound];

        // BOT TURN LOGIC
        if (activeTeamIndex !== 0) {
            const botDelay = setTimeout(() => {
                // Bot picks random player
                if (availablePlayers.length > 0) {
                    // Simple AI: Pick highest rated available
                    const bestPlayer = [...availablePlayers].sort((a, b) => b.rating - a.rating)[0];
                    handlePick(bestPlayer, activeTeamIndex);
                }
            }, 1000); // 1s delay for bot
            return () => clearTimeout(botDelay);
        }
    }, [gameState, pickInRound, roundOrder, availablePlayers]);


    const handlePick = (player: Player, teamIndex: number) => {
        // 1. Remove from available
        setAvailablePlayers(prev => prev.filter(p => p.id !== player.id));

        // 2. Add to team
        if (teamIndex === 0) {
            setUserSquad(prev => [...prev, player]);
        } else {
            setBotSquads(prev => {
                const newBots = [...prev];
                newBots[teamIndex - 1] = [...newBots[teamIndex - 1], player];
                return newBots;
            });
        }

        // 3. Log history
        setDraftHistory(prev => [...prev, {
            round: getRoundNumber(draftPhase),
            teamIndex,
            player
        }]);

        // 4. Advance Turn
        const nextPick = pickInRound + 1;
        if (nextPick >= 4) {
            // End of Round
            advanceRound();
        } else {
            setPickInRound(nextPick);
        }
    };

    const getRoundNumber = (phase: DraftPhase) => {
        if (phase === 'ROUND_1') return 1;
        if (phase === 'ROUND_2') return 2;
        if (phase === 'ROUND_3') return 3;
        return 4;
    };

    const advanceRound = () => {
        if (draftPhase === 'ROUND_1') {
            setDraftPhase('ROUND_2');
            setRoundOrder(getTurnOrderHelper('ROUND_2'));
            setPickInRound(0);
        } else if (draftPhase === 'ROUND_2') {
            setDraftPhase('ROUND_3');
            setRoundOrder(getTurnOrderHelper('ROUND_3'));
            setPickInRound(0);
        } else {
            setDraftPhase('COMPLETE');
            setGameState('MATCH');
        }
    };

    // --- Match Logic ---
    useEffect(() => {
        if (gameState === 'MATCH') {
            // Simulate match duration
            const matchDuration = 5000;
            const timer = setTimeout(() => {
                // Calculate random scores for demo
                const score = Math.floor(Math.random() * 100);
                setMatchScore(score);
                setGameState('RESULT');
            }, matchDuration);
            return () => clearTimeout(timer);
        }
    }, [gameState]);


    // --- Renders ---

    const renderLobby = () => (
        <div className={styles.lobbyContainer}>
            <h2>{t('lookingForMatch')}</h2>
            <div className={styles.spinner}>⚽</div>
        </div>
    );

    const renderDraft = () => {
        const activeTeamIndex = roundOrder[pickInRound];
        const isUserTurn = activeTeamIndex === 0;

        return (
            <div className={styles.draftContainer}>
                {/* Header Info */}
                <div className={styles.draftHeader}>
                    <h3>{t('round')} {getRoundNumber(draftPhase)}</h3>
                    <div className={styles.turnIndicator}>
                        {isUserTurn ? t('yourTurn') : t('botPicking', { botName: BOT_NAMES[activeTeamIndex - 1] })}
                    </div>
                </div>

                <div className={styles.draftMain}>
                    {/* Available Players Pool */}
                    <div className={styles.poolSection}>
                        <h4>{t('availablePlayers')}</h4>
                        <div className={styles.playerGrid}>
                            {availablePlayers.map(player => (
                                <button
                                    key={player.id}
                                    className={styles.poolCard}
                                    disabled={!isUserTurn}
                                    onClick={() => handlePick(player, 0)}
                                >
                                    <div className={styles.poolCardTop}>
                                        <span className={styles.poolPos}>{player.position}</span>
                                        <span className={styles.poolRating}>{player.rating}</span>
                                    </div>
                                    <div className={styles.poolName}>{player.name}</div>
                                    <div className={styles.poolTeam}>{player.team}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* My Squad & Draft Feed Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={styles.mySquad}>
                            <h4>{t('mySquad')} ({userSquad.length}/3)</h4>
                            {userSquad.map(p => (
                                <div key={p.id} className={styles.miniCard}>
                                    {p.name} ({p.position})
                                </div>
                            ))}
                        </div>

                        <div className={styles.historyLog}>
                            <h4>{t('draftLog')}</h4>
                            <ul>
                                {[...draftHistory].reverse().slice(0, 5).map((h, i) => (
                                    <li key={i}>
                                        {h.teamIndex === 0 ? t('you') : BOT_NAMES[h.teamIndex - 1]} {t('picked')} {h.player.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderMatch = () => (
        <div className={styles.matchSimulation}>
            <h2>Match in Progress...</h2>
            <div className={styles.fieldAnim}>
                {/* Simple animation placeholder */}
                ⚽ ... 🏃
            </div>
        </div>
    );

    const renderResult = () => (
        <div className={styles.resultContainer}>
            <h1>Match Finished!</h1>
            <div className={styles.finalScore}>
                Your Score: {matchScore}
            </div>
            {matchScore > 50 ? (
                <div className={styles.winner}>🏆 YOU WON!</div>
            ) : (
                <div className={styles.loser}>Better luck next time!</div>
            )}

            <Link href="/" className={styles.resetBtn}>
                Back to Home
            </Link>
        </div>
    );

    return (
        <div className={styles.pageWrapper}>
            {gameState === 'LOBBY' && renderLobby()}
            {gameState === 'DRAFT' && renderDraft()}
            {gameState === 'MATCH' && renderMatch()}
            {gameState === 'RESULT' && renderResult()}
        </div>
    );
}
