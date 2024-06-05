"use client";

import { useEffect, useState } from "react";
import { getfilmdata } from "@/_api/getfilmdata";
import Image from "next/image";
import MovieDetailPage from "@/_ui/components/MovieDetailPage/MovieDetailPage";

export default function FilmDetailPage({
  params,
}: {
  params: { film_id: string };
}) {
  const [filmData, setFilmData] = useState<{ data: any; loading: boolean }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getfilmdata(params.film_id);
        console.log("Fetched data:", data);
        setFilmData({ data, loading: false });
      } catch (error) {
        console.error("Error fetching film data:", error);
        setFilmData({ data: null, loading: false });
      }
    };
    fetchData();
  }, [params.film_id]);

  if (filmData.loading) {
    return <div>Loading...</div>;
  }

  if (!filmData.data) {
    return <div>Error loading film data. Please try again later.</div>;
  }

  return (
    <div>
      <MovieDetailPage data={filmData.data} />
    </div>
  );
}
