import { redirect } from "next/navigation";

/*
  Redirect a user to the first page of search results if they do not include a page
  number in their search query
*/
export default function SearchWithNoPageNum({
  params,
}: {
  params: { type: string; name: string };
}) {
  redirect(`/search/films/${params.name}/page/1`);
}
