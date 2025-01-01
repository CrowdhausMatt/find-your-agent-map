import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Agent } from '../types';

interface AgentMarkerProps {
  agent: Agent;
  map: L.Map;
  onSelect: (agent: Agent) => void;
}

const AgentMarker = ({ agent, map, onSelect }: AgentMarkerProps) => {
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const customIcon = L.divIcon({
      className: 'agent-marker',
      html: `
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white 
                    transform transition-transform hover:scale-110 cursor-pointer shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    markerRef.current = L.marker([agent.latitude, agent.longitude], { icon: customIcon })
      .addTo(map)
      .on('click', () => onSelect(agent));

    // Cleanup function to remove marker when component unmounts
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, [agent, map, onSelect]);

  return null;
};

export default AgentMarker;