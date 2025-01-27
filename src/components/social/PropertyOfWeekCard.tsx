import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
        <div className="aspect-[16/9] relative">
          <video
            src={property.video_url}
            className="w-full h-full object-cover"
            controls
            playsInline
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{property.description}</p>
          <div className="mt-auto">
            <p className="text-sm font-medium">{property.agent_name}</p>
            <p className="text-sm text-gray-500 mb-4">{property.agency}</p>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                {property.instagram_handle && (
                  <Button
                    onClick={() => handleInstagramClick(property.instagram_handle!)}
                    variant="outline"
                    className="flex-1 h-10"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </Button>
                )}
                {property.email && (
                  <Button
                    onClick={() => handleContactClick(property.email!)}
                    variant="default"
                    className="flex-1 h-10"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact</span>
                  </Button>
                )}
              </div>
              <Button
                onClick={() => window.open('https://apps.apple.com/gb/app/knokknok-social/id6739164492', '_blank')}
                variant="outline"
                className="w-full bg-white hover:bg-gray-50 h-10"
              >
                Knok Knok
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyOfWeekCard;