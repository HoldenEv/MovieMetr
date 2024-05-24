import axios from 'axios';

const BASE_URL: string = "http://localhost:3001/authentication";

export const getProfileFromToken = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        "Authorization": "bearer " + token
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Error getting profile:", error.message);
    throw error;
  }
};


