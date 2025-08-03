/**
 * Internationalization system for Hubite Clone
 * Currently supports English only, but designed for easy expansion
 */

// Supported locales
export const LOCALES = {
  en: 'English',
  es: 'Español',
} as const;

export type Locale = keyof typeof LOCALES;
export const DEFAULT_LOCALE: Locale = 'en';

// Current locale (dynamic based on localStorage or default)
export function getCurrentLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('hubite-locale') as Locale;
    if (stored && stored in LOCALES) {
      return stored;
    }
  }
  return DEFAULT_LOCALE;
}

export const currentLocale: Locale = getCurrentLocale();

/**
 * Translation interface for type safety
 */
export interface Translations {
  // Common translations
  common: {
    search: string;
    categories: string;
    locations: string;
    free: string;
    featured: string;
    verified: string;
    posts: string;
    photos: string;
    videos: string;
    subscribers: string;
    price: string;
    trial: string;
    viewProfile: string;
    loadMore: string;
    sortBy: string;
    filterBy: string;
    showAll: string;
    currency: string;
  };
  
  // Navigation
  nav: {
    home: string;
    freeOnlyFans: string;
    categories: string;
    locations: string;
    about: string;
    contact: string;
  };
  
  // Homepage
  home: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    featuredCreators: string;
    popularCategories: string;
    stats: {
      creators: string;
      freeProfiles: string;
      verified: string;
      updates: string;
    };
    cta: {
      title: string;
      subtitle: string;
      browseCategories: string;
      freeAccounts: string;
    };
  };
  
  // Free OnlyFans page
  freeOnlyFans: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    benefits: {
      title: string;
      subtitle: string;
      noCost: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      instant: {
        title: string;
        description: string;
      };
    };
    faq: {
      title: string;
      reallyFree: {
        question: string;
        answer: string;
      };
      howOften: {
        question: string;
        answer: string;
      };
      canBecomePaid: {
        question: string;
        answer: string;
      };
    };
  };
  
  // Creator profile
  creator: {
    stats: string;
    biography: string;
    socialLinks: string;
    categories: string;
    location: string;
    joinedDate: string;
    lastActive: string;
    similarCreators: string;
  };
  
  // Sorting and filtering
  sorting: {
    relevance: string;
    recent: string;
    popular: string;
    price: string;
    name: string;
  };
  
  // SEO and meta
  seo: {
    defaultDescription: string;
    homeDescription: string;
    freeOnlyFansDescription: string;
  };
  
  // Components
  components: {
    creatorCard: {
      free: string;
      verified: string;
      posts: string;
      photos: string;
      videos: string;
      subscribers: string;
      viewProfile: string;
    };
    categoryCard: {
      creators: string;
      explore: string;
    };
    locationCard: {
      creators: string;
      explore: string;
    };
  };
  
  // Pages
  pages: {
    categories: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      allCategories: string;
      popularCategories: string;
      sortBy: string;
      filterBy: string;
      searchResults: string;
      searchFor: string;
      foundResults: string;
      noResults: string;
    };
    locations: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      allLocations: string;
      sortBy: string;
      searchResults: string;
      searchFor: string;
      foundResults: string;
    };
    index: {
      searchResults: string;
      searchFor: string;
      foundCreators: string;
      creator: string;
      creators: string;
    };
  };
  
  // Errors and messages
  errors: {
    loadingError: string;
    noResults: string;
    tryAgain: string;
    unknownError: string;
    dataLoadingError: string;
  };
  
  // Forms
  forms: {
    search: string;
    clear: string;
    apply: string;
    cancel: string;
  };
  
  // Footer
  footer: {
    quickLinks: string;
    legalSupport: string;
    privacyPolicy: string;
    termsOfService: string;
    dmcaPolicy: string;
    contactUs: string;
    allRightsReserved: string;
    adultContent: string;
    disclaimer: string;
  };
}

/**
 * English translations (default)
 */
