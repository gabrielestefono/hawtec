import Home from "@/components/pages/landing/page";
import { apiInternal } from "@/lib/api-internal";
import { Landing } from "@/types/app/api/landing/landing";
import { ResponseApi } from "@/types/app/api/response";

export default async function LandingServerPage() {
  const response = await apiInternal.get<ResponseApi<Landing>>("/landing");
  const landingData = response.data.data;
  return <Home {...landingData} />;
}
