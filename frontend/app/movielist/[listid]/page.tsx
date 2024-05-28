"use client";
import styles from "./movielist.module.css";
import { useEffect, useState } from "react";
import { getListInfo, getMovieInfo } from "@/_api/lists";

export default function MovieListPage({
  params,
}: {
  params: { listid: string };
}) {
  const [listData, setListData] = useState<any>({
    details: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListInfo(params.listid);
      for (let entry of data.entries){
        const movieInfo = await getMovieInfo(entry.item_id);
        entry.imageUrl = `https://image.tmdb.org/t/p/original${movieInfo.image_path}`;
        entry.name = movieInfo.name;
      }
      setListData({ details: data, loading: false });
    };
    fetchData();
  }, [params.listid]);


  return (
    <div className={styles.container}>
      {listData.loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.movieGrid}>
          {listData.details.entries.map((entry: any, index: number) => (
            <div key={index} className={styles.movieItem}>
              {entry.imageUrl ? (
                <img
                  src={entry.imageUrl}
                  alt={entry.item_id}
                  className={styles.movieImage}
                />
              ) : (
                <p>No Image Available</p>
              )}
              <p className={styles.movieTitle}>{entry.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
