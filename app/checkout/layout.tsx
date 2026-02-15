import Link from "next/link"
import { Lock } from "lucide-react"

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Checkout-specific header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-bold text-primary-foreground">H</span>
            </div>
            <span className="text-base font-bold text-foreground">
              Haw<span className="text-primary">Tec</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Checkout seguro</span>
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
