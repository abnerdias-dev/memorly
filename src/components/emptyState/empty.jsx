import styles from "./empty.module.css";

function Empty({ noItem, solution }) {
  return (
    <>
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📭</div>
        <div className={styles.emptyTitle}>{noItem}</div>
        <div className={styles.emptyText}>{solution}</div>
      </div>
    </>
  );
}

export default Empty;