export const translations: Record<Locale, Translations> = {
  en: {
    common: {
      search: 'Search',
      categories: 'Categories',
      locations: 'Locations',
      free: 'Free',
      featured: 'Featured',
      verified: 'Verified',
      posts: 'posts',
      photos: 'photos',
      videos: 'videos',
      subscribers: 'subscribers',
      price: 'Price',
      trial: 'Free Trial',
      viewProfile: 'View Profile',
      loadMore: 'Load More',
      sortBy: 'Sort by',
      filterBy: 'Filter by',
      showAll: 'Show All',
      currency: '$',
    },
    
    nav: {
      home: 'Home',
      freeOnlyFans: '💸 Free OnlyFans',
      categories: 'Categories',
      locations: 'Locations',
      about: 'About',
      contact: 'Contact',
    },
    
    home: {
      title: 'Find the Best OnlyFans Creators',
      subtitle: 'Discover thousands of verified profiles, free accounts, and exclusive content from the best creators worldwide.',
      searchPlaceholder: 'Search by name, username, TikTok, Instagram...',
      featuredCreators: '⭐ Featured Creators',
      popularCategories: 'Popular Categories',
      stats: {
        creators: 'Creators',
        freeProfiles: 'Free',
        verified: 'Verified',
        updates: '24/7',
      },
      cta: {
        title: 'Ready to Start?',
        subtitle: 'Join thousands of users who have already found their favorite creators on Hubite',
        browseCategories: 'Browse Categories',
        freeAccounts: 'Free Accounts',
      },
    },
    
    freeOnlyFans: {
      title: '💸 Free OnlyFans Accounts',
      subtitle: 'Discover free profiles with quality content. No subscription, no hidden fees.',
      searchPlaceholder: 'Search among free accounts...',
      benefits: {
        title: 'Why Choose Free Accounts?',
        subtitle: 'Benefits of free OnlyFans profiles',
        noCost: {
          title: 'No Cost',
          description: 'Completely free access to content without any subscriptions or payments.',
        },
        quality: {
          title: 'Quality Content',
          description: 'High-quality photos, videos, and posts from talented creators.',
        },
        instant: {
          title: 'Instant Access',
          description: 'Immediate access to profiles without waiting or approval.',
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        reallyFree: {
          question: 'Are all accounts really free?',
          answer: 'Yes, all profiles in this section are completely free. Creators provide content without any subscriptions or payments.',
        },
        howOften: {
          question: 'How often are new free profiles added?',
          answer: 'We add new free profiles daily. Our team constantly searches for new creators who offer quality free content.',
        },
        canBecomePaid: {
          question: 'Can free accounts become paid?',
          answer: 'Yes, creators can change their monetization model. We regularly update profile status and remove those that have become paid.',
        },
      },
    },
    
    creator: {
      stats: 'Statistics',
      biography: 'Biography',
      socialLinks: 'Social Links',
      categories: 'Categories',
      location: 'Location',
      joinedDate: 'Joined',
      lastActive: 'Last Active',
      similarCreators: 'Similar Creators',
    },
    
    sorting: {
      relevance: 'Relevance',
      recent: 'Recently Added',
      popular: 'Popular',
      price: 'Price',
      name: 'Name',
    },
    
    seo: {
      defaultDescription: 'Hubite - OnlyFans creators directory. Find the best creators by categories, location, and other criteria.',
      homeDescription: 'Find the best OnlyFans creators from around the world. Free accounts, exclusive content, and verified profiles.',
      freeOnlyFansDescription: 'Find the best free OnlyFans accounts. Quality content without subscription from verified creators worldwide.',
    },
    
    components: {
      creatorCard: {
        free: 'Free',
        verified: 'Verified',
        posts: 'posts',
        photos: 'photos',
        videos: 'videos',
        subscribers: 'subscribers',
        viewProfile: 'View Profile',
      },
      categoryCard: {
        creators: 'creators',
        explore: 'Explore',
      },
      locationCard: {
        creators: 'creators',
        explore: 'Explore',
      },
    },
    
    pages: {
      categories: {
        title: 'All Categories',
        subtitle: 'Browse all creator categories and find your perfect match',
        searchPlaceholder: 'Search categories...',
        allCategories: 'All Categories',
        popularCategories: 'Popular Categories',
        sortBy: 'Sort by',
        filterBy: 'Filter by',
        searchResults: 'Search Results',
        searchFor: 'Search for',
        foundResults: 'Found {count} categories',
        noResults: 'No categories found',
      },
      locations: {
        title: 'All Locations',
        subtitle: 'Discover creators from around the world',
        searchPlaceholder: 'Search locations...',
        allLocations: 'All Locations',
        sortBy: 'Sort by',
        searchResults: 'Search Results',
        searchFor: 'Search for',
        foundResults: 'Found {count} locations',
      },
      index: {
        searchResults: 'Search Results',
        searchFor: 'Search for',
        foundCreators: 'Found {count} {type}',
        creator: 'creator',
        creators: 'creators',
      },
    },
    
    errors: {
      loadingError: 'Error loading data',
      noResults: 'No results found',
      tryAgain: 'Try again',
      unknownError: 'Unknown error',
      dataLoadingError: 'Error loading data: {error}',
    },
    
    forms: {
      search: 'Search',
      clear: 'Clear',
      apply: 'Apply',
      cancel: 'Cancel',
    },
    
    footer: {
      quickLinks: 'Quick Links',
      legalSupport: 'Legal & Support',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      dmcaPolicy: 'DMCA Policy',
      contactUs: 'Contact Us',
      allRightsReserved: 'All rights reserved.',
      adultContent: 'This website contains adult content and is intended for users 18 years and older.',
      disclaimer: 'We are not affiliated with OnlyFans. All trademarks belong to their respective owners.',
    },
  },
  
  // Spanish translations
  es: {
    common: {
      search: 'Buscar',
      categories: 'Categorías',
      locations: 'Ubicaciones',
      free: 'Gratis',
      featured: 'Destacado',
      verified: 'Verificado',
      posts: 'publicaciones',
      photos: 'fotos',
      videos: 'videos',
      subscribers: 'suscriptores',
      price: 'Precio',
      trial: 'Prueba Gratis',
      viewProfile: 'Ver Perfil',
      loadMore: 'Cargar Más',
      sortBy: 'Ordenar por',
      filterBy: 'Filtrar por',
      showAll: 'Mostrar Todo',
      currency: '$',
    },
    
    nav: {
      home: 'Inicio',
      freeOnlyFans: '💸 OnlyFans Gratis',
      categories: 'Categorías',
      locations: 'Ubicaciones',
      about: 'Acerca de',
      contact: 'Contacto',
    },
    
    home: {
      title: 'Encuentra los Mejores Creadores de OnlyFans',
      subtitle: 'Descubre miles de perfiles verificados, cuentas gratuitas y contenido exclusivo de los mejores creadores del mundo.',
      searchPlaceholder: 'Buscar por nombre, usuario, TikTok, Instagram...',
      featuredCreators: '⭐ Creadores Destacados',
      popularCategories: 'Categorías Populares',
      stats: {
        creators: 'Creadores',
        freeProfiles: 'Gratis',
        verified: 'Verificados',
        updates: '24/7',
      },
      cta: {
        title: '¿Listo para Comenzar?',
        subtitle: 'Únete a miles de usuarios que ya han encontrado sus creadores favoritos en Hubite',
        browseCategories: 'Explorar Categorías',
        freeAccounts: 'Cuentas Gratuitas',
      },
    },
    
    freeOnlyFans: {
      title: '💸 Cuentas Gratuitas de OnlyFans',
      subtitle: 'Descubre perfiles gratuitos con contenido de calidad. Sin suscripción, sin tarifas ocultas.',
      searchPlaceholder: 'Buscar entre cuentas gratuitas...',
      benefits: {
        title: '¿Por Qué Elegir Cuentas Gratuitas?',
        subtitle: 'Beneficios de los perfiles gratuitos de OnlyFans',
        noCost: {
          title: 'Sin Costo',
          description: 'Acceso completamente gratuito al contenido sin suscripciones ni pagos.',
        },
        quality: {
          title: 'Contenido de Calidad',
          description: 'Fotos, videos y publicaciones de alta calidad de creadores talentosos.',
        },
        instant: {
          title: 'Acceso Instantáneo',
          description: 'Acceso inmediato a perfiles sin espera ni aprobación.',
        },
      },
      faq: {
        title: 'Preguntas Frecuentes',
        reallyFree: {
          question: '¿Todas las cuentas son realmente gratuitas?',
          answer: 'Sí, todos los perfiles en esta sección son completamente gratuitos. Los creadores proporcionan contenido sin suscripciones ni pagos.',
        },
        howOften: {
          question: '¿Con qué frecuencia se agregan nuevos perfiles gratuitos?',
          answer: 'Agregamos nuevos perfiles gratuitos diariamente. Nuestro equipo busca constantemente nuevos creadores que ofrecen contenido gratuito de calidad.',
        },
        canBecomePaid: {
          question: '¿Pueden las cuentas gratuitas volverse de pago?',
          answer: 'Sí, los creadores pueden cambiar su modelo de monetización. Actualizamos regularmente el estado de los perfiles y eliminamos aquellos que se han vuelto de pago.',
        },
      },
    },
    
    creator: {
      stats: 'Estadísticas',
      biography: 'Biografía',
      socialLinks: 'Enlaces Sociales',
      categories: 'Categorías',
      location: 'Ubicación',
      joinedDate: 'Se Unió',
      lastActive: 'Última Actividad',
      similarCreators: 'Creadores Similares',
    },
    
    sorting: {
      relevance: 'Relevancia',
      recent: 'Agregado Recientemente',
      popular: 'Popular',
      price: 'Precio',
      name: 'Nombre',
    },
    
    seo: {
      defaultDescription: 'Hubite - Directorio de creadores de OnlyFans. Encuentra los mejores creadores por categorías, ubicación y otros criterios.',
      homeDescription: 'Encuentra los mejores creadores de OnlyFans de todo el mundo. Cuentas gratuitas, contenido exclusivo y perfiles verificados.',
      freeOnlyFansDescription: 'Encuentra las mejores cuentas gratuitas de OnlyFans. Contenido de calidad sin suscripción de creadores verificados de todo el mundo.',
    },
    
    components: {
      creatorCard: {
        free: 'Gratis',
        verified: 'Verificado',
        posts: 'publicaciones',
        photos: 'fotos',
        videos: 'videos',
        subscribers: 'suscriptores',
        viewProfile: 'Ver Perfil',
      },
      categoryCard: {
        creators: 'creadores',
        explore: 'Explorar',
      },
      locationCard: {
        creators: 'creadores',
        explore: 'Explorar',
      },
    },
    
    pages: {
      categories: {
        title: 'Todas las Categorías',
        subtitle: 'Explora todas las categorías de creadores y encuentra tu pareja perfecta',
        searchPlaceholder: 'Buscar categorías...',
        allCategories: 'Todas las Categorías',
        popularCategories: 'Categorías Populares',
        sortBy: 'Ordenar por',
        filterBy: 'Filtrar por',
        searchResults: 'Resultados de Búsqueda',
        searchFor: 'Buscar',
        foundResults: 'Se encontraron {count} categorías',
        noResults: 'No se encontraron categorías',
      },
      locations: {
        title: 'Todas las Ubicaciones',
        subtitle: 'Descubre creadores de todo el mundo',
        searchPlaceholder: 'Buscar ubicaciones...',
        allLocations: 'Todas las Ubicaciones',
        sortBy: 'Ordenar por',
        searchResults: 'Resultados de Búsqueda',
        searchFor: 'Buscar',
        foundResults: 'Se encontraron {count} ubicaciones',
      },
      index: {
        searchResults: 'Resultados de Búsqueda',
        searchFor: 'Buscar',
        foundCreators: 'Se encontraron {count} {type}',
        creator: 'creador',
        creators: 'creadores',
      },
    },
    
    errors: {
      loadingError: 'Error al cargar datos',
      noResults: 'No se encontraron resultados',
      tryAgain: 'Intentar de nuevo',
      unknownError: 'Error desconocido',
      dataLoadingError: 'Error al cargar datos: {error}',
    },
    
    forms: {
      search: 'Buscar',
      clear: 'Limpiar',
      apply: 'Aplicar',
      cancel: 'Cancelar',
    },
    
    footer: {
      quickLinks: 'Enlaces Rápidos',
      legalSupport: 'Legal y Soporte',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      dmcaPolicy: 'Política DMCA',
      contactUs: 'Contáctanos',
      allRightsReserved: 'Todos los derechos reservados.',
      adultContent: 'Este sitio web contiene contenido para adultos y está destinado a usuarios de 18 años en adelante.',
      disclaimer: 'No estamos afiliados con OnlyFans. Todas las marcas comerciales pertenecen a sus respectivos propietarios.',
    },
  },
};

/**
 * Get translation by key with type safety
 */
export function t(key: string, locale?: Locale): string {
  const currentLoc = locale || getCurrentLocale();
  const keys = key.split('.');
  let value: any = translations[currentLoc];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found in current locale
      if (currentLoc !== 'en') {
        const fallbackValue = translations.en;
        let fallback: any = fallbackValue;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            fallback = null;
            break;
          }
        }
        if (typeof fallback === 'string') {
          console.warn(`Translation key "${key}" not found for locale "${currentLoc}", using English fallback`);
          return fallback;
        }
      }
      console.warn(`Translation key "${key}" not found for locale "${currentLoc}"`);
      return key; // Return key as fallback
    }
  }
  
  return typeof value === 'string' ? value : key;
}

