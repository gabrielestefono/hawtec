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

export interface BannerSlide {
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
