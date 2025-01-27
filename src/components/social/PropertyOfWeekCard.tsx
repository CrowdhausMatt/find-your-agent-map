import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PropertyOfWeek } from "@/types";

interface PropertyOfWeekCardProps {
  property: PropertyOfWeek;
}

const PropertyOfWeekCard = ({ property }: PropertyOfWeekCardProps) => {
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
            <p className="text-sm text-gray-500">{property.agency}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyOfWeekCard;