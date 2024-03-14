const BASE_URL: string = "http://localhost:3001/authentication";

export const logInUser = async (
  username: string,
  password: string,
): Promise<any> => {
  try {
    const requestBody = new URLSearchParams({
      username: username,
      password: password,
    });

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody.toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};
