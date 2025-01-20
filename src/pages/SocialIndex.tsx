import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SocialHero from "@/components/social/SocialHero";
import MetricsSpotlight from "@/components/social/MetricsSpotlight";
import AgentsList from "@/components/social/AgentsList";

const SocialIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-y-auto h-screen">
      <div className="p-4">
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
          <Tabs defaultValue="leaders" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 max-w-[400px] mx-auto">
              <TabsTrigger value="leaders">The Social Leaders</TabsTrigger>
              <TabsTrigger value="rising">Rising Stars</TabsTrigger>
            </TabsList>

            <AgentsList />
          </Tabs>
        </div>
      </section>

      <MetricsSpotlight />

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-4">
        <Button 
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white shadow-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Map className="w-4 h-4" />
          Map
        </Button>
      </div>
    </div>
  );
};

export default SocialIndex;