import { UrlBackend } from "@/temp";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await fetch(`${UrlBackend}/auth/register`, {
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      password: body.password,
      accept_terms: body.accept_terms,
      password_confirmation: body.confirm_password,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!result.ok) {
    return Response.json(
      { message: "Ocorreu um erro, tente novamente mais tarde!" },
      { status: 500 },
    );
  }
  return Response.json(
    { message: "Cadastro realizado com sucesso!" },
    { status: 200 },
  );
}
