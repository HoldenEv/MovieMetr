import { redirect } from "next/navigation";

export default function SearchWithNoPage({
  params,
}: {
  params: { type: string, name: string };
}) {
  redirect(`/search/${params.type}/${params.name}/page/1`);
}
