import { useState } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown({ open, trigger, menu }) {
  return (
    <div className={styles.dropdown}>
      {trigger}
      {open ? (
        <ul className={styles.menu}>
          {menu.map((menuItem, index: number) => (
            <li key={index}>{menuItem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