/**
 * Get translation with interpolation support
 */
export function ti(key: string, params: Record<string, string | number> = {}, locale?: Locale): string {
  let translation = t(key, locale);
  
  // Simple interpolation: replace {param} with values
  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(new RegExp(`{${param}}`, 'g'), String(value));
  });
  
  return translation;
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, locale: Locale = currentLocale): string {
  if (price === 0) {
    return t('common.free', locale);
  }
  
  const currency = t('common.currency', locale);
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Format number with locale-specific formatting
 */
export function formatNumber(num: number, locale: Locale = currentLocale): string {
  return num.toLocaleString(locale === 'en' ? 'en-US' : locale);
}

/**
 * Get available locales for language switcher (future use)
 */
export function getAvailableLocales(): Array<{ code: Locale; name: string }> {
  return Object.entries(LOCALES).map(([code, name]) => ({
    code: code as Locale,
    name,
  }));
}

/**
 * Future: Get locale-specific URL
 */
export function getLocalizedUrl(path: string, locale: Locale = currentLocale): string {
  // For now, return path as-is since we only support English
  // In the future: return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
  return path;
}

/**
 * Set current locale and save to localStorage
 */
export function setLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hubite-locale', locale);
    // Reload page to apply new locale
    window.location.reload();
  }
}

/**
 * Future: Detect locale from URL
 */
export function detectLocaleFromUrl(url: string): Locale {
  // For now, always return default locale
  // In the future: parse URL and detect locale
  return DEFAULT_LOCALE;
} 