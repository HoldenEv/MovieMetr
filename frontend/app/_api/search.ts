export async function search(category: String, search: String) {
  /* convert category to lowercase before passing to url for api call */
  category = category.toLowerCase();
  /* search based on category and title/name */
  const response = await fetch(
    `http://localhost:3001/search?category=${category}&name=${search}`
  );
  /* throw error if response is not okay */
  if (!response.ok) {
    throw new Error("response not okay");
  }
  /* return json response */
  return response.json();
}
