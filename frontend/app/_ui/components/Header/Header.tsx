"use client";
import React from "react";
import { useState, FormEvent } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "../DropDown/Dropdown";
import searchIcon from "@/_assets/search.svg";
import { search } from "@/_api/search";

function Form() {
  /* what button is active: starts off with 'Movies' */
  const [activeButton, setActiveButton] = useState("Movies");
  const [open, setOpen] = useState(false);

  const handleOpen = (event: any) => {
    event.preventDefault();
    setOpen(!open);
  };

  const handleClick = (category: string, event: any) => {
    event.preventDefault();
    setActiveButton(category);
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      /* this is so TypeScript recognizing the attributes of the event
      we are accessing */
      const formElement = event.target as HTMLFormElement;
      /* store the search text */
      const inputText = formElement.search.value;
      /* start by querying the first page */
      const page = "1" as string;
      /* call function to make the search */
      const searchData = await search(activeButton, inputText, page);
      /* reset the value of the search bar */
      formElement.search.value = "";
      console.log(searchData); //FOR DEBUGGING
    } catch (error) {
      console.error("Error getting results: ", error);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <Dropdown
        open={open}
        trigger={
          <button
            onClick={handleOpen}
            className={styles.activeItem}
            type="button"
          >
            {activeButton}
          </button>
        }
        menu={[
          <button onClick={() => handleClick("Movies", event)} key="movies">
            Movies
          </button>,
          <button onClick={() => handleClick("Shows", event)} key="shows">
            Shows
          </button>,
          <button onClick={() => handleClick("People", event)} key="people">
            People
          </button>,
        ]}
      />
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
      <nav>
        <ul className={styles.list}>
          <Form />
          <div className={styles.navLinkContainer}>
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
