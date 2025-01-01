import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Agent } from '../types';
import AgentMarker from './AgentMarker';

interface MapContainerProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

const MapContainer = ({ agents, onSelectAgent }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([51.5074, -0.1278], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Cleanup function
    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
      map.current = null;
      markers.current = [];
    };
  }, []);

  return (
    <div ref={mapContainer} className="absolute inset-0">
      {map.current && agents.map(agent => (
        <AgentMarker
          key={agent.id}
          agent={agent}
          map={map.current}
          onSelect={onSelectAgent}
        />
      ))}
    </div>
  );
};

export default MapContainer;