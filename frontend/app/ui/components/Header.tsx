import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className={styles.navMenu}>
        <h1>LOGO</h1>
        <ul className={styles.list}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.search}
          />
          <Link href="#" className={styles.navLink}>
            SIGN IN
          </Link>
          <Link href="#" className={styles.navLink}>
            CREATE ACCOUNT
          </Link>
        </ul>
        <div className={styles.hamburger}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
}
