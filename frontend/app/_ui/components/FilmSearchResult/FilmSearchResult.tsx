import styles from "./FilmSearchResult.module.css";
import Image from "next/image";

export default function FilmSearchResult({ filmData }: { filmData: any }) {
  return (
    <div className={styles.searchResultContainer}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${filmData.image}`}
        width={500}
        height={500}
        alt={"poster for film"}
      ></Image>
      `<p>{filmData.image}</p>
      <h2 className={styles.title}>{filmData.title}</h2>
      <p>{filmData.summary}</p>
    </div>
  );
}
