export const projectCategories = [
  ['brand-identity', 'Brand identity'],
  ['posters', 'Posters'],
  ['banners', 'Banners'],
  ['menus', 'Menus'],
  ['social-media', 'Social media'],
  ['corporate', 'Corporate'],
  ['church', 'Church'],
  ['campaigns', 'Campaigns'],
  ['charity', 'Charity and NGO'],
] as const;

export type ProjectCategory = (typeof projectCategories)[number][0];