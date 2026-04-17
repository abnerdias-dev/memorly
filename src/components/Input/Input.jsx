import styles from "./input.module.css";

function Input({type, onFocus, className, value, onChange, ...props }) {
  return (
    <input
    type={type}
      className={`${styles.inputField} ${className || ""}`}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      {...props}
    />
  );
}

export default Input;
