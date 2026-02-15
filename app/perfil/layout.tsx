"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { User, Package, MapPin, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

const navItems = [
  { label: "Meus dados", href: "/perfil", icon: User },
  { label: "Meus pedidos", href: "/perfil/pedidos", icon: Package },
  { label: "Enderecos", href: "/perfil/enderecos", icon: MapPin },
]

export default function PerfilLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Minha conta</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block">
          <nav className="flex flex-col gap-1" aria-label="Navegacao do perfil">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            <Button
              variant="ghost"
              className="mt-4 justify-start gap-3 text-destructive hover:text-destructive"
              onClick={() => {
                logout()
                router.push("/")
              }}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-border pb-2 lg:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </main>
  )
}
