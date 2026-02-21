"use server";

import Home from "@/components/pages/landing/page";
import { apiInternal } from "@/lib/api-internal";
import { ResponseApi } from "@/types/app/api/response";
import { Landing } from "@/types/components/landing";

export default async function LandingServerPage() {
  const response = await apiInternal.get<ResponseApi<Landing>>("/landing");
  const landingData = response.data.data;
  return <Home {...landingData} />;
}
