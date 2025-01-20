import React, { useState, useEffect } from 'react';
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
  const { agents, isLoading, error, groupedAgents } = useMapState();
  const [displayedAgents, setDisplayedAgents] = useState<Agent[]>([]);
  const navigate = useNavigate();

  // Initialize displayedAgents with all agents when they are loaded
  useEffect(() => {
    if (agents) {
      setDisplayedAgents(agents);
    }
  }, [agents]);
  
  // Get nearby agents for the panel
  const getNearbyAgents = (agents: Agent[], searchLocation: { lat: number; lng: number } | null) => {
    if (!searchLocation || !agents) return [];
    
    // Convert km to degrees (approximately)
    const kmToDegrees = 1 / 111; // 1 degree ≈ 111km
    const radius = 1 * kmToDegrees; // 1km radius
    
    return agents.filter(agent => {
      if (!agent.latitude || !agent.longitude) return false;
      
      // Simple bounding box check first (optimization)
      const latDiff = Math.abs(agent.latitude - searchLocation.lat);
      const lngDiff = Math.abs(agent.longitude - searchLocation.lng);
      
      if (latDiff > radius || lngDiff > radius) return false;
      
      // More precise distance calculation using the Haversine formula
      const R = 6371; // Earth's radius in km
      const dLat = (agent.latitude - searchLocation.lat) * Math.PI / 180;
      const dLon = (agent.longitude - searchLocation.lng) * Math.PI / 180;
      const lat1 = searchLocation.lat * Math.PI / 180;
      const lat2 = agent.latitude * Math.PI / 180;
      
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1) * Math.cos(lat2) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      console.log(`Distance from search location to ${agent.name}: ${distance.toFixed(2)}km`);
      return distance <= 1; // Within 1km
    });
  };

  const handleSearch = (location: { lat: number; lng: number }) => {
    console.log('Search location:', location);
    setSearchLocation(location);
    setSelectedAgent(null);
    setIsPanelVisible(true);
    
    // Get all agents from grouped locations
    const allAgents: Agent[] = [];
    groupedAgents.forEach(agentsAtLocation => {
      allAgents.push(...agentsAtLocation);
    });
    
    const nearby = getNearbyAgents(allAgents, location);
    console.log('Found nearby agents:', nearby.length);
    setDisplayedAgents(nearby);
  };

  const handleSelectAgent = (agent: Agent) => {
    if (!agent.latitude || !agent.longitude) return;
    
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
        nearbyAgents={displayedAgents}
        selectedAgent={selectedAgent}
        onSelectAgent={setSelectedAgent}
        isPanelVisible={isPanelVisible}
        onClosePanel={() => {
          setIsPanelVisible(false);
          setDisplayedAgents(agents || []); // Reset to all agents when closing panel
        }}
      />
      <MapHeader />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-4">
        <Button 
          onClick={() => navigate('/register')}
          className="bg-primary text-white shadow-lg hover:bg-primary/90"
        >
          Want to appear here?
        </Button>
        <Button 
          onClick={() => navigate('/social-index')}
          className="bg-purple-600 text-white shadow-lg hover:bg-purple-700"
        >
          Social Index
        </Button>
      </div>
    </div>
  );
};

export default MapComponent;