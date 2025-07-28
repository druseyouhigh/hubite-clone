# Технічний Контекст: Astro + Strapi Integration

## Огляд Архітектури

### Технологічний Стек
- **Frontend**: Astro 4.x
- **Backend**: Strapi 5.x (Headless CMS)
- **Стилізація**: Tailwind CSS
- **База даних**: PostgreSQL/MySQL (для Strapi)
- **Хостинг**: Vercel (Astro) + Railway/Heroku (Strapi)

## Astro Framework

### Ключові Переваги
```typescript
// astro.config.mjs - Основна конфігурація
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static', // Для SEO оптимізації
  site: 'https://your-domain.com',
});
```

### Content Collections
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const creatorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    username: z.string(),
    category: z.array(z.string()),
    location: z.string(),
    price: z.number().optional(),
    isFree: z.boolean(),
    stats: z.object({
      posts: z.number(),
      photos: z.number(),
      videos: z.number(),
    }),
  }),
});

export const collections = {
  creators: creatorsCollection,
};
```

### SSG та Performance
- **Island Architecture**: Мінімальний JavaScript
- **Static Generation**: Швидкі завантаження
- **Image Optimization**: Вбудована оптимізація зображень
- **SEO**: Мета-теги та structured data

## Strapi CMS Configuration

### Content Types Schema

#### 1. Creators Content Type
```json
{
  "kind": "collectionType",
  "collectionName": "creators",
  "info": {
    "singularName": "creator",
    "pluralName": "creators",
    "displayName": "Creator",
    "description": "OnlyFans creators profiles"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "username": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "bio": {
      "type": "richtext"
    },
    "avatar": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "price": {
      "type": "decimal"
    },
    "isFree": {
      "type": "boolean",
      "default": false
    },
    "stats": {
      "type": "component",
      "repeatable": false,
      "component": "stats.creator-stats"
    },
    "categories": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::category.category",
      "mappedBy": "creators"
    },
    "location": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::location.location",
      "inversedBy": "creators"
    }
  }
}
```

#### 2. Categories Content Type
```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "description": {
      "type": "text"
    },
    "icon": {
      "type": "string"
    },
    "creators": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::creator.creator",
      "inversedBy": "categories"
    }
  }
}
```

### API Configuration

#### REST API Endpoints
```javascript
// config/api.js
module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};
```

#### GraphQL Setup
```bash
# Встановлення GraphQL плагіну
npm install @strapi/plugin-graphql
```

```javascript
// config/plugins.js
module.exports = {
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
    },
  },
};
```

## API Integration Patterns

### Astro Data Fetching
```typescript
// src/lib/strapi.ts
const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

export async function fetchCreators(params?: {
  filters?: object;
  populate?: string[];
  pagination?: { page: number; pageSize: number };
  sort?: string[];
}) {
  const url = new URL(`${STRAPI_URL}/api/creators`);
  
  if (params?.filters) {
    url.searchParams.append('filters', JSON.stringify(params.filters));
  }
  
  if (params?.populate) {
    params.populate.forEach(field => {
      url.searchParams.append('populate', field);
    });
  }
  
  if (params?.pagination) {
    url.searchParams.append('pagination[page]', params.pagination.page.toString());
    url.searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
  }
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch creators: ${response.statusText}`);
  }
  
  return response.json();
}
```

### GraphQL Queries
```typescript
// src/lib/graphql.ts
export const GET_CREATORS = `
  query GetCreators($filters: CreatorFiltersInput, $pagination: PaginationArg, $sort: [String]) {
    creators(filters: $filters, pagination: $pagination, sort: $sort) {
      data {
        id
        attributes {
          name
          username
          bio
          price
          isFree
          avatar {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          categories {
            data {
              attributes {
                name
                slug
              }
            }
          }
          location {
            data {
              attributes {
                name
                country
              }
            }
          }
          stats {
            posts
            photos
            videos
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

export async function queryGraphQL(query: string, variables?: object) {
  const response = await fetch(`${STRAPI_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  
  return response.json();
}
```

## Performance Optimization

### Caching Strategy
```typescript
// src/lib/cache.ts
const CACHE_DURATION = 1000 * 60 * 15; // 15 хвилин

class APICache {
  private cache = new Map();
  
  async get(key: string, fetcher: () => Promise<any>) {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
    
    return data;
  }
}

export const apiCache = new APICache();
```

### Image Optimization
```astro
---
// src/components/CreatorCard.astro
import { Image } from 'astro:assets';

interface Props {
  creator: Creator;
}

const { creator } = Astro.props;
---

<div class="creator-card">
  <Image
    src={creator.avatar?.url || '/default-avatar.jpg'}
    alt={creator.avatar?.alternativeText || creator.name}
    width={300}
    height={300}
    format="webp"
    loading="lazy"
  />
  <h3>{creator.name}</h3>
  <p>@{creator.username}</p>
</div>
```

## SEO та Metadata

### Dynamic Meta Tags
```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

const { title, description, image, type = 'website' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />
  
  <!-- Open Graph -->
  <meta property="og:type" content={type} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalURL} />
  {image && <meta property="og:image" content={image} />}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {image && <meta name="twitter:image" content={image} />}
</head>
<body>
  <slot />
</body>
</html>
```

## Deployment та DevOps

### Environment Variables
```bash
# .env
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-api-token
DATABASE_URL=postgresql://user:password@localhost:5432/hubite
```

### Build Configuration
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
``` 