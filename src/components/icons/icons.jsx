import { useState } from "react";
import styles from "./icons.module.css";
import { useIcon } from "./iconContext";

function Icons() {
  const { selectedIcon, setSelectedIcon } = useIcon();

  return (
    <div className={styles.iconsContainer}>
      <div
        className={
          selectedIcon === "code"
            ? styles.iconContainerSelected
            : styles.iconContainer
        }
        onClick={() => {
          setSelectedIcon("code");
        }}
      >
        <img src="/study-icons/code.png" />
      </div>
      <div
        className={
          selectedIcon === "economics"
            ? styles.iconContainerSelected
            : styles.iconContainer
        }
        onClick={() => {
          setSelectedIcon("economics");
        }}
      >
        <img src="/study-icons/economics.png" />
      </div>
      <div
        className={
          selectedIcon === "language"
            ? styles.iconContainerSelected
            : styles.iconContainer
        }
        onClick={() => {
          setSelectedIcon("language");
        }}
      >
        <img src="/study-icons/language.png" />
      </div>
      <div
        className={
          selectedIcon === "idea"
            ? styles.iconContainerSelected
            : styles.iconContainer
        }
        onClick={() => {
          setSelectedIcon("idea");
        }}
      >
        <img src="/study-icons/idea.png" />
      </div>
      <div
        className={
          selectedIcon === "physics"
            ? styles.iconContainerSelected
            : styles.iconContainer
        }
        onClick={() => {
          setSelectedIcon("physics");
        }}
      >
        <img src="/study-icons/physics.png" />
      </div>
    </div>
  );
}

export default Icons;
