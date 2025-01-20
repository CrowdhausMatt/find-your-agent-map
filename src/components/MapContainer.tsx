import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Agent } from '../types';
import AgentMarker from './AgentMarker';

interface MapContainerProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  center?: { lat: number; lng: number } | null;
  groupedAgents: Map<string, Agent[]>;
}

const MapContainer = ({ agents, onSelectAgent, center, groupedAgents }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      console.log('Initializing map...');
      mapboxgl.accessToken = 'pk.eyJ1IjoibnVsbWF0dCIsImEiOiJjbTVkcWRqMGwweDBnMmpyMzB2N210ZzloIn0.TE1FzZdU3IsNQtSsbyhyJw';
      
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/nulmatt/cm5e0vnpz004v01sc25uj12pv',
        zoom: 11,
        center: [-0.1278, 51.5074], // London center
        pitch: 45,
      });

      mapInstance.on('load', () => {
        console.log('Map loaded successfully');
        map.current = mapInstance;

        // Add navigation controls
        mapInstance.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        // Log agents for debugging
        console.log('Agents to display:', agents);
        console.log('Grouped agents:', groupedAgents);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map.current && center) {
      map.current.flyTo({
        center: [center.lng, center.lat],
        zoom: 14,
        essential: true
      });
    }
  }, [center]);

  // Add debugging for markers
  useEffect(() => {
    if (map.current) {
      console.log('Current agents on map:', Array.from(groupedAgents.entries()));
    }
  }, [groupedAgents]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0 z-0" />
      {map.current && Array.from(groupedAgents.entries()).map(([key, agentsAtLocation]) => {
        const [firstAgent] = agentsAtLocation;
        if (!firstAgent.latitude || !firstAgent.longitude) {
          console.log('Agent missing coordinates:', firstAgent);
          return null;
        }
        console.log('Rendering marker for agent:', firstAgent.name, 'at position:', firstAgent.latitude, firstAgent.longitude);
        return (
          <AgentMarker
            key={key}
            agent={firstAgent}
            map={map.current!}
            onSelect={onSelectAgent}
            agentCount={agentsAtLocation.length > 1 ? agentsAtLocation.length : undefined}
          />
        );
      })}
    </div>
  );
};

export default MapContainer;