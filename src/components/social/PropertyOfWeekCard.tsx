import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyOfWeek } from "@/types";

interface PropertyOfWeekCardProps {
  property: PropertyOfWeek;
}

const PropertyOfWeekCard = ({ property }: PropertyOfWeekCardProps) => {
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