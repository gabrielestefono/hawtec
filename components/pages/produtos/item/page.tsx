"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductInfo } from "@/components/product/product-info";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ProductComplete } from "@/types/components/products";

interface ProductPageProps {
  product: ProductComplete;
}

export default function ProductPage({ product }: Readonly<ProductPageProps>) {
  console.log(product.colors);
  return (
    <DefaultLayout>
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Inicio</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">{product.category.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Product Main Section */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Image Gallery */}
            <ProductImageGallery
              images={product.images.map((img) => img.url)}
              productName={product.name}
            />

            {/* Right: Product Info */}
            <ProductInfo product={product} />
          </div>
        </section>

        {/* Tabs Section */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            {/* <ProductTabs product={product} /> */}
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
}
