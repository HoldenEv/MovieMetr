"use client";
import React from "react";
import { useState, FormEvent } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "./Dropdown";
import searchIcon from "@/_assets/search.svg";
import { search } from "@/_api/search";

function Form() {
  /* what button is active: starts off with 'Movies' */
  const [activeButton, setActiveButton] = useState("Movies");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      /* this is so TypeScript recognizing the attributes of the event
      we are accessing */
      const formElement = event.target as HTMLFormElement;
      /* store the search text */
      const inputText = formElement.search.value;
      /* call function to make the search */
      const searchData = await search(activeButton, inputText);
      /* reset the value of the search bar */
      formElement.search.value = "";
      console.log(searchData); //FOR DEBUGGING
    } catch (error) {
      console.error("Error getting results: ", error);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <Dropdown activeButton={activeButton} setActiveButton={setActiveButton} />
      <input
        type="text"
        placeholder="Search..."
        className={styles.search}
        name="search"
      />
      <button className={styles.searchButton} type="submit">
        <Image
          priority
          src={searchIcon}
          alt="Search for a movie"
          className={styles.searchIcon}
        ></Image>
      </button>
    </form>
  );
}

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navMenu}>
        <ul className={styles.list}>
          <Form />
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              HOME
            </Link>
            <Link href="/login" className={styles.navLink}>
              SIGN IN
            </Link>
            <Link
              href="#"
              className={`${styles.navLink} ${styles.createAccount}`}
            >
              CREATE ACCOUNT
            </Link>
          </div>
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
