import { useEffect, useState } from "react";
import Status from "../../components/statsBox/statsBox";
import styles from "./stats.module.css";
import supabase from "../../utils/supabase-client";

function Statistics() {
  const [decks, setDecks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const accuracy = reviews.filter((r) => r.is_correct);
  const percentage = Math.ceil((accuracy.length / reviews.length) * 100);

  const fetchReviews = async (userId) => {
    if (!userId) {
      console.error("No userId found");
      return;
    }
    const { data, error } = await supabase
      .from("cards_reviews")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error(error);
      return;
    }
    setReviews(data);
  };

  const fetchDecks = async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("decks")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error(error);
      return;
    }
    setDecks(data);
  };

  const getUser = async () => {
    const { error, data } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      return;
    }

    fetchDecks(data.session?.user?.id);
    fetchReviews(data.session?.user?.id);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={styles.statsContainer}>
        <div className={styles.headerContainer}>
          <h1>Seu Progresso</h1>
        </div>
        {/**<div className={styles.streakBadge}>
            <span className={styles.streakIcon}>🔥</span>
            <span className={styles.streakText}>0 dias de sequência!</span>
          </div> */}
        <div className={styles.statsGrid}>
          <Status
            title={reviews?.length}
            info={`Estudado${reviews.length > 1 ? "s" : ""}`}
          />
          <Status title={`${percentage ?? 0}%`} info={"Média de acertos"} />
          <Status
            title={decks?.length}
            info={`Deck${decks?.length > 1 ? "s" : ""} Ativo${decks?.length > 1 ? "s" : ""}`}
          />
        </div>
      </div>
    </>
  );
}

export default Statistics;

{
  /* <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <div className={styles.chartItem}>
              <div className={`${styles.bar} ${styles.bar40}`}></div>
              <div className={styles.chartLabel}>D</div>
            </div>

            <div className={styles.chartItem}>
              <div className={`${styles.bar} ${styles.bar65}`}></div>
              <div className={styles.chartLabel}>S</div>
            </div>

            <div className={styles.chartItem}>
              <div className={`${styles.bar} ${styles.bar80}`}></div>
              <div className={styles.chartLabel}>T</div>
            </div>

            <div className={styles.chartItem}>
              <div className={`${styles.bar} ${styles.bar55}`}></div>
              <div className={styles.chartLabel}>Q</div>
            </div>

            <div className={styles.chartItem}>
              <div className={`${styles.bar} ${styles.bar95}`}></div>
              <div className={styles.chartLabel}>Q</div>
            </div>

            <div className={styles.chartItem}>
              <div className={`${styles.bar} ${styles.bar70}`}></div>
              <div className={styles.chartLabel}>S</div>
            </div>

            <div className={styles.chartItem}>
              <div
                className={`${styles.bar} ${styles.bar50} ${styles.active}`}
              ></div>
              <div className={`${styles.chartLabel} ${styles.active}`}>S</div>
            </div>
          </div>
        </div>
 */
}

{
  /*<h3 className={styles.sectionTitle}>Atividade Semanal</h3>

        <h3 className={styles.sectionTitle}>Conquistas</h3>

        <div className={styles.achievementItem}>
          <div className={styles.achievementBadge}>🏆</div>
          <div className={styles.achievementContent}>
            <div className={styles.achievementTitle}>Primeira Semana</div>
            <div className={styles.achievementDesc}>7 dias de sequência</div>
          </div>
        </div>

        <div className={styles.achievementItem}>
          <div className={`${styles.achievementBadge} ${styles.badgePurple}`}>
            ⭐
          </div>
          <div className={styles.achievementContent}>
            <div className={styles.achievementTitle}>100 Flashcards</div>
            <div className={styles.achievementDesc}>Estudou 100 cards</div>
          </div>
        </div>

        <div className={`${styles.achievementItem} ${styles.disabled}`}>
          <div className={`${styles.achievementBadge} ${styles.badgeLocked}`}>
            🔒
          </div>
          <div className={styles.achievementContent}>
            <div className={styles.achievementTitle}>Mestre da Memória</div>
            <div className={styles.achievementDesc}>30 dias de sequência</div>
          </div>
        </div> */
}
