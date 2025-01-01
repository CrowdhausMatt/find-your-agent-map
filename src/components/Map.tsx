import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import AgentCard from './AgentCard';
import SearchBar from './SearchBar';
import MapContainer from './MapContainer';
import { Agent } from '../types';
import { supabase } from '@/integrations/supabase/client';

const fetchAgents = async () => {
  const { data, error } = await supabase
    .from('agents')
    .select('*');
  
  if (error) throw error;
  
  // Map the database fields to our frontend model
  return (data || []).map(agent => ({
    ...agent,
    sweetSpot: agent.sweet_spot, // Map sweet_spot to sweetSpot
  })) as Agent[];
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