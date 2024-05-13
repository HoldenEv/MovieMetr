import styles from "./SearchResult.module.css";
import Image from "next/image";
import notfound from "@/_assets/NOTFOUND.png";
import Link from "next/link";

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
      data.summary.length > 500
        ? data.summary.slice(0, 500) + "..."
        : data.summary;
  } else {
    summary = "";
  }

  const linkSource = `/${type}/${data.id}`;

  return (
    <div className={styles.searchResultContainer}>
      <Link href={linkSource}>
        <Image
          // use our own "not found" image if source is not found from TMDB
          src={
            data.image
              ? `https://image.tmdb.org/t/p/original${data.image}`
              : notfound
          }
          width={100.8}
          height={144}
          alt={`Poster for ${data.title}`}
          className={styles.moviePoster}
        ></Image>
      </Link>
      <div className={styles.content}>
        <div>
          <div className={styles.titleContainer}>
            <Link href={linkSource}>
              <h2 className={styles.title}>
                {type === "films" ? data.title : data.name}
              </h2>
            </Link>
            <h3 className={styles.alternateTitle}>
              {(type === "films" && data.original_title !== data.title) ||
              (type === "shows" && data.original_name !== data.name)
                ? ` \u2022 [${type === "films" ? data.original_title : data.original_name}]`
                : ""}
            </h3>
          </div>
          {type === "films" || type === "shows" ? (
            <h3 className={styles.year}>
              ({type === "films" ? data.year : data.startdate})
            </h3>
          ) : (
            <h3 className={styles.year}>
              Known for{" "}
              <span className={styles.italic}>{data.known_for_department}</span>
            </h3>
          )}
        </div>
        <div>
          {type === "people" && data.known_for.length > 0 ? (
            <div className={styles.knownForContainer}>
              <h4 className={styles.notableWorksLabel}>Notable works: </h4>
              {data.known_for.map((work: any, index: number) => {
                return (
                  <span key={work.id}>
                    <span className={styles.knownForWork}>{work.title}</span>
                    {index < data.known_for.length - 1 ? "," : ""}{" "}
                  </span>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <p className={styles.summary}>{summary}</p>
        </div>
      </div>
    </div>
  );
}
