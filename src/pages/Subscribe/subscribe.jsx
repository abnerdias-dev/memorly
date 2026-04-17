import { useState } from "react";
import Input from "../../components/Input/Input";
import styles from "./subscribe.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Spinner from "../../components/spinner/spinner";
import supabase from "../../utils/supabase-client";

function Subscribe() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [haveAgreed, setHaveAgreed] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const [label, setLabel] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleCreation() {
    if (loading) return;

    const isUsernameValid = handleValidation("username", username);
    const isEmailValid = handleValidation("email", email);
    const isPasswordValid = handleValidation("password", password);
    const isConfirmPassValid = handleValidation(
      "confirmPassword",
      confirmPassword,
    );

    const isFormValid =
      isUsernameValid && isEmailValid && isPasswordValid && isConfirmPassValid;

    if (isFormValid) {
      setLoading(true);
      try {
        console.log("try reached");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name: username } },
        });
      

        if (error) {
          console.log("Error signing up:", error);
        } else {
          navigate("/home")
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("ended");
        setLoading(false);
      }
    }
  }

  function handleValidation(type, input) {
    if (type === "username") {
      return validateField("username", [
        () => isEmpty(input),
        () => validateLength(input, 3, 50),
      ]);
    }

    if (type === "email") {
      return validateField("email", [
        () => isEmpty(input),
        () => validateEmail(input),
      ]);
    }

    if (type === "password") {
      return validateField("password", [
        () => isEmpty(input),
        () => validateLength(input, 6, 60),
        () => validateIfMatch(input, confirmPassword),
      ]);
    }

    if (type === "confirmPassword") {
      return validateField("confirmPassword", [
        () => isEmpty(input),
        () => validateIfMatch(input, password),
      ]);
    }
  }

  function validateField(type, rules) {
    for (const rule of rules) {
      const ruleResult = rule();

      if (ruleResult) {
        showError(ruleResult, type);
        return false;
      }
    }
    showError("", type);
    return true;
  }

  function validateIfMatch(input1, input2) {
    if (input1.trim() !== input2.trim()) {
      return `Senhas precisam ser iguais`;
    }
    return null;
  }

  function validateEmail(email) {
    const emailRegex =
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      return `E-mail inválido`;
    }
    return null;
  }

  function validateLength(input, min, max) {
    if (input.trim().length < min) {
      return `Mínimo de ${min} caracteres`;
    }

    if (input.trim().length > max) {
      return `Maximo de ${max} caracteres`;
    }

    return null;
  }

  function isEmpty(element) {
    if (!element) {
      return "Campo necessário";
    }
    return null;
  }

  function showError(message, field) {
    setShow(true);
    setLabel((prev) => ({
      ...prev,
      [field]: message,
    }));
  }

  return (
    <>
      <div className={styles.subscriptionContainer}>
        <div className={styles.headerContainer}>
          <h1>Criar Conta</h1>
          <p>Comece sua jornada de estudos!</p>
        </div>
        <div className={styles.subForm}>
          <div className={styles.inputContainer}>
            <Input
              placeholder="Nome"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label
              className={`${styles.inputMessage} ${show ? styles.visible : styles.hidden}`}
            >
              {label.username}
            </label>
          </div>
          <div className={styles.inputContainer}>
            <Input
              type={"email"}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label
              className={`${styles.inputMessage} ${show ? styles.visible : styles.hidden}`}
            >
              {label.email}
            </label>
          </div>
          <div className={styles.inputContainer}>
            <Input
              placeholder="Senha (mín. 6 caracteres)"
              type={isOpen ? "password" : "text"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              className={styles.eyeIcon}
              src={`./imgs/small-${isOpen ? "open" : "closed"}-eye.png`}
            />
            <label
              className={`${styles.inputMessage} ${show ? styles.visible : styles.hidden}`}
            >
              {label.password}
            </label>
          </div>
          <div className={styles.inputContainer}>
            <Input
              type={isOpen ? "password" : "text"}
              placeholder="Confirme Senha"
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
            <label
              className={`${styles.inputMessage} ${show ? styles.visible : styles.hidden}`}
            >
              {label.confirmPassword}
            </label>
          </div>
          <div className={styles.inputCheckContainer}>
            <input
              onChange={() => {
                setHaveAgreed((prev) => !prev);
              }}
              type="checkbox"
              className={styles.checkInput}
            />{" "}
            <p>
              Aceito os
              <Link> termos de uso</Link>
            </p>
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <Button
            disabled={haveAgreed && !loading ? false : true}
            variant={haveAgreed ? "btnPrimary" : "btnDisabled"}
            onClick={() => {
              handleCreation();
            }}
          >
            {loading ? <Spinner /> : "Criar Conta"}
          </Button>
          <p>ou</p>
          <Button variant="btnOutline">
            <p>Continuar com Google</p>
          </Button>

          <p>
            Já tem conta? <Link to={"/"}>Entrar</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
