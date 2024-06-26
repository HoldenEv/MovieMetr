const BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/authentication";

export const signUpUser = async (
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
): Promise<any> => {
  try {
    const requestBody = new URLSearchParams({
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    });

    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody.toString(),
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error("Username or email already exists");
      } else {
        throw new Error("Internal server error");
      }
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
};
