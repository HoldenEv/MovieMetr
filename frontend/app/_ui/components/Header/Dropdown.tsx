import { useState } from "react";
import styles from "./Header.module.css";

interface DropdownProps {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown({
  activeButton,
  setActiveButton,
}: DropdownProps) {
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

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        onClick={handleOpen}
        className={`${styles.menuItem} ${styles.activeItem}`}
      >
        {activeButton}
      </button>
      {open ? (
        <ul className={styles.menu}>
          <li>
            <button
              className={styles.menuItem}
              onClick={() => handleClick("Movies", event)}
            >
              Movies
            </button>
          </li>
          <li>
            <button
              className={styles.menuItem}
              onClick={() => handleClick("Shows", event)}
            >
              Shows
            </button>
          </li>
          <li>
            <button
              className={styles.menuItem}
              onClick={() => handleClick("People", event)}
            >
              People
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
