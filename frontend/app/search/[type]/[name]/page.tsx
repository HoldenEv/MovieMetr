import { redirect } from "next/navigation";

/*
  Redirect a user to the first page of search results if they do not include
  the /page/[pageNum] route in their search query
*/
export default function SearchWithNoPage({
  params,
}: {
  params: { type: string; name: string };
}) {
  redirect(`/search/${params.type}/${params.name}/page/1`);
}
