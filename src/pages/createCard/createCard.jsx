import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Textarea/textarea";
import Tip from "../../components/Tip/tip";
import styles from "./createCard.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";
import supabase from "../../utils/supabase-client";


function CreateCard() {
  const [btnVariant, setbtnVariant] = useState("btnPrimary");
  const [secondaryBtnVariant, setSecondaryBtnVariant] =
    useState("btnSecondary");

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currentDeck = JSON.parse(localStorage.getItem("currentDeck")) ?? null;

  async function handleCreation() {
    if (!question) return;

    if (!answer) return;

    setLoading(true);

    const newCard = {
      title,
      question,
      answer,
      deck: currentDeck.id,
    };

    try {
      const { data, error } = await supabase.from("cards").insert(newCard);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const getUser = async () => {
    const { data } = await supabase.auth.getSession();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={styles.creatorContainer}>
        <div className={styles.creatorHeader}>
          <Link to={"/home/deckui"}>
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
          <div className={styles.cardInfoContainer}>
            <h1>Novo Flashcard</h1>
            <p className={styles.headerInfo}>
              {currentDeck?.name ? currentDeck.name : "Carregando..."}
            </p>
          </div>
        </div>
        <div className={styles.createForm}>
          <Tip
            text={
              "Mantenha os cartões simples e focados em um conceito por vez para melhor memorização!"
            }
          />
          <div className="inputContainer">
            <label>Título do card</label>
            <Input
            value={title}
              placeholder="Digite um nome"
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
              }}
            />
          </div>
          <div className="inputContainer">
            <label>Frente do Card</label>
            <Input
            value={question}
              placeholder="Digite a pergunta"
              onChange={(e) => {
                const value = e.target.value;
                setQuestion(value);
              }}
            />
          </div>
          <div className="inputContainer">
            <label>Verso do Card</label>
            <TextArea
            value={answer}
              placeholder="Digite resposta ou definição"
              onChange={(e) => {
                const value = e.target.value;
                setAnswer(value);
              }}
            />
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <div className={styles.btnPair}>
            <Button
              variant="btnOutline"
              onClick={() => {
                navigate("/home/deckui");
                setQuestion("");
                setAnswer("");
              }}
            >
              Cancelar
            </Button>
            <Button
              variant={question && answer ? btnVariant : "btnDisabled"}
              onClick={() => {
                handleCreation();
                navigate("/home/deckui");
              }}
            >
              {loading ? <Spinner /> : "Criar"}
            </Button>
          </div>
          <Button
            variant={question && answer ? secondaryBtnVariant : "btnDisabled"}
            onClick={() => {
              handleCreation();
              setTitle("")
              setQuestion("")
              setAnswer("")
            }}
          >
            {loading ? <Spinner /> : "Salvar e criar outro"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateCard;
