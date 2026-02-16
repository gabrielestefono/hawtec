import { api } from "@/lib/api";
import { Login } from "@/types/app/api/auth/login/Login";
import { ResponseApi, ResponseApiError } from "@/types/app/api/response";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
): Promise<NextResponse<ResponseApi<Login> | ResponseApiError>> {
  const body = await request.json();

  const response = await api.post<ResponseApi<Login>>("/auth/login", {
    email: body.email,
    password: body.password,
  });

  const token = response.data.data.token;
  if (token) {
    const cookieStore = cookies();
    (await cookieStore).set("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  }

  return NextResponse.json(response.data);
}
