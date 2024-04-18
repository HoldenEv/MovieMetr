'use server'
import { cookies } from 'next/headers';

export async function setTokenCookie(token: string) {
  console.log("Made it into setTokenCookie");
  // Set the token cookie
  cookies().set('token', token);
}