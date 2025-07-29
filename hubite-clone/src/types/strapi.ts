// Базові типи для Strapi API
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  documentId: string;
  attributes: T;
}

export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: StrapiMediaFormat;
      small?: StrapiMediaFormat;
      medium?: StrapiMediaFormat;
      large?: StrapiMediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  width: number;
  height: number;
}

// Компоненти (реальна структура з API)
export interface SocialLinksComponent {
  id: number;
  onlyfans?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  telegram?: string;
}

export interface StatsComponent {
  id: number;
  posts: number;
  photos: number;
  videos: number;
  subscribers: number;
}

// Локація (реальна плоска структура з API)
export interface Location {
  id: number;
  documentId: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  flag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Категорія (реальна плоска структура з API)
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Тег (реальна плоска структура з API)
export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Основна модель створювача (реальна плоска структура з API)
export interface Creator {
  id: number;
  documentId: string;
  name: string;
  username: string;
  email: string;
  bio?: any; // Може бути string або rich text array
  price: number;
  isFree: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  
  // Компоненти (опціональні)
  socialLinks?: SocialLinksComponent;
  stats?: StatsComponent;
  
  // Зв'язки (populate результати - плоскі об'єкти)
  categories?: Category[];
  location?: Location | null;
  tag?: Tag | null;
  
  // Системні поля
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Параметри пошуку
export interface SearchParams {
  query?: string;
  categories?: string[];
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  isFree?: boolean;
  hasTrials?: boolean;
  verified?: boolean;
  featured?: boolean;
  sortBy?: 'relevance' | 'recent' | 'popular' | 'price' | 'name';
  page?: number;
  pageSize?: number;
}

// Параметри для API запитів
export interface GetCreatorsParams {
  filters?: Record<string, any>;
  populate?: string[] | string;
  pagination?: {
    page: number;
    pageSize: number;
  };
  sort?: string[];
  publicationState?: 'live' | 'preview';
}

// Відповіді API
export type CreatorsResponse = StrapiResponse<Creator[]>;
export type CreatorResponse = StrapiResponse<Creator[]>;
export type CategoriesResponse = StrapiResponse<Category[]>;
export type LocationsResponse = StrapiResponse<Location[]>;
export type TagsResponse = StrapiResponse<Tag[]>;

// Фільтри для Strapi API
export interface StrapiFilters {
  [key: string]: any;
}

// Помилки API
export interface APIError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

// Deprecated types для зворотної сумісності
export interface LocationAttributes {
  country: string;
  countryCode: string;
  city: string;
  region: string;
  flag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TagAttributes {
  name: string;
  slug: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CreatorAttributes {
  name: string;
  username: string;
  email: string;
  bio?: any;
  price: number;
  isFree: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  socialLinks?: SocialLinksComponent;
  stats?: StatsComponent;
  categories?: Category[];
  location?: Location | null;
  tag?: Tag | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
} 