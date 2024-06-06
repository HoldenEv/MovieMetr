const BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/authentication/";

interface UploadProfilePictureResponse {
  imageUrl: string;
}

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

// New function to handle profile picture upload
export const uploadProfilePicture = async (
  file: File,
): Promise<UploadProfilePictureResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log(
      "starting file upload in uploadProfilePicture in editprofile.ts",
    );
    const response = await fetch(`${BASE_URL}/uploadProfilePicture`, {
      method: "POST",
      body: formData,
    });

    console.log(
      "response from uploadProfilePicture in editprofile.ts:",
      response,
    );
    if (!response.ok) {
      throw new Error("Error uploading profile picture");
    }

    const data: UploadProfilePictureResponse = await response.json();
    console.log("data from uploadProfilePicture in editprofile.ts:", data);
    return data;
  } catch (error: any) {
    console.error("Error uploading profile picture:", error.message);
    throw error;
  }
};

export const updateProfilePath = async (
  userId: string,
  profilePath: string,
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/updateProfilePath`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, profilePath }),
    });

    if (!response.ok) {
      throw new Error("Internal server error");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error updating profile picture:", error.message);
    throw error;
  }
};
