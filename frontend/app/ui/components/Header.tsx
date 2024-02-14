import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className={styles.list}>
          <li>adf</li>
          <input type="text" placeholder="Search..." />
          <li>asdf</li>
        </ul>
      </nav>
    </header>
  );
}
