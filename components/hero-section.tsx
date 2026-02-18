"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import { Banner } from "@/types/components/landing";

interface HeroSectionProps {
  bannerSlides: Banner[];
}

export function HeroSection({ bannerSlides }: Readonly<HeroSectionProps>) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning, current],
  );

  const goNext = useCallback(() => {
    changeTo((current + 1) % bannerSlides.length);
  }, [current, bannerSlides.length, changeTo]);

  const goPrev = useCallback(() => {
    changeTo((current - 1 + bannerSlides.length) % bannerSlides.length);
  }, [current, bannerSlides.length, changeTo]);

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  const slide = bannerSlides[current];

  return (
    <section className="w-full bg-background">
      {/* <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <Wrench className="h-5 w-5 text-accent" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">
                Precisa de assistência técnica?
              </p>
              <p className="text-xs text-muted-foreground">
                Manutenção, reparo e suporte especializado
              </p>
            </div>
            <p className="text-sm font-medium text-foreground sm:hidden">
              Assistência Técnica
            </p>
          </div>
          <Link href="/servicos">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              Solicitar Serviço
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div> */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div
          className="relative grid h-120 overflow-hidden rounded-2xl shadow-lg sm:h-100 lg:h-105 lg:grid-cols-2 min-h-105 max-h-105"
          style={{ backgroundColor: "oklch(0.22 0.04 240)" }}
        >
          {/* ── Text side ── */}
          <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="flex flex-1 flex-col justify-center">
              {/* Badge */}
              <span
                className={`mb-4 inline-flex w-fit rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  isTransitioning
                    ? "-translate-y-1 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
                style={{
                  backgroundColor: "oklch(0.78 0.15 175)",
                  color: "oklch(0.13 0.03 240)",
                }}
              >
                {slide.subtitle}
              </span>

              {/* Title */}
              <h2
                className={`mb-3 text-pretty min-h-22.5 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl transition-all duration-300 ${
                  isTransitioning
                    ? "translate-y-2 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
                style={{ color: "oklch(0.97 0.005 250)" }}
              >
                {slide.title}
              </h2>

              {/* Description */}
              <p
                className={`mb-6 line-clamp-2 min-h-13 max-w-md text-sm leading-relaxed sm:text-base transition-all duration-300 delay-75 ${
                  isTransitioning
                    ? "translate-y-2 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
                style={{ color: "oklch(0.80 0.01 250)" }}
              >
                {slide.description}
              </p>

              {/* CTA */}
              <div
                className={`transition-all duration-300 delay-100 ${
                  isTransitioning
                    ? "translate-y-2 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <Link
                  href={slide.button_url}
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    backgroundColor: "oklch(0.78 0.15 175)",
                    color: "oklch(0.13 0.03 240)",
                  }}
                >
                  {slide.button_label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* ── Controls ── */}
            <div className="mt-6 flex items-center gap-3 lg:mt-8">
              <button
                onClick={goPrev}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                style={{
                  border: "1px solid oklch(0.97 0 0 / 0.2)",
                  color: "oklch(0.97 0 0 / 0.6)",
                }}
                aria-label="Slide anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={goNext}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                style={{
                  border: "1px solid oklch(0.97 0 0 / 0.2)",
                  color: "oklch(0.97 0 0 / 0.6)",
                }}
                aria-label="Proximo slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 pl-2">
                {bannerSlides.map((_, i) => (
                  <button
                    key={`dot-${bannerSlides[i].id}`}
                    onClick={() => changeTo(i)}
                    aria-label={`Ir para slide ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={
                      i === current
                        ? {
                            width: "1.5rem",
                            backgroundColor: "oklch(0.78 0.15 175)",
                          }
                        : {
                            width: "0.375rem",
                            backgroundColor: "oklch(0.97 0 0 / 0.25)",
                          }
                    }
                  />
                ))}
              </div>

              <span
                className="ml-auto text-xs tabular-nums"
                style={{ color: "oklch(0.97 0 0 / 0.35)" }}
              >
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(bannerSlides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── Image side ── */}
          <div className="relative h-55 sm:h-70 lg:h-auto">
            {bannerSlides.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === current && !isTransitioning ? 1 : 0 }}
              >
                <Image
                  src={s.images[0].url}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Gradient fade into the dark bg on the left edge (desktop) */}
            <div
              className="absolute inset-y-0 left-0 z-10 hidden w-24 lg:block"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.22 0.04 240), transparent)",
              }}
            />

            {/* Mobile: subtle dark overlay so banner text area above stays clean */}
            <div
              className="absolute inset-0 lg:hidden"
              style={{ backgroundColor: "oklch(0.22 0.04 240 / 0.15)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
