import { redirect } from "next/navigation";

/* 
  Redirect user back to search if they try to navigate to /search/[type] 
  without providing a name or page number
*/
export default function SearchWithNoNameOrPage() {
  redirect("/search");
}
