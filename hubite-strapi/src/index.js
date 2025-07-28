'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Check if we should seed the database
    if (process.env.NODE_ENV === 'development') {
      const shouldSeed = process.env.SEED_DATABASE === 'true';
      
      if (shouldSeed) {
        console.log('🌱 Seeding database...');
        try {
          // Import and run seed function
          const { seedDatabase } = require('../data/seed');
          await seedDatabase();
        } catch (error) {
          console.error('❌ Failed to seed database:', error);
        }
      }
    }
  },
}; 