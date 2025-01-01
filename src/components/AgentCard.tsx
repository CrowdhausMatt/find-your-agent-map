import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Agent } from '../types';
import { ScrollArea } from './ui/scroll-area';

interface AgentCardProps {
  agent: Agent;
  onClose: () => void;
}

const AgentCard = ({ agent, onClose }: AgentCardProps) => {
  return (
    <div className="absolute right-4 top-20 w-80 z-20">
      <Card className="flex flex-col shadow-xl h-[80vh]">
        <div className="p-4 border-b">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          <div className="flex items-center space-x-4">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-lg">{agent.name}</h3>
              <p className="text-gray-600">{agent.agency}</p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-4 py-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">About</h4>
              <p className="text-sm text-gray-600">{agent.about}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Sweet Spot</h4>
              <p className="text-sm text-gray-600">{agent.sweetSpot}</p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <Button
            className="w-full"
            onClick={() => window.location.href = `mailto:${agent.email}`}
          >
            Contact Agent
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AgentCard;