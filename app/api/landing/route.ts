import { api } from "@/lib/api";
import { ResponseApi } from "@/types/app/api/response";
import { Landing } from "@/types/components/landing";

export async function GET() {
  const response = await api.get<ResponseApi<Landing>>(`/landing`);
  return Response.json(response.data, { status: 200 });
}
