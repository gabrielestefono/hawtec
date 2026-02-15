"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Search, Heart, ShoppingCart, User, Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Categorias", href: "/categorias" },
  { name: "Ofertas", href: "/ofertas" },
  { name: "Contato", href: "/contato" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const cartItemCount = 3
  const wishlistCount = 5

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="border-b border-border/30 bg-secondary/50">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground">
          <p>Frete grátis em compras acima de R$ 299</p>
          <div className="hidden gap-4 md:flex">
            <Link href="/rastrear" className="transition-colors hover:text-primary">
              Rastrear Pedido
            </Link>
            <Link href="/suporte" className="transition-colors hover:text-primary">
              Suporte
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.webp"
              alt="TEC HAW Logo"
              width={50}
              height={50}
              className="h-10 w-auto lg:h-12"
              unoptimized
            />
            <span className="hidden bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold tracking-tight text-transparent sm:block lg:text-2xl">
              TEC HAW
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search bar - Desktop */}
          <div className="hidden flex-1 max-w-md lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="w-full rounded-full border-border/50 bg-secondary/50 pl-10 pr-4 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-xs text-accent-foreground"
                >
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Lista de Desejos</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-primary-foreground"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Carrinho</span>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Conta</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link href="/login" className="w-full">
                    Entrar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cadastro" className="w-full">
                    Criar Conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/minha-conta" className="w-full">
                    Minha Conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/meus-pedidos" className="w-full">
                    Meus Pedidos
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="border-t border-border/30 py-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="w-full rounded-full border-border/50 bg-secondary/50 pl-10 pr-4"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/30 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-4 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-border/30 pt-4">
              <Link
                href="/rastrear"
                className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Rastrear Pedido
              </Link>
              <Link
                href="/suporte"
                className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Suporte
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
