"use client";

import { useEffect, useState } from "react";
import { getfilmdata } from "@/_services/getfilmdata";
import Image from "next/image";
import MovieDetailPage from "@/_ui/components/MovieDetailPage/MovieDetailPage";

export default function FilmDetailPage({
  params,
}: {
  params: { film_id: string };
}) {
  const [filmData, setFilmData] = useState<any>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getfilmdata(params.film_id);
      setFilmData({ data: data, loading: false });
      console.log(data);
    };
    fetchData();
  }, [params.film_id]);

  return (
    <div>
      {!filmData.loading && (
        <div>
          <MovieDetailPage data={filmData.data}></MovieDetailPage>
          {/* <h1>{filmData.data.title}</h1>
            <p>{filmData.data.overview}</p> */}
          {/* <Image
            priority
            src={`https://image.tmdb.org/t/p/original${filmData.data.poster_path}`}
            width={150}
            height={200}
            alt="Search for a movie"
          ></Image> */}
          {/* <div
            style={{
              zIndex: "-999999",
              border: "1px solid red",
              height: "100vh", // Let the height adjust automatically based on the content
              width: "100%", // Set the width to fill its container
              backgroundSize: "cover", // Ensure the background image covers the entire container
              backgroundImage: `url(https://image.tmdb.org/t/p/original${filmData.data.poster_path})`,
              backgroundPosition: "center",
            }}
          >
             {filmData.data.credits.cast.map((actor: any, index: number) => (
            <p key={index}>{actor.name}</p>
          ))}

          </div> */}
        </div>
      )}
    </div>
  );
}
