import React, { useState } from 'react';
import MapContainer from './MapContainer';
import MapLayout from './MapLayout';
import { Agent } from '../types';
import { useAgentFiltering } from '../hooks/useAgentFiltering';
import MapHeader from './MapHeader';
import { useMapState } from './MapState';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const MapComponent = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const navigate = useNavigate();
  
  const { agents, isLoading, error, groupedAgents } = useMapState();

  // Always show all agents, filter only when there's a search
  const displayedAgents = agents || [];

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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Button 
          onClick={() => navigate('/register')}
          className="bg-primary text-white shadow-lg hover:bg-primary/90"
        >
          Want to appear here?
        </Button>
      </div>
    </div>
  );
};

export default MapComponent;