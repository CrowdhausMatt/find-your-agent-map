export interface Agent {
  id: string;
  name: string;
  agency: string;
  email: string;
  about: string | null;
  sweetSpot: string | null;  // This will map to sweet_spot in the database
  latitude: number;
  longitude: number;
  photo: string | null;
  created_at?: string;
}