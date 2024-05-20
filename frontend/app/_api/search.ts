export async function search(category: string, search: string, page: string) {
  /* convert category to lowercase before passing to url for api call */
  category = category.toLowerCase();
  /* search based on category and title/name */
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + `/apiQueryRoutes/search?category=${category}&name=${search}&page=${page}`,
  );
  /* throw error if response is not okay */
  if (!response.ok) {
    throw new Error("response not okay");
  }
  /* return json response */
  return response.json();
}
