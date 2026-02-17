"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Package,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useLikes } from "@/contexts/likes-context";
import { LikesDrawer } from "@/components/likes/likes-drawer";
import Image from "next/image";

export function Header() {
  const { itemCount } = useCart();
  const { itemCount: likesCount } = useLikes();
  const { user, isAuthenticated, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Image
                src="/logo.webp"
                alt="TEC HAW Logo"
                width={50}
                height={50}
                className="h-10 w-auto lg:h-12"
                unoptimized
              />
            </div>
            <span className="text-lg font-bold text-foreground">
              Haw<span className="text-primary">Tec</span>
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Navegacao principal"
          >
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Inicio
            </Link>
            <Link
              href="/produtos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Produtos
            </Link>
            {/* <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Categorias
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Ofertas
            </Link> */}
          </nav>

          {/* Search */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1">
            {/* Search mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Favorites */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setLikesOpen(true)}
              aria-label="Favoritos"
            >
              <Heart className="h-5 w-5" />
              {likesCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
                  {likesCount > 99 ? "99+" : likesCount}
                </Badge>
              )}
            </Button>

            {/* User */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Minha conta">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-foreground">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Meus dados
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/perfil/pedidos"
                      className="flex items-center gap-2"
                    >
                      <Package className="h-4 w-4" />
                      Meus pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild aria-label="Entrar">
                <Link href="/auth/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
              aria-label={`Carrinho com ${itemCount} itens`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background px-4 pb-4 pt-2 lg:hidden">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10"
              />
            </div>
            <nav className="flex flex-col gap-1" aria-label="Menu mobile">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Inicio
              </Link>
              {/* <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Categorias
              </Link> */}
              {/* <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Ofertas
              </Link> */}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <LikesDrawer open={likesOpen} onOpenChange={setLikesOpen} />
    </>
  );
}
