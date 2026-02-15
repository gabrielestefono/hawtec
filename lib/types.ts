export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  discountPercent?: number
  images: string[]
  rating: number
  reviewCount: number
  badge?: "novo" | "desconto" | "destaque"
  category: string
  brand: string
  sku: string
  inStock: boolean
  stockCount: number
  colors: ProductColor[]
  specs: ProductSpec[]
  reviews: ProductReview[]
}

export interface ProductColor {
  name: string
  value: string
  available: boolean
}

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductReview {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
}

// Cart
export interface CartItem {
  productId: string
  name: string
  price: number
  originalPrice?: number
  image: string
  color: string
  quantity: number
}

// Auth / User
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  cpf?: string
  avatarUrl?: string
}

// Addresses
export interface Address {
  id: string
  label: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  isDefault: boolean
}

// Orders
export type OrderStatus = "processando" | "enviado" | "entregue" | "cancelado"

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  color: string
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  shippingAddress: Address
  paymentMethod: string
  trackingCode?: string
}
