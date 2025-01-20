import React, { createContext, useContext, useState, useEffect } from 'react';
import { Agent } from '../types';
import { supabase } from '@/integrations/supabase/client';

interface MapState {
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
  agents: Agent[] | null;
  isLoading: boolean;
  error: Error | null;
  groupedAgents: Map<string, Agent[]>;
}

const MapStateContext = createContext<MapState | undefined>(undefined);

export const MapStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<Agent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [groupedAgents, setGroupedAgents] = useState<Map<string, Agent[]>>(new Map());

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('agents')
          .select('*');

        if (supabaseError) throw supabaseError;

        // Convert database response to Agent type
        const agentData = data.map((dbAgent: any): Agent => ({
          id: dbAgent.id,
          name: dbAgent.name,
          agency: dbAgent.agency,
          email: dbAgent.email,
          about: dbAgent.about,
          sweetSpot: dbAgent.sweet_spot,
          area: dbAgent.area,
          latitude: dbAgent.latitude,
          longitude: dbAgent.longitude,
          photo: dbAgent.photo,
          instagram_handle: dbAgent.instagram_handle || null,
          created_at: dbAgent.created_at
        }));

        console.log('Fetched agents:', agentData);
        setAgents(agentData);

        // Group agents by location with better precision
        const groupedByLocation = agentData.reduce((groups, agent) => {
          if (agent.latitude && agent.longitude) {
            // Use more precise coordinates for grouping
            const key = `${agent.latitude.toFixed(6)},${agent.longitude.toFixed(6)}`;
            const existingGroup = groups.get(key) || [];
            groups.set(key, [...existingGroup, agent]);
            console.log(`Grouped agent ${agent.name} at ${key}`);
          } else {
            console.log(`Agent ${agent.name} missing coordinates`);
          }
          return groups;
        }, new Map<string, Agent[]>());

        console.log('Grouped agents count:', groupedByLocation.size);
        setGroupedAgents(groupedByLocation);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <MapStateContext.Provider 
      value={{ 
        selectedAgent, 
        setSelectedAgent, 
        agents, 
        isLoading, 
        error, 
        groupedAgents 
      }}
    >
      {children}
    </MapStateContext.Provider>
  );
};

export const useMapState = () => {
  const context = useContext(MapStateContext);
  if (context === undefined) {
    throw new Error('useMapState must be used within a MapStateProvider');
  }
  return context;
};

export default MapStateContext;