import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, Star, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SocialAgent } from '@/types';

interface AgentSocialCardProps {
  agent: SocialAgent;
  ranking?: number;
}

const AgentSocialCard = ({ agent, ranking }: AgentSocialCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

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
      className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow relative"
    >
      {ranking && (
        <Badge 
          className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center bg-[#9b87f5] border-2 border-white shadow-lg z-10"
          variant="default"
        >
          {ranking}
        </Badge>
      )}
      {agent.isTopEngagement && (
        <Badge 
          className="absolute -top-3 -right-3 px-2 py-1 flex items-center gap-1 bg-yellow-400 text-yellow-900 border-2 border-white shadow-lg z-10"
          variant="default"
        >
          <Star className="w-3 h-3" /> Top Engagement
        </Badge>
      )}
      <div 
        className="mb-4 aspect-square overflow-hidden rounded-lg relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {agent.video_url && isHovering ? (
          <div className="relative w-full h-full">
            <video 
              src={agent.video_url}
              className="h-full w-full object-cover"
              autoPlay 
              muted 
              loop
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        ) : (
          <img
            src={agent.photo || "/placeholder.svg"}
            alt={agent.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{agent.name}</h3>
      <p className="mb-2 text-sm text-gray-600">{agent.agency}</p>
      <p className="mb-4 text-sm text-gray-500">{agent.area}</p>
      <p className="text-sm text-gray-700 mb-4">{agent.about}</p>
      <div className="flex gap-2">
        {agent.instagram_handle && (
          <Button
            onClick={() => handleInstagramClick(agent.instagram_handle!)}
            variant="outline"
            className="flex-1"
          >
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </Button>
        )}
        <Button
          onClick={() => handleContactClick(agent.email)}
          variant="default"
          className="flex-1"
        >
          <Mail className="h-4 w-4" />
          <span>Contact</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default AgentSocialCard;