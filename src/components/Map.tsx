import React, { useState } from 'react';
import MapContainer from './MapContainer';
import MapLayout from './MapLayout';
import { Agent } from '../types';
import { useAgentFiltering } from '../hooks/useAgentFiltering';
import MapHeader from './MapHeader';
import { useMapState } from './MapState';

const MapComponent = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  
  const { agents, isLoading, error, groupedAgents } = useMapState();

  // Show all agents by default, filter only when there's a search
  const displayedAgents = searchLocation 
    ? useAgentFiltering(agents, searchLocation).nearbyAgents 
    : agents || [];

  const handleSearch = (location: { lat: number; lng: number }) => {
    setSearchLocation(location);
    setSelectedAgent(null);
    setIsPanelVisible(true);
  };

  const handleSelectAgent = (agent: Agent) => {
    const key = `${agent.latitude},${agent.longitude}`;
    const agentsAtLocation = groupedAgents.get(key) || [];
    
    if (agentsAtLocation.length > 1) {
      setIsPanelVisible(true);
    } else {
      setSelectedAgent(agent);
    }
  };

  if (isLoading) return <div className="w-full h-screen flex items-center justify-center">Loading agents...</div>;
  if (error) return <div className="w-full h-screen flex items-center justify-center">Error loading agents</div>;
  if (!agents || agents.length === 0) return <div className="w-full h-screen flex items-center justify-center">No agents found</div>;

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <MapContainer
          agents={agents}
          onSelectAgent={handleSelectAgent}
          center={searchLocation}
          groupedAgents={groupedAgents}
        />
      </div>
      <MapLayout
        searchLocation={searchLocation}
        onSearch={handleSearch}
        nearbyAgents={displayedAgents}
        selectedAgent={selectedAgent}
        onSelectAgent={setSelectedAgent}
        isPanelVisible={isPanelVisible}
        onClosePanel={() => setIsPanelVisible(false)}
      />
      <MapHeader />
    </div>
  );
};

export default MapComponent;