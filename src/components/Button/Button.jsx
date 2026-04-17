import styles from "./Button.module.css";

function Button({disabled, onClick, children, variant = "btnPrimary", ...props }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
