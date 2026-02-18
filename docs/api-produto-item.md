# Contrato da API para `app/produtos/item/[slug]/page.tsx`

## Arquivos analisados
- `app/produtos/item/[slug]/page.tsx`
- `components/product/product-image-gallery.tsx`
- `components/product/product-info.tsx`
- `components/product/product-tabs.tsx`
- `components/product/color-selector.tsx`
- `components/product/quantity-selector.tsx`
- `components/product/star-rating.tsx`
- `lib/types.ts`
- `lib/mock-product.ts`

## Objetivo do payload
A página de detalhe do produto precisa de um objeto `product` completo para renderizar:
- breadcrumb
- galeria de imagens
- bloco de preço/estoque/variações
- abas de descrição, especificações e avaliações
- dados usados ao adicionar no carrinho e favoritos

## Endpoint sugerido
`GET /api/produtos/{slug}`

Resposta sugerida:

```json
{
  "id": "haw-pro-x1",
  "slug": "hawtec-pro-x1",
  "name": "HawTec Pro X1 - Headphone Bluetooth Premium",
  "description": "Headphone over-ear com cancelamento de ruido ativo...",
  "longDescription": "O HawTec Pro X1 redefine a experiencia sonora...",
  "price": 899.9,
  "originalPrice": 1299.9,
  "discountPercent": 31,
  "images": ["/images/product-headphone.jpg"],
  "rating": 4.7,
  "reviewCount": 342,
  "badge": "desconto",
  "category": "Audio",
  "brand": "HawTec",
  "sku": "HAW-PRX1-BK",
  "inStock": true,
  "stockCount": 23,
  "colors": [
    { "name": "Preto", "value": "#1a1a1a", "available": true }
  ],
  "specs": [
    { "label": "Driver", "value": "40mm Neodimio" }
  ],
  "reviews": [
    {
      "id": "r1",
      "author": "Lucas M.",
      "rating": 5,
      "date": "2026-01-15",
      "title": "Melhor headphone que ja tive",
      "content": "Som absurdo...",
      "verified": true
    }
  ]
}
```

## Campos necessários (por uso real na UI)

### `Product`
- `id: string` (obrigatório)
- `name: string` (obrigatório)
- `description: string` (obrigatório)
- `longDescription: string` (obrigatório)
- `price: number` (obrigatório)
- `originalPrice?: number` (opcional)
- `discountPercent?: number` (opcional)
- `images: string[]` (obrigatório, ideal >= 1)
- `rating: number` (obrigatório)
- `reviewCount: number` (obrigatório)
- `badge?: "novo" | "desconto" | "destaque"` (opcional)
- `category: string` (obrigatório)
- `brand: string` (obrigatório)
- `sku: string` (obrigatório)
- `inStock: boolean` (obrigatório, hoje não é exibido diretamente)
- `stockCount: number` (obrigatório)
- `colors: ProductColor[]` (obrigatório)
- `specs: ProductSpec[]` (obrigatório)
- `reviews: ProductReview[]` (obrigatório)

### `ProductColor`
- `name: string` (obrigatório)
- `value: string` (obrigatório, ex.: `#1a1a1a`)
- `available: boolean` (obrigatório)

### `ProductSpec`
- `label: string` (obrigatório)
- `value: string` (obrigatório)

### `ProductReview`
- `id: string` (obrigatório)
- `author: string` (obrigatório)
- `rating: number` (obrigatório)
- `date: string` (obrigatório, formato ISO recomendado)
- `title: string` (obrigatório)
- `content: string` (obrigatório)
- `verified: boolean` (obrigatório)

## Regras de consistência recomendadas
- Se `badge = "desconto"`, enviar `discountPercent` e `originalPrice`.
- `images[0]` deve existir: é usado no carrinho e favoritos.
- `stockCount` deve ser >= 0.
- `rating` idealmente no intervalo `0..5`.
- `reviewCount` deve ser coerente com a origem de `reviews`:
  - se `reviews` vier paginado/parcial, `reviewCount` deve representar o total real.
  - se `reviews` vier completo, pode ser igual a `reviews.length`.
- `date` em ISO (`YYYY-MM-DD` ou ISO datetime) para formatar com `toLocaleDateString("pt-BR")`.

## Observações de implementação atual
- O `page.tsx` ainda usa `mockProduct`; o fetch por `slug` não foi implementado.
- O metadata (`title`/`description`) está estático no arquivo e não depende da API neste momento.
- Em `product-tabs.tsx`, o componente de estrelas dentro de cada review usa `product.rating` em vez de `review.rating`.
