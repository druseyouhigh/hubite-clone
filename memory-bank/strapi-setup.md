# Strapi CMS Setup Guide

## 📋 **Overview**
Налаштування Strapi CMS для Hubite проекту з створенням content types для OnlyFans creators directory.

## 🚀 **Installation Status**
- ✅ Strapi проект створено (`hubite-strapi`)
- ✅ Dependencies встановлено
- 🔄 Strapi запущено в режимі розробки
- ⏳ Очікується завершення ініціалізації

## 🔧 **Next Steps**

### **1. Admin Panel Setup**
1. Відкрити http://localhost:1337/admin
2. Створити першого адмін користувача:
   - **First name**: Admin
   - **Last name**: User
   - **Email**: admin@hubite.local
   - **Password**: (secure password)

### **2. Content Types to Create**

#### **Creator Model**
```javascript
{
  name: "String (required)",
  username: "String (unique, required)",
  email: "Email (unique)",
  bio: "Rich Text",
  avatar: "Media (single)",
  cover: "Media (single)",
  price: "Decimal",
  isFree: "Boolean (default: false)",
  isVerified: "Boolean (default: false)",
  isFeatured: "Boolean (default: false)",
  socialLinks: {
    onlyfans: "String",
    instagram: "String",
    twitter: "String",
    tiktok: "String",
    telegram: "String"
  },
  stats: {
    posts: "Integer (default: 0)",
    photos: "Integer (default: 0)",
    videos: "Integer (default: 0)",
    subscribers: "Integer (default: 0)"
  },
  categories: "Relation (many-to-many with Category)",
  location: "Relation (many-to-one with Location)",
  tags: "Relation (many-to-many with Tag)"
}
```

#### **Category Model**
```javascript
{
  name: "String (required, unique)",
  slug: "UID (from name)",
  description: "Text",
  icon: "String",
  color: "String",
  isPopular: "Boolean (default: false)",
  creators: "Relation (many-to-many with Creator)"
}
```

#### **Location Model**
```javascript
{
  country: "String (required)",
  countryCode: "String (2 chars)",
  city: "String",
  region: "String",
  flag: "String (emoji)",
  creators: "Relation (one-to-many with Creator)"
}
```

#### **Tag Model**
```javascript
{
  name: "String (required, unique)",
  slug: "UID (from name)",
  color: "String",
  creators: "Relation (many-to-many with Creator)"
}
```

### **3. API Configuration**
1. **Permissions**:
   - Public role: `find`, `findOne` for all content types
   - Authenticated role: full access (for admin)

2. **CORS Settings**:
   ```javascript
   // config/middlewares.js
   {
     name: 'strapi::cors',
     config: {
       origin: ['http://localhost:4321', 'https://yourdomain.com'],
       methods: ['GET', 'POST', 'PUT', 'DELETE'],
       headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
     },
   }
   ```

### **4. Sample Data Structure**
```javascript
// Example Creator entry
{
  "name": "Emma Rose",
  "username": "emmarose_official",
  "bio": "Content creator and model from California",
  "price": 9.99,
  "isFree": false,
  "isVerified": true,
  "isFeatured": true,
  "socialLinks": {
    "onlyfans": "https://onlyfans.com/emmarose_official",
    "instagram": "@emmarose_official",
    "twitter": "@emmarose_official"
  },
  "stats": {
    "posts": 245,
    "photos": 180,
    "videos": 65,
    "subscribers": 12500
  },
  "categories": ["Lifestyle", "Fashion"],
  "location": {
    "country": "United States",
    "city": "Los Angeles",
    "region": "California"
  }
}
```

## 🔗 **Integration with Frontend**

### **Environment Variables**
```bash
# hubite-clone/.env
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-api-token-here
```

### **API Endpoints**
- **Creators**: `GET /api/creators?populate=*`
- **Categories**: `GET /api/categories?populate=*`
- **Locations**: `GET /api/locations?populate=*`
- **Search**: `GET /api/creators?filters[name][$containsi]=query`

## 📝 **TODO**
- [ ] Створити адмін акаунт
- [ ] Налаштувати Content Types
- [ ] Додати sample data
- [ ] Налаштувати API permissions
- [ ] Інтегрувати з frontend
- [ ] Налаштувати production environment 