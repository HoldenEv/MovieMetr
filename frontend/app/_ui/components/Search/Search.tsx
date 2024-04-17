"use client";
import React from "react";
import { useState } from "react";
import styles from "./Search.module.css";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "../DropDown/Dropdown";
import Login from "../Login/Login";
import SignUp from "../Signup/Signup";
import searchIcon from "@/_assets/search.svg";
import { useRouter } from "next/navigation";

export default function Search() {
  /* what button is active: starts off with 'Movies' */
  const [activeButton, setActiveButton] = useState("Films");
  /* state of dropdown form (open/closed): starts on closed */
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
      let inputText = formElement.search.value;
      /* if user has not entered anything, don't do anything on submit*/
      if (inputText === "") {
        return;
      }
      /* convert input text to lowercase, replace spaces with dashes */
      inputText = inputText.replace(/\s+/g, "+").toLowerCase();
      /* go to search page for searched item */
      router.push(`/search/${activeButton.toLowerCase()}/${inputText}/page/1`);
      /* reset the value of the search bar */
      formElement.search.value = "";
    } catch (error) {
      console.error("Error getting results: ", error);
    }
  };

  return (
    <div>
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
              onClick={(event) => handleClick("Films", event)}
              key="films"
            >
              Films
            </button>,
            <button
              onClick={(event) => handleClick("Shows", event)}
              key="shows"
            >
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
          autoComplete="off"
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
    </div>
  );
}

// export default function Header() {
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [signupOpen, setSignupOpen] = useState(false);

//   const handleOpen = () => {
//     setLoginOpen(!loginOpen);
//   };

//   const handleSignupClick = () => {
//     setSignupOpen(!signupOpen);
//   };

//   return (
//     <>
//       <header className={styles.header}>
//         <nav>
//           <ul className={styles.list}>
//             {loginOpen ? null : <Form />}
//             <div className={styles.navLinkContainer}>
//               <Link href="/" className={styles.navLink}>
//                 HOME
//               </Link>
//               <a className={styles.navLink} onClick={handleOpen}>
//                 SIGN IN
//               </a>
//               {loginOpen ? null : (
//                 <a className={styles.navLink} onClick={handleSignupClick}>
//                   CREATE ACCOUNT
//                 </a>
//               )}
//             </div>
//           </ul>
//           <div className={styles.hamburger}>
//             <span className={styles.bar}></span>
//             <span className={styles.bar}></span>
//             <span className={styles.bar}></span>
//           </div>
//         </nav>
//       </header>
//       {loginOpen ? <Login setOpenState={setLoginOpen} /> : null}
//       {signupOpen ? (
//         <SignUp isOpen={signupOpen} setOpenState={setSignupOpen} />
//       ) : null}
//     </>
//   );
// }

// function AuthContainer() {
//   const [isLoginOpen, setLoginOpen] = useState(false);
//   const [isSignUpOpen, setSignUpOpen] = useState(false);

//   const openLogin = () => {
//     setLoginOpen(true);
//     setSignUpOpen(false);
//   };

//   const openSignUp = () => {
//     setSignUpOpen(true);
//     setLoginOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={openLogin}>Open Login</button>
//       <button onClick={openSignUp}>Open Sign Up</button>

//       {isLoginOpen && <Login setOpenState={setLoginOpen} />}
//       {isSignUpOpen && <SignUp setOpenState={setSignUpOpen} />}
//     </div>
//   );
// }
