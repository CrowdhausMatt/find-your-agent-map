import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AgentCard from './AgentCard';
import SearchBar from './SearchBar';
import { Agent } from '../types';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
  const [mapboxToken, setMapboxToken] = useState<string>(() => localStorage.getItem('mapbox_token') || '');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
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

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      if (map.current) {
        map.current.remove();
      }
      initializeMap();
    }
  };

  useEffect(() => {
    if (mapboxToken && !isMapInitialized) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {!isMapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Enter Mapbox Token</h2>
            <p className="text-sm text-gray-600 mb-4">
              Please enter your Mapbox public token. You can find this in your{' '}
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                Mapbox account
              </a>
            </p>
            <div className="space-y-4">
              <Input
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.eyJ1..."
                className="w-full"
              />
              <Button 
                onClick={handleTokenSubmit}
                className="w-full"
              >
                Initialize Map
              </Button>
            </div>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
      <SearchBar />
      {selectedAgent && (
        <AgentCard agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  );
};

export default Map;
