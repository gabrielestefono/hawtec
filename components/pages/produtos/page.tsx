"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Search, SlidersHorizontal } from "lucide-react";
import { type ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard, { Product } from "@/components/product/product-card";

type SortKey =
  | "most_relevant"
  | "lowest_price"
  | "highest_price"
  | "best_rating"
  | "most_reviewed"
  | "biggest_discount"
  | "newest";

type PriceRangeKey = "0-2000" | "2000-5000" | "5000-10000" | "10000+";

interface ProductPageProps {
  products: Product[];
}

interface FiltersFormValues {
  search: string;
  categories: string[];
  priceRanges: PriceRangeKey[];
  ratings: string[];
  onlyOffers: boolean;
  inStock: boolean;
  sortBy: SortKey;
}

const priceRanges: Record<PriceRangeKey, { min: number; max: number | null }> = {
  "0-2000": { min: 0, max: 2000 },
  "2000-5000": { min: 2000, max: 5000 },
  "5000-10000": { min: 5000, max: 10000 },
  "10000+": { min: 10000, max: null },
};

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "most_relevant", label: "Mais relevantes" },
  { value: "lowest_price", label: "Menor preco" },
  { value: "highest_price", label: "Maior preco" },
  { value: "best_rating", label: "Melhor avaliacao" },
  { value: "most_reviewed", label: "Mais avaliados" },
  { value: "biggest_discount", label: "Maior desconto" },
  { value: "newest", label: "Lancamentos" },
];

const ratingOptions = [
  { value: "5", label: "5 estrelas" },
  { value: "4", label: "4 estrelas" },
  { value: "3", label: "3 estrelas" },
  { value: "2", label: "2 estrelas" },
  { value: "1", label: "1 estrela" },
];

const parseArrayParam = (searchParams: ReadonlyURLSearchParams, key: string): string[] => {
  const withBrackets = searchParams.getAll(`${key}[]`);
  if (withBrackets.length > 0) {
    return withBrackets;
  }

  return searchParams.getAll(key);
};

