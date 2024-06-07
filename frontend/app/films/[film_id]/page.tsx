"use client";

import { useEffect, useState } from "react";
import { getfilmdata } from "@/_api/getfilmdata";
import MovieDetailPage from "@/_ui/components/MovieDetailPage/MovieDetailPage";
import { MovieData } from "@/_api/types";

export default function FilmDetailPage({
  params,
}: {
  params: { film_id: string };
}) {
  const [filmData, setFilmData] = useState<{
    data: MovieData | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getfilmdata(params.film_id);
        setFilmData({ data: data, loading: false, error: null });
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setFilmData({ data: null, loading: false, error: errorMessage });
      }
    };
    fetchData();
  }, [params.film_id]);

  if (filmData.loading) {
    return <div>Loading...</div>;
  }

  if (filmData.error) {
    return <div>Error: {filmData.error}</div>;
  }

  return (
    <div>
      <MovieDetailPage data={filmData.data}></MovieDetailPage>
    </div>
  );
}
