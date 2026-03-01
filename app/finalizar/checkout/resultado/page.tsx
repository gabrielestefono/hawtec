"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, Clock, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { useCart } from "@/contexts/cart-context"
import DefaultLayout from "@/layouts/DefaultLayout"
import { Suspense } from "react"

type PaymentStatus = "approved" | "pending" | "failure"

const statusConfig: Record<
  PaymentStatus,
  {
    icon: typeof CheckCircle2
    title: string
    description: string
    color: string
    iconColor: string
    bgColor: string
  }
> = {
  approved: {
    icon: CheckCircle2,
    title: "Pagamento aprovado!",
    description:
      "Seu pedido foi confirmado e esta sendo preparado. Voce recebera um e-mail com os detalhes da compra e o codigo de rastreamento.",
    color: "border-accent",
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
  },
  pending: {
    icon: Clock,
    title: "Pagamento pendente",
    description:
      "Seu pagamento esta sendo processado. Assim que for confirmado, voce recebera um e-mail com os detalhes do pedido.",
    color: "border-chart-4",
    iconColor: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  failure: {
    icon: XCircle,
    title: "Pagamento nao aprovado",
    description:
      "Infelizmente o pagamento nao foi aprovado. Voce pode tentar novamente com outro metodo de pagamento.",
    color: "border-destructive",
    iconColor: "text-destructive",
    bgColor: "bg-destructive/10",
  },
}

function ResultadoContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()

  const rawStatus = searchParams.get("status") || searchParams.get("collection_status") || "failure"

  let status: PaymentStatus
  if (rawStatus === "approved") {
    status = "approved"
  } else if (rawStatus === "pending" || rawStatus === "in_process") {
    status = "pending"
  } else {
    status = "failure"
  }

  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id")
  const config = statusConfig[status]
  const StatusIcon = config.icon

  useEffect(() => {
    if (status === "approved") {
      clearCart()
      sessionStorage.removeItem("hawtec-checkout-address")
      sessionStorage.removeItem("hawtec-checkout-shipping")
    }
  }, [status, clearCart])

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className={`w-full max-w-lg border-2 ${config.color}`}>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ${config.bgColor}`}
          >
            <StatusIcon className={`h-8 w-8 ${config.iconColor}`} />
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            {config.title}
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {config.description}
          </p>

          {paymentId && (
            <div className="w-full rounded-lg bg-secondary p-3">
              <p className="text-xs text-muted-foreground">
                ID do pagamento
              </p>
              <p className="font-mono text-sm font-medium text-foreground">
                {paymentId}
              </p>
            </div>
          )}

          <div className="flex w-full flex-col gap-3 pt-2">
            {status === "failure" && (
              <Button asChild size="lg" className="w-full">
                <Link href="/finalizar/checkout/pagamento">
                  Tentar novamente
                </Link>
              </Button>
            )}

            <Button asChild variant={status === "failure" ? "outline" : "default"} size="lg" className="w-full">
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continuar comprando
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutResultadoPage() {
  return (
    <DefaultLayout>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <CheckoutStepper currentStep={3} />
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }
        >
          <ResultadoContent />
        </Suspense>
      </main>
    </DefaultLayout>
  )
}
