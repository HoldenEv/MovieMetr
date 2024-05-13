import { ViewHeadline } from "@mui/icons-material";
import styles from "./MovieDetailPage.module.css";
import Image from "next/image";
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
      <div className={styles.backdrop}>
        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={`backdrop for ${data.title}`}
          //   fill={true}
          style={{
            margin: "auto",
            width: "50%",
            height: "auto",
  
          }}
          width={1280}
          height={720}
          //   layout="fill"
        />
      </div>

      {/* </div> */}
      <div className={styles.container}>
        <div className={styles.poster}>
          <Image
            priority
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            style={{
              padding: 0,
              margin: 0,
            }}
            width={300}
            height={450}
            alt="Search for a movie"
          ></Image>
        </div>
        <div className={styles.info}>
          <div className={styles.movietitle}>{data.title}</div>
          <div className={styles.moviedetail}>
            <div className={styles.set}>
              <label> Release Date</label>
              <span> March 3, 2023</span>
            </div>
            <div className={styles.set}>
              <label> Running time</label>
              <span> 1 Hr 47 Min</span>
            </div>
            <div className={styles.set}>
              <label> Genre</label>
              <span> Fantasy/ Adventure/ Family</span>
            </div>
          </div>

          <div className={styles.moviedescription}>{data.overview}</div>
          <div className={styles.moviecast}>Insert hamburger menu here</div>
        </div>
      </div>
    </div>
  );
}
