const BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/authentication/";

export const getUser = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/getUser?userId=${userId}`, {
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
    console.error("Error fetching user data:", error.message);
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  data: Record<string, any>,
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Update content type to JSON
      },
      body: JSON.stringify({ userId, ...data }), // Stringify the body
    });

    if (!response.ok) {
      throw new Error("Internal server error");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};