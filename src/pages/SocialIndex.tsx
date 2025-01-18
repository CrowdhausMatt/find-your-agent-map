import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Agent } from "@/types";
import AgentSocialCard from "@/components/AgentSocialCard";

const SocialIndex = () => {
  const socialLeaders: Agent[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      agency: "London Prime Estates",
      email: "sarah.j@londonprime.com",
      about: "Known for her viral property tours and market insights on TikTok with over 500k followers.",
      sweetSpot: "Luxury apartments in Mayfair and Knightsbridge",
      area: "Mayfair",
      latitude: 51.5074,
      longitude: -0.1278,
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2688&auto=format&fit=crop",
      instagram_handle: "sarahjproperty"
    },
    {
      id: "2",
      name: "James Wilson",
      agency: "The Modern Agent",
      email: "j.wilson@modernagent.com",
      about: "Instagram specialist focusing on behind-the-scenes property development stories.",
      sweetSpot: "New developments in East London",
      area: "Shoreditch",
      latitude: 51.5229,
      longitude: -0.0777,
      photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2940&auto=format&fit=crop",
      instagram_handle: "jameswilsonagent"
    },
    {
      id: "3",
      name: "Emma Thompson",
      agency: "Royal Heritage Properties",
      email: "emma@royalheritage.com",
      about: "LinkedIn influencer specializing in historic property renovations.",
      sweetSpot: "Period properties in Chelsea",
      area: "Chelsea",
      latitude: 51.4875,
      longitude: -0.1687,
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
      instagram_handle: "emmathompsonproperties"
    }
  ];

  const risingStars: Agent[] = [
    {
      id: "4",
      name: "Alex Chen",
      agency: "NextGen Realty",
      email: "alex@nextgenrealty.com",
      about: "Up-and-coming TikTok star known for first-time buyer tips.",
      sweetSpot: "Affordable homes in trendy areas",
      area: "Hackney",
      latitude: 51.5475,
      longitude: -0.0547,
      photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2560&auto=format&fit=crop",
      instagram_handle: "alexchenrealty"
    },
    {
      id: "5",
      name: "Maya Patel",
      agency: "Urban Spaces",
      email: "maya.p@urbanspaces.com",
      about: "Instagram reels specialist focusing on apartment styling.",
      sweetSpot: "City apartments under £500k",
      area: "Canary Wharf",
      latitude: 51.5049,
      longitude: -0.0037,
      photo: "https://images.unsplash.com/photo-1619343177062-b79c2b4c8516?q=80&w=2564&auto=format&fit=crop",
      instagram_handle: "mayapatelurban"
    }
  ];

  const handleInstagramClick = (handle: string) => {
    window.open(`https://instagram.com/${handle}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              KnokKnok Social Property Agent Index
            </h1>
            <p className="mb-8 text-xl opacity-90">
              Celebrating the Game-Changers in Real Estate
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Nominate an Agent
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="leaders" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 max-w-[400px] mx-auto">
              <TabsTrigger value="leaders">The Social Leaders</TabsTrigger>
              <TabsTrigger value="rising">Rising Stars</TabsTrigger>
            </TabsList>

            <TabsContent value="leaders">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {socialLeaders.map((agent) => (
                  <AgentSocialCard key={agent.id} agent={agent} />
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
          </Tabs>
        </div>
      </section>

      {/* Metrics Spotlight */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Social Matters</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold">Engagement Over Followers</h3>
              <p className="text-gray-600">
                Quality interactions matter more than quantity of followers
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold">Digital First</h3>
              <p className="text-gray-600">
                80% of buyers browse social media before viewing properties
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold">Trust Building</h3>
              <p className="text-gray-600">
                Social presence builds credibility and trust with potential clients
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialIndex;
