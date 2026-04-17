import Input from "../../components/Input/Input";
import styles from "./createDeck.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Icons from "../../components/icons/icons";
import Button from "../../components/Button/Button";
import { useIcon } from "../../components/icons/iconContext";
import Spinner from "../../components/spinner/spinner";
import supabase from "../../utils/supabase-client";

function CreateDeck() {
  const { selectedIcon, SetSelectedIcon } = useIcon();
  const [deckName, setDeckName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreation() {
    if (loading) return;
    if (!deckName) return;

    const deckToInsert = {
      name: deckName,
      icon: selectedIcon,
    };

    console.log(deckToInsert);
    setLoading(true);

    try {
      console.log("try reached");

      const res = await supabase.from("decks").insert(deckToInsert).single();
      console.log("Deck criado", res);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("ended");
      setDeckName("");
      setLoading(false);
    }
  }

  const getUser = async () => {
    const data = await supabase.auth.getSession();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={styles.creatorContainer}>
        <div className={styles.creatorHeader}>
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
          <h1>Criar Novo Deck</h1>
        </div>
        <div className={styles.creatorForm}>
          <div className="deckInfoContainer">
            <div className={styles.inputContainer}>
              <label>Nome do Deck</label>
              <Input
                value={deckName}
                placeholder="Ex: Microbiologia"
                onChange={(e) => {
                  setDeckName(e.target.value);
                }}
              />
            </div>
            <div className={styles.iconSelectorContainer}>
              <label>Escolha um ícone</label>
              <Icons />
            </div>
          </div>
          <Button
            disabled={deckName ? false : true}
            variant={deckName ? "btnPrimary" : "btnDisabled"}
            onClick={() => {
              handleCreation();
            }}
          >
            {loading ? <Spinner /> : "Criar Deck"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateDeck;
