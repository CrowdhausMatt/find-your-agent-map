import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import SocialHero from "@/components/social/SocialHero";
import MetricsSpotlight from "@/components/social/MetricsSpotlight";
import AgentsList from "@/components/social/AgentsList";

const SocialIndex = () => {
  return (
    <div className="min-h-screen bg-white overflow-y-auto h-screen">
      <div className="fixed top-4 left-4 z-10">
        <Link to="https://knokknok.social/" className="inline-block">
          <img 
            src="/lovable-uploads/d9d07162-5597-4d5a-99ab-1ae84b35ca13.png" 
            alt="Knok Knok" 
            className="h-8 w-auto"
          />
        </Link>
      </div>
      
      <SocialHero />
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Our Top Social Media Agents Leaderboard is not just about follower numbers but engagement rates, authenticity and consistency!
          </p>
          
          <Tabs defaultValue="leaders" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 max-w-[600px] mx-auto">
              <TabsTrigger value="leaders">The Social Leaders</TabsTrigger>
              <TabsTrigger value="rising">Rising Stars</TabsTrigger>
              <TabsTrigger value="property-of-week" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 hover:text-yellow-900">
                Property of the Week!
              </TabsTrigger>
            </TabsList>

            <AgentsList />
          </Tabs>
        </div>
      </section>

      <MetricsSpotlight />
    </div>
  );
};

export default SocialIndex;