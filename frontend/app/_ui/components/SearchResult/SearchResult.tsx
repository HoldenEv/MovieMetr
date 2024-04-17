import styles from "./SearchResult.module.css";
import Image from "next/image";

export default function SearchResult({
  type,
  data,
}: {
  /* 
  not declaring the types directly here so that we can gracefully
  handle invalid category params in a URL 
  */
  type: string;
  data: any;
}) {
  let summary;
  if (type === "films" || type === "shows") {
    summary =
      data.summary.length > 200
        ? data.summary.slice(0, 200) + "..."
        : data.summary;
  } else {
    summary = "";
  }

  return (
    <div className={styles.searchResultContainer}>
      <Image
        src={`https://image.tmdb.org/t/p/original${data.image}`}
        width={100.8}
        height={144}
        alt={`Poster for ${data.title}`}
        className={styles.moviePoster}
      ></Image>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {type === "films" ? data.title : data.name}
          </h2>
          <h3 className={styles.alternateTitle}>
            {(type === "films" && data.original_title !== data.title) ||
            (type === "shows" && data.original_name !== data.name)
              ? ` \u2022 [${type === "films" ? data.original_title : data.original_name}]`
              : ""}
          </h3>
        </div>
        <h3 className={styles.year}>
          ({type === "films" ? data.year : data.startdate})
        </h3>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
}
