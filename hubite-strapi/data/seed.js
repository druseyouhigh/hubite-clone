// Simple seed script without external dependencies

// Sample data for seeding
const categories = [
  { name: 'Lifestyle', icon: '🌟', color: '#FF6B6B', isPopular: true },
  { name: 'Fashion', icon: '👗', color: '#4ECDC4', isPopular: true },
  { name: 'Fitness', icon: '💪', color: '#45B7D1', isPopular: true },
  { name: 'Gaming', icon: '🎮', color: '#96CEB4', isPopular: false },
  { name: 'Art', icon: '🎨', color: '#FFEAA7', isPopular: false },
  { name: 'Music', icon: '🎵', color: '#A29BFE', isPopular: false },
  { name: 'Travel', icon: '✈️', color: '#FD79A8', isPopular: true },
  { name: 'Food', icon: '🍕', color: '#FDCB6E', isPopular: false }
];

const locations = [
  { country: 'United States', countryCode: 'US', city: 'Los Angeles', region: 'California', flag: '🇺🇸' },
  { country: 'United Kingdom', countryCode: 'GB', city: 'London', region: 'England', flag: '🇬🇧' },
  { country: 'Canada', countryCode: 'CA', city: 'Toronto', region: 'Ontario', flag: '🇨🇦' },
  { country: 'Australia', countryCode: 'AU', city: 'Sydney', region: 'New South Wales', flag: '🇦🇺' },
  { country: 'Germany', countryCode: 'DE', city: 'Berlin', region: 'Berlin', flag: '🇩🇪' },
  { country: 'France', countryCode: 'FR', city: 'Paris', region: 'Île-de-France', flag: '🇫🇷' },
  { country: 'Japan', countryCode: 'JP', city: 'Tokyo', region: 'Tokyo', flag: '🇯🇵' },
  { country: 'Brazil', countryCode: 'BR', city: 'São Paulo', region: 'São Paulo', flag: '🇧🇷' }
];

const tags = [
  { name: 'Premium', color: '#FFD700' },
  { name: 'New', color: '#00FF00' },
  { name: 'Popular', color: '#FF1493' },
  { name: 'Exclusive', color: '#9370DB' },
  { name: 'Hot', color: '#FF4500' },
  { name: 'Trending', color: '#1E90FF' },
  { name: 'Featured', color: '#32CD32' },
  { name: 'VIP', color: '#FF69B4' }
];

