"use client";
import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "../../../../public/search.svg";
import logoIcon from "../../../../public/logo.svg";

function Form() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const search = event.target.search.value;
      const response = await fetch(
        `http://localhost:3001/search?category=movies&name=${search}`
      );
      if (!response.ok) {
        throw new Error("response not okay");
      }
      const searchData = await response.json();
      console.log(searchData);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <Image
        priority
        src={searchIcon}
        alt="Search for a movie"
        className={styles.searchIcon}
      ></Image>
      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
        name="search"
      />
    </form>
  );
}

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navMenu}>
        <Link href="#" className={styles.logoContainer}>
          <Image
            priority
            src={logoIcon}
            alt="Our logo"
            className={styles.logoIcon}
          ></Image>
          <h1 className={styles.logoText}>MOVIEMETER</h1>
        </Link>
        <ul className={styles.list}>
          <Form />
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
