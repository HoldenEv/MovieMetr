"use client";
import { search } from "@/_api/search";
import { useEffect, useState } from "react";
import SearchResult from "@/_ui/components/SearchResult/SearchResult";
import styles from "./search.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: { type: string; name: string; pageNum: string };
}) {
  const [searchData, setSearchData] = useState<any>({
    searchResultData: null,
    loading: true,
  });

  const [showSearchOptions, setShowSearchOptions] = useState<boolean>(false);

  // called whenever a search is made or a page is changed
  useEffect(() => {
    /*
      fetches search data for corresponding search category,
      name and page number
    */
    const fetchData = async () => {
      let type = params.type;
      /* our API checks that the category is "movies", so if the
       category is "films", we need to change it */
      if (params.type === "films") {
        type = "movies";
      }
      const data = await search(type, params.name, params.pageNum);
      setSearchData({ searchResultData: data, loading: false });
      console.log(data); // FOR  DEBUGGING
    };
    // if the search category is valid, fetch data
    if (
      params.type === "films" ||
      params.type === "shows" ||
      params.type === "people"
    ) {
      fetchData();
    } else {
      // otherwise, set the search data to an empty array
      setSearchData({
        searchResultData: { data: [], total_results: 0 },
        loading: false,
      });
    }
  }, [params.name, params.pageNum, params.type]);

  const router = useRouter();

  /* 
    since we are fetching data when params.pageNum changes, all
    we need to do to render new data on page change is update the URL
  */
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    router.push(`/search/${params.type}/${params.name}/page/${value}`);
  };

  const handleClick = (type: string) => {
    router.push(`/search/${type}/${params.name}/page/1`);
  };

  const handleArrowClick = () => {
    setShowSearchOptions(!showSearchOptions);
  };

  /*
    this is used to determine if we should use the medium or small pagination size
    depending on the screen size
  */
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={styles.wrapper}>
      {!searchData.loading && (
        <>
          <div className={styles.resultsInfoContainer}>
            {params.type === "films" ||
            params.type === "shows" ||
            params.type === "people" ? (
              <h2 className={styles.totalResults}>
                {searchData.searchResultData.total_results} {params.type} found
                for &quot;
                {params.name.replace(/\%2B/g, " ").toUpperCase()}&quot;
              </h2>
            ) : (
              <h2 className={styles.totalResults}>
                Invalid search category, &quot;{params.type}&quot;
              </h2>
            )}
          </div>
          <hr className={styles.divider} />
          <ul className={styles.resultsContainer}>
            {searchData.searchResultData.data.map(
              (result: any, index: number) => (
                <li key={index} className={styles.searchEntry}>
                  <SearchResult type={params.type} data={result} />
                  <hr className={styles.divider} />
                </li>
              ),
            )}
          </ul>

          <Stack alignItems="center" margin="30px">
            <Pagination
              color={"primary"}
              size={matches ? "medium" : "small"}
              count={searchData.searchResultData.total_pages}
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
