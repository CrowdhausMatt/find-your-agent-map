import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import AgentCard from './AgentCard';
import SearchBar from './SearchBar';
import MapContainer from './MapContainer';
import AgentList from './AgentList';
import { Agent } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { geocodeLocation } from '../utils/geocoding';

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

  const handleSearch = (location: { lat: number; lng: number }) => {
    setSearchLocation(location);
    setSelectedAgent(null);
  };

  const filteredAgents = agents?.filter(agent => {
    if (!searchLocation) return true; // Show all agents when no search is performed
    
    // Calculate distance between agent and search location (simple approximation)
    const distance = Math.sqrt(
      Math.pow((agent.latitude - searchLocation.lat) * 111, 2) +
      Math.pow((agent.longitude - searchLocation.lng) * 111, 2)
    );
    
    // Show agents within approximately 1km of search location
    return distance <= 1;
  });

  if (isLoading) {
    console.log('Loading agents...');
    return <div className="w-full h-screen flex items-center justify-center">Loading agents...</div>;
  }

  if (error) {
    console.error('Error loading agents:', error);
    return <div className="w-full h-screen flex items-center justify-center">Error loading agents</div>;
  }

  if (!agents || agents.length === 0) {
    console.log('No agents found');
    return <div className="w-full h-screen flex items-center justify-center">No agents found</div>;
  }

  console.log('Rendering map with agents:', agents);

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        agents={filteredAgents}
        onSelectAgent={setSelectedAgent}
        center={searchLocation}
      />
      <div className="relative z-10">
        <SearchBar onSearch={handleSearch} />
        <AgentList
          agents={filteredAgents || []}
          onSelectAgent={setSelectedAgent}
          visible={!!searchLocation}
        />
        {selectedAgent && (
          <AgentCard
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Map;