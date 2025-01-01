import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AgentCard from './AgentCard';
import SearchBar from './SearchBar';
import { Agent } from '../types';

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
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map only if it hasn't been initialized
    if (!map.current) {
      map.current = L.map(mapContainer.current, {
        center: [51.5074, -0.1278],
        zoom: 13
      });

      // Add Mapbox tiles
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoibnVsbG1hdHQiLCJhIjoiY201ZHFkajBsd3gwbjJyMzB2N210ZzloIn0.TE1FzZdU3IsNQtSsbyhyJw',
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 18
      }).addTo(map.current);

      // Custom icon for markers
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

      // Add markers for each agent
      DUMMY_AGENTS.forEach((agent) => {
        const marker = L.marker([agent.latitude, agent.longitude], { icon: customIcon })
          .addTo(map.current!)
          .on('click', () => {
            setSelectedAgent(agent);
          });
        markers.current.push(marker);
      });
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        markers.current = [];
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0 z-0" />
      <div className="relative z-10">
        <SearchBar />
        {selectedAgent && (
          <AgentCard agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
        )}
      </div>
    </div>
  );
};

export default Map;