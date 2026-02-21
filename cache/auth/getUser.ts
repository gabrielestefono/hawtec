import { api } from "@/lib/api";
import { User } from "@/types/app/api/auth/login/Login";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const response = await api.get<User>("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    return null;
  }
});
