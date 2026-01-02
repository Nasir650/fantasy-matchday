import styles from "./page.module.css";
import { Hero } from "@/components/features/Hero/Hero";
import { GameChanger } from "@/components/features/GameChanger/GameChanger";
import { WhyChoose } from "@/components/features/WhyChoose/WhyChoose";
import { AmazingPrizes } from "@/components/features/AmazingPrizes/AmazingPrizes";
import { ReadyToWin } from "@/components/features/ReadyToWin/ReadyToWin";
import { MatchCard } from "@/components/features/MatchCard/MatchCard";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Hero />

      <GameChanger />

      <WhyChoose />

      <section className={styles.matchesSection}>
        {/* LIVE Matches */}
        <div className={styles.matchesHeader}>
          <h2 className={styles.matchesTitle}>
            {t('Matches.liveMatchesTitle')}
          </h2>
        </div>
        <div className={styles.matchesGrid} style={{ marginBottom: '4rem' }}>
          <MatchCard
            homeTeam={{ name: "Real Madrid", logo: "" }}
            awayTeam={{ name: "Barcelona", logo: "" }}
            date="Today"
            time="LIVE"
            venue="Santiago Bernabéu"
            status="live"
            variant="green"
          />
        </div>

        {/* UPCOMING Matches */}
        <div className={styles.matchesHeader}>
          <h2 className={styles.matchesTitle}>
            {t('Matches.upcomingMatchesTitlePrefix')} <span className="text-primary">{t('Matches.upcomingMatchesTitleHighlight')}</span>
          </h2>
        </div>
        <div className={styles.matchesGrid}>
          <MatchCard
            homeTeam={{ name: "Al-Hilal", logo: "" }}
            awayTeam={{ name: "Al-Nassr", logo: "" }}
            date="Fri, Nov 24"
            time="20:00"
            venue="King Fahd Stadium"
            status="scheduled"
            variant="dark"
          />
          <MatchCard
            homeTeam={{ name: "Al-Ittihad", logo: "" }}
            awayTeam={{ name: "Al-Ahli", logo: "" }}
            date="Sat, Nov 25"
            time="18:30"
            venue="King Abdullah Sports City"
            status="upcoming"
            variant="dark"
          />
          <MatchCard
            homeTeam={{ name: "Liverpool", logo: "" }}
            awayTeam={{ name: "Man City", logo: "" }}
            date="Sun, Nov 26"
            time="21:00"
            venue="Anfield"
            status="scheduled"
            variant="dark"
          />
        </div>
      </section>

      <AmazingPrizes />

      <ReadyToWin />
    </div>
  );
}
