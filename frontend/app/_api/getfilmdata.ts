export async function getfilmdata(film_id: string) {
  const BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL +`/apiQueryRoutes/movies/${film_id}`;
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("response not okay");
  }
  /* return json response */
  return response.json();
}
