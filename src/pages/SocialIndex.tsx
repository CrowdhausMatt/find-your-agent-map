import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialHero from "@/components/social/SocialHero";
import MetricsSpotlight from "@/components/social/MetricsSpotlight";
import AgentsList from "@/components/social/AgentsList";

const SocialIndex = () => {
  return (
    <div className="min-h-screen bg-white overflow-y-auto h-screen">
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
    </div>
  );
};

export default SocialIndex;