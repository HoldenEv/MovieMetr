"use client";

import { useEffect, useState } from "react";
import { getfilmdata } from "@/_api/getfilmdata";
import MovieDetailPage from "@/_ui/components/MovieDetailPage/MovieDetailPage";
import { MovieData } from "@/_api/types";
import { useAuth } from "@/_context/authContext";
import { getUserLists } from "@/_api/lists";
import { getUser } from "@/_api/editprofile";
import { getProfileFromToken } from "@/_api/profile";

export default function FilmDetailPage({
  params,
}: {
  params: { film_id: string };
}) {
  interface User {
    _id: string;
    username: string;
    email: string;
    profilePath: string;
    bio: String;
  }

  interface MovieList {
    _id: string;
    name: string;
    description: string;
    entries: { itemType: string; item_id: string; imageUrl?: string }[];
  }

  const [userLists, setUserLists] = useState<MovieList[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { token } = useAuth();
  const tokenData = localStorage.getItem("token");

  const fetchUser = async (userId: string) => {
    try {
      const data = await getUser(userId);

      setUser(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const fetchUserListsData = async (userId: string) => {
    try {
      const lists = await getUserLists(userId);
      setUserLists(lists);
    } catch (error) {
      console.error("Error fetching user lists", error);
    }
  };

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
    if (tokenData) {
      const tokenObject = JSON.parse(tokenData);
      getProfileFromToken(tokenObject.value.token)
        // this allows us to unpack the promise we get from the profile route
        .then((response) => {
          // console.log(response.user.id);
          console.log("UserId in the movie page : " + response.user.id); //come back to this
          fetchUser(response.user.id); // Fetch user data on mount
          fetchUserListsData(response.user.id);
        })
        .catch((error) => {
          console.error("Error fetching user ID: ", error);
        });
    }

    const fetchData = async () => {
      try {
        const data = await getfilmdata(params.film_id);
        setFilmData({ data: data, loading: false, error: null });
      } catch (error) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setFilmData({ data: null, loading: false, error: errorMessage });
      }
    };

    fetchData();
  }, [params.film_id, tokenData]);

  if (filmData.loading) {
    return <div>Loading...</div>;
  }

  if (filmData.error) {
    return <div>Error: {filmData.error}</div>;
  }

  return (
    <div>
      <MovieDetailPage data={filmData.data} userId={user ? user._id : ""} />
    </div>
  );
}
