import React from 'react';
import SearchBar from './SearchBar';
import AgentList from './AgentList';
import AgentCard from './AgentCard';
import { Agent } from '../types';

interface MapLayoutProps {
  searchLocation: { lat: number; lng: number } | null;
  onSearch: (location: { lat: number; lng: number }) => void;
  nearbyAgents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent | null) => void;
  isPanelVisible: boolean;
  onClosePanel: () => void;
}

const MapLayout = ({
  searchLocation,
  onSearch,
  nearbyAgents,
  selectedAgent,
  onSelectAgent,
  isPanelVisible,
  onClosePanel,
}: MapLayoutProps) => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <SearchBar onSearch={onSearch} />
      </div>
      <AgentList
        agents={nearbyAgents}
        onSelectAgent={onSelectAgent}
        visible={isPanelVisible}
        onClose={onClosePanel}
      />
      {selectedAgent && (
        <div className="pointer-events-auto">
          <AgentCard
            agent={selectedAgent}
            onClose={() => onSelectAgent(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MapLayout;