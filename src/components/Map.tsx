import React, { useState } from 'react';
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

const Map = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  });

  const { nearbyAgents } = useAgentFiltering(agents, searchLocation);

  const handleSearch = (location: { lat: number; lng: number }) => {
    setSearchLocation(location);
    setSelectedAgent(null);
  };

  if (isLoading) return <div className="w-full h-screen flex items-center justify-center">Loading agents...</div>;
  if (error) return <div className="w-full h-screen flex items-center justify-center">Error loading agents</div>;
  if (!agents || agents.length === 0) return <div className="w-full h-screen flex items-center justify-center">No agents found</div>;

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <MapContainer
          agents={agents}
          onSelectAgent={setSelectedAgent}
          center={searchLocation}
        />
      </div>
      <MapLayout
        searchLocation={searchLocation}
        onSearch={handleSearch}
        nearbyAgents={nearbyAgents || []}
        selectedAgent={selectedAgent}
        onSelectAgent={setSelectedAgent}
      />
    </div>
  );
};

export default Map;