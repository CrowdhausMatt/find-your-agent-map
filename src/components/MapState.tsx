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

        console.log('Total agents fetched:', agentData.length);
        setAgents(agentData);

        // Group agents by location with less precision to handle floating point differences
        const groupedByLocation = agentData.reduce((groups, agent) => {
          if (agent.latitude && agent.longitude) {
            // Round to 4 decimal places (approximately 11 meters of precision)
            const key = `${Number(agent.latitude).toFixed(4)},${Number(agent.longitude).toFixed(4)}`;
            if (!groups.has(key)) {
              groups.set(key, []);
            }
            groups.get(key)?.push(agent);
            console.log(`Grouped agent ${agent.name} at ${key}`);
          } else {
            console.warn(`Agent ${agent.name} missing coordinates`);
          }
          return groups;
        }, new Map<string, Agent[]>());

        console.log('Number of unique locations:', groupedByLocation.size);
        console.log('Grouped locations:', Array.from(groupedByLocation.keys()));
        
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