"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockOrders, formatPrice } from "@/lib/mock-data"
import type { OrderStatus } from "@/lib/types"

const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  processando: { label: "Processando", variant: "secondary" },
  enviado: { label: "Enviado", variant: "default" },
  entregue: { label: "Entregue", variant: "outline" },
  cancelado: { label: "Cancelado", variant: "destructive" },
}

export default function MeusPedidosPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleOrder = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId))
  }

  if (mockOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="font-semibold text-foreground">Nenhum pedido encontrado</p>
        <p className="text-sm text-muted-foreground">Seus pedidos aparecerão aqui.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">Meus pedidos</h2>

      {mockOrders.map((order) => {
        const isExpanded = expandedOrder === order.id
        const config = statusConfig[order.status]

        return (
          <Card key={order.id}>
            <CardContent className="p-4">
              {/* Header */}
              <button
                onClick={() => toggleOrder(order.id)}
                className="flex w-full items-center gap-4"
                aria-expanded={isExpanded}
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    fill
                    className="object-cover"
                  />
                  {order.items.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                      <span className="text-xs font-bold text-background">+{order.items.length - 1}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col items-start gap-1 text-left">
                  <div className="flex w-full flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {order.id}
                    </span>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("pt-BR")} - {formatPrice(order.total)}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 flex flex-col gap-4">
                  <Separator />

                  {/* Items */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-foreground">Itens</h3>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-secondary">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity}x - Cor: {item.color}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Details grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Entrega</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.shippingAddress.street}, {order.shippingAddress.number}
                        {order.shippingAddress.complement ? ` - ${order.shippingAddress.complement}` : ""}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.neighborhood}, {order.shippingAddress.city} - {order.shippingAddress.state}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        CEP: {order.shippingAddress.cep}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Pagamento</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{order.paymentMethod}</p>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        Total: {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>

                  {order.trackingCode && (
                    <>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">Rastreamento</h3>
                          <p className="text-sm text-muted-foreground">{order.trackingCode}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Rastrear
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