// Sample creator names and usernames
const creatorData = [
  { name: 'Emma Rose', username: 'emmarose_official' },
  { name: 'Sophia Blake', username: 'sophiablake' },
  { name: 'Isabella Cruz', username: 'bella_cruz' },
  { name: 'Mia Johnson', username: 'mia_j' },
  { name: 'Charlotte Davis', username: 'charlotte_d' },
  { name: 'Amelia Wilson', username: 'amelia_w' },
  { name: 'Harper Brown', username: 'harper_brown' },
  { name: 'Evelyn Taylor', username: 'evelyn_t' },
  { name: 'Abigail Anderson', username: 'abigail_a' },
  { name: 'Emily White', username: 'emily_white' },
  { name: 'Elizabeth Garcia', username: 'liz_garcia' },
  { name: 'Sofia Martinez', username: 'sofia_m' },
  { name: 'Avery Lopez', username: 'avery_lopez' },
  { name: 'Ella Gonzalez', username: 'ella_g' },
  { name: 'Scarlett Wilson', username: 'scarlett_w' },
  { name: 'Victoria Lee', username: 'victoria_lee' },
  { name: 'Madison Clark', username: 'madison_c' },
  { name: 'Luna Rodriguez', username: 'luna_r' },
  { name: 'Grace Lewis', username: 'grace_lewis' },
  { name: 'Chloe Walker', username: 'chloe_w' }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    await strapi.db.query('api::category.category').deleteMany({});
    await strapi.db.query('api::location.location').deleteMany({});
    await strapi.db.query('api::tag.tag').deleteMany({});
    await strapi.db.query('api::creator.creator').deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Seed Categories
    const createdCategories = [];
    for (const category of categories) {
      const created = await strapi.db.query('api::category.category').create({
        data: {
          ...category,
          slug: category.name.toLowerCase().replace(/\s+/g, '-'),
          description: `Discover amazing ${category.name.toLowerCase()} content from talented creators.`,
          publishedAt: new Date()
        }
      });
      createdCategories.push(created);
    }
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Seed Locations
    const createdLocations = [];
    for (const location of locations) {
      const created = await strapi.db.query('api::location.location').create({
        data: {
          ...location,
          publishedAt: new Date()
        }
      });
      createdLocations.push(created);
    }
    console.log(`✅ Created ${createdLocations.length} locations`);

    // Seed Tags
    const createdTags = [];
    for (const tag of tags) {
      const created = await strapi.db.query('api::tag.tag').create({
        data: {
          ...tag,
          slug: tag.name.toLowerCase().replace(/\s+/g, '-'),
          publishedAt: new Date()
        }
      });
      createdTags.push(created);
    }
    console.log(`✅ Created ${createdTags.length} tags`);

    // Seed Creators
    const createdCreators = [];
    for (let i = 0; i < creatorData.length; i++) {
      const creator = creatorData[i];
      const isFree = Math.random() > 0.7; // 30% chance of being free
      const isVerified = Math.random() > 0.4; // 60% chance of being verified
      const isFeatured = Math.random() > 0.8; // 20% chance of being featured
      
      // Random categories (1-3 per creator)
      const shuffledCategories = [...createdCategories].sort(() => 0.5 - Math.random());
      const selectedCategories = shuffledCategories.slice(0, Math.floor(Math.random() * 3) + 1);
      
      // Random location
      const randomLocation = createdLocations[Math.floor(Math.random() * createdLocations.length)];
      
      // Random tags (0-3 per creator)
      const shuffledTags = [...createdTags].sort(() => 0.5 - Math.random());
      const selectedTags = shuffledTags.slice(0, Math.floor(Math.random() * 4));

      const created = await strapi.db.query('api::creator.creator').create({
        data: {
          name: creator.name,
          username: creator.username,
          email: `${creator.username}@example.com`,
          bio: faker.lorem.paragraphs(2),
          price: isFree ? 0 : parseFloat((Math.random() * 30 + 5).toFixed(2)),
          isFree,
          isVerified,
          isFeatured,
          socialLinks: {
            onlyfans: `https://onlyfans.com/${creator.username}`,
            instagram: `@${creator.username}`,
            twitter: `@${creator.username}`,
            tiktok: Math.random() > 0.5 ? `@${creator.username}` : null,
            telegram: Math.random() > 0.7 ? `@${creator.username}` : null
          },
          stats: {
            posts: Math.floor(Math.random() * 500) + 50,
            photos: Math.floor(Math.random() * 300) + 30,
            videos: Math.floor(Math.random() * 100) + 10,
            subscribers: Math.floor(Math.random() * 50000) + 1000
          },
          categories: selectedCategories.map(cat => cat.id),
          location: randomLocation.id,
          tags: selectedTags.map(tag => tag.id),
          publishedAt: new Date()
        }
      });
      createdCreators.push(created);
    }
    console.log(`✅ Created ${createdCreators.length} creators`);

    console.log('🎉 Database seeding completed successfully!');
    console.log(`
📊 Summary:
- Categories: ${createdCategories.length}
- Locations: ${createdLocations.length}
- Tags: ${createdTags.length}
- Creators: ${createdCreators.length}
- Free creators: ${createdCreators.filter(c => c.isFree).length}
- Verified creators: ${createdCreators.filter(c => c.isVerified).length}
- Featured creators: ${createdCreators.filter(c => c.isFeatured).length}
    `);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

module.exports = { seedDatabase }; 