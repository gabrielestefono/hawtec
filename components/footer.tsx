"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react"

const siteLinks = {
  institucional: [
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Nossa História", href: "/historia" },
    { name: "Trabalhe Conosco", href: "/carreiras" },
    { name: "Blog", href: "/blog" },
  ],
  ajuda: [
    { name: "Central de Ajuda", href: "/ajuda" },
    { name: "Como Comprar", href: "/como-comprar" },
    { name: "Prazo de Entrega", href: "/entregas" },
    { name: "Trocas e Devoluções", href: "/trocas" },
    { name: "Política de Privacidade", href: "/privacidade" },
  ],
  categorias: [
    { name: "Notebooks", href: "/categorias/notebooks" },
    { name: "Smartphones", href: "/categorias/smartphones" },
    { name: "Periféricos", href: "/categorias/perifericos" },
    { name: "Assistência Técnica", href: "/servicos" },
  ],
}

const paymentMethods = [
  { name: "Visa", icon: "💳" },
  { name: "Mastercard", icon: "💳" },
  { name: "Elo", icon: "💳" },
  { name: "American Express", icon: "💳" },
  { name: "PIX", icon: "⚡" },
  { name: "Boleto", icon: "📄" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Institucional */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="TEC HAW Logo"
                width={50}
                height={50}
                className="h-12 w-auto"
                unoptimized
              />
              <div>
                <h3 className="text-lg font-bold text-foreground">TEC HAW</h3>
                <p className="text-xs text-muted-foreground">Tecnologia Premium</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A TEC HAW nasceu com o propósito de levar tecnologia de qualidade para todos. 
              Com mais de 10 anos de experiência em assistência técnica e vendas, nos tornamos 
              referência em soluções tecnológicas, oferecendo produtos selecionados e serviços 
              especializados com a garantia de quem entende do assunto.
            </p>
            
            {/* Social Links */}
            <div className="mt-4 flex gap-3">
              <Link 
                href="https://instagram.com/techaw.oficial" 
                target="_blank"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link 
                href="https://facebook.com/techaw" 
                target="_blank"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link 
                href="https://youtube.com/techaw" 
                target="_blank"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-4 w-4" />
              </Link>
              <Link 
                href="https://wa.me/5511999999999" 
                target="_blank"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Institucional Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Institucional
            </h4>
            <ul className="space-y-2">
              {siteLinks.institucional.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ajuda Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Ajuda
            </h4>
            <ul className="space-y-2">
              {siteLinks.ajuda.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Av. Tecnologia, 1000<br />
                  São Paulo - SP, 01310-100
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Link 
                  href="tel:+551133333333"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  (11) 3333-3333
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Link 
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  (11) 99999-9999
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Link 
                  href="mailto:contato@techaw.com.br"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  contato@techaw.com.br
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 border-t border-border pt-8">
          <h4 className="mb-4 text-center text-sm font-semibold text-foreground">
            Formas de Pagamento
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Visa", "Mastercard", "Elo", "Amex", "Hipercard", "PIX", "Boleto"].map((method) => (
              <div 
                key={method}
                className="flex h-8 items-center justify-center rounded border border-border bg-background px-3 text-xs font-medium text-muted-foreground"
              >
                {method}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Parcele em até 12x sem juros no cartão de crédito
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            {/* Copyright */}
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} TEC HAW Tecnologia LTDA. Todos os direitos reservados.
              <br />
              CNPJ: 00.000.000/0001-00
            </p>
            
            {/* Divider */}
            <div className="h-px w-full max-w-xs bg-border" />
            
            {/* Developer Credit */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-muted-foreground">Desenvolvido por</p>
              {/* Placeholder for developer logo */}
              <div className="flex h-8 items-center justify-center rounded bg-muted px-4">
                <span className="text-xs font-medium text-muted-foreground">
                  [Sua Logo Aqui]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
