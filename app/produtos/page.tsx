"use server";

import ProductPage from "@/components/pages/produtos/page";
import { api } from "@/lib/api";
import { Paginated, ResponseApi } from "@/types/app/api/response";
import { Variant } from "@/types/components/landing";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

interface ProdutosServerPageProps {
  searchParams?: Promise<SearchParams> | SearchParams;
}

const asArray = (value: SearchParamValue): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? [trimmed] : [];
  }

  return [];
};

const getParamArray = (params: SearchParams, key: string): string[] => {
  const values = [...asArray(params[key]), ...asArray(params[`${key}[]`])];
  return Array.from(new Set(values));
};

const getFirstParam = (
  params: SearchParams,
  key: string,
): string | undefined => {
  const [value] = asArray(params[key]);
  return value;
};

export default async function ProdutosServerPage({
  searchParams,
}: Readonly<ProdutosServerPageProps>) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});

  const search = getFirstParam(resolvedSearchParams, "search");
  const categories = getParamArray(resolvedSearchParams, "categories");
  const ratings = getParamArray(resolvedSearchParams, "ratings");
  const priceMin = getFirstParam(resolvedSearchParams, "price_min");
  const priceMax = getFirstParam(resolvedSearchParams, "price_max");
  const onlyOffers = getFirstParam(resolvedSearchParams, "only_offers");
  const inStock = getFirstParam(resolvedSearchParams, "in_stock");
  const sortBy = getFirstParam(resolvedSearchParams, "sort_by");

  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  categories.forEach((category) => params.append("categories[]", category));
  ratings.forEach((rating) => params.append("ratings[]", rating));

  if (priceMin) {
    params.set("price_min", priceMin);
  }

  if (priceMax) {
    params.set("price_max", priceMax);
  }

  if (onlyOffers === "1") {
    params.set("only_offers", "1");
  }

  if (inStock === "1") {
    params.set("in_stock", "1");
  }

  if (sortBy) {
    params.set("sort_by", sortBy);
  }

  const endpoint =
    params.size > 0 ? `/products?${params.toString()}` : "/products";

  const response =
    await api.get<ResponseApi<{ products: Paginated<Variant> }>>(endpoint);
  const productsPaginated = response.data.data.products;
  const products = productsPaginated.data;

  return <ProductPage variants={products} />;
}
