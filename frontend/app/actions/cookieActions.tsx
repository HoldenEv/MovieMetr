'use server'
import { cookies } from 'next/headers';

export async function setTokenCookie(token: string) {
  console.log("Made it into setTokenCookie");
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set('token', token);
}