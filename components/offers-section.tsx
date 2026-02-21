"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import OfferCard from "./offers/offer-card";
import { Variant } from "@/types/components/landing";

interface OffersSectionProps {
  offers: Variant[];
}

export function OffersSection({ offers }: Readonly<OffersSectionProps>) {
  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <Clock className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Ofertas Relâmpago
              </h2>
              <p className="text-sm text-muted-foreground">
                Aproveite antes que acabe
              </p>
            </div>
          </div>

          <Link
            href="/ofertas"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
