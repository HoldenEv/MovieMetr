import styles from "./FilmSearchResult.module.css";
import Image from "next/image";

export default function FilmSearchResult({ filmData }: { filmData: any }) {
  const summary =
    filmData.summary.length > 200
      ? filmData.summary.slice(0, 200) + "..."
      : filmData.summary;
  return (
    <div className={styles.searchResultContainer}>
      <Image
        src={`https://image.tmdb.org/t/p/original${filmData.image}`}
        width={100.8}
        height={144}
        alt={`Poster for ${filmData.title}`}
        className={styles.moviePoster}
      ></Image>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{filmData.title}</h2>
          <h3 className={styles.alternateTitle}>
            {filmData.original_title !== filmData.title
              ? ` \u2022 [${filmData.original_title}]`
              : ""}
          </h3>
        </div>
        <h3 className={styles.year}>({filmData.year})</h3>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
}
