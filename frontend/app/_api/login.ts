const BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL+"/authentication";

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
      if (response.status === 400) {
        throw new Error("Username and password do not match");
      } else {
        throw new Error("Internal server error");
      }
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
};
