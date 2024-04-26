import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      const tokenData = localStorage.getItem("token");
      if (!tokenData) {
        redirect("/");
      } else {
        // Parse the token data as JSON
        const tokenObject = JSON.parse(tokenData);
        const token = tokenObject.token;
        return <Component {...props} token={token} />;
      }
    } else {
      // Return the component without modifications if not running in the browser
      return <Component {...props} />;
    }
  };
}