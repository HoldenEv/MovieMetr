"use client";
import React from "react";
import { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "./Dropdown";
import searchIcon from "@/_assets/search.svg";
import {search} from "@/_api/search";

function Form() {
  const [activeButton, setActiveButton] = useState("Movies");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const inputText: String = event.target.search.value;
      event.target.search.value = "";

      const searchData = await search(activeButton, inputText);
      console.log(searchData);
    } catch (error) {
      console.error("error", error);
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
