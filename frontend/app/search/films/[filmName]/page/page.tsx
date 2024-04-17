import { redirect } from "next/navigation";

export default function FilmsPageSearch({
  params,
}: {
  params: { filmName: string };
}) {
  redirect(`/search/films/${params.filmName}/page/1`);
}
