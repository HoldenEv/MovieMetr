import { useState } from "react";
import styles from "./Header.module.css";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Films");

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={handleOpen} className={`${styles.menuItem} ${styles.activeItem}`}>
        {active}
      </button>
      {open ? (
        <ul className={styles.menu}>
          <li>
            <button
              className={styles.menuItem}
              onClick={() => setActive("Films")}
            >
              Films
            </button>
          </li>
          <li>
            <button
              className={styles.menuItem}
              onClick={() => setActive("Shows")}
            >
              Shows
            </button>
          </li>
          <li>
            <button
              className={styles.menuItem}
              onClick={() => setActive("Cast/Crew")}
            >
              Cast/Crew
            </button>
          </li>
        </ul>
      ) : null}
      {/* {open ? <div>Is open</div> : <div>Is closed</div>} */}
    </div>
  );
}
