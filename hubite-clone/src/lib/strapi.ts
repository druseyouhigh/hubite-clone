import type {
  CreatorsResponse,
  CreatorResponse,
  CategoriesResponse,
  LocationsResponse,
  GetCreatorsParams,
  SearchParams,
  StrapiFilters,
  APIError,
} from '../types/strapi';

/**
 * Клас для роботи з Strapi API
 */
class StrapiClient {
  private baseURL: string;
  private token: string;

  constructor() {
    this.baseURL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
    this.token = import.meta.env.STRAPI_TOKEN || '';
  }

  /**
   * Базовий метод для виконання запитів до API
   */
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} ${response.statusText}`, {
        cause: {
          status: response.status,
          name: 'APIError',
          message: `${response.status} ${response.statusText}`,
          endpoint,
          details: errorData,
        } as unknown as APIError,
      });
    }

    return response.json();
  }

  /**
   * Перетворює параметри пошуку в Strapi фільтри
   */
  private buildFilters(params: SearchParams): StrapiFilters {
    const filters: StrapiFilters = {};

    // Пошук за текстом
    if (params.query) {
      filters.$or = [
        { name: { $containsi: params.query } },
        { username: { $containsi: params.query } },
        { displayName: { $containsi: params.query } },
      ];
    }

    // Фільтр за категоріями
    if (params.categories && params.categories.length > 0) {
      filters.categories = {
        slug: { $in: params.categories },
      };
    }

    // Фільтр за локацією
    if (params.location) {
      filters.location = {
        $or: [
          { country: { $containsi: params.location } },
          { city: { $containsi: params.location } },
        ],
      };
    }

    // Фільтр за ціною
    if (params.priceRange) {
      if (params.priceRange.min > 0 || params.priceRange.max < 1000) {
        filters.subscriptionPrice = {};
        if (params.priceRange.min > 0) {
          filters.subscriptionPrice.$gte = params.priceRange.min;
        }
        if (params.priceRange.max < 1000) {
          filters.subscriptionPrice.$lte = params.priceRange.max;
        }
      }
    }

    // Фільтр за безкоштовними акаунтами
    if (params.isFree !== undefined) {
      filters.isFree = { $eq: params.isFree };
    }

    // Фільтр за пробними версіями
    if (params.hasTrials !== undefined) {
      filters.hasFreeTrial = { $eq: params.hasTrials };
    }

    // Фільтр за верифікованими акаунтами
    if (params.verified !== undefined) {
      filters.verified = { $eq: params.verified };
    }

    // Фільтр за рекомендованими
    if (params.featured !== undefined) {
      filters.featured = { $eq: params.featured };
    }

    return filters;
  }

  /**
   * Перетворює параметри сортування
   */
  private buildSort(sortBy?: string): string[] {
    switch (sortBy) {
      case 'recent':
        return ['updatedAt:desc'];
      case 'popular':
        return ['stats.subscribers:desc', 'stats.likes:desc'];
      case 'price':
        return ['subscriptionPrice:asc'];
      case 'name':
        return ['name:asc'];
      case 'relevance':
      default:
        return ['featured:desc', 'verified:desc', 'updatedAt:desc'];
    }
  }

  /**
   * Отримання списку створювачів
   */
  async getCreators(params: SearchParams = {}): Promise<CreatorsResponse> {
    const searchParams = new URLSearchParams();

    // Фільтри
    const filters = this.buildFilters(params);
    if (Object.keys(filters).length > 0) {
      searchParams.append('filters', JSON.stringify(filters));
    }

    // Популяція зв'язаних даних
    const populate = [
      'avatar',
      'categories',
      'location',
      'tags',
    ];
    populate.forEach(field => {
      searchParams.append('populate', field);
    });

    // Пагінація
    const page = params.page || 1;
    const pageSize = params.pageSize || 24;
    searchParams.append('pagination[page]', page.toString());
    searchParams.append('pagination[pageSize]', pageSize.toString());

    // Сортування
    const sort = this.buildSort(params.sortBy);
    sort.forEach(sortField => {
      searchParams.append('sort', sortField);
    });

    // Лише опубліковані записи
    searchParams.append('publicationState', 'live');

    const query = searchParams.toString();
    return this.request(`/creators${query ? `?${query}` : ''}`);
  }

  /**
   * Отримання конкретного створювача за slug
   */
  async getCreatorBySlug(slug: string): Promise<CreatorResponse> {
    const searchParams = new URLSearchParams();
    
    // Фільтр за slug
    searchParams.append('filters[slug][$eq]', slug);
    
    // Популяція всіх зв'язаних даних
    const populate = [
      'avatar',
      'coverImage',
      'gallery',
      'categories',
      'location',
      'tags',
    ];
    populate.forEach(field => {
      searchParams.append('populate', field);
    });

    searchParams.append('publicationState', 'live');

    const query = searchParams.toString();
    const response = await this.request<CreatorsResponse>(`/creators?${query}`);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`Creator with slug "${slug}" not found`, {
        cause: { status: 404, endpoint: '/creators', details: { slug } },
      });
    }

    return {
      data: response.data[0],
      meta: response.meta,
    };
  }

  /**
   * Отримання категорій
   */
  async getCategories(): Promise<CategoriesResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('sort', 'name:asc');
    searchParams.append('publicationState', 'live');
    
    return this.request(`/categories?${searchParams.toString()}`);
  }

  /**
   * Отримання локацій
   */
  async getLocations(): Promise<LocationsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('sort', 'country:asc,name:asc');
    searchParams.append('publicationState', 'live');
    
    return this.request(`/locations?${searchParams.toString()}`);
  }

  /**
   * Отримання популярних категорій з кількістю створювачів
   */
  async getPopularCategories(limit = 20): Promise<CategoriesResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('populate', 'creators');
    searchParams.append('pagination[limit]', limit.toString());
    searchParams.append('sort', 'name:asc');
    searchParams.append('publicationState', 'live');
    
    return this.request(`/categories?${searchParams.toString()}`);
  }

  /**
   * Отримання рекомендованих створювачів
   */
  async getFeaturedCreators(limit = 12): Promise<CreatorsResponse> {
    return this.getCreators({
      featured: true,
      sortBy: 'popular',
      pageSize: limit,
    });
  }

  /**
   * Отримання нових створювачів
   */
  async getNewCreators(limit = 12): Promise<CreatorsResponse> {
    return this.getCreators({
      sortBy: 'recent',
      pageSize: limit,
    });
  }

  /**
   * Отримання безкоштовних створювачів
   */
  async getFreeCreators(params: SearchParams = {}): Promise<CreatorsResponse> {
    return this.getCreators({
      ...params,
      isFree: true,
    });
  }

  /**
   * Пошук створювачів за текстом
   */
  async searchCreators(query: string, params: SearchParams = {}): Promise<CreatorsResponse> {
    return this.getCreators({
      ...params,
      query,
      sortBy: 'relevance',
    });
  }

  /**
   * Отримання схожих створювачів
   */
  async getSimilarCreators(creatorId: string, limit = 6): Promise<CreatorsResponse> {
    // Спочатку отримуємо інформацію про поточного створювача
    const creator = await this.getCreatorBySlug(creatorId);
    const categories = creator.data.attributes.categories?.data.map(cat => cat.attributes.slug) || [];
    
    // Шукаємо схожих за категоріями, виключаючи поточного
    const searchParams = new URLSearchParams();
    
    if (categories.length > 0) {
      searchParams.append('filters[categories][slug][$in]', categories.join(','));
    }
    
    searchParams.append('filters[slug][$ne]', creatorId);
    searchParams.append('pagination[limit]', limit.toString());
    searchParams.append('sort', 'featured:desc,verified:desc');
    
    const populate = ['avatar', 'categories', 'location'];
    populate.forEach(field => {
      searchParams.append('populate', field);
    });

    return this.request(`/creators?${searchParams.toString()}`);
  }
}

// Експортуємо єдиний інстанс клієнта
export const strapiClient = new StrapiClient();

// Допоміжні функції для роботи з помилками
export function isAPIError(error: unknown): error is Error & { cause: APIError } {
  return error instanceof Error && 
         typeof error.cause === 'object' && 
         error.cause !== null && 
         'status' in error.cause;
}

export function getErrorMessage(error: unknown): string {
  if (isAPIError(error)) {
    return error.cause.details?.message || error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Сталася невідома помилка';
}

// Експортуємо типи для зручності
export type { CreatorsResponse, CreatorResponse, SearchParams } from '../types/strapi'; 