import ProductPage, {
  ProductPageInterface,
} from "@/components/pages/produtos/item/page";
import { api } from "@/lib/api";
import { ResponseApi } from "@/types/app/api/response";
import { Metadata } from "next";

interface ProductItemServerPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "HawTec Pro X1 - Headphone Bluetooth Premium | HawTec",
  description:
    "Headphone over-ear com cancelamento de ruido ativo, som Hi-Res e bateria de 40h. Compre agora na HawTec.",
};

export default async function ProductItemServerPage({
  params,
}: Readonly<ProductItemServerPageProps>) {
  const { slug } = await params;
  const response = await api.get<ResponseApi<ProductPageInterface>>(
    `/products/${slug}`,
  );
  const product = response.data.data;
  return <ProductPage product={product} />;
}
