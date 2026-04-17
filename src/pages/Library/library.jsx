import Input from "../../components/Input/Input";
import styles from "./library.module.css";
import { LibraryDeck } from "../../components/Deck/deck";
import supabase from "../../utils/supabase-client";
import { useEffect, useState } from "react";

function Library() {
  const [decks, setDecks] = useState([]);

  const getPublicDecks = async () => {
    const { data, error } = await supabase.from("public_decks").select("*");
    if (error) {
      console.error(error);
    }
    if (data) {
      setDecks(data);
    }
  };

  useEffect(() => {
    getPublicDecks();
  }, []);

  return (
    <>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerTitle}>Biblioteca</div>
          <Input placeholder={"🔍 Buscar decks..."} />
        </div>
        <div className={styles.deckContainer}>
          {decks.map((deck) => (
            <LibraryDeck />
          ))}
        </div>
      </div>
    </>
  );
}

export default Library;
