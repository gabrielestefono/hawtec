"use client";

import { ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  slug: string;
  created_at: string;
  updated_at: string;
  products_count: number;
}

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({
  categories,
}: Readonly<CategoriesSectionProps>) {
  return (
    <section className="border-t border-border bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Categorias
            </h2>
            <p className="mt-1 text-muted-foreground">
              Encontre o que você precisa
            </p>
          </div>
          <Link
            href="/produtos"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {/* Featured: Assistência Técnica - Takes 1 column but full height */}
          <Link
            href="/servicos"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-accent/30 bg-linear-to-br from-accent/10 via-accent/5 to-transparent p-6 transition-all hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10 lg:row-span-2"
          >
            {/* Background decoration */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-all group-hover:bg-accent/20" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

            <div className="relative">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 text-accent transition-transform group-hover:scale-110">
                <Wrench className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                Assistência Técnica
              </h3>
              <p className="mt-2 text-muted-foreground">
                Manutenção, reparo e suporte especializado para todos os seus
                dispositivos
              </p>
            </div>

            <div className="relative mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">
                  ✓
                </span>
                Diagnóstico gratuito
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">
                  ✓
                </span>
                Garantia de 90 dias
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">
                  ✓
                </span>
                Técnicos certificados
              </div>

              <div className="flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Product Categories Grid - 2 columns, 4 rows = 8 items */}
          {categories.length > 0 && (
            <div className="grid grid-cols-2 gap-3 lg:col-span-2 lg:gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/produtos?categorias=${category.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    {/* <category.icon className="h-6 w-6" /> */}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="truncate text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground sm:block">
                    {category.products_count}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile: Ver todas */}
        <Link
          href="/categorias"
          className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline sm:hidden"
        >
          Ver todas as categorias
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
