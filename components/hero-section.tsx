"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Wrench, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const bannerSlides = [
  {
    id: 1,
    title: "Notebooks de Alta Performance",
    subtitle: "Para trabalho e gaming",
    description: "Processadores de última geração e placas de vídeo dedicadas",
    cta: "Ver Notebooks",
    href: "/notebooks",
    bgColor: "from-primary/10 via-background to-accent/10",
  },
  {
    id: 2,
    title: "Smartphones",
    subtitle: "As melhores marcas",
    description: "iPhone, Samsung, Xiaomi e muito mais com garantia estendida",
    cta: "Ver Smartphones",
    href: "/smartphones",
    bgColor: "from-accent/10 via-background to-primary/10",
  },
  {
    id: 3,
    title: "Periféricos Gamer",
    subtitle: "Setup completo",
    description: "Teclados, mouses, headsets e monitores para o seu setup",
    cta: "Ver Periféricos",
    href: "/perifericos",
    bgColor: "from-primary/10 via-background to-accent/10",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  return (
    <section className="relative">
      {/* Service Banner - Subtle but visible */}
      <div className="border-b border-border bg-card">
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
            <Button variant="outline" size="sm" className="gap-2 border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground bg-transparent">
              Solicitar Serviço
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Hero Banner */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className={`min-w-full bg-gradient-to-r ${slide.bgColor}`}
            >
              <div className="mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center gap-6 px-4 py-16 text-center lg:min-h-[500px]">
                <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                  {slide.subtitle}
                </span>
                <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  {slide.description}
                </p>
                <Link href={slide.href}>
                  <Button size="lg" className="gap-2">
                    {slide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background"
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
