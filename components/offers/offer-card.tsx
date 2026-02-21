import { Variant } from "@/types/components/landing";
import Image from "next/image";
import Link from "next/link";

interface OfferCardProps {
  offer: Variant;
}

export default function OfferCard({ offer }: Readonly<OfferCardProps>) {

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Link
      href={`/produto/${offer.id}`}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={offer.product.image?.url || "/placeholder.svg"}
          alt={offer.product.image?.alt || offer.product.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <span className="absolute -right-1 -top-1 rounded-bl-md rounded-tr-md bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
          -{offer.badge?.discountPercentage || 0}%
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-foreground group-hover:text-primary">
          {offer.product.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground line-through">
            { formatCurrency(offer.price) }
          </span>
          <span className="text-sm font-bold text-primary">
            { formatCurrency(offer.offer?.offer_price || offer.price) }
          </span>
        </div>
      </div>
    </Link>
  );
}
