import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import MapContainer from './MapContainer';
import MapLayout from './MapLayout';
import { Agent } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { geocodeLocation } from '../utils/geocoding';
import { useAgentFiltering } from '../hooks/useAgentFiltering';

const fetchAgents = async () => {
  console.log('Fetching agents...');
  const { data, error } = await supabase
    .from('agents')
    .select('*');
  
  if (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
  
  console.log('Raw agents data:', data);
  
  const processedAgents = await Promise.all((data || []).map(async (agent) => {
    let { latitude, longitude } = agent;

    if ((!latitude || !longitude) && agent.area) {
      try {
        console.log(`Geocoding location for agent ${agent.name}: ${agent.area}`);
        const [lat, lng] = await geocodeLocation(agent.area);
        latitude = lat;
        longitude = lng;
      } catch (error) {
        console.error(`Failed to geocode ${agent.area}:`, error);
        latitude = 51.5074;
        longitude = -0.1278;
      }
    }

    return {
      ...agent,
      sweetSpot: agent.sweet_spot,
      latitude: latitude || 51.5074,
      longitude: longitude || -0.1278,
    } as Agent;
  }));

  console.log('Processed agents:', processedAgents);
  return processedAgents;
};

const MapComponent = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  });

  const { nearbyAgents } = useAgentFiltering(agents, searchLocation);

  // Group agents by location
  const groupedAgents = useMemo(() => {
    if (!agents) return new Map<string, Agent[]>();
    
    const locationGroups = new Map<string, Agent[]>();
    agents.forEach(agent => {
      const key = `${agent.latitude},${agent.longitude}`;
      const existing = locationGroups.get(key) || [];
      locationGroups.set(key, [...existing, agent]);
    });
    return locationGroups;
  }, [agents]);

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
        nearbyAgents={nearbyAgents || []}
        selectedAgent={selectedAgent}
        onSelectAgent={setSelectedAgent}
        isPanelVisible={isPanelVisible}
        onClosePanel={() => setIsPanelVisible(false)}
      />
      <a
        href="https://knokknok.social/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-4 z-50 w-24 h-auto hover:opacity-80 transition-opacity"
      >
        <img
          src="/lovable-uploads/b050625e-3d9e-4034-98dd-18b568b1327e.png"
          alt="Knok Knok"
          className="w-full h-full object-contain"
        />
      </a>
    </div>
  );
};

export default MapComponent;