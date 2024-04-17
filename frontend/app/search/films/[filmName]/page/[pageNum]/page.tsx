"use client";
import { search } from "@/_api/search";
import { useEffect, useState } from "react";
import FilmSearchResult from "@/_ui/components/FilmSearchResult/FilmSearchResult";
import styles from "./filmSearch.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: { filmName: string; pageNum: string };
}) {
  const [searchData, setSearchData] = useState<any>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await search("movies", params.filmName, params.pageNum);
      setSearchData({ filmData: data, loading: false });
      console.log(data);
    };
    fetchData();
  }, [params.filmName, params.pageNum]);

  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/search/films/${params.filmName}/page/${value}`);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={styles.wrapper}>
      {!searchData.loading && (
        <>
          <h2 className={styles.totalResults}>
            {searchData.filmData.total_results} films found for &quot;
            {params.filmName}&quot;
          </h2>
          <hr className={styles.divider} />
          <ul className={styles.resultsContainer}>
            {searchData.filmData.data.map((result: any, index: number) => (
              <li key={index} className={styles.searchEntry}>
                <FilmSearchResult filmData={result} />
                <hr className={styles.divider} />
              </li>
            ))}
          </ul>

          <Stack alignItems="center" margin="30px">
            <Pagination
              color={"primary"}
              size={matches ? "medium" : "small"}
              count={searchData.filmData.total_pages}
              onChange={handlePageChange}
              page={parseInt(params.pageNum)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>
      )}
    </div>
  );
}
