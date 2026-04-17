import styles from "./label.module.css";

function Label({ text, status }) {
  const statusStyles = {
    new: styles.newCard,
    learning: styles.learningCard,
    review: styles.reviewCard,
    mastered: styles.masteredCard,
  };
  return (
    <>
      <p className={`${statusStyles[status]} ${styles.cardStatus}`}>{text}</p>
    </>
  );
}

export default Label;
