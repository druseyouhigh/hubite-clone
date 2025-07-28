import type { Schema, Struct } from '@strapi/strapi';

export interface CreatorSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_creator_social_links';
  info: {
    description: 'Social media links for creators';
    displayName: 'Social Links';
  };
  attributes: {
    instagram: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    onlyfans: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    telegram: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    tiktok: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    twitter: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface CreatorStats extends Struct.ComponentSchema {
  collectionName: 'components_creator_stats';
  info: {
    description: 'Statistics for creators';
    displayName: 'Stats';
  };
  attributes: {
    photos: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    posts: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    subscribers: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    videos: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'creator.social-links': CreatorSocialLinks;
      'creator.stats': CreatorStats;
    }
  }
}
