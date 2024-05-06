const BASE_URL: string = "http://localhost:3001/apiQueryRoutes";

export async function fetchPersonDetails(personId: string) {
  const response = await fetch(`${BASE_URL}/people/${personId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch person details');
  }
  return response.json();
}