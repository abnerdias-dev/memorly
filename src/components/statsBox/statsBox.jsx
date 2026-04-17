import styles from "./statsBox.module.css";

function Status({title, info}) {
  return (
    <>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{title}</div>
        <div className={styles.statLabel}>{info}</div>
      </div>
    </>
  );
}

export default Status;
