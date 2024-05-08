import Grid from "@mui/material/Grid";
import Image from "next/image";
import styles from "./FilmGrid.module.css";
import notfound from "@/_assets/NOTFOUND.png";

export default function FilmGrid({ cast }: { cast: any }) {
  return (
    <div className={styles.gridContainer}>
      <Grid container spacing={1.5} columns={{ xs: 4, sm: 5, md: 6 }}>
        {cast
          .filter((result: any) => result.media_type == "movie")
          .sort((a: any, b: any) => (a.popularity > b.popularity ? -1 : 1))
          .map((result: any) => (
            <Grid item xs key={result.id}>
              <Image
                className={styles.poster}
                width={100.8}
                height={144}
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                    : notfound
                }
                alt="poster"
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
