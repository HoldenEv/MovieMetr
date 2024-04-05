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
    };
    fetchData();
  }, []);

  return (
    <div>
      {!searchData.loading && (
        <ul className={styles.resultsContainer}>
          {searchData.filmData.data.map((result: any, index: number) => (
            <li key={index}>
              <FilmSearchResult filmData={result} />
              {/* {searchData.filmData.data} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
