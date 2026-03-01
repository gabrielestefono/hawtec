import { NextResponse } from "next/server"
import { preferenceClient } from "@/lib/mercadopago"

interface PreferenceItem {
  title: string
  quantity: number
  unit_price: number
  currency_id: string
}

interface CreatePreferenceBody {
  items: {
    name: string
    quantity: number
    price: number
  }[]
  shipping: number
}

export async function POST(request: Request) {
  try {
    const body: CreatePreferenceBody = await request.json()

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no carrinho." },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const items: PreferenceItem[] = body.items.map((item) => ({
      title: item.name,
      quantity: item.quantity,
      unit_price: Number(item.price.toFixed(2)),
      currency_id: "BRL",
    }))

    // Add shipping as a separate item if > 0
    if (body.shipping > 0) {
      items.push({
        title: "Frete",
        quantity: 1,
        unit_price: Number(body.shipping.toFixed(2)),
        currency_id: "BRL",
      })
    }

    const preference = await preferenceClient.create({
      body: {
        items,
        back_urls: {
          success: `${baseUrl}/finalizar/checkout/resultado`,
          failure: `${baseUrl}/finalizar/checkout/resultado`,
          pending: `${baseUrl}/finalizar/checkout/resultado`,
        },
        auto_return: "approved",
        statement_descriptor: "HAWTEC",
      },
    })

    return NextResponse.json({
      id: preference.id,
      init_point: preference.init_point,
    })
  } catch (error) {
    console.error("Erro ao criar preferencia Mercado Pago:", error)
    return NextResponse.json(
      { error: "Erro ao processar pagamento." },
      { status: 500 }
    )
  }
}
