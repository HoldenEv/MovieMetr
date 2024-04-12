"use client";
import { search } from "@/_api/search";
import { useEffect, useState } from "react";
import FilmSearchResult from "@/_ui/components/FilmSearchResult/FilmSearchResult";
import styles from "./filmSearch.module.css";

export default function Page({ params }: { params: { filmName: string } }) {
  const [searchData, setSearchData] = useState<any>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await search("movies", params.filmName, "1");
      setSearchData({ filmData: data, loading: false });
      console.log(data);
    };
    fetchData();
  }, [params.filmName]);

  return (
    <div className={styles.wrapper}>
      {!searchData.loading && (
        <>
          <h2 className={styles.totalResults}>{searchData.filmData.total_results} films found for &quot;{params.filmName}&quot;</h2>
          <hr className={styles.divider} />
          <ul className={styles.resultsContainer}>
            {searchData.filmData.data.map((result: any, index: number) => (
              <li key={index} className={styles.searchEntry}>
                <FilmSearchResult filmData={result} />
                <hr className={styles.divider} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
