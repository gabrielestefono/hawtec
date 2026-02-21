"use server";

import ProductPage from "@/components/pages/produtos/item/page";
import { api } from "@/lib/api";
import { ResponseApi } from "@/types/app/api/response";
import { ProductComplete } from "@/types/components/products";

interface ProductItemServerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductItemServerPage({
  params,
}: Readonly<ProductItemServerPageProps>) {
  const { slug } = await params;
  // TODO: Usar ResponseApi<ProductComplete> quando a API estiver pronta
  const response = await api.get<ProductComplete>(`/products/${slug}`);
  const product = response.data;

  return <ProductPage product={product} />;
}
