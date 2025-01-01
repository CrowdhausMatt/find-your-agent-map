import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AgentCard from './AgentCard';
import { Agent } from '../types';

// Temporary dummy data
const DUMMY_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Jane Doe',
    agency: 'Dream Homes',
    email: 'jane@example.com',
    about: 'Expert in luxury flats',
    sweetSpot: '£1M–£3M',
    latitude: 51.5074,
    longitude: -0.1278,
    photo: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'John Smith',
    agency: 'Urban Realty',
    email: 'john@example.com',
    about: 'Specializes in family homes in suburban areas',
    sweetSpot: '£500k–£1M',
    latitude: 51.5152,
    longitude: -0.1419,
    photo: '/placeholder.svg'
  }
];

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // We'll handle this properly with secrets
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-0.1276, 51.5074], // London
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each agent
    DUMMY_AGENTS.forEach((agent) => {
      const el = document.createElement('div');
      el.className = 'agent-marker';
      el.innerHTML = `
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white 
                    transform transition-transform hover:scale-110 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
      `;

      el.addEventListener('click', () => {
        setSelectedAgent(agent);
      });

      new mapboxgl.Marker(el)
        .setLngLat([agent.longitude, agent.latitude])
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0" />
      <SearchBar />
      {selectedAgent && (
        <AgentCard agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  );
};

export default Map;