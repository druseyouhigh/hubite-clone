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
  width: number;
  height: number;
  size: number;
  url: string;
}

// Статистика створювача
export interface CreatorStats {
  posts: number;
  photos: number;
  videos: number;
  likes?: number;
  subscribers?: number;
}

// Локація
export interface LocationAttributes {
  name: string;
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  createdAt: string;
  updatedAt: string;
}

export type Location = StrapiEntity<LocationAttributes>;

// Категорія
export interface CategoryAttributes {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  isAdult: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Category = StrapiEntity<CategoryAttributes>;

// Тег
export interface TagAttributes {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export type Tag = StrapiEntity<TagAttributes>;

// Соціальні мережі
export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  onlyfans?: string;
  website?: string;
}

// Основна модель створювача
export interface CreatorAttributes {
  name: string;
  username: string;
  displayName?: string;
  bio?: string;
  description?: string;
  
  // Медіа
  avatar?: {
    data: StrapiMedia | null;
  };
  coverImage?: {
    data: StrapiMedia | null;
  };
  gallery?: {
    data: StrapiMedia[];
  };
  
  // Ціноутворення
  subscriptionPrice?: number;
  isFree: boolean;
  hasFreeTrial: boolean;
  trialLink?: string;
  discountPrice?: number;
  
  // Статистика
  stats: CreatorStats;
  
  // Зв'язки
  categories?: {
    data: Category[];
  };
  tags?: {
    data: Tag[];
  };
  location?: {
    data: Location | null;
  };
  
  // Соціальні мережі
  socialLinks?: SocialLinks;
  
  // Мета-дані
  verified: boolean;
  featured: boolean;
  isActive: boolean;
  lastActiveAt?: string;
  joinedAt?: string;
  
  // SEO
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  
  // Системні поля
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type Creator = StrapiEntity<CreatorAttributes>;

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
export type CreatorResponse = StrapiResponse<Creator>;
export type CategoriesResponse = StrapiResponse<Category[]>;
export type LocationsResponse = StrapiResponse<Location[]>;
export type TagsResponse = StrapiResponse<Tag[]>;

// Фільтри для Strapi
export interface StrapiFilters {
  [key: string]: any;
  $and?: StrapiFilters[];
  $or?: StrapiFilters[];
  $not?: StrapiFilters;
  $eq?: any;
  $ne?: any;
  $in?: any[];
  $notIn?: any[];
  $lt?: number;
  $lte?: number;
  $gt?: number;
  $gte?: number;
  $between?: [number, number];
  $contains?: string;
  $notContains?: string;
  $containsi?: string;
  $notContainsi?: string;
  $startsWith?: string;
  $endsWith?: string;
  $null?: boolean;
  $notNull?: boolean;
}

// Помилки API
export interface APIError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

export interface StrapiError {
  data: null;
  error: APIError;
} 