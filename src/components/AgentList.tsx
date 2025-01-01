import React from 'react';
import { Agent } from '../types';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AgentListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  visible: boolean;
  onClose?: () => void;
}

const AgentList = ({ agents, onSelectAgent, visible, onClose }: AgentListProps) => {
  if (!visible) return null;

  return (
    <div className="absolute left-0 right-0 bottom-0 h-72 bg-white/80 backdrop-blur-md shadow-xl overflow-hidden pointer-events-auto rounded-t-xl border-t border-gray-200">
      <div className="p-2 border-b border-gray-200 flex items-center justify-between relative">
        <div className="flex-1">
          <h2 className="text-xs font-medium text-gray-900">Nearby Agents</h2>
          <p className="text-xs text-gray-500">{agents.length} agents found within 1km</p>
        </div>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto absolute top-2 left-1/2 transform -translate-x-1/2" />
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-2.5rem)] p-2">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="cursor-pointer hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 bg-white/70 backdrop-blur-sm h-70 w-full"
                onClick={() => onSelectAgent(agent)}
              >
                <div className="h-48 relative overflow-hidden rounded-t-lg">
                  <img
                    src={agent.photo || '/placeholder.svg'}
                    alt={agent.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-1.5">
                  <h3 className="font-medium text-xs truncate">{agent.name}</h3>
                  <p className="text-[10px] text-gray-500 truncate">{agent.agency}</p>
                  <p className="text-[10px] text-gray-500 truncate">{agent.area}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentList;