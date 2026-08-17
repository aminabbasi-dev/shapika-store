import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverApiClient() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  return axios.create({
    baseURL: API_URL,
    headers: accessToken
      ? {
          Cookie: `accessToken=${accessToken}`,
        }
      : undefined,
  });
}