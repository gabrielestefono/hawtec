import Image from "next/image";
import Link from "next/link";
import { Product } from "../product/product-card";

interface OfferCardProps {
  offer: Product;
}

export default function OfferCard({ offer }: Readonly<OfferCardProps>) {
  return (
    <Link
      href={`/produto/${offer.id}`}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={offer.images[0].url || "/placeholder.svg"}
          alt={offer.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <span className="absolute -right-1 -top-1 rounded-bl-md rounded-tr-md bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
          -{offer.discount_percentage}%
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-foreground group-hover:text-primary">
          {offer.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground line-through">
            R$ {offer.price.replace(".", ",")}
          </span>
          <span className="text-sm font-bold text-primary">
            R$ {offer.sale_price.replace(".", ",")}
          </span>
        </div>
      </div>
    </Link>
  );
}
