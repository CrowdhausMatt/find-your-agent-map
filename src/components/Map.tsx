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
  const { data, error } = await supabase
    .from('agents')
    .select('*');
  
  if (error) throw error;
  
  // Process each agent to ensure they have coordinates
  const processedAgents = await Promise.all((data || []).map(async (agent) => {
    let { latitude, longitude } = agent;

    // If we don't have coordinates but have a location name, geocode it
    if ((!latitude || !longitude) && agent.area) {
      try {
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
      latitude,
      longitude,
    } as Agent;
  }));

  return processedAgents;
};

const Map = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  });

  if (error) {
    console.error('Error loading agents:', error);
    return <div>Error loading agents</div>;
  }

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        agents={agents || []}
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