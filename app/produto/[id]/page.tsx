import type { Metadata } from "next"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductImageGallery } from "@/components/product/product-image-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductTabs } from "@/components/product/product-tabs"
import { mockProduct } from "@/lib/mock-product"

export const metadata: Metadata = {
  title: "HawTec Pro X1 - Headphone Bluetooth Premium | HawTec",
  description:
    "Headphone over-ear com cancelamento de ruido ativo, som Hi-Res e bateria de 40h. Compre agora na HawTec.",
}

export default async function ProductPage() {
  const product = mockProduct

  return (
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
                  <Link href="/">{product.category}</Link>
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
            images={product.images}
            productName={product.name}
          />

          {/* Right: Product Info */}
          <ProductInfo product={product} />
        </div>
      </section>

      {/* Tabs Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <ProductTabs product={product} />
        </div>
      </section>
    </main>
  )
}
