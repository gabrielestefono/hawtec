import { getUserToken } from "@/cache/auth/getUserToken";
import EsqueciSenhaPage from "@/components/pages/auth/esqueci-senha/page";
import { redirect } from "next/navigation";

export default async function EsqueceuSenhaServerPage() {
  const token = await getUserToken();
  if (token) {
    redirect("/");
  }
  return <EsqueciSenhaPage />;
}
