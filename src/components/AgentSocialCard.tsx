import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Mail, Star, Volume, VolumeX, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SocialAgent } from '@/types';

interface AgentSocialCardProps {
  agent: SocialAgent;
  ranking?: number;
}

const FloatingHeart = ({ x }: { x: number }) => (
  <motion.div
    initial={{ y: 0, opacity: 1, x }}
    animate={{
      y: -100,
      opacity: 0,
      x: x + (Math.random() * 50 - 25),
    }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="absolute bottom-0 text-pink-500"
  >
    <Heart size={16} fill="currentColor" />
  </motion.div>
);

const AgentSocialCard = ({ agent, ranking }: AgentSocialCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hearts, setHearts] = useState<number[]>([]);

  const handleInstagramClick = (handle: string) => {
    window.open(`https://instagram.com/${handle}`, '_blank');
  };

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleKnokKnokClick = () => {
    window.open('https://apps.apple.com/gb/app/knokknok-social/id6739164492', '_blank');
  };

  const handleHeartHover = () => {
    const newHearts = Array.from({ length: 5 }, (_, i) => i).map(
      () => Math.random() * 40 - 20
    );
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow relative h-full flex flex-col"
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
              muted={isMuted}
              loop
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white z-20"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume className="w-4 h-4" />}
            </button>
          </div>
        ) : (
          <img
            src={agent.photo || "/placeholder.svg"}
            alt={agent.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">{agent.name}</h3>
        <div 
          className="relative cursor-pointer text-gray-400 hover:text-pink-500 transition-colors"
          onMouseEnter={handleHeartHover}
        >
          <Heart className="w-5 h-5" />
          <AnimatePresence>
            {hearts.map((x, i) => (
              <FloatingHeart key={`${i}-${x}`} x={x} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <p className="mb-2 text-sm text-gray-600">{agent.agency}</p>
      <p className="mb-4 text-sm text-gray-500">{agent.area}</p>
      <div className="flex-1">
        <p className="text-sm text-gray-700">{agent.about}</p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2">
          {agent.instagram_handle && (
            <Button
              onClick={() => handleInstagramClick(agent.instagram_handle!)}
              variant="outline"
              className="flex-1 h-10"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Button>
          )}
          <Button
            onClick={() => handleContactClick(agent.email)}
            variant="default"
            className="flex-1 h-10"
          >
            <Mail className="h-4 w-4" />
            <span>Contact</span>
          </Button>
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

export default AgentSocialCard;