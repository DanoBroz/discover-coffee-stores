import { MouseEvent } from "react";
import styles from "./banner.module.css";

interface ButtonProps {
  buttonText: string;
  buttonFunction: (e: MouseEvent) => void;
}

export default function Banner({ buttonText, buttonFunction }: ButtonProps) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    console.log("You clicked the button!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <button className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}
