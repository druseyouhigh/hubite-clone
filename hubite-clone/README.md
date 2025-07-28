# Hubite Clone - OnlyFans Directory Platform

Повнофункціональна веб-платформа для пошуку та каталогізації OnlyFans акаунтів, створена на базі **Astro** (фронтенд) та **Strapi** (бекенд CMS).

## 🚀 Особливості

- **Швидкий пошук та фільтрація** створювачів за різними критеріями
- **Категоризація** за типом контенту, локацією, ціною
- **Верифіковані профілі** з детальною статистикою
- **SEO-оптимізований** для пошукових систем
- **Адаптивний дизайн** для всіх пристроїв
- **Безкоштовні акаунти** та пробні версії

## 🛠 Технологічний стек

### Frontend
- **Astro 4.x** - Static Site Generator
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Astro Components** - Component architecture

### Backend
- **Strapi 5.x** - Headless CMS
- **PostgreSQL/MySQL** - Database
- **GraphQL/REST API** - Data fetching

## 📁 Структура проекту

```text
hubite-clone/
├── src/
│   ├── components/          # Astro компоненти
│   │   └── CreatorCard.astro
│   ├── layouts/            # Layout компоненти
│   │   └── Layout.astro
│   ├── pages/              # Сторінки (роутинг)
│   │   └── index.astro
│   ├── lib/                # Утиліти та API клієнти
│   │   └── strapi.ts
│   ├── types/              # TypeScript типи
│   │   └── strapi.ts
│   └── styles/             # Стилі
│       └── global.css
├── public/                 # Статичні файли
├── memory-bank/           # Документація проекту
└── package.json
```

## 🚀 Швидкий старт

### 1. Клонування та встановлення

```bash
# Перейти в директорію проекту
cd hubite-clone

# Встановити залежності
npm install
```

### 2. Налаштування environment variables

```bash
# Скопіювати приклад файлу
cp env.example .env

# Відредагувати .env файл
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_api_token
SITE_URL=http://localhost:4321
```

### 3. Запуск розробки

```bash
# Запустити dev сервер
npm run dev

# Сайт буде доступний на http://localhost:4321
```

## 🧞 Команди

| Команда                   | Дія                                              |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Встановлення залежностей                         |
| `npm run dev`             | Запуск dev сервера на `localhost:4321`          |
| `npm run build`           | Збірка production версії в `./dist/`             |
| `npm run preview`         | Попередній перегляд збірки                       |
| `npm run astro ...`       | Запуск Astro CLI команд                          |
| `npm run astro -- --help` | Допомога по Astro CLI                            |

## 📊 API та типи даних

### Основні моделі

#### Creator (Створювач)
```typescript
interface CreatorAttributes {
  name: string;
  username: string;
  bio?: string;
  subscriptionPrice?: number;
  isFree: boolean;
  verified: boolean;
  stats: CreatorStats;
  categories?: Category[];
  location?: Location;
}
```

#### Пошук та фільтрація
```typescript
interface SearchParams {
  query?: string;
  categories?: string[];
  location?: string;
  priceRange?: { min: number; max: number };
  isFree?: boolean;
  verified?: boolean;
  sortBy?: 'relevance' | 'recent' | 'popular' | 'price';
}
```

## 🎨 Дизайн-система

### Кольори
- **Primary**: Pink (#EC4899) - Основний колір
- **Secondary**: Purple (#8B5CF6) - Додатковий колір
- **Success**: Green (#10B981) - Безкоштовні акаунти
- **Warning**: Yellow (#F59E0B) - Рекомендовані

### Компоненти
- **CreatorCard** - Карточка створювача
- **SearchBar** - Пошукова панель
- **CategoryGrid** - Сітка категорій
- **Layout** - Базовий layout з header/footer

## 🔧 Налаштування Strapi

### Content Types

#### Creators
- name (Text)
- username (Text, unique)
- bio (Rich Text)
- avatar (Media)
- subscriptionPrice (Number)
- isFree (Boolean)
- verified (Boolean)
- stats (Component)
- categories (Relation)
- location (Relation)

#### Categories
- name (Text)
- slug (Text, unique)
- description (Text)
- icon (Text)
- isAdult (Boolean)

#### Locations
- name (Text)
- country (Text)
- countryCode (Text)
- city (Text)

## 🚀 Деплой

### Frontend (Vercel)
```bash
# Збірка проекту
npm run build

# Деплой на Vercel
vercel --prod
```

### Backend (Railway/Heroku)
```bash
# Налаштування Strapi для production
NODE_ENV=production
DATABASE_URL=your_database_url
STRAPI_ADMIN_JWT_SECRET=your_jwt_secret
```

## 📈 SEO оптимізація

- **Meta tags** для всіх сторінок
- **Open Graph** та Twitter Cards
- **Structured Data** (Schema.org)
- **Sitemap** автогенерація
- **Canonical URLs**
- **Image optimization**

## 🔒 Безпека

- **HTTPS** обов'язково для production
- **Rate limiting** для API
- **Input sanitization**
- **CORS** налаштування
- **Environment variables** для секретів

## 📚 Документація

Детальна документація проекту знаходиться в папці `memory-bank/`:

- `projectbrief.md` - Загальний огляд проекту
- `techContext.md` - Технічна документація
- `systemPatterns.md` - Архітектурні паттерни
- `productContext.md` - Бізнес вимоги
- `tasks.md` - План розробки
- `progress.md` - Прогрес виконання

## 🤝 Внесок у проект

1. Fork репозиторій
2. Створіть feature branch (`git checkout -b feature/amazing-feature`)
3. Commit зміни (`git commit -m 'Add amazing feature'`)
4. Push до branch (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

Цей проект ліцензовано під MIT License.

## ⚠️ Застереження

Цей проект призначений виключно для освітніх цілей. Весь контент повинен відповідати законодавству вашої країни та бути призначеним для осіб старше 18 років.

---

**Створено з ❤️ для навчання веб-розробки**
