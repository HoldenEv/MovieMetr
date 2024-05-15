export async function getfilmdata(film_id: string) {
  const BASE_URL: string = `http://localhost:3001/apiQueryRoutes/movies/${film_id}`;
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("response not okay");
  }
  /* return json response */
  return response.json();
}
