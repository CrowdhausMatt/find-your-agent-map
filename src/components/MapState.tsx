import { Agent } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { geocodeLocation } from '../utils/geocoding';
import { useMemo } from 'react';

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

export const useMapState = () => {
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  });

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

  return {
    agents,
    isLoading,
    error,
    groupedAgents
  };
};