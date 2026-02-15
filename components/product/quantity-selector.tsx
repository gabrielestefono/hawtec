"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  max: number
}

export function QuantitySelector({ max }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1)

  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1))
  const increase = () => setQuantity((prev) => Math.min(max, prev + 1))

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">Quantidade</span>
      <div className="flex items-center">
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= 1}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-l-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary",
            quantity <= 1 && "cursor-not-allowed opacity-40"
          )}
          aria-label="Diminuir quantidade"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="flex h-10 w-14 items-center justify-center border-y border-border bg-background text-sm font-semibold text-foreground">
          {quantity}
        </div>
        <button
          type="button"
          onClick={increase}
          disabled={quantity >= max}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-r-lg border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary",
            quantity >= max && "cursor-not-allowed opacity-40"
          )}
          aria-label="Aumentar quantidade"
        >
          <Plus className="h-4 w-4" />
        </button>
        <span className="ml-3 text-xs text-muted-foreground">
          {max} {max === 1 ? "disponivel" : "disponiveis"}
        </span>
      </div>
    </div>
  )
}
