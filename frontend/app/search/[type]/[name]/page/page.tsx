import { redirect } from "next/navigation";

export default function SearchWithNoPageNum({
  params,
}: {
  params: { type: string; name: string };
}) {
  redirect(`/search/films/${params.name}/page/1`);
}
