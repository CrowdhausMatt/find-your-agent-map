import { Agent } from '../types';

export const useAgentFiltering = (
  agents: Agent[] | undefined,
  searchLocation: { lat: number; lng: number } | null
) => {
  const nearbyAgents = agents?.filter(agent => {
    if (!searchLocation) return false;
    
    const distance = Math.sqrt(
      Math.pow((agent.latitude - searchLocation.lat) * 111, 2) +
      Math.pow((agent.longitude - searchLocation.lng) * 111, 2)
    );
    
    return distance <= 1;
  });

  return { nearbyAgents };
};