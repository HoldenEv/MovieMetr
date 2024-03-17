"use client";

import { search } from "@/_api/search";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page({ params }: { params: { filmName: string } }) {
  const [searchData, setSearchData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await search("movies", params.filmName, "1");
      setSearchData(data);
      setLoading(false);
      console.log(searchData);
    };
    fetchData();
  }, [loading]);

  return (
    <div>
      {searchData && (
        <ul>
          {searchData.data.map((result: any, index: number) => (
            <li key={index}>
              {/* <Image
                src={`http://image.tmdb.org/t/p/w500/${result.image}`}
                width={100}
                height={250}
                alt="Poster for film"
              /> */}
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
