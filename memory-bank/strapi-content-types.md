# Strapi Content Types - Створення моделей

## 📋 **Порядок створення Content Types**

### **1. Category (Категорії)**
**Шлях**: Content-Type Builder → Create new collection type → Category

**Поля**:
```
name: Text (required, unique)
slug: UID (from name, required)
description: Rich Text
icon: Text (emoji або CSS class)
color: Text (hex color)
isPopular: Boolean (default: false)
```

**Налаштування**:
- Display name: Categories
- API ID: categories
- Draft & publish: Enabled

---

### **2. Location (Локації)**
**Шлях**: Content-Type Builder → Create new collection type → Location

**Поля**:
```
country: Text (required)
countryCode: Text (max length: 2)
city: Text
region: Text
flag: Text (emoji)
```

**Налаштування**:
- Display name: Locations
- API ID: locations
- Draft & publish: Enabled

---

### **3. Tag (Теги)**
**Шлях**: Content-Type Builder → Create new collection type → Tag

**Поля**:
```
name: Text (required, unique)
slug: UID (from name, required)
color: Text (hex color)
```

**Налаштування**:
- Display name: Tags
- API ID: tags
- Draft & publish: Enabled

---

### **4. Creator (Головна модель)**
**Шлях**: Content-Type Builder → Create new collection type → Creator

**Основні поля**:
```
name: Text (required)
username: Text (required, unique)
email: Email (unique)
bio: Rich Text
avatar: Media (single image)
cover: Media (single image)
price: Decimal (min: 0)
isFree: Boolean (default: false)
isVerified: Boolean (default: false)
isFeatured: Boolean (default: false)
```

**Соціальні мережі (Component: socialLinks)**:
```
onlyfans: Text
instagram: Text
twitter: Text
tiktok: Text
telegram: Text
```

**Статистика (Component: stats)**:
```
posts: Integer (default: 0)
photos: Integer (default: 0)
videos: Integer (default: 0)
subscribers: Integer (default: 0)
```

**Зв'язки (Relations)**:
```
categories: Many-to-many with Category
location: Many-to-one with Location
tags: Many-to-many with Tag
```

**Налаштування**:
- Display name: Creators
- API ID: creators
- Draft & publish: Enabled

---

## 🔧 **Покрокова інструкція**

### **Крок 1: Створення Category**
1. Перейти до Content-Type Builder
2. Натиснути "Create new collection type"
3. Ввести "Category" як Display name
4. Додати поля згідно списку вище
5. Зберегти та перезапустити сервер

### **Крок 2: Створення Location**
1. Повторити процес для Location
2. Додати всі необхідні поля
3. Зберегти

### **Крок 3: Створення Tag**
1. Створити Tag collection type
2. Додати поля name, slug, color
3. Зберегти

### **Крок 4: Створення Components**
Перед створенням Creator, потрібно створити компоненти:

**socialLinks Component**:
1. Content-Type Builder → Create new component
2. Category: "creator"
3. Name: "socialLinks"
4. Додати поля для соціальних мереж

**stats Component**:
1. Create new component
2. Category: "creator"
3. Name: "stats"
4. Додати числові поля

### **Крок 5: Створення Creator**
1. Створити Creator collection type
2. Додати всі основні поля
3. Додати компоненти socialLinks та stats
4. Налаштувати зв'язки з іншими моделями
5. Зберегти та перезапустити

---

## 📝 **Тестові дані**

### **Categories**:
```json
[
  {"name": "Lifestyle", "icon": "🌟", "color": "#FF6B6B", "isPopular": true},
  {"name": "Fashion", "icon": "👗", "color": "#4ECDC4", "isPopular": true},
  {"name": "Fitness", "icon": "💪", "color": "#45B7D1", "isPopular": true},
  {"name": "Gaming", "icon": "🎮", "color": "#96CEB4", "isPopular": false},
  {"name": "Art", "icon": "🎨", "color": "#FFEAA7", "isPopular": false}
]
```

### **Locations**:
```json
[
  {"country": "United States", "countryCode": "US", "city": "Los Angeles", "region": "California", "flag": "🇺🇸"},
  {"country": "United Kingdom", "countryCode": "GB", "city": "London", "region": "England", "flag": "🇬🇧"},
  {"country": "Canada", "countryCode": "CA", "city": "Toronto", "region": "Ontario", "flag": "🇨🇦"},
  {"country": "Australia", "countryCode": "AU", "city": "Sydney", "region": "New South Wales", "flag": "🇦🇺"}
]
```

### **Tags**:
```json
[
  {"name": "Premium", "color": "#FFD700"},
  {"name": "New", "color": "#00FF00"},
  {"name": "Popular", "color": "#FF1493"},
  {"name": "Exclusive", "color": "#9370DB"}
]
```

---

## ⚡ **Після створення**

1. **Перезапустити Strapi сервер**
2. **Налаштувати Permissions**:
   - Settings → Users & Permissions Plugin → Roles → Public
   - Дозволити `find` та `findOne` для всіх content types
3. **Додати тестові дані** через Content Manager
4. **Перевірити API endpoints**:
   - `GET /api/categories`
   - `GET /api/locations`
   - `GET /api/tags`
   - `GET /api/creators?populate=*` 