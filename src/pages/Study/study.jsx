import { useEffect, useState } from "react";
import styles from "./study.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import supabase from "../../utils/supabase-client";

function Study() {
  const navigate = useNavigate();
  const cards = JSON.parse(localStorage.getItem("currentCards"));
  const deck = JSON.parse(localStorage.getItem("currentDeck"));
  const [rotate, setRotate] = useState(false);

  const [order, setOrder] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const card = cards[order[currentCard]];

  const [accuracy, setAccuracy] = useState(0);
  const [answeredCards, setAnsweredCards] = useState(new Set());
  const hasAnswered = answeredCards.has(card?.id);
  

  const progress =
    cards.length > 1 ? (currentCard / (cards.length - 1)) * 100 : 0;

  const updateCard = async (id, update, column) => {
    const { data, error } = await supabase
      .from("cards")
      .update({ [column]: update })
      .eq("id", id);
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const getUser = async () => {
    const { data } = await supabase.auth.getSession();
  };

  const addReview = async (isCorrect, card) => {
    const newReview = {
      card_id: card.id,
      is_correct: isCorrect,
    };
    const { data, error } = await supabase
      .from("cards_reviews")
      .insert(newReview);
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const goNext = () => {
    setRotate(false);
    setCurrentCard((prev) => prev + 1);
  };

  const goBack = () => {
    setRotate(false);
    setCurrentCard((prev) => prev - 1);
  };

  useEffect(() => {
    getUser();
    console.log("useEffect reached");
    if (cards) {
      console.log("randomizer reached");
      const arr = [...Array(cards.length).keys()];

      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      setOrder(arr);
    }
  }, []);

  if (currentCard >= cards.length) {
    const finalRes =
      cards.length > 0 ? (accuracy / answeredCards.size) * 100 : 0;

    const updateDeck = async (deckId) => {
      const { data, error } = await supabase
        .from("decks")
        .update({ progress: Math.ceil(finalRes) })
        .eq("id", deckId);
    };

    return (
      <>
        <div className={styles.resultContainer}>
          <div className={styles.finalIcon}>🎉</div>
          <div className={styles.finalInfo}>
            <h1 className={styles.finalTitle}>Parabéns</h1>
            <p className={styles.finalMessage}>
              Você completou a sessão de hoje!
            </p>
          </div>
          <div className={styles.statCard}>
            <div>
              <div className={styles.statNumber}>{answeredCards.size ?? 0}</div>
              <div className={styles.statLabel}>{"Cards estudados"}</div>
            </div>
            <div>
              <div className={styles.statNumber}>
                {Math.ceil(finalRes) + "%"}
              </div>
              <div className={styles.statLabel}>{"Taxa de acerto"}</div>
            </div>
          </div>
          <div className={styles.finalBtnsContainer}>
            <Button
              onClick={() => {
                navigate("/home/deckui");

                updateDeck(deck.id);
              }}
            >
              Tentar novamente
            </Button>
            <Button
              onClick={() => {
                navigate("/home");

                updateDeck(deck.id);
              }}
              variant="btnSecondary"
            >
              Voltar ao inicio{" "}
            </Button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.studyHeader}>
            <div className={styles.headerInfo}>
              <svg
                onClick={() => {
                  navigate("/home/deckui");
                }}
                className="btnBack"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" />
              </svg>

              <p className={styles.center}>{deck.name}</p>
            </div>
            <div className={`${styles.progressInfo}`}>
              <div
                className={styles.currentCard}
              >{`${currentCard + 1} / ${cards.length}`}</div>{" "}
              <div className={styles.progressContainer}>
                <div
                  style={{
                    width: progress + "%",
                  }}
                  className={styles.progress}
                ></div>
              </div>
            </div>
          </div>
          <div className={styles.cardContainer}>
            <div
              className={styles.card}
              onClick={() => {
                if (!hasAnswered) setRotate((prev) => !prev);
              }}
            >
              <div
                className={`${styles.cardInner} ${rotate ? styles.cardRotate : ""}`}
              >
                <div className={styles.cardFront}>
                  {card?.question}

                  <p className={styles.tip}>
                    {hasAnswered
                      ? card?.answer
                      : "toque para virar"}
                  </p>
                </div>
                <div className={styles.cardBack}>
                  {card?.answer}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnsContainer}>
            <svg
              onClick={() => {
                goBack();
              }}
              className={`${styles.arrow} ${currentCard < 1 ? styles.hidden : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" />
            </svg>
            <div className={styles.options}>
              <Button
                disabled={!rotate || hasAnswered}
                variant={rotate && !hasAnswered ? "btnDanger" : "btnDisabled"}
                onClick={() => {
                  setAnsweredCards((prev) => new Set(prev).add(card.id));
                  goNext();
                  addReview(false, card);
                  updateCard(card.id, true, "answered");
                  updateCard(card.id, "review", "status");
                  console.log(answeredCards)
                }}
              >
                Errei
              </Button>
              <Button
                variant={rotate && !hasAnswered ? "btnPrimary" : "btnDisabled"}
                disabled={!rotate || hasAnswered}
                onClick={() => {
                  setAnsweredCards((prev) => new Set(prev).add(card.id));
                  goNext();
                  setAccuracy((prev) => prev + 1);
                  addReview(true, cards[currentCard]);
                  updateCard(card.id, true, "answered");
                  updateCard(card.id, "mastered", "status");
                }}
              >
                Acertei
              </Button>
            </div>
            <svg
              onClick={() => {
                goNext();
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${styles.arrow} ${currentCard == cards.length - 1 ? styles.hidden : ""}`}
            >
              <path d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </div>
        </div>
      </>
    );
  }
}

export default Study;
