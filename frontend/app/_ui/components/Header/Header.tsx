"use client";
import React from "react";
import { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "../DropDown/Dropdown";
import Login from "../Login/Login";
import searchIcon from "@/_assets/search.svg";
import { search } from "@/_api/search";

function Form() {
  /* what button is active: starts off with 'Movies' */
  const [activeButton, setActiveButton] = useState("Movies");
  /* state of dropdown form (open/closed): starts on closed */
  const [open, setOpen] = useState(false);

  /* on open, prevent any default event and set open state to 
  either closed or open */
  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOpen(!open);
  };

  /* on click of option, prevent event default, set active button
  to category clicked close the dropdown */
  const handleClick = (
    category: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setActiveButton(category);
    setOpen(false);
  };

  /* handles form submit */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        setOpen={setOpen}
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
          <button
            onClick={(event) => handleClick("Movies", event)}
            key="movies"
          >
            Movies
          </button>,
          <button onClick={(event) => handleClick("Shows", event)} key="shows">
            Shows
          </button>,
          <button
            onClick={(event) => handleClick("People", event)}
            key="people"
          >
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
          width={17}
          alt="Search for a movie"
          className={styles.searchIcon}
        ></Image>
      </button>
    </form>
  );
}

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleOpen = () => {
    setLoginOpen(!loginOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul className={styles.list}>
            {loginOpen ? null : <Form />}
            <div className={styles.navLinkContainer}>
              <Link href="/" className={styles.navLink}>
                HOME
              </Link>
              <a className={styles.navLink} onClick={handleOpen}>
                SIGN IN
              </a>
              {loginOpen ? null : (
                <Link
                  href="/signup"
                  className={`${styles.navLink} ${styles.createAccount}`}
                >
                  CREATE ACCOUNT
                </Link>
              )}
            </div>
          </ul>
          <div className={styles.hamburger}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </nav>
      </header>
      {loginOpen ? <Login setOpenState={setLoginOpen} /> : null}
    </>
  );
}
