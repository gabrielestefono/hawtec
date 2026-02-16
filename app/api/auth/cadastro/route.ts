import { api } from "@/lib/api";
import { ResponseApi } from "@/types/app/api/response";

export async function POST(request: Request) {
  const body = await request.json();
  await api.post<ResponseApi<string[]>>(`/auth/register`, {
    name: body.name,
    email: body.email,
    password: body.password,
    accept_terms: body.accept_terms,
    password_confirmation: body.confirm_password,
  });
  return Response.json(
    { message: "Cadastro realizado com sucesso!" },
    { status: 200 },
  );
}
