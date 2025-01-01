import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import AgentCard from './AgentCard';
import SearchBar from './SearchBar';
import MapContainer from './MapContainer';
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
  
  // Process each agent to ensure they have coordinates
  const processedAgents = await Promise.all((data || []).map(async (agent) => {
    let { latitude, longitude } = agent;

    // If we don't have coordinates but have a location name, geocode it
    if ((!latitude || !longitude) && agent.area) {
      try {
        console.log(`Geocoding location for agent ${agent.name}: ${agent.area}`);
        const [lat, lng] = await geocodeLocation(agent.area);
        latitude = lat;
        longitude = lng;
      } catch (error) {
        console.error(`Failed to geocode ${agent.area}:`, error);
        // Use a default location in central London if geocoding fails
        latitude = 51.5074;
        longitude = -0.1278;
      }
    }

    return {
      ...agent,
      sweetSpot: agent.sweet_spot,
      latitude: latitude || 51.5074, // Ensure we always have a fallback
      longitude: longitude || -0.1278,
    } as Agent;
  }));

  console.log('Processed agents:', processedAgents);
  return processedAgents;
};

const Map = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
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
        agents={agents}
        onSelectAgent={setSelectedAgent}
      />
      <div className="relative z-10">
        <SearchBar />
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