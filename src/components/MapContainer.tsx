import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Agent } from '../types';
import AgentMarker from './AgentMarker';

interface MapContainerProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

const MapContainer = ({ agents, onSelectAgent }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoibnVsbWF0dCIsImEiOiJjbTVkcWRqMGwweDBnMmpyMzB2N210ZzloIn0.TE1FzZdU3IsNQtSsbyhyJw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 12,
      center: [-0.1278, 51.5074], // London coordinates
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapContainer} className="absolute inset-0 z-0">
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