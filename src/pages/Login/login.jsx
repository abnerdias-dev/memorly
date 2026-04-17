import styles from "./login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Spinner from "../../components/spinner/spinner";
import supabase from "../../utils/supabase-client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const [btnText, setBtnText] = useState("Entrar");
  const [btnVariant, setbtnVariant] = useState("btnPrimary");

  const [messageType, setMessageType] = useState("Message");
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    if (loading) {
      return;
    }

    if (!email) {
      setMessageType("Error");
      showError("email", "Email inválido", setLabel);
      return false;
    }
    if (!password) {
      setMessageType("Error");
      showError("password", "Senha inválida", setLabel);
      return false;
    }

    setLoading(true);

    setLabel((...prev) => ({
      ...prev,
      email: "",
      password: "",
      name: "",
    }));

    const user = {
      email,
      password,
    };

    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if(error){
        console.log(error)
        setMessageType("Error")
        showError("email", "Senha ou email incorretos", setLabel)
      } else {
        console.log(data)
        setbtnVariant("btnPrimary")
        setBtnText("Entrar")
        navigate("/home")
      }
    } catch (err) {
      setbtnVariant("btnDanger");
      setBtnText("Erro");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  function showError(field, message, setter) {
    setShow(true);
    setter((prev) => ({
      ...prev,
      [field]: message,
    }));
  }

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <h1>Bem-vindo de volta!</h1>
        <p>Entre para continuar estudando</p>
      </header>

      {/* Email e senha */}
      <div className={styles.formContainer}>
        {/* Email */}
        <div className={styles.inputContainer}>
          <div className={styles.inputLogin}>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
              }}
            />
          </div>

          <small
            className={`${styles[`input${messageType}`]} ${show ? styles.visible : styles.hidden}`}
          >
            {label.email ? label.email : ""}
          </small>
        </div>

        {/* Senha */}
        <div className={styles.inputContainer}>
          <div className={`${styles.inputLogin} ${styles.inputPass}`}>
            <Input
              type={isOpen ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
              }}
            />
            <img
              src={`/imgs/small-${isOpen ? "closed" : "open"}-eye.png`}
              className={styles.passwordIco}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
          <small
            className={`${styles[`input${messageType}`]} ${show ? styles.visible : styles.hidden}`}
          >
            {label.password ? label.password : ""}
          </small>
        </div>

        <a href="#">Esqueceu a senha?</a>
      </div>

      {/*Botões */}

      <div className={styles.btnsContainer}>
        <Button
          disabled={email && password ? false : true}
          variant={email && password ? btnVariant : "btnDisabled"}
          onClick={() => {
            handleLogin();
          }}
        >
          {loading ? <Spinner /> : btnText}
        </Button>
        <p>ou</p>
        <Button variant="btnOutline">
          <span>Continuar com Google</span>
        </Button>
        <p>
          Não tem conta?
          <Link to={"/subscribe"}>Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
