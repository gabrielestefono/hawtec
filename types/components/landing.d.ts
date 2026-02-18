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
  description: string;
  button_label: string;
  button_url: string;
  is_active: boolean;
  sort: number;
  starts_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
  images: Image[];
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

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  brand: null;
  sku: null;
  long_description: null;
  colors: null;
  specs: null;
  price: string;
  badge: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  product_category_id: number;
  reviews_count: number;
  reviews_avg_rating: number;
  reviews_rating: number;
  current_price: string;
  sale_price: string;
  has_offer: boolean;
  discount_percentage: number|null;
  images: Image[];
  offers: Offer[];
  category: Category;
  reviews: Review[];
}

export interface Offer extends Product {}

export interface Bestseller extends Product {}

export interface Landing {
  banners: Banner[];
  categories: Category[];
  products: Product[];
  offers: Offer[];
  bestsellers: Bestseller[];
}
