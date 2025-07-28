/**
 * Internationalization system for Hubite Clone
 * Currently supports English only, but designed for easy expansion
 */

// Supported locales (for future expansion)
export const LOCALES = {
  en: 'English',
  // uk: 'Українська',
  // ru: 'Русский', 
  // pl: 'Polski',
} as const;

export type Locale = keyof typeof LOCALES;
export const DEFAULT_LOCALE: Locale = 'en';

// Current locale (will be dynamic in the future)
export const currentLocale: Locale = DEFAULT_LOCALE;

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
  },
};

/**
 * Get translation by key with type safety
 */
export function t(key: string, locale: Locale = currentLocale): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`);
      return key; // Return key as fallback
    }
  }
  
  return typeof value === 'string' ? value : key;
}

/**
 * Get translation with interpolation support
 */
export function ti(key: string, params: Record<string, string | number> = {}, locale: Locale = currentLocale): string {
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
 * Future: Detect locale from URL
 */
export function detectLocaleFromUrl(url: string): Locale {
  // For now, always return default locale
  // In the future: parse URL and detect locale
  return DEFAULT_LOCALE;
} 