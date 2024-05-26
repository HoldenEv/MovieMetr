import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import styles from "./FilmGrid.module.css";
import notfound from "@/_assets/NOTFOUND.png";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function FilmGrid({ cast, crew }: { cast: any; crew: any }) {
  const sortByOptions = useMemo(
    () => ({
      popularity: (a: any, b: any) => (a.vote_count > b.vote_count ? -1 : 1),
      title: (a: any, b: any) => a.title.localeCompare(b.title),
      date: (a: any, b: any) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    }),
    [],
  );

  type SortByOption = keyof typeof sortByOptions;
  type Category = "all" | "film" | "tv";
  type Order = "asc" | "desc";

  interface CrewItem {
    id: number;
    title: string;
    job: string;
    media_type: string;
    poster_path: string;
    popularity: number;
    vote_count: number;
    release_date: string;
  }

  const buttons = [
    { label: "FILM", value: "film" },
    { label: "TV", value: "tv" },
  ];

  const [role, setRole] = useState("actor");
  const getFilteredItems = useCallback(
    (category: Category, sortBy: SortByOption) => {
      let filteredItems;

      if (role === "actor") {
        filteredItems = cast;
      } else {
        filteredItems = crew;
      }

      if (category === "film") {
        filteredItems = filteredItems.filter(
          (result: any) => result.media_type == "movie",
        );
      } else if (category === "tv") {
        filteredItems = filteredItems.filter(
          (result: any) => result.media_type == "tv",
        );
      }

      if (role !== "actor") {
        filteredItems = filteredItems.filter(
          (result: any) => result.job.toLowerCase() === role,
        );
      }

      const sortedItems = filteredItems.sort(sortByOptions[sortBy]);
      return sortedItems;
    },
    [cast, crew, role, sortByOptions],
  );

  const [activeButton, setActiveButton] = useState<Category>("film");
  const [items, setItems] = useState(getFilteredItems("film", "popularity"));
  const [sortBy, setSortBy] = useState<SortByOption>("popularity");
  const [order, setOrder] = useState<Order>("desc");
  const [uniqueJobs, setUniqueJobs] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique job roles from the crew array
    const jobs: string[] = crew.map((item: CrewItem) => item.job);
    const uniqueJobs: string[] = Array.from(new Set(jobs));
    setUniqueJobs(uniqueJobs);
    console.log(uniqueJobs);
  }, [crew]);

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value.toLowerCase() as SortByOption);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value.toLowerCase() as SortByOption);
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    const sortedItems = getFilteredItems(activeButton, sortBy);
    if (order === "asc") {
      sortedItems.reverse();
    }
    setItems([]);

    setTimeout(() => {
      setItems(sortedItems);
    }, 0);
  }, [activeButton, sortBy, getFilteredItems, order]);

  return (
    <div>
      <div className={styles.filterBar}>
        <Stack
          spacing={1}
          direction="row"
          sx={{
            padding: "5px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
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
                  marginRight: "10px",
                }}
                onClick={() => setActiveButton(button.value as Category)}
              >
                {button.label}
              </Button>
            ))}
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}
          >
            <FormControl
              variant="standard"
              size="small"
              className={styles.inputLabel}
              sx={{ minWidth: "100px" }}
            >
              <InputLabel sx={{ color: "#ccc" }}>Role:</InputLabel>
              <Select
                value={role}
                label="Sort By"
                onChange={handleRoleChange}
                sx={{
                  color: "white",
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              >
                <MenuItem value={"actor"}>ACTOR</MenuItem>
                {uniqueJobs &&
                  uniqueJobs.map((job, index) => {
                    return (
                      <MenuItem value={job.toLowerCase()} key={index}>
                        {job.toUpperCase()}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FormControl
              variant="standard"
              size="small"
              className={styles.inputLabel}
              sx={{ minWidth: "100px" }}
            >
              <InputLabel sx={{ color: "#ccc" }}>Sort By:</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleChange}
                sx={{
                  color: "white",
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              >
                <MenuItem value={"popularity"}>POPULARITY</MenuItem>
                <MenuItem value={"title"}>TITLE</MenuItem>
                <MenuItem value={"date"}>DATE</MenuItem>
              </Select>
            </FormControl>
            {order === "desc" ? (
              <ArrowDownwardIcon
                onClick={toggleOrder}
                className={styles.arrow}
              />
            ) : (
              <ArrowUpwardIcon onClick={toggleOrder} className={styles.arrow} />
            )}
          </div>
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
        {items.length === 0 ? (
          <p>no results found</p>
        ) : (
          <Grid
            container
            spacing={{ xs: 0, sm: 1.2 }}
            columns={{ xs: 4, sm: 5, md: 6 }}
          >
            {items.map((result: any, index: number) => (
              <Grid item xs key={index}>
                <Link
                  href={`/${result.media_type === "movie" ? "films" : "shows"}/${result.id}`}
                >
                  {result.poster_path ? (
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
                  ) : (
                    <div className={`${styles.poster} ${styles.posterNoImage}`}>
                      <p>{result.title}</p>
                    </div>
                  )}
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
