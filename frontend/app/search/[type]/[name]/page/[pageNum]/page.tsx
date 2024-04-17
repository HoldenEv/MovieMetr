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
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      let type = params.type;
      if (params.type === "films") {
        type = "movies";
      }
      const data = await search(type, params.name, params.pageNum);
      setSearchData({ filmData: data, loading: false });
      console.log(data);
    };
    if (
      params.type === "films" ||
      params.type === "shows" ||
      params.type === "people"
    ) {
      fetchData();
    } else {
      setSearchData({
        filmData: { data: [], total_results: 0 },
        loading: false,
      });
    }
  }, [params.name, params.pageNum, params.type]);

  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/search/${params.type}/${params.name}/page/${value}`);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={styles.wrapper}>
      {!searchData.loading && (
        <>
          {params.type === "films" ||
          params.type === "shows" ||
          params.type === "people" ? (
            <h2 className={styles.totalResults}>
              {searchData.filmData.total_results} {params.type} found for &quot;
              {params.name}&quot;
            </h2>
          ) : (
            <h2 className={styles.totalResults}>Invalid search category, &quot;{params.type}&quot;</h2>
          )}

          <hr className={styles.divider} />
          <ul className={styles.resultsContainer}>
            {searchData.filmData.data.map((result: any, index: number) => (
              <li key={index} className={styles.searchEntry}>
                <SearchResult type={params.type} data={result} />
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
