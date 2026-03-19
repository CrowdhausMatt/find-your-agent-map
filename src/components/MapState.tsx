import React, { createContext, useContext, useState, useEffect } from 'react';
import { Agent } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { geocodeLocation } from '@/utils/geocoding';

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

  // Helper function to get the most relevant location from an area string
  const getRelevantLocation = (area: string): string => {
    // Split the area string and look for known location patterns
    const parts = area.toLowerCase().split(/[,\s]+/);
    
    // List of known London areas/neighborhoods (add more as needed)
    const knownAreas = new Set([
      'wimbledon', 'chelsea', 'kensington', 'hackney', 'islington', 
      'camden', 'fulham', 'clapham', 'battersea', 'richmond',
      'greenwich', 'hampstead', 'highgate', 'muswell hill', 'crouch end'
    ]);

    // First try to find a known area
    for (const part of parts) {
      if (knownAreas.has(part)) {
        return part;
      }
    }

    // If no known area is found, use the first substantial word
    // (avoiding common street-related words)
    const ignoredWords = new Set(['street', 'road', 'avenue', 'lane', 'way', 'close']);
    for (const part of parts) {
      if (part.length > 2 && !ignoredWords.has(part)) {
        return part;
      }
    }

    // If nothing else works, return the original area
    return area;
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data, error: supabaseError } = await (supabase as any)
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

        // Group agents by geocoded location
        const groupedByLocation = new Map<string, Agent[]>();
        
        for (const agent of agentData) {
          if (!agent.area) {
            console.warn(`Agent ${agent.name} has no area specified`);
            continue;
          }

          try {
            const relevantLocation = getRelevantLocation(agent.area);
            console.log(`Processing agent ${agent.name} with area: ${agent.area}, using location: ${relevantLocation}`);
            
            const [lat, lng] = await geocodeLocation(relevantLocation);
            const locationKey = `${lat},${lng}`;

            if (!groupedByLocation.has(locationKey)) {
              groupedByLocation.set(locationKey, []);
            }
            
            // Update the agent's coordinates based on the geocoded location
            const agentWithCoords = {
              ...agent,
              latitude: lat,
              longitude: lng
            };
            
            groupedByLocation.get(locationKey)?.push(agentWithCoords);
            console.log(`Grouped agent ${agent.name} at ${locationKey}`);
          } catch (error) {
            console.warn(`Failed to geocode location for agent ${agent.name}:`, error);
          }
        }

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