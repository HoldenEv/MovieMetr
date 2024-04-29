import { ViewHeadline } from "@mui/icons-material";
import styles from "./MovieDetailPage.module.css";
import Image from "next/image";
export default function MovieDetailPage({
    data
  }: {
    /* 
    not declaring the types directly here so that we can gracefully
    handle invalid category params in a URL 
    */
    data: any;
  }){
    return (
        <div className={styles.moviepage}>
            <head>
                <title>Title</title>
            </head>
            <div className={styles.backdrop}
               style={{
                minHeight: "100vh", // Let the height adjust automatically based on the content
            // Set the width to fill its container
                backgroundSize: "cover", // Ensure the background image covers the entire container
                backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                backgroundPosition: "center",
               
              }}>
                <div className={styles.container}>
                    <div className={styles.poster}>
                    <Image
                        priority
                        src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                        width={300}
                        height={400}
                        alt="Search for a movie"
                    ></Image>
                    </div>  
                    <div className={styles.info}>
                        <div className={styles.movietitle}>
                            {data.title} 
                        </div>
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
                         
                        <div className={styles.moviedescription}>
                            {data.overview}
                        </div>
                        <div className={styles.moviecast}>
                            Insert hamburger menu here
                        </div>
                    </div>
                   

                </div>

            </div>
           

        </div>
    )
}