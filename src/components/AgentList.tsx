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
    <div className="absolute left-0 right-0 bottom-0 h-1/4 bg-white shadow-xl overflow-hidden z-50">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Agents in this area</h2>
        <p className="text-sm text-gray-500">{agents.length} agents found</p>
      </div>
      <div className="overflow-x-auto h-[calc(100%-5rem)] p-4">
        <div className="flex space-x-4">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 w-64"
              onClick={() => onSelectAgent(agent)}
            >
              <div className="flex flex-col space-y-2">
                <img
                  src={agent.photo || '/placeholder.svg'}
                  alt={agent.name}
                  className="w-full h-32 rounded-lg object-cover"
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
    </div>
  );
};

export default AgentList;