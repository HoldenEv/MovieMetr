const BASE_URL: string = "http://localhost:3001/listRoutes";

/**
 * returnsa json object with all list_ids for a userId
 * @param userId 
 * @returns json object with all list_ids for a userId
 */
export const getUserLists = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/getUserLists?userId=${userId}`, {
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
