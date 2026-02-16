import { getUserToken } from "@/cache/auth/getUserToken";
import CadastroPage from "@/components/pages/auth/cadastro/page";
import { redirect } from "next/navigation";

export default async function CadastroServerPage() {
  const token = await getUserToken();
  if (token) {
    redirect("/");
  }
  return <CadastroPage />;
}
