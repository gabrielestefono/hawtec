import ProductPage from "@/components/pages/produtos/page";
import { Product } from "@/components/product/product-card";
import { api } from "@/lib/api";
import { Paginated, ResponseApi } from "@/types/app/api/response";

export default async function ProdutosServerPage() {
  const response = await api.get<ResponseApi<{products: Paginated<Product>}>>("/products");
  const productsPaginated = response.data.data.products;
  const products = productsPaginated.data;
  return <ProductPage products={products} />;
}
