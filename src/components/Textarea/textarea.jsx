import styles from "./textarea.module.css";

function TextArea({ onFocus, className, value, onChange, ...props }) {
  return (
    <textarea
      className={`${styles.inputField} ${className || ""}`}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      {...props}
    />
  );
}

export default TextArea;
