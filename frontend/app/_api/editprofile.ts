// editProfile.ts

const BASE_URL: string = "http://localhost:3001/authentication";

export const updateUser = async (
  userId: string,
  data: Record<string, any>
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