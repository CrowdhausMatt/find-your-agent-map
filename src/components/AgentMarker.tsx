import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Agent } from '../types';

interface AgentMarkerProps {
  agent: Agent;
  map: mapboxgl.Map;
  onSelect: (agent: Agent) => void;
}

const AgentMarker = ({ agent, map, onSelect }: AgentMarkerProps) => {
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
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white 
                    transform transition-transform hover:scale-110 cursor-pointer shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
      `;

      // Remove existing marker if it exists
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Create and add new marker with draggable: false to prevent movement
      markerRef.current = new mapboxgl.Marker({
        element: el,
        draggable: false
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
  }, [agent, map, onSelect]);

  return null;
};

export default AgentMarker;