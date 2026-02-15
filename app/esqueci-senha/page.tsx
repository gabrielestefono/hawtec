"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setSent(true)
  }

  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg font-bold text-primary-foreground">H</span>
          </div>
          <CardTitle className="text-2xl">Recuperar senha</CardTitle>
          <CardDescription>
            {sent
              ? "Verifique seu email."
              : "Insira seu email para receber o link de recuperacao."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email enviado!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enviamos um link de recuperacao para{" "}
                  <strong className="text-foreground">{email}</strong>. Verifique sua caixa de entrada e spam.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-2">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao login
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar link de recuperacao"
                )}
              </Button>

              <Button asChild variant="ghost" className="mt-1">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao login
                </Link>
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
