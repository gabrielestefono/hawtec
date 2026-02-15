import Link from "next/link"
import { ShieldCheck, CreditCard, Truck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">H</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                Haw<span className="text-primary">Tec</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Tecnologia premium com garantia e suporte dedicado. Os melhores produtos do mercado com precos justos.
            </p>
          </div>

          {/* Institucional */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Institucional</h3>
            <nav className="flex flex-col gap-2" aria-label="Links institucionais">
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Sobre nos
              </Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Politica de privacidade
              </Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Termos de uso
              </Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Trabalhe conosco
              </Link>
            </nav>
          </div>

          {/* Atendimento */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Atendimento</h3>
            <nav className="flex flex-col gap-2" aria-label="Links de atendimento">
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Central de ajuda
              </Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Trocas e devolucoes
              </Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Prazo de entrega
              </Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Fale conosco
              </Link>
            </nav>
          </div>

          {/* Selos */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Seguranca</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Compra 100% segura</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Ate 12x sem juros</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Frete gratis acima de R$ 299</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            {"2026 HawTec. Todos os direitos reservados. CNPJ: 00.000.000/0001-00"}
          </p>
        </div>
      </div>
    </footer>
  )
}
