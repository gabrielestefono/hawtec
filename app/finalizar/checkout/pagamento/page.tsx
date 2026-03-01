"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/mock-data"
import DefaultLayout from "@/layouts/DefaultLayout"

export default function CheckoutPagamentoPage() {
  const router = useRouter()
  const { items, subtotal } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [shippingPrice, setShippingPrice] = useState(0)

  useEffect(() => {
    // Recover shipping from sessionStorage
    try {
      const shippingData = sessionStorage.getItem("hawtec-checkout-shipping")
      if (shippingData) {
        const parsed = JSON.parse(shippingData)
        setShippingPrice(parsed.price ?? 0)
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    // Redirect back if cart is empty
    if (items.length === 0) {
      router.replace("/finalizar/carrinho")
    }
  }, [items, router])

  const total = subtotal + shippingPrice

  const handlePayment = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          shipping: shippingPrice,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao processar pagamento.")
      }

      const data = await response.json()

      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        throw new Error("URL de pagamento nao encontrada.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.")
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <DefaultLayout>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <CheckoutStepper currentStep={2} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            {/* Payment info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Ao clicar no botao abaixo, voce sera redirecionado para o
                    ambiente seguro do Mercado Pago para concluir o pagamento.
                  </p>

                  <div className="rounded-xl border-2 border-primary bg-primary/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          Pagamento seguro
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Seus dados estao protegidos pelo Mercado Pago. Aceita
                          cartao de credito, debito, boleto e Pix.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order totals quick view */}
                  <div className="flex flex-col gap-2 rounded-lg bg-secondary p-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span className={shippingPrice === 0 ? "font-medium text-accent" : "text-foreground"}>
                        {shippingPrice === 0 ? "Gratis" : formatPrice(shippingPrice)}
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between border-t border-border pt-2">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <Button
                    size="lg"
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pagar com Mercado Pago
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="text-muted-foreground"
                  >
                    Voltar para entrega
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-20">
            <OrderSummary shipping={shippingPrice} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  )
}
