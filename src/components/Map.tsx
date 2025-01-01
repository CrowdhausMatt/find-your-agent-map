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
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([51.5074, -0.1278], 12);

    // Add the fun, cartoon-style tiles
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    }).addTo(map.current);

    // Custom icon for markers
    const customIcon = L.divIcon({
      className: 'agent-marker',
      html: `
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white 
                    transform transition-transform hover:scale-110 cursor-pointer">
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
      <div ref={mapContainer} className="absolute inset-0" />
      <SearchBar />
      {selectedAgent && (
        <AgentCard agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  );
};

export default Map;