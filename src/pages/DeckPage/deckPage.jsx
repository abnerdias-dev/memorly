import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/card";
import Status from "../../components/statsBox/statsBox";
import supabase from "../../utils/supabase-client";
import styles from "./deckPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import Empty from "../../components/emptyState/empty";


function DeckPage() {
  const currentDeck = JSON.parse(localStorage.getItem("currentDeck")) ?? null;
  const [cards, setCards] = useState([]);
  const answeredCards = cards.filter((card) => card.answered).length;
  const navigate = useNavigate();

  async function updateDeck(cards) {
    const today = new Date().setHours(0, 0, 0, 0);

    const staleIds = cards
      .filter(
        (card) =>
          new Date(card.created_at).setHours(0, 0, 0, 0) !== today &&
          !["mastered", "learning", "revise"].includes(card.status) &&
          card.answered,
      )
      .map((card) => card.id);

    if (staleIds.length !== 0) {
      const { data, error } = await supabase
        .from("cards")
        .update({ status: "learning" })
        .in("id", staleIds);

      if (error) {
        console.error(`Failed to update: ${error}`);
      }
    }
  }

  const saveCurrentCards = () => {
    const currentCards = localStorage.setItem(
      "currentCards",
      JSON.stringify(cards),
    );
  };

  const getCards = async () => {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("deck", currentDeck.id);

    if (error) {
      console.log(error);
    } else {
      setCards(data);
    }
  };

  const deleteCard = async (id) => {
    try {
      const { data, error } = await supabase
        .from("cards")
        .delete()
        .eq("id", id);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setCards((prev) => prev.filter((card) => card.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    updateDeck(cards);
    console.log(cards);
  }, [cards]);

  return (
    <>
      <div className={styles.deckUiContainer}>
        <div className={styles.deckHeaderContainer}>
          <div className={styles.icoContainer}>
            <Link to={"/home"}>
              <svg
                className="btnBack"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            </Link>
          </div>
          <div>
            <h1>{currentDeck?.name ?? "Deck name"}</h1>
            <p>
              {cards?.length > 0
                ? `${cards.length} card${cards.length > 1 ? "s" : ""}`
                : "Adicione flashcards"}
            </p>
          </div>
        </div>
        <div className={styles.deckInfoContainer}>
          <Status
            title={answeredCards}
            info={`Estudado${answeredCards > 1 ? "s" : ""}`}
          />
          <Status
            title={cards.length - answeredCards}
            info={`Restante${cards.length - answeredCards > 1 ? "s" : ""}`}
          />
          <Button
            disabled={cards.length > 0 ? false : true}
            variant={cards.length > 0 ? "btnPrimary" : "btnDisabled"}
            onClick={() => {
              saveCurrentCards();
              navigate("/study");
            }}
          >
            <p>{cards.length > 0 ? "Começar Estudo" : "Para iniciar adicione flashcards"}</p>
          </Button>
        </div>
        <div className={styles.deckFlashcardsContainer}>
          <div className={styles.flashcardsHeader}>
            <h2>Flashcards</h2> <Link to={"/createcard"}>+ Adicionar</Link>
          </div>
          <div className={styles.cardsContainer}>
            <>
              {cards.length > 0 ? (
                cards.map((card) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    status={card.status}
                    question={card.question}
                    onDelete={() => {
                      deleteCard(card.id);
                    }}
                  />
                ))
              ) : (
                <Empty
                  noItem={"Nenhum card ainda"}
                  solution={"Adicione flashcards no botão acima"}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeckPage;
