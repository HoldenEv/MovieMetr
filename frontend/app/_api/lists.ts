const BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/listRoutes";
  const BASE_URL_2: string =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/movieRoutes";


/**
 * returnsa json object with all list_ids for a userId
 * @param userId
 * @returns json object with all list_ids for a userId
 */
export const getUserLists = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/getLists?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Internal server error");
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error getting user lists:", error.message);
    throw error;
  }
};

/**
 * gets a list by its id, fields available are user_id, list_name, entries
 * where entries is an array of objects with fields itemType and item_id,
 * itemType can be 'Movie', 'TV Show'
 * item_id is the id of the movie or TV show
 * @param listId
 * @returns list object
 */
export const getListInfo = async (listId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/getList?listId=${listId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Internal server error");
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error getting list:", error.message);
    throw error;
  }
};

// error check for movie that is not in db
export const getMovieInfo = async (movieId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_2}/getMovie?movieId=${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Internal server error");
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error getting movie:", error.message);
    throw error;
  }
};

export const addMovieToList = async (
  listId: string,
  movieId: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/addMovieToList?listId=${listId}&movieId=${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Internal server error");
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error adding movie to list:", error.message);
    throw error;
  }
};

export const addList = async (
  listName: string,
  userId: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/addList?name=${listName}&userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Internal server error");
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error adding list:", error.message);
    throw error;
  }
};
