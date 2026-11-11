export type ThumbnailCategory = 
  | 'todos'
  | 'gta5'
  | 'gta6'
  | 'csgo'
  | 'roblox';

export interface ThumbnailProject {
  id: string;
  title: string;
  category: ThumbnailCategory;
  categoryLabel: string;
  imageUrl: string;
  beforeImageUrl?: string;
  ctr: string;
  views: string;
  client: string;
  description: string;
  software: string[];
  colorPalette: string[];
  keyTactics: string[];
  isFeatured?: boolean;
}

export interface SkillItem {
  name: string;
  shortCode: string;
  iconBg: string;
  textColor: string;
  description: string;
  level: number;
}

export interface PackagePlan {
  id: string;
  name: string;
  description: string;
  thumbsCount: number;
  deliveryTime: string;
  priceEstimate: string;
  features: string[];
  popular?: boolean;
}

export interface UserProfileData {
  name: string;
  role: string;
  tagline: string;
  experienceYears: number;
  bio: string;
  avatarUrl: string;
  email: string;
  whatsapp: string;
  discord: string;
  instagram: string;
}
