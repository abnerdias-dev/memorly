import styles from "./profile.module.css";
import Button from "../../components/Button/Button";
import supabase from "../../utils/supabase-client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const [emailtxt, setEmail] = useState("");
  const [nameTxt, setName] = useState("")
  const logOut = async () => {
    try {
      const { data, error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    const { error, data } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
      return;
    }
    
    const { email, name } = data.session.user.user_metadata;
    setEmail(email)
    setName(name)
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.screenContent}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              <svg
                className={styles.avatarSvg}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <div className={styles.profileName}>{nameTxt? nameTxt : "Seu nome"}</div>
            <div className={styles.profileEmail}>{emailtxt ? emailtxt : "seuemail@example.com"}</div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.settingsList}>
              <div className={styles.settingsItem}>
                <div className={styles.settingsLeft}>
                  <span className={styles.settingsIcon}>👤</span>
                  <span className={styles.settingsLabel}>Editar Perfil</span>
                </div>
                <span className={styles.chevron}>›</span>
              </div>

              <div className={styles.settingsItem}>
                <div className={styles.settingsLeft}>
                  <span className={styles.settingsIcon}>🔔</span>
                  <span className={styles.settingsLabel}>Notificações</span>
                </div>
                <div className={`${styles.toggleSwitch} ${styles.active}`}>
                  <div className={styles.toggleThumb}></div>
                </div>
              </div>

              <div className={styles.settingsItem}>
                <div className={styles.settingsLeft}>
                  <span className={styles.settingsIcon}>🎯</span>
                  <span className={styles.settingsLabel}>Meta Diária</span>
                </div>
                <span>15 min</span>
              </div>

              <div className={styles.settingsItem}>
                <div className={styles.settingsLeft}>
                  <span className={styles.settingsIcon}>🌙</span>
                  <span className={styles.settingsLabel}>Modo Escuro</span>
                </div>
                <div className={styles.toggleSwitch}>
                  <div className={styles.toggleThumb}></div>
                </div>
              </div>
            </div>

            <div className={styles.settingsList}>
              <div className={styles.settingsItem}>
                <div className={styles.settingsLeft}>
                  <span className={styles.settingsIcon}>❓</span>
                  <span className={styles.settingsLabel}>Ajuda e Suporte</span>
                </div>
                <span className={styles.chevron}>›</span>
              </div>

              <div className={styles.settingsItem}>
                <div className={styles.settingsLeft}>
                  <span className={styles.settingsIcon}>📄</span>
                  <span className={styles.settingsLabel}>Termos de Uso</span>
                </div>
                <span className={styles.chevron}>›</span>
              </div>

              <div className={styles.settingsItem}>
                <div className={styles.settingsLeft}>
                  <span className={styles.settingsIcon}>🔒</span>
                  <span className={styles.settingsLabel}>Privacidade</span>
                </div>
                <span className={styles.chevron}>›</span>
              </div>
            </div>

            <Button
              variant="btnOutlineDanger"
              onClick={() => {
                console.log("Logging out");
                logOut();
              }}
            >
              Sair da conta
            </Button>

            <div className={styles.version}>Versão 1.0.0</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
