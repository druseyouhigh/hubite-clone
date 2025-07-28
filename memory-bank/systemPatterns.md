# Системні Паттерни та Архітектура

## Архітектурні Принципи

### 1. Headless Architecture Pattern
```
┌─────────────────┐    API     ┌─────────────────┐
│   Astro (SSG)   │ ◄─────────► │  Strapi (CMS)   │
│   - Static Gen  │   REST/GQL  │  - Content Mgmt │
│   - SEO Ready   │             │  - Admin Panel  │
│   - Fast Load   │             │  - Media Store  │
└─────────────────┘             └─────────────────┘
```

### 2. Data Flow Pattern
```typescript
// Односпрямований потік даних
Strapi CMS → API Response → Astro Build → Static HTML
     ↓              ↓            ↓           ↓
  Content      JSON Data    Components   User View
```

### 3. Component Architecture
```
src/
├── components/
│   ├── ui/           # Базові UI компоненти
│   ├── layout/       # Layout компоненти
│   ├── features/     # Функціональні компоненти
│   └── pages/        # Сторінкові компоненти
├── layouts/          # Astro layouts
├── pages/            # Astro pages (routing)
└── lib/              # Утиліти та API клієнти
```

## Кодингові Стандарти

### TypeScript Configuration
```typescript
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/lib/*": ["src/lib/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

### Naming Conventions
```typescript
// Файли та директорії
CreatorCard.astro          // PascalCase для компонентів
creator-profile.astro      // kebab-case для сторінок
useCreatorData.ts         // camelCase для utilities

// Змінні та функції
const creatorData = {};    // camelCase
const STRAPI_URL = '';     // UPPER_CASE для констант
interface CreatorData {}   // PascalCase для типів
```

### Component Patterns

#### 1. Astro Component Pattern
```astro
---
// src/components/CreatorCard.astro
interface Props {
  creator: Creator;
  showStats?: boolean;
  className?: string;
}

const { creator, showStats = true, className = '' } = Astro.props;
---

<div class={`creator-card ${className}`}>
  <img 
    src={creator.avatar?.url || '/default-avatar.jpg'} 
    alt={creator.name}
    loading="lazy"
  />
  <h3>{creator.name}</h3>
  <p>@{creator.username}</p>
  
  {showStats && (
    <div class="stats">
      <span>{creator.stats.posts} posts</span>
      <span>{creator.stats.photos} photos</span>
    </div>
  )}
</div>

<style>
  .creator-card {
    @apply bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow;
  }
  
  .stats {
    @apply flex gap-4 text-sm text-gray-600 mt-2;
  }
</style>
```

#### 2. API Client Pattern
```typescript
// src/lib/strapi.ts
class StrapiClient {
  private baseURL: string;
  private token: string;
  
  constructor() {
    this.baseURL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
    this.token = import.meta.env.STRAPI_TOKEN || '';
  }
  
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
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  async getCreators(params?: GetCreatorsParams): Promise<CreatorsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, String(value));
      });
    }
    
    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/creators${query ? `?${query}` : ''}`);
  }
}

export const strapiClient = new StrapiClient();
```

#### 3. Type Definitions Pattern
```typescript
// src/types/strapi.ts
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

export interface Creator {
  id: number;
  attributes: {
    name: string;
    username: string;
    bio?: string;
    price?: number;
    isFree: boolean;
    avatar?: StrapiMedia;
    stats: CreatorStats;
    categories: StrapiResponse<Category[]>;
    location: StrapiResponse<Location>;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreatorStats {
  posts: number;
  photos: number;
  videos: number;
}
```

## Performance Patterns

### 1. Image Optimization Pattern
```astro
---
// src/components/OptimizedImage.astro
import { Image } from 'astro:assets';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
}

const { 
  src, 
  alt, 
  width = 300, 
  height = 300, 
  loading = 'lazy',
  className = ''
} = Astro.props;
---

<Image
  src={src}
  alt={alt}
  width={width}
  height={height}
  format="webp"
  loading={loading}
  class={className}
  fallback={{
    format: 'jpg',
    quality: 80
  }}
/>
```

### 2. Caching Pattern
```typescript
// src/lib/cache.ts
class MemoryCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private ttl: number;
  
  constructor(ttlMinutes: number = 15) {
    this.ttl = ttlMinutes * 60 * 1000;
  }
  
  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }
    
    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new MemoryCache(15);
```

### 3. SEO Pattern
```astro
---
// src/components/SEOHead.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const { 
  title, 
  description, 
  image, 
  type = 'website',
  noindex = false 
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const fullTitle = `${title} | Hubite - OnlyFans Directory`;
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

{noindex && <meta name="robots" content="noindex, nofollow" />}

<!-- Open Graph -->
<meta property="og:type" content={type} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:site_name" content="Hubite" />
{image && <meta property="og:image" content={image} />}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
{image && <meta name="twitter:image" content={image} />}

<!-- Structured Data -->
<script type="application/ld+json">
{
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hubite",
    "description": description,
    "url": canonicalURL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${Astro.site}search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  })
}
</script>
```

