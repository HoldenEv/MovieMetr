"use client";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  var tokenData : any = undefined;

  return function IsAuth(props: any) {
    // Check if running in the browser
    if (typeof window !== 'undefined') {
      tokenData = localStorage.getItem('token');
      if (!tokenData) {
        console.log("not token")
        redirect("/");
      } else {
         const tokenObject = JSON.parse(tokenData);
        console.log("Protected Route token" + tokenObject.token);
      }
    }

    // This check is crucial to have becase if we dont have this 
    // and we try hitting a protected route it will load for a split second
    // then redirect but we dont want it to show the route at all unless we have token
    if (!tokenData) {
        return null;
    }

    return <Component {...props} />;
  };
}