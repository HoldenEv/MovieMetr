import { redirect } from "next/navigation";

export default function isLoginIn(Component: any) {
  return function IsAuth(props: any) {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      const tokenData = localStorage.getItem("token");
      if (tokenData) {
        redirect("/userpage");
      } else {
        // Parse the token data as JSON
        redirect("/login")
      }
    } else {
      // Return the component without modifications if not running in the browser
      return <Component {...props} />;
    }
  };
}