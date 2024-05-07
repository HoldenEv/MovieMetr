import styles from "./PersonInfo.module.css";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import notfound from "@/_assets/NOTFOUND.png";
import { useState } from "react";
import { Modal } from "@mui/material";

interface PersonInfoProps {
  name: string;
  imagePath: string;
  bio: string;
}

export default function PersonInfo({ name, imagePath, bio }: PersonInfoProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const bioText =
    bio.length > 400 ? (
      <>
        {bio.slice(0, 400)}
        <span className={styles.moreButton} onClick={handleOpen}>
          More...
        </span>
      </>
    ) : bio.length <= 400 ? (
      bio
    ) : (
      ""
    );

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.nameMobile}>{name}</h1>
        <div className={styles.infoContainer}>
          <div className={styles.textWrapper}>
            <h1 className={styles.nameDesktop}>{name}</h1>
            <p className={`${styles.bio} ${open ? styles.bioBlur : ""}`}>{bioText}</p>
          </div>
          <div>
            <Image
              className={styles.headshot}
              width={100}
              height={150}
              priority
              src={
                imagePath
                  ? `https://image.tmdb.org/t/p/original${imagePath}`
                  : notfound
              }
              alt={`headshot of ${name}`}
            ></Image>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
          <div>
            <p className={styles.bio}>{bio}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
