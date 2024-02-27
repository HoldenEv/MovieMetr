import { useRef, useEffect, Dispatch, SetStateAction, MouseEvent } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: React.ReactNode;
  menu: React.ReactNode[];
}

type CallbackFunction = () => void;

const useOutsideClick = (callback: CallbackFunction) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback, ref]);

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
