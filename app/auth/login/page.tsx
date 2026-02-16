import { getUserToken } from "@/cache/auth/getUserToken";
import LoginPage from "@/components/pages/auth/login/page";
import { redirect } from "next/navigation";

export default async function LoginServerPage() {
  const token = await getUserToken();
  if (token) {
    redirect("/");
  }
  return <LoginPage />;
}
