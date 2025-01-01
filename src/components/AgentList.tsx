import React from 'react';
import { Agent } from '../types';
import { Card } from './ui/card';

interface AgentListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  visible: boolean;
}

const AgentList = ({ agents, onSelectAgent, visible }: AgentListProps) => {
  if (!visible) return null;

  return (
    <div className="absolute left-4 top-20 bottom-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Agents in this area</h2>
        <p className="text-sm text-gray-500">{agents.length} agents found</p>
      </div>
      <div className="overflow-y-auto h-[calc(100%-5rem)] p-4 space-y-4">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectAgent(agent)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={agent.photo || '/placeholder.svg'}
                alt={agent.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{agent.name}</h3>
                <p className="text-sm text-gray-500">{agent.agency}</p>
                <p className="text-sm text-gray-500">{agent.area}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentList;