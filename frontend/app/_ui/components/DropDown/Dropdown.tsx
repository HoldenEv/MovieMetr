import styles from "./Dropdown.module.css";

interface DropdownProps {
  open: boolean;
  trigger: React.ReactNode;
  menu: React.ReactNode[];
}

export default function Dropdown({ open, trigger, menu }: DropdownProps) {
  return (
    <div className={styles.dropdown}>
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
