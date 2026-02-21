import { Category, Image, Review } from "./landing";

export interface Color {
  id: number;
  product_id: number;
  name: string;
  hex_code: string;
  created_at: string;
  updated_at: string;
}

export interface ProductComplete {
  id: number;
  name: string;
  slug: string;
  description: string;
  brand: null;
  sku: null;
  long_description: null;
  colors: Color[];
  specs: null;
  price: string;
  badge: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  product_category_id: number;
  current_price: string;
  sale_price: string;
  has_offer: boolean;
  discount_percentage: number;
  reviews_rating: number;
  reviews_count: number;
  images: Image[];
  category: Category;
  reviews: Review[];
}
