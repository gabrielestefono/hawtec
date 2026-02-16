import { cookies } from "next/headers";
import { cache } from "react";

export const getUserToken = cache(async (): Promise<string | null> => {
  const cookiesObj = cookies();

  const token = (await cookiesObj).get("access_token")?.value;

  return token ?? null;
});
