"use client"

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react"
import type { CartItem } from "@/lib/types"

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.color === action.payload.color
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.payload.productId && i.color === action.payload.color
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => !(i.productId === action.payload.productId && i.color === action.payload.color)
        ),
      }
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((i) =>
          i.productId === action.payload.productId && i.color === action.payload.color
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        ),
      }
    case "CLEAR_CART":
      return { items: [] }
    case "LOAD_CART":
      return { items: action.payload }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string) => void
  updateQuantity: (productId: string, color: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hawtec-cart")
      if (saved) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) })
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("hawtec-cart", JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items])

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item })
  const removeItem = (productId: string, color: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: { productId, color } })
  const updateQuantity = (productId: string, color: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, color, quantity } })
  const clearCart = () => dispatch({ type: "CLEAR_CART" })

  const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0)
  const subtotal = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
