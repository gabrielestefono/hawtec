"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import StarRating from "./star-rating";
import { ProductComplete } from "@/types/components/products";

interface ProductTabsProps {
  product: ProductComplete;
}

export function ProductTabs({ product }: Readonly<ProductTabsProps>) {
  return (
    <Tabs defaultValue="descricao" className="w-full">
      <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="descricao"
          className="rounded-none border-b-2 border-transparent px-6 py-3 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Descricao
        </TabsTrigger>
        <TabsTrigger
          value="especificacoes"
          className="rounded-none border-b-2 border-transparent px-6 py-3 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Especificacoes
        </TabsTrigger>
        <TabsTrigger
          value="avaliacoes"
          className="rounded-none border-b-2 border-transparent px-6 py-3 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Avaliacoes ({product.reviews_count})
        </TabsTrigger>
      </TabsList>

      {/* Description Tab */}
      <TabsContent value="descricao" className="pt-6">
        <div className="max-w-3xl">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Sobre o produto
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            {product.product.long_description}
          </p>
        </div>
      </TabsContent>

      {/* Specs Tab */}
      <TabsContent value="especificacoes" className="pt-6">
        <div className="max-w-2xl">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Especificacoes tecnicas
          </h3>
          <div className="overflow-hidden rounded-xl border border-border">
            {product.specs.map((spec, index) => (
              <div
                key={spec.id}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  index % 2 === 0 ? "bg-secondary/30" : "bg-background"
                }`}
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {spec.spec_type.name}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="avaliacoes" className="pt-6">
        <div className="max-w-3xl">
          {/* Summary */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-secondary/30 p-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-foreground">
                {product.reviews_avg_rating ?? 0}
              </span>
              <StarRating
                rating={product.reviews_avg_rating ?? 0}
                reviewCount={product.reviews_count}
              />
              <span className="text-sm text-muted-foreground">
                {product.reviews_count} avaliacoes
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = product.reviews.filter(
                  (r) => Math.floor(r.rating) === star,
                ).length;
                const percentage =
                  product.reviews.length > 0
                    ? (count / product.reviews.length) * 100
                    : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-8 text-right text-sm text-muted-foreground">
                      {star}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-sm text-muted-foreground">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="flex flex-col gap-6">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-3 rounded-xl border border-border p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {review.user.name}
                      </span>
                      {review.verified && (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <CheckCircle2 className="h-3 w-3" />
                          Compra verificada
                        </Badge>
                      )}
                    </div>
                    <StarRating
                      rating={review.rating}
                      reviewCount={1}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground">
                  {review.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
