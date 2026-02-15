"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Truck, Zap, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { OrderSummary } from "@/components/checkout/order-summary"
import { formatPrice } from "@/lib/mock-data"

const STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
]

const shippingOptions = [
  { id: "normal", label: "Normal", description: "7 a 10 dias uteis", price: 0, icon: Clock },
  { id: "express", label: "Expresso", description: "3 a 5 dias uteis", price: 19.90, icon: Truck },
  { id: "sameday", label: "Same-day", description: "Entrega hoje", price: 39.90, icon: Zap },
]

export default function CheckoutEntregaPage() {
  const router = useRouter()
  const [cep, setCep] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [selectedShipping, setSelectedShipping] = useState("normal")
  const [error, setError] = useState("")

  const shippingPrice = shippingOptions.find((s) => s.id === selectedShipping)?.price ?? 0

  const handleContinue = () => {
    if (!cep || !street || !number || !neighborhood || !city || !state) {
      setError("Preencha todos os campos obrigatorios.")
      return
    }
    setError("")
    // Store shipping in sessionStorage for next steps
    sessionStorage.setItem(
      "hawtec-checkout-address",
      JSON.stringify({ cep, street, number, complement, neighborhood, city, state })
    )
    sessionStorage.setItem("hawtec-checkout-shipping", JSON.stringify({ id: selectedShipping, price: shippingPrice }))
    router.push("/checkout/pagamento")
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <CheckoutStepper currentStep={1} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          {/* Address form */}
          <Card>
            <CardHeader>
              <CardTitle>Endereco de entrega</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input id="cep" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="street">Rua *</Label>
                  <Input id="street" placeholder="Nome da rua" value={street} onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="number">Numero *</Label>
                    <Input id="number" placeholder="123" value={number} onChange={(e) => setNumber(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" placeholder="Apto, bloco..." value={complement} onChange={(e) => setComplement(e.target.value)} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input id="neighborhood" placeholder="Bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input id="city" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state">Estado *</Label>
                    <select
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Selecione</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping options */}
          <Card>
            <CardHeader>
              <CardTitle>Frete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {shippingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedShipping(opt.id)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors",
                      selectedShipping === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      selectedShipping === opt.id ? "bg-primary/10" : "bg-secondary"
                    )}>
                      <opt.icon className={cn(
                        "h-5 w-5",
                        selectedShipping === opt.id ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.description}</p>
                    </div>
                    <span className={cn(
                      "text-sm font-semibold",
                      opt.price === 0 ? "text-accent" : "text-foreground"
                    )}>
                      {opt.price === 0 ? "Gratis" : formatPrice(opt.price)}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button size="lg" onClick={handleContinue}>
            Continuar para pagamento
          </Button>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-20">
          <OrderSummary shipping={shippingPrice} />
        </div>
      </div>
    </main>
  )
}
