import styles from "./tip.module.css";

function Tip({ text }) {
  return (
    <>
      <div className={styles.tipContainer}>
        <p className={styles.tipTitle}>💡 Dica</p>
        <p>{text}</p>
      </div>
    </>
  );
}

export default Tip;
