import axios from "axios";
import { cookies } from "next/headers";
import { serverApiClient } from "@/shared/lib/server-api-client";
import type { User } from "../types/auth.types";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const api = await serverApiClient();

    const response = await api.get<User>("/auth/me");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
}
