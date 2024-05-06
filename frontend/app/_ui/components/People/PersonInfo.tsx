import styles from "./PersonInfo.module.css";
import Image from "next/image";
import notfound from "@/_assets/NOTFOUND.png";
import { useState, useEffect } from "react";

interface PersonInfoProps {
  name: string;
  imagePath: string;
  bio: string;
}

export default function PersonInfo({ name, imagePath, bio }: PersonInfoProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const bioText =
    bio.length > 400 && !expanded ? (
      <>
        {bio.slice(0, 400)}
        <span className={styles.moreButton} onClick={toggleExpanded}>
          More...
        </span>
      </>
    ) : (
      <>
        {bio}
        {bio.length > 400 && (
          <span className={styles.moreButton} onClick={toggleExpanded}>
            Less...
          </span>
        )}
      </>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.nameMobile}>{name}</h1>
      <div className={styles.infoContainer}>
        <div className={styles.textWrapper}>
          <h1 className={styles.nameDesktop}>{name}</h1>
          <p className={styles.bio}>{bioText}</p>
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
  );
}
