import { UrlBackend } from "@/temp";
import { Login } from "@/types/app/api/auth/login/Login";
import { ResponseApi, ResponseApiError } from "@/types/app/api/response";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
): Promise<NextResponse<ResponseApi<Login> | ResponseApiError>> {
  const body = await request.json();
  const result = await fetch(`${UrlBackend}/auth/login`, {
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!result.ok) {
    return NextResponse.json(
      {
        message: "Ocorreu um erro, tente novamente mais tarde!",
        status: "error",
      },
      { status: 500 },
    );
  }
  const data = (await result.json()) as ResponseApi<Login>;
  return NextResponse.json(data, { status: 200 });
}
