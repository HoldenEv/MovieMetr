export async function getPopularMovies() {
  const BASE_URL: string =
    process.env.NEXT_PUBLIC_BACKEND_URL + `/apiQueryRoutes/popular-movies`;
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("response not okay");
  }
  /* return json response */
  return response.json();
}
