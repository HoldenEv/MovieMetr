const BASE_URL: string = "http://localhost:3001/authentication";

class BackendValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BackendValidationError";
  }
}

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
      if (response.status === 400) {
        const responseData = await response.json();
        const errorMessages = responseData.errors.map(
          (error: any) => error.msg,
        );
        throw new BackendValidationError(errorMessages.join(", "));
      } else {
        throw new Error("Internal server error");
      }
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};
