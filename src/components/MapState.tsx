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

        const agentData = data as Agent[];
        setAgents(agentData);

        // Group agents by location
        const groupedByLocation = agentData.reduce((groups, agent) => {
          if (agent.latitude && agent.longitude) {
            const key = `${agent.latitude},${agent.longitude}`;
            const existingGroup = groups.get(key) || [];
            groups.set(key, [...existingGroup, agent]);
          }
          return groups;
        }, new Map<string, Agent[]>());

        setGroupedAgents(groupedByLocation);
      } catch (err) {
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

// Helper function to convert database agent to Agent type
export const convertToAgent = (dbAgent: any): Agent => {
  return {
    ...dbAgent,
    instagram_handle: dbAgent.instagram_handle || null,
  };
};

export default MapStateContext;