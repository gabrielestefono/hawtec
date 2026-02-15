"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary/30">
        <Image
          src={images[selectedIndex]}
          alt={`${productName} - Imagem ${selectedIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all hover:bg-background group-hover:opacity-100"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all hover:bg-background group-hover:opacity-100"
              aria-label="Proxima imagem"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all",
              selectedIndex === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-muted-foreground/40"
            )}
            aria-label={`Ver imagem ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${productName} - Miniatura ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
