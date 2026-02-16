import { api } from "@/lib/api";
import { User } from "@/types/app/api/auth/login/Login";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async (): Promise<User | null> => {
  const cookiesObj = cookies();

  const token = (await cookiesObj).get("access_token")?.value;

  if (token) {
    const response = await api.get<User | null>("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  return null;
});
