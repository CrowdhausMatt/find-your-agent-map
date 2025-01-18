import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import { Agent } from '@/types';

interface AgentSocialCardProps {
  agent: Agent;
}

const AgentSocialCard = ({ agent }: AgentSocialCardProps) => {
  const handleInstagramClick = (handle: string) => {
    window.open(`https://instagram.com/${handle}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="mb-4 aspect-square overflow-hidden rounded-lg">
        <img
          src={agent.photo || "/placeholder.svg"}
          alt={agent.name}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{agent.name}</h3>
      <p className="mb-2 text-sm text-gray-600">{agent.agency}</p>
      <p className="mb-4 text-sm text-gray-500">{agent.area}</p>
      <p className="text-sm text-gray-700 mb-4">{agent.about}</p>
      {agent.instagram_handle && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              onClick={() => handleInstagramClick(agent.instagram_handle!)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              <span>@{agent.instagram_handle}</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="text-sm font-semibold">@{agent.instagram_handle}</h4>
                  <p className="text-xs text-gray-500">{agent.name}</p>
                </div>
              </div>
              <p className="text-sm">
                Professional real estate agent specializing in {agent.area} properties.
              </p>
              <div className="pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleInstagramClick(agent.instagram_handle!)}
                >
                  View Full Profile
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </motion.div>
  );
};

export default AgentSocialCard;