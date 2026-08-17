import { serverApiClient } from "@/shared/lib/server-api-client";
import type { Profile } from "../types/profile.types";


export async function getProfile(): Promise<Profile> {
  const api = await serverApiClient();

  const response = await api.get<Profile>("/auth/me");

  return response.data;
}