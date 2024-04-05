import styles from "./FilmSearchResult.module.css";
import Image from "next/image";

export default function FilmSearchResult({ filmData }: { filmData: any }) {
  const summary =
    filmData.summary.length > 220
      ? filmData.summary.slice(0, 220) + "..."
      : filmData.summary;
  return (
    <div className={styles.searchResultContainer}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${filmData.image}`}
        width={90}
        height={134.25}
        alt={`Poster for ${filmData.title}`}
        className={styles.moviePoster}
      ></Image>
      <div>
        <h2 className={styles.title}>{filmData.title}</h2>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
}
