import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import AgentSocialCard from "@/components/AgentSocialCard";
import PropertyOfWeekCard from "@/components/social/PropertyOfWeekCard";
import { SocialAgent, PropertyOfWeek } from "@/types";

const dummyLeaders: SocialAgent[] = [
  {
    id: "l1",
    name: "Sophie Anderson",
    agency: "Foxtons",
    email: "sophie@foxtons.com",
    about: "London's top property influencer with stunning home tours and interior design tips that captivate thousands daily.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    instagram_handle: "sophieanderson",
    tiktok_handle: null,
    area: "Chelsea",
    nomination_date: "2024-01-15",
    follower_count: 48200,
    engagement_rate: 8.5,
    is_rising_star: false,
    is_leader: true,
    rating: 4097,
    isTopEngagement: true,
  },
  {
    id: "l2",
    name: "James Whitfield",
    agency: "Savills",
    email: "james@savills.com",
    about: "Luxury property specialist known for cinematic walkthroughs of multi-million pound homes across prime London.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    instagram_handle: "jameswhitfield",
    tiktok_handle: null,
    area: "Mayfair",
    nomination_date: "2024-01-10",
    follower_count: 35800,
    engagement_rate: 7.2,
    is_rising_star: false,
    is_leader: true,
    rating: 2577,
    isTopEngagement: true,
  },
  {
    id: "l3",
    name: "Priya Kapoor",
    agency: "Knight Frank",
    email: "priya@knightfrank.com",
    about: "Award-winning agent blending Bollywood flair with property content. Her reels make house-hunting feel like a movie.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    instagram_handle: "priyakapoor",
    tiktok_handle: null,
    area: "Kensington",
    nomination_date: "2024-02-01",
    follower_count: 29400,
    engagement_rate: 9.1,
    is_rising_star: false,
    is_leader: true,
    rating: 2675,
    isTopEngagement: true,
  },
  {
    id: "l4",
    name: "Tom Brennan",
    agency: "Hamptons",
    email: "tom@hamptons.com",
    about: "The go-to agent for quirky period conversions. His before-and-after content is absolutely addictive.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    instagram_handle: "tombrennan",
    tiktok_handle: null,
    area: "Islington",
    nomination_date: "2024-01-20",
    follower_count: 22100,
    engagement_rate: 6.8,
    is_rising_star: false,
    is_leader: true,
    rating: 1502,
    isTopEngagement: false,
  },
  {
    id: "l5",
    name: "Elena Ruiz",
    agency: "Dexters",
    email: "elena@dexters.com",
    about: "First-time buyer champion who breaks down the property process with witty, relatable short-form videos.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    instagram_handle: "elenaruiz",
    tiktok_handle: null,
    area: "Clapham",
    nomination_date: "2024-02-05",
    follower_count: 18700,
    engagement_rate: 7.9,
    is_rising_star: false,
    is_leader: true,
    rating: 1477,
    isTopEngagement: true,
  },
  {
    id: "l6",
    name: "Marcus Chen",
    agency: "Winkworth",
    email: "marcus@winkworth.com",
    about: "East London specialist with a cult following for his brutally honest property reviews and neighbourhood guides.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    instagram_handle: "marcuschen",
    tiktok_handle: null,
    area: "Shoreditch",
    nomination_date: "2024-01-25",
    follower_count: 15300,
    engagement_rate: 6.4,
    is_rising_star: false,
    is_leader: true,
    rating: 979,
    isTopEngagement: false,
  },
];

const dummyRisingStars: SocialAgent[] = [
  {
    id: "r1",
    name: "Olivia Hart",
    agency: "Marsh & Parsons",
    email: "olivia@marshandparsons.com",
    about: "Just 6 months in and already going viral with her 'Hidden Gems of London' series featuring undiscovered properties.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    instagram_handle: "oliviahart",
    tiktok_handle: null,
    area: "Notting Hill",
    nomination_date: "2024-03-01",
    follower_count: 8200,
    engagement_rate: 12.3,
    is_rising_star: true,
    is_leader: false,
  },
  {
    id: "r2",
    name: "Daniel Okafor",
    agency: "Chestertons",
    email: "daniel@chestertons.com",
    about: "Former architect turned agent, his technical breakdowns of property features are gaining a massive following.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    instagram_handle: "danielokafor",
    tiktok_handle: null,
    area: "Brixton",
    nomination_date: "2024-02-28",
    follower_count: 5600,
    engagement_rate: 10.8,
    is_rising_star: true,
    is_leader: false,
  },
  {
    id: "r3",
    name: "Mia Zhang",
    agency: "Kinleigh Folkard & Hayward",
    email: "mia@kfh.com",
    about: "Bilingual content creator making London property accessible to international buyers with engaging dual-language tours.",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    instagram_handle: "miazhang",
    tiktok_handle: null,
    area: "Canary Wharf",
    nomination_date: "2024-02-20",
    follower_count: 4100,
    engagement_rate: 11.5,
    is_rising_star: true,
    is_leader: false,
  },
];

const dummyProperties: PropertyOfWeek[] = [
  {
    id: "p1",
    title: "Georgian Townhouse Tour",
    description: "A stunning walkthrough of a beautifully restored 4-bed Georgian townhouse in the heart of Bloomsbury. Original features meet modern luxury.",
    agent_name: "Sophie Anderson",
    agency: "Foxtons",
    video_url: "",
    instagram_handle: "sophieanderson",
    email: "sophie@foxtons.com",
    votes: 142,
  },
  {
    id: "p2",
    title: "Warehouse Conversion Reveal",
    description: "This jaw-dropping Shoreditch warehouse conversion features 20ft ceilings, exposed brick, and a rooftop terrace with City views.",
    agent_name: "Marcus Chen",
    agency: "Winkworth",
    video_url: "",
    instagram_handle: "marcuschen",
    email: "marcus@winkworth.com",
    votes: 98,
  },
  {
    id: "p3",
    title: "Penthouse with a View",
    description: "Step inside this breathtaking Canary Wharf penthouse with floor-to-ceiling windows and panoramic Thames views. Pure luxury living.",
    agent_name: "Mia Zhang",
    agency: "KFH",
    video_url: "",
    instagram_handle: "miazhang",
    email: "mia@kfh.com",
    votes: 76,
  },
];

const AgentsList = () => {
  const [socialLeaders] = useState<SocialAgent[]>(dummyLeaders);
  const [risingStars] = useState<SocialAgent[]>(dummyRisingStars);
  const [propertyOfWeek] = useState<PropertyOfWeek[]>(dummyProperties);

  return (
    <>
      <TabsContent value="leaders">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {socialLeaders.map((agent, index) => (
            <AgentSocialCard 
              key={agent.id} 
              agent={agent} 
              ranking={index + 1}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="rising">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {risingStars.map((agent) => (
            <AgentSocialCard key={agent.id} agent={agent} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="property-of-week">
        <p className="text-center text-gray-600 mb-8">
          Vote for your favourite piece of property content this week!
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {propertyOfWeek.map((property) => (
            <PropertyOfWeekCard key={property.id} property={property} />
          ))}
        </div>
      </TabsContent>
    </>
  );
};

export default AgentsList;
