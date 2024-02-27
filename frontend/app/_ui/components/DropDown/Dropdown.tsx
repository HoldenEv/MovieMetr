import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: React.ReactNode;
  menu: React.ReactNode[];
}

const useOutsideClick = (callback) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
};

export default function Dropdown({
  open,
  setOpen,
  trigger,
  menu,
}: DropdownProps) {
  const handleClickOutside = () => {
    setOpen(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className={styles.dropdown} ref={ref}>
      {trigger}
      {open ? (
        <ul className={styles.menu}>
          {menu.map((menuItem: React.ReactNode, index: number) => (
            <li key={index}>{menuItem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
