import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
// import Image from "next/image";
// import searchIcon from "/Users/lukaschou/fortnite-meter/MovieMetr/frontend/public/search-svgrepo-com.svg"

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navMenu}>
        <Link href="#" className={styles.logo}>
          LOGO
        </Link>
        <ul className={styles.list}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.search}
          />
          {/* <Image src={searchIcon} alt="Search for a movie"></Image> */}
          <Link href="#" className={styles.navLink}>
            SIGN IN
          </Link>
          <Link
            href="#"
            className={`${styles.navLink} ${styles.createAccount}`}
          >
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
