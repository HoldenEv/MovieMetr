export async function getNowPlaying() {
  const BASE_URL: string =
    process.env.NEXT_PUBLIC_BACKEND_URL + `/apiQueryRoutes/now-playing`;
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("response not okay");
  }
  /* return json response */
  return response.json();
}
