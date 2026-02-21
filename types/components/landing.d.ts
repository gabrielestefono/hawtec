export type BadgeType = "discount" | "new" | "highlight";

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
}

export interface Image {
  id: number;
  imageable_type: string;
  imageable_id: number;
  path: string;
  alt: string;
  sort: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string | null;
  button_label: string;
  button_url: string | null;
  is_active: boolean;
  sort: number;
  starts_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
  image: Image;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  slug: string;
  created_at: string;
  updated_at: string;
  products_count: number;
}

export interface Badge {
  id: number | null;
  product_id: number;
  badge_type: BadgeType;
  valid_from: string | null;
  valid_until: string | null;
  created_at: string | null;
  updated_at: string | null;
  discountPercentage: number| null;
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

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  long_description: string;
  created_at: string;
  updated_at: string;
  product_category_id: number;
  image: Image | null;
}

export interface Variant {
  id: number;
  product_id: number;
  sku: string;
  variant_label: string;
  slug: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  price: number;
  product: Product;
  offer: Offer | null;
  badge: Badge | null;
  reviews_count: number;
  reviews_avg_rating?: number|null;
}

export interface Offer extends Product {}

export interface Bestseller extends Product {}

export interface Landing {
  banners: Banner[];
  categories: Category[];
  products: Variant[];
  offers: Variant[];
  bestsellers: Variant[];
}