export default function ProductPage({ products }: Readonly<ProductPageProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = useMemo(() => {
    return Array.from(
      new Map(
        products.map((product) => [String(product.category.id), product.category.name]),
      ).entries(),
    ).map(([id, name]) => ({ id, name }));
  }, [products]);

  const defaultValues = useMemo<FiltersFormValues>(() => {
    const search = searchParams.get("search") ?? "";
    const categoriesFromQuery = parseArrayParam(searchParams, "categories");
    const ratingsFromQuery = parseArrayParam(searchParams, "ratings");
    const onlyOffers = searchParams.get("only_offers") === "1";
    const inStock = searchParams.get("in_stock") === "1";

    const sortByValue = searchParams.get("sort_by") as SortKey | null;
    const sortBy =
      sortByValue && sortOptions.some((option) => option.value === sortByValue)
        ? sortByValue
        : "most_relevant";

    const selectedPriceRanges: PriceRangeKey[] = [];
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");

    if (priceMin || priceMax) {
      const min = priceMin ? Number.parseFloat(priceMin) : 0;
      const max = priceMax ? Number.parseFloat(priceMax) : null;

      (Object.keys(priceRanges) as PriceRangeKey[]).forEach((rangeKey) => {
        const range = priceRanges[rangeKey];
        const minMatches = min <= range.min;
        const maxMatches =
          max === null
            ? range.max === null
            : range.max !== null && max >= range.max;

        if (minMatches && maxMatches) {
          selectedPriceRanges.push(rangeKey);
        }
      });
    }

    return {
      search,
      categories: categoriesFromQuery,
      priceRanges: selectedPriceRanges,
      ratings: ratingsFromQuery,
      onlyOffers,
      inStock,
      sortBy,
    };
  }, [searchParams]);

  const form = useForm<FiltersFormValues>({
    defaultValues,
  });

  const { control, register, handleSubmit, reset, setValue, watch } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit((values) => {
    const params = new URLSearchParams();

    const normalizedSearch = values.search.trim();
    if (normalizedSearch) {
      params.set("search", normalizedSearch);
    }

    values.categories.forEach((categoryId) => {
      params.append("categories[]", categoryId);
    });

    values.ratings.forEach((rating) => {
      params.append("ratings[]", rating);
    });

    if (values.priceRanges.length > 0) {
      const selectedRanges = values.priceRanges.map((key) => priceRanges[key]);
      const priceMin = Math.min(...selectedRanges.map((range) => range.min));
      const maxValues = selectedRanges
        .map((range) => range.max)
        .filter((rangeMax): rangeMax is number => rangeMax !== null);

      params.set("price_min", String(priceMin));

      if (maxValues.length > 0) {
        params.set("price_max", String(Math.max(...maxValues)));
      }
    }

    if (values.onlyOffers) {
      params.set("only_offers", "1");
    }

    if (values.inStock) {
      params.set("in_stock", "1");
    }

    if (values.sortBy) {
      params.set("sort_by", values.sortBy);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  });

  const clearFilters = () => {
    const initialValues: FiltersFormValues = {
      search: "",
      categories: [],
      priceRanges: [],
      ratings: [],
      onlyOffers: false,
      inStock: false,
      sortBy: "most_relevant",
    };

    reset(initialValues);
    router.push(pathname);
  };

  const selectedCategories = watch("categories");
  const selectedPriceRanges = watch("priceRanges");
  const selectedRatings = watch("ratings");

  return (
    <DefaultLayout>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:py-12">
          <p className="text-sm text-primary">Catalogo</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Produtos
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground lg:text-base">
            Encontre tecnologia com filtros completos de categoria, preco,
            avaliacao e promocoes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Filtros</h2>
                </div>
                <Button variant="ghost" size="sm" type="button" onClick={clearFilters}>
                  Limpar
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nome ou descricao"
                    className="pl-9"
                    {...register("search")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categorias</Label>
                <div className="space-y-2 rounded-md border border-border p-3">
                  {categories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma categoria disponivel</p>
                  ) : (
                    categories.map((category) => (
                      <div key={category.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => {
                            const nextValues = checked
                              ? [...selectedCategories, category.id]
                              : selectedCategories.filter((item) => item !== category.id);

                            setValue("categories", Array.from(new Set(nextValues)));
                          }}
                        />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-normal"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Faixa de preco</Label>
                <div className="space-y-2 rounded-md border border-border p-3">
                  {(Object.keys(priceRanges) as PriceRangeKey[]).map((rangeKey) => {
                    const labels: Record<PriceRangeKey, string> = {
                      "0-2000": "Ate R$ 2.000",
                      "2000-5000": "R$ 2.000 a R$ 5.000",
                      "5000-10000": "R$ 5.000 a R$ 10.000",
                      "10000+": "Acima de R$ 10.000",
                    };

                    return (
                      <div key={rangeKey} className="flex items-center gap-2">
                        <Checkbox
                          id={`price-${rangeKey}`}
                          checked={selectedPriceRanges.includes(rangeKey)}
                          onCheckedChange={(checked) => {
                            const nextValues = checked
                              ? [...selectedPriceRanges, rangeKey]
                              : selectedPriceRanges.filter((item) => item !== rangeKey);

                            setValue("priceRanges", Array.from(new Set(nextValues)) as PriceRangeKey[]);
                          }}
                        />
                        <Label htmlFor={`price-${rangeKey}`} className="text-sm font-normal">
                          {labels[rangeKey]}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Avaliacao</Label>
                <div className="space-y-2 rounded-md border border-border p-3">
                  {ratingOptions.map((rating) => (
                    <div key={rating.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`rating-${rating.value}`}
                        checked={selectedRatings.includes(rating.value)}
                        onCheckedChange={(checked) => {
                          const nextValues = checked
                            ? [...selectedRatings, rating.value]
                            : selectedRatings.filter((item) => item !== rating.value);

                          setValue("ratings", Array.from(new Set(nextValues)));
                        }}
                      />
                      <Label htmlFor={`rating-${rating.value}`} className="text-sm font-normal">
                        {rating.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <Controller
                  control={control}
                  name="onlyOffers"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="promotions"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                      <Label htmlFor="promotions" className="text-sm font-normal">
                        Apenas em promocao
                      </Label>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="inStock"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="stock"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                      <Label htmlFor="stock" className="text-sm font-normal">
                        Apenas em estoque
                      </Label>
                    </div>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Aplicar filtros
              </Button>
            </form>
          </aside>

          <div>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {products.length} {products.length === 1 ? "produto" : "produtos"}{" "}
                {products.length === 1 ? "encontrado" : "encontrados"}
              </p>
              <div className="w-full sm:w-64">
                <Controller
                  control={control}
                  name="sortBy"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value as SortKey);
                        onSubmit();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {products.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-10 text-center">
                <p className="text-base font-medium text-foreground">
                  Nenhum produto encontrado com os filtros atuais.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ajuste os filtros ou limpe para ver todos os itens.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

