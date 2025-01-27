import { motion } from "framer-motion";
import { Instagram, Mail, ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyOfWeek } from "@/types";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface PropertyOfWeekCardProps {
  property: PropertyOfWeek;
}

const PropertyOfWeekCard = ({ property }: PropertyOfWeekCardProps) => {
  const [votes, setVotes] = useState(property.votes || 0);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  const handleVote = async () => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      const { error } = await supabase
        .from('property_of_week')
        .update({ votes: votes + 1 })
        .eq('id', property.id);

      if (error) throw error;

      setVotes(prev => prev + 1);
      toast({
        description: "Thanks for your vote!",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        variant: "destructive",
        description: "Failed to register vote. Please try again.",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleInstagramClick = (handle: string) => {
    window.open(`https://instagram.com/${handle}`, '_blank');
  };

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleKnokKnokClick = () => {
    window.open('https://apps.apple.com/gb/app/knokknok-social/id6739164492', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow relative h-full flex flex-col"
    >
      <div className="w-full mb-4">
        <Button
          onClick={handleVote}
          variant="outline"
          disabled={isVoting}
          className="w-full bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#9b87f5] text-white border-none h-12"
        >
          <ArrowBigUp className="h-4 w-4 mr-2" />
          <span>Upvote</span>
          <span className="ml-2">({votes})</span>
        </Button>
      </div>
      <div className="mb-4 aspect-[9/16] overflow-hidden rounded-lg relative">
        <video 
          src={property.video_url}
          className="h-full w-full object-cover"
          controls
          playsInline
        />
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold truncate">{property.title}</h3>
      </div>
      <p className="mb-2 text-sm text-gray-600 truncate">{property.agency}</p>
      <p className="mb-4 text-sm text-gray-500 truncate">{property.agent_name}</p>
      <div className="flex-1">
        <p className="text-sm text-gray-700 line-clamp-3">{property.description}</p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2">
          {property.instagram_handle && (
            <Button
              onClick={() => handleInstagramClick(property.instagram_handle!)}
              variant="outline"
              className="flex-1 h-10"
            >
              <Instagram className="h-4 w-4 mr-2" />
              <span>Instagram</span>
            </Button>
          )}
          {property.email && (
            <Button
              onClick={() => handleContactClick(property.email!)}
              variant="default"
              className="flex-1 h-10"
            >
              <Mail className="h-4 w-4 mr-2" />
              <span>Contact</span>
            </Button>
          )}
        </div>
        <Button
          onClick={handleKnokKnokClick}
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 h-10"
        >
          Knok Knok
        </Button>
      </div>
    </motion.div>
  );
};

export default PropertyOfWeekCard;