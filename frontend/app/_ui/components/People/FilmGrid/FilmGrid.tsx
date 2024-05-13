import { useState } from "react";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import styles from "./FilmGrid.module.css";
import notfound from "@/_assets/NOTFOUND.png";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function FilmGrid({ cast }: { cast: any }) {
  const movies = cast
    .filter((result: any) => result.media_type == "movie")
    .sort((a: any, b: any) => (a.vote_count > b.vote_count ? -1 : 1));
  const shows = cast
    .filter((result: any) => result.media_type == "tv")
    .sort((a: any, b: any) => (a.vote_count > b.vote_count ? -1 : 1));
  const all = cast.sort((a: any, b: any) =>
    a.vote_count > b.vote_count ? -1 : 1,
  );

  const [activeButton, setActiveButton] = useState("film");
  const [items, setItems] = useState(movies);

  const buttons = [
    { label: "ALL", value: "all" },
    { label: "FILM", value: "film" },
    { label: "TV", value: "tv" },
  ];

  const filter = (category: string) => {
    setActiveButton(category);
    if (category === "film") {
      setItems([]);
      setTimeout(() => {
        setItems(movies);
      }, 0);
    } else if (category === "tv") {
      setItems([]);
      setTimeout(() => {
        setItems(shows);
      }, 0);
    } else if (category === "all") {
      setItems([]);
      setTimeout(() => {
        setItems(all);
      }, 0);
    }
  };

  return (
    <div>
      <div className={styles.filterBar}>
        <Stack spacing={1} direction="row" sx={{ padding: "5px 10px" }}>
          {buttons.map((button) => (
            <Button
              key={button.value}
              variant="outlined"
              style={{
                color: activeButton === button.value ? "pink" : "",
                backgroundColor:
                  activeButton === button.value ? "#49508565" : "",
                borderColor:
                  activeButton === button.value ? "#438b8b64" : "inherit",
              }}
              onClick={() => filter(button.value)}
            >
              {button.label}
            </Button>
          ))}
        </Stack>
      </div>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#8aa5ae",
        }}
      />
      <div className={styles.gridContainer}>
        <Grid
          container
          spacing={{ xs: 0, sm: 1.2 }}
          columns={{ xs: 4, sm: 5, md: 6 }}
        >
          {items.map((result: any, index: number) => (
            <Grid item xs key={index}>
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
    </div>
  );
}
