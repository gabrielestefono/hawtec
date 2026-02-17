"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "reviews"
  | "discount"
  | "newest";

const priceRanges: Record<string, { min: number; max: number | null }> = {
  all: { min: 0, max: null },
  "0-2000": { min: 0, max: 2000 },
  "2000-5000": { min: 2000, max: 5000 },
  "5000-10000": { min: 5000, max: 10000 },
  "10000+": { min: 10000, max: null },
};

interface ProductPageProps {
  products: Product[];
}

export default function ProductPage({ products }: Readonly<ProductPageProps>) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [minimumRating, setMinimumRating] = useState("0");
  const [onlyPromotions, setOnlyPromotions] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("featured");

  const categories = useMemo(() => {
    return [
      "all",
      ...Array.from(new Set(products.map((product) => product.category.name))),
    ];
  }, []);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setPriceRange("all");
    setMinimumRating("0");
    setOnlyPromotions(false);
    setOnlyInStock(false);
    setSortBy("featured");
  };

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
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-foreground">Filtros</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpar
              </Button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nome ou descricao"
                    className="pl-9"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item === "all" ? "Todas as categorias" : item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Faixa de preco</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="0-2000">Ate R$ 2.000</SelectItem>
                    <SelectItem value="2000-5000">
                      R$ 2.000 a R$ 5.000
                    </SelectItem>
                    <SelectItem value="5000-10000">
                      R$ 5.000 a R$ 10.000
                    </SelectItem>
                    <SelectItem value="10000+">Acima de R$ 10.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Avaliacao minima</Label>
                <Select value={minimumRating} onValueChange={setMinimumRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Qualquer avaliacao</SelectItem>
                    <SelectItem value="4">4.0 ou mais</SelectItem>
                    <SelectItem value="4.5">4.5 ou mais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="promotions"
                    checked={onlyPromotions}
                    onCheckedChange={(checked) =>
                      setOnlyPromotions(checked === true)
                    }
                  />
                  <Label htmlFor="promotions" className="text-sm font-normal">
                    Apenas em promocao
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="stock"
                    checked={onlyInStock}
                    onCheckedChange={(checked) =>
                      setOnlyInStock(checked === true)
                    }
                  />
                  <Label htmlFor="stock" className="text-sm font-normal">
                    Apenas em estoque
                  </Label>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {products.length}{" "}
                {products.length === 1 ? "produto" : "produtos"}{" "}
                {products.length === 1 ? "encontrado" : "encontrados"}
              </p>
              <div className="w-full sm:w-64">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortKey)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Mais relevantes</SelectItem>
                    <SelectItem value="price-asc">Menor preco</SelectItem>
                    <SelectItem value="price-desc">Maior preco</SelectItem>
                    <SelectItem value="rating">Melhor avaliacao</SelectItem>
                    <SelectItem value="reviews">Mais avaliados</SelectItem>
                    <SelectItem value="discount">Maior desconto</SelectItem>
                    <SelectItem value="newest">Lancamentos</SelectItem>
                  </SelectContent>
                </Select>
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
