// Simple seed script for Hubite Strapi - No external dependencies

const categories = [
  { 
    name: 'Adult Content', 
    icon: '🔞', 
    color: '#FF6B6B', 
    isPopular: true,
    description: 'Discover amazing adult content from talented creators.'
  },
  { 
    name: 'Gaming', 
    icon: '🎮', 
    color: '#4ECDC4', 
    isPopular: true,
    description: 'Gaming content and live streams from top creators.'
  },
  { 
    name: 'Lifestyle', 
    icon: '🌟', 
    color: '#45B7D1', 
    isPopular: true,
    description: 'Lifestyle and daily content from amazing creators.'
  },
  { 
    name: 'Fitness', 
    icon: '💪', 
    color: '#96CEB4', 
    isPopular: false,
    description: 'Fitness and wellness content from certified trainers.'
  }
];

const locations = [
  { country: 'Ukraine', countryCode: 'UA', city: 'Kyiv', region: 'Kyiv Oblast', flag: '🇺🇦' },
  { country: 'United States', countryCode: 'US', city: 'Los Angeles', region: 'California', flag: '🇺🇸' },
  { country: 'Germany', countryCode: 'DE', city: 'Berlin', region: 'Berlin', flag: '🇩🇪' },
  { country: 'United Kingdom', countryCode: 'GB', city: 'London', region: 'England', flag: '🇬🇧' }
];

const tags = [
  { name: 'Premium', color: '#FFD700' },
  { name: 'New', color: '#00FF00' },
  { name: 'Popular', color: '#FF1493' },
  { name: 'Hot', color: '#FF4500' },
  { name: 'Trending', color: '#1E90FF' },
  { name: 'Featured', color: '#32CD32' }
];

const creators = [
  {
    name: 'Emma Rose',
    username: 'emmarose_official',
    bio: 'Professional content creator specializing in lifestyle and fashion. Join me for exclusive behind-the-scenes content and daily updates.',
    price: 15.99,
    isFree: false,
    isVerified: true,
    isFeatured: true
  },
  {
    name: 'Alex Gaming',
    username: 'alex_gaming',
    bio: 'Professional gamer and streamer. Get access to exclusive gaming content, tutorials, and live stream recordings.',
    price: 0,
    isFree: true,
    isVerified: true,
    isFeatured: false
  },
  {
    name: 'Sophia Fitness',
    username: 'sophia_fit',
    bio: 'Certified fitness trainer and wellness coach. Access exclusive workout routines, nutrition tips, and motivation content.',
    price: 12.50,
    isFree: false,
    isVerified: false,
    isFeatured: true
  }
];

async function addTestData() {
  console.log('🌱 Adding test data to Strapi...');
  
  try {
    // Note: This script should be run from Strapi admin panel or through Strapi console
    console.log('📝 Test data structure ready:');
    console.log(`- ${categories.length} categories`);
    console.log(`- ${locations.length} locations`);
    console.log(`- ${tags.length} tags`);
    console.log(`- ${creators.length} creators`);
    
    console.log('\n🎯 Next steps:');
    console.log('1. Open http://localhost:1337/admin');
    console.log('2. Go to Content Manager');
    console.log('3. Add this data manually or use Strapi API');
    
    return {
      categories,
      locations,
      tags,
      creators
    };
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Export for use in other scripts
module.exports = { addTestData, categories, locations, tags, creators };

// If run directly
if (require.main === module) {
  addTestData();
} 