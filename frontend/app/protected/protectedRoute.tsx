"use client";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    // Check if running in the browser
    if (typeof window !== 'undefined') {
      const tokenData = localStorage.getItem('token');
      if (!tokenData) {
        redirect("/");
      } else {
        // Parse the token data as JSON
        const tokenObject = JSON.parse(tokenData);
        const token = tokenObject.token;
        return <Component {...props} token={token} />;
      }
    }

    // This check is crucial to have becase if we dont have this 
    // and we try hitting a protected route it will load for a split second 
    // then redirect but we dont want it to show the route at all unless we have token
    // Return null if not running in the browser
    return null;
  };
}
