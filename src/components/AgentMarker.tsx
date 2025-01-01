import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Agent } from '../types';

interface AgentMarkerProps {
  agent: Agent;
  map: mapboxgl.Map;
  onSelect: (agent: Agent) => void;
  agentCount?: number;
}

const AgentMarker = ({ agent, map, onSelect, agentCount }: AgentMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;

    try {
      // Create marker element
      const el = document.createElement('div');
      elementRef.current = el;
      el.className = 'agent-marker';
      el.innerHTML = `
        <div class="relative">
          <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg 
                      transform transition-transform hover:scale-110 cursor-pointer">
            <img src="${agent.photo || '/placeholder.svg'}" 
                 class="w-full h-full object-cover" 
                 alt="${agent.name}" />
          </div>
          ${agentCount ? `
            <div class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 
                        flex items-center justify-center border border-white">
              ${agentCount}
            </div>
          ` : ''}
        </div>
      `;

      // Remove existing marker if it exists
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Create and add new marker
      markerRef.current = new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat([agent.longitude, agent.latitude])
        .addTo(map);

      // Add click handler
      const handleClick = () => onSelect(agent);
      el.addEventListener('click', handleClick);

      // Cleanup function
      return () => {
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
        if (elementRef.current) {
          elementRef.current.removeEventListener('click', handleClick);
          elementRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error creating marker:', error);
    }
  }, [agent, map, onSelect, agentCount]);

  return null;
};

export default AgentMarker;