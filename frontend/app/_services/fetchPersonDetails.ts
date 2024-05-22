const BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/apiQueryRoutes";

export async function fetchPersonDetails(personId: string) {
  const response = await fetch(`${BASE_URL}/people/${personId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch person details");
  }
  return response.json();
}
