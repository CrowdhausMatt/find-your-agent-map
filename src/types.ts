export interface Agent {
  id: string;
  name: string;
  agency: string;
  email: string;
  about: string | null;
  sweetSpot: string | null;  // This will map to sweet_spot in the database
  area: string;  // The location name (e.g., "Hackney", "Muswell Hill")
  latitude: number | null;
  longitude: number | null;
  photo: string | null;
  instagram_handle: string | null;
  created_at?: string;
}

export interface SocialAgent {
  id: string;
  name: string;
  agency: string;
  email: string;
  about: string | null;
  photo: string | null;
  instagram_handle: string | null;
  tiktok_handle?: string | null; // Made optional with ?
  area: string | null;
  nomination_date: string;
  follower_count: number;
  engagement_rate: number;
  is_rising_star: boolean;
  is_leader: boolean;
  rating?: number;
  isTopEngagement?: boolean;
  video_url?: string | null;
}