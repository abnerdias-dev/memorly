import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { Deck } from "../../components/Deck/deck";
import supabase from "../../utils/supabase-client";
import { useNavigate } from "react-router-dom";

function Home() {
  const [decks, setDecks] = useState([]);
  const [navDirection, setNavDirection] = useState("/create");
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const cardCount = (deckId) => {
    return cards.filter((c) => c.deck === deckId).length;
  };

  const fetchDecks = async () => {
    try {
      const { error, data } = await supabase
        .from("decks")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error);
      } else {
        setDecks(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCards = async (decks) => {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .in(
        "deck",
        decks.map((d) => d.id),
      );
    if (error) {
      console.error(error);
    }
    if (data) {
      setCards(data);
    }
  };

  const deleteDecks = async (id) => {
    try {
      const { error, data } = await supabase
        .from("decks")
        .delete()
        .eq("id", id);

      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setDecks((prev) => prev.filter((deck) => deck.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveCurrentDeck = (deck) => {
    localStorage.setItem("currentDeck", JSON.stringify(deck));
  };

  const getUser = async () => {
    const { error, data } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
    } else {
      if (!data.session) {
        setNavDirection("/");
      }
    }
  };

  useEffect(() => {
    fetchDecks();
    getUser();
  }, []);

  useEffect(() => {
    fetchCards(decks);
  }, [decks]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.headerInfo}>
            <div className={styles.appLogo}>Memorly</div>
            {/**<div className={styles.streakBadge}>
              <span className={styles.streakIcon}>🔥</span>
              <span className={styles.streakText}>0</span>
            </div> */}
          </div>
          <Input placeholder="🔍 Buscar decks..." />
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.mainHeader}>
            <h2>
              {decks.length > 0 ? "Meus decks" : "Crie ou adicione um deck"}
            </h2>
            <Link to={navDirection} className={styles.homeLink}>
              + Novo deck
            </Link>
          </div>
          <div className={styles.deckContainer}></div>
          {decks.length > 0 ? (
            <div className={styles.loadedDecks}>
              <div className={styles.tipInfo}>
                <p>
                  💡 Dica do Leo Estudar 15 minutos por dia é mais eficaz que
                  sessões longas esporádicas!
                </p>
              </div>
              {decks.map((deck) => (
                <Deck
                  progress={deck.progress}
                  key={deck.id}
                  title={deck.name}
                  cardsAmount={cardCount(deck.id)}
                  completion={deck.progress}
                  icon={deck.icon}
                  deckClick={() => {
                    saveCurrentDeck(deck);
                    navigate("/home/deckui");
                  }}
                  trashClick={() => {
                    deleteDecks(deck.id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📭</div>
              <div className={styles.emptyTitle}>Nenhum deck ainda</div>
              <div className={styles.emptyText}>
                Crie seu primeiro deck para começar a estudar!
              </div>
            </div>
          )}
        </div>

        {/**/}
      </div>
    </>
  );
}

export default Home;
