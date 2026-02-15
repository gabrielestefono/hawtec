import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md"
  showCount?: boolean
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
}: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5"

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" aria-label={`${rating} de 5 estrelas`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(iconSize, "fill-amber-400 text-amber-400")}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className={cn(iconSize, "fill-amber-400 text-amber-400")}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(iconSize, "text-muted-foreground/30")}
          />
        ))}
      </div>
      <span className={cn("font-semibold text-foreground", size === "sm" ? "text-sm" : "text-base")}>
        {rating}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({reviewCount} {reviewCount === 1 ? "avaliacao" : "avaliacoes"})
        </span>
      )}
    </div>
  )
}