## Error Handling Patterns

### 1. API Error Handling
```typescript
// src/lib/errorHandler.ts
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function handleAPIRequest<T>(
  request: () => Promise<T>,
  fallback?: T
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    console.error('API Request failed:', error);
    
    if (fallback !== undefined) {
      return fallback;
    }
    
    throw error;
  }
}
```

### 2. Component Error Boundaries
```astro
---
// src/components/ErrorBoundary.astro
interface Props {
  fallback?: string;
  showError?: boolean;
}

const { fallback = 'Щось пішло не так', showError = false } = Astro.props;
---

<div class="error-boundary">
  <slot />
  
  {showError && (
    <div class="error-message">
      <p>{fallback}</p>
      <button onclick="window.location.reload()">
        Спробувати знову
      </button>
    </div>
  )}
</div>

<style>
  .error-message {
    @apply bg-red-50 border border-red-200 rounded-lg p-4 text-center;
  }
  
  .error-message button {
    @apply bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2;
  }
</style>
```

## Testing Patterns

### 1. Component Testing
```typescript
// src/components/__tests__/CreatorCard.test.ts
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import CreatorCard from '../CreatorCard.astro';

const mockCreator = {
  id: 1,
  attributes: {
    name: 'Test Creator',
    username: 'testcreator',
    isFree: true,
    stats: {
      posts: 100,
      photos: 50,
      videos: 10
    }
  }
};

test('renders creator information correctly', async () => {
  const { getByText } = render(
    <CreatorCard creator={mockCreator} />
  );
  
  expect(getByText('Test Creator')).toBeInTheDocument();
  expect(getByText('@testcreator')).toBeInTheDocument();
  expect(getByText('100 posts')).toBeInTheDocument();
});
```

### 2. API Testing
```typescript
// src/lib/__tests__/strapi.test.ts
import { test, expect, vi } from 'vitest';
import { strapiClient } from '../strapi';

// Mock fetch
global.fetch = vi.fn();

test('fetches creators successfully', async () => {
  const mockResponse = {
    data: [mockCreator],
    meta: { pagination: { total: 1 } }
  };
  
  (fetch as any).mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse
  });
  
  const result = await strapiClient.getCreators();
  
  expect(result).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/api/creators'),
    expect.objectContaining({
      headers: expect.objectContaining({
        'Authorization': expect.stringContaining('Bearer')
      })
    })
  );
});
```

## Deployment Patterns

### 1. Environment Configuration
```typescript
// src/lib/config.ts
export const config = {
  strapi: {
    url: import.meta.env.STRAPI_URL || 'http://localhost:1337',
    token: import.meta.env.STRAPI_TOKEN || '',
  },
  site: {
    url: import.meta.env.SITE_URL || 'http://localhost:4321',
    name: 'Hubite',
    description: 'OnlyFans Directory Platform',
  },
  features: {
    analytics: import.meta.env.ENABLE_ANALYTICS === 'true',
    cache: import.meta.env.ENABLE_CACHE !== 'false',
  }
} as const;
```

### 2. Build Optimization
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/admin/')
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'strapi-client': ['src/lib/strapi.ts']
          }
        }
      }
    }
  }
});
```

## Security Patterns

### 1. Input Sanitization
```typescript
// src/lib/sanitize.ts
export function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[<>\"'&]/g, '') // Видаляємо небезпечні символи
    .substring(0, 100); // Обмежуємо довжину
}

export function sanitizeFilters(filters: Record<string, any>): Record<string, any> {
  const allowedFilters = ['category', 'location', 'isFree', 'priceRange'];
  
  return Object.keys(filters)
    .filter(key => allowedFilters.includes(key))
    .reduce((acc, key) => {
      acc[key] = filters[key];
      return acc;
    }, {} as Record<string, any>);
}
```

### 2. Rate Limiting Pattern
```typescript
// src/lib/rateLimit.ts
class RateLimiter {
  private requests = new Map<string, number[]>();
  
  isAllowed(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Видаляємо старі запити
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
}

export const rateLimiter = new RateLimiter();
```

## Інтеграційні Паттерни

### 1. Webhook Handler Pattern
```typescript
// src/api/webhooks/strapi.ts
export async function POST({ request }: { request: Request }) {
  const signature = request.headers.get('x-strapi-signature');
  const body = await request.text();
  
  // Верифікація webhook підпису
  if (!verifyWebhookSignature(body, signature)) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const payload = JSON.parse(body);
  
  // Обробка різних типів подій
  switch (payload.event) {
    case 'entry.create':
      await handleCreatorCreate(payload.entry);
      break;
    case 'entry.update':
      await handleCreatorUpdate(payload.entry);
      break;
    case 'entry.delete':
      await handleCreatorDelete(payload.entry);
      break;
  }
  
  return new Response('OK', { status: 200 });
}
```

Ці паттерни забезпечують надійну, масштабовану та підтримувану архітектуру для Hubite Clone проекту. 