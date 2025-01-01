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

    try {
      console.log('Initializing map...');
      // Initialize map
      mapboxgl.accessToken = 'pk.eyJ1IjoibnVsbWF0dCIsImEiOiJjbTVkcWRqMGwweDBnMmpyMzB2N210ZzloIn0.TE1FzZdU3IsNQtSsbyhyJw';
      
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/nulmatt/cm5e0vnpz004v01sc25uj12pv',
        zoom: 12,
        center: [-0.1278, 51.5074], // London coordinates
        pitch: 45,
      });

      mapInstance.on('load', () => {
        console.log('Map loaded successfully');
        // Set map reference only after it's fully loaded
        map.current = mapInstance;

        // Add navigation controls
        mapInstance.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Log when agents prop changes
  useEffect(() => {
    console.log('Agents prop updated:', agents);
  }, [agents]);

  return (
    <div ref={mapContainer} className="absolute inset-0 z-0">
      {map.current && agents && agents.map(agent => {
        console.log('Rendering marker for agent:', agent);
        return (
          <AgentMarker
            key={agent.id}
            agent={agent}
            map={map.current!}
            onSelect={onSelectAgent}
          />
        );
      })}
    </div>
  );
};

export default MapContainer;