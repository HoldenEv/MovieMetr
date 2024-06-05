import styles from "./MovieDetailPage.module.css";
import Image from "next/image";
import notfound from "@/_assets/NOTFOUND.png";

export default function MovieDetailPage({
  data,
}: {
  /* 
    not declaring the types directly here so that we can gracefully
    handle invalid category params in a URL 
    */
  data: any;
}) {
  return (
    <div className={styles.moviepage}>
      {/* <div
          style={{
            position: "relative",
            height: "480px",
            width: "853px",
            zIndex: "0",
            margin: "auto",
          }}
        > */}
      {data.backdrop_path && (
        <div className={styles.backdrop}>
          <Image
            className={styles.image}
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={`backdrop for ${data.title}`}
            //   fill={true}
            style={{
              margin: "auto",
              width: "80%",
              height: "auto",
              background: "#191c2d",
              boxShadow: "0 0 20px 20px rgba(0,0,0,0.9)",
            }}
            width={1280}
            height={720}
            //   layout="fill"
          />
        </div>
      )}
      {/* </div> */}
      <div className={styles.container}>
        <div className={styles.poster}>
          <Image
            className={styles.posterimage}
            priority
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                : notfound
            }
            width={255}
            height={382.5}
            alt="Search for a movie"
          ></Image>
        </div>
        <div className={styles.info}>
          <div className={styles.movietitle}>{data.title}</div>
          <div className={styles.moviedetail}>
            <div className={styles.set}>
              <label> Release Date</label>
              <span> {data.release_date}</span>
            </div>
            <div className={styles.set}>
              <label> Running time</label>
              <span> {data.runtime} minutes</span>
            </div>
            {data.genres && (
              <div className={styles.set}>
                <label> Genre</label>
                <span>
                  {data.genres.map((genre: any, index: number) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index !== data.genres.length - 1 && "/"}{" "}
                      {/* add '/' if it's not the last genre */}
                    </span>
                  ))}
                </span>
              </div>
            )}
            <div className={styles.set}>
              <label> About </label>
              <span>{data.tagline}</span>
              <div className={styles.moviedescription}>{data.overview}</div>
            </div>
            {data.credits && (
              <div className={styles.set}>
                <label> Cast </label>
                <div className={styles.horizontalScroll}>
                  {data.credits.cast.map((entry: any, id: any) => (
                    <div key={id} className={styles.imageItemContainer}>
                      <div className={styles.imageItem}>
                        {entry.profile_path ? (
                          <Image
                            className={styles.castImage}
                            src={`https://image.tmdb.org/t/p/original${entry.profile_path}`}
                            alt={entry.id}
                            width={50}
                            height={70}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          entry.id
                        )}
                      </div>
                      <div className={styles.name}>{entry.original_name}</div>
                      <div className={styles.character}> {entry.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
