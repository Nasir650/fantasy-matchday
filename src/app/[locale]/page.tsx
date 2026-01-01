import styles from "./page.module.css";
import { Hero } from "@/components/features/Hero/Hero";
import { GameChanger } from "@/components/features/GameChanger/GameChanger";
import { WhyChoose } from "@/components/features/WhyChoose/WhyChoose";
import { AmazingPrizes } from "@/components/features/AmazingPrizes/AmazingPrizes";
import { ReadyToWin } from "@/components/features/ReadyToWin/ReadyToWin";
import { MatchCard } from "@/components/features/MatchCard/MatchCard";
import { Button } from "@/components/ui/Button/Button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Hero />

      <GameChanger />

      <WhyChoose />

      <section className={styles.matchesSection}>
        <div className={styles.matchesHeader}>
          <h2 className={styles.matchesTitle}>
            {t('Matches.titlePrefix')} <span className="text-primary">{t('Matches.titleHighlight')}</span>
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
            variant="green"
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
            homeTeam={{ name: "Al-Shabab", logo: "" }}
            awayTeam={{ name: "Al-Ettifaq", logo: "" }}
            date="Sat, Nov 25"
            time="21:00"
            venue="Prince Faisal bin Fahd"
            status="scheduled"
            variant="green"
          />
        </div>
      </section>

      <AmazingPrizes />

      <ReadyToWin />
    </div>
  );
}
