import { Badge, Image } from "./landing";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  title: null;
  verified: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ProductRelation {
  id: number;
  name: string;
  description: string;
  brand: string;
  long_description: string;
  created_at: string;
  updated_at: string;
  product_category_id: number;
  category: Category;
  images: Image[];
}

export interface Offer {
  id: number;
  offer_price: number;
  starts_at: string;
  ends_at: string;
  quantity_limit: number;
  quantity_sold: number;
  created_at: string;
  updated_at: string;
  product_variant_id: number;
}

export default interface Specs {
  id: number;
  spec_type_id: number;
  value: string;
  created_at: string;
  updated_at: string;
  pivot: {
    product_variant_id: number;
    spec_id: number;
  };
  spec_type: {
    id: number;
    name: string;
    is_selectable: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
  };
}

export interface ProductComplete {
  id: number;
  product_id: number;
  sku: string;
  variant_label: string;
  slug: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  reviews_count: number;
  reviews_avg_rating?: number | null;
  offer?: Offer | null;
  price: number;
  product: ProductRelation;
  badge?: Badge;
  reviews: Review[];
  specs: Specs[];
}
