import { api } from "@/lib/api";
import { Landing } from "@/types/app/api/landing/landing";
import { ResponseApi } from "@/types/app/api/response";

export async function GET() {
  const response = await api.get<ResponseApi<Landing>>(`/landing`);
  return Response.json(response.data, { status: 200 });
}
