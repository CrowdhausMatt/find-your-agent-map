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
  const [displayedAgents, setDisplayedAgents] = useState<Agent[]>([]);
  const navigate = useNavigate();
  
  const { agents, isLoading, error, groupedAgents } = useMapState();

  // Get nearby agents for the panel
  const getNearbyAgents = (agents: Agent[], searchLocation: { lat: number; lng: number } | null) => {
    if (!searchLocation || !agents) return [];
    
    return agents.filter(agent => {
      if (!agent.latitude || !agent.longitude) return false;
      
      // Calculate distance in kilometers using the Haversine formula
      const R = 6371; // Earth's radius in km
      const dLat = (agent.latitude - searchLocation.lat) * Math.PI / 180;
      const dLon = (agent.longitude - searchLocation.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(searchLocation.lat * Math.PI / 180) * Math.cos(agent.latitude * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      return distance <= 1; // Only return agents within 1km
    });
  };

  const nearbyAgents = searchLocation ? getNearbyAgents(agents || [], searchLocation) : [];

  const handleSearch = (location: { lat: number; lng: number }) => {
    setSearchLocation(location);
    setSelectedAgent(null);
    setIsPanelVisible(true);
    setDisplayedAgents(getNearbyAgents(agents || [], location));
  };

  const handleSelectAgent = (agent: Agent) => {
    const key = `${agent.latitude},${agent.longitude}`;
    const agentsAtLocation = groupedAgents.get(key) || [];
    
    if (agentsAtLocation.length > 1) {
      setDisplayedAgents(agentsAtLocation);
      setIsPanelVisible(true);
      setSelectedAgent(null);
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
        nearbyAgents={displayedAgents.length > 0 ? displayedAgents : nearbyAgents}
        selectedAgent={selectedAgent}
        onSelectAgent={setSelectedAgent}
        isPanelVisible={isPanelVisible}
        onClosePanel={() => {
          setIsPanelVisible(false);
          setDisplayedAgents([]);
        }}
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