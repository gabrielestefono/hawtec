"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export default function StarRating({
  rating,
  reviewCount,
}: Readonly<StarRatingProps>) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={`star-${i}-${rating}`}
            className={cn(
              "h-3.5 w-3.5",
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating} ({reviewCount})
      </span>
    </div>
  );
}
