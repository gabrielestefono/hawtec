"use server";

import Home from "@/components/pages/landing/page";
import { apiInternal } from "@/lib/api-internal";
import { ResponseApi } from "@/types/app/api/response";
import { Landing } from "@/types/components/landing";

export default async function LandingServerPage() {
  const response = await apiInternal.get<ResponseApi<Landing>>("/landing");
  if (response.status !== 200) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <section className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm font-semibold tracking-wide text-red-600">Erro 500</p>
          <h1 className="mt-2 text-2xl font-bold text-red-900">Falha ao carregar a p&aacute;gina</h1>
          <p className="mt-3 text-sm text-red-700">
            Ocorreu um erro interno no servidor. Tente novamente em
            instantes.
          </p>
        </section>
      </main>
    );
  }
  const landingData = response.data.data;
  return <Home {...landingData} />;
}
