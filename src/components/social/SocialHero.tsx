import { NominateAgentDialog } from "./NominateAgentDialog";
import { Button } from "../ui/button";
import { Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SocialHero() {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              Social Property Leaders
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
              Discover the most influential property agents on social media. These agents are changing the game with their innovative approach to real estate.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <NominateAgentDialog />
            <Button 
              onClick={() => navigate('/')}
              className="bg-purple-600 text-white shadow-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Map className="w-4 h-4" />
              Map
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}