import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import AgentCard from './AgentCard';
import SearchBar from './SearchBar';
import MapContainer from './MapContainer';
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
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        agents={DUMMY_AGENTS}
        onSelectAgent={setSelectedAgent}
      />
      <div className="relative z-10">
        <SearchBar />
        {selectedAgent && (
          <AgentCard
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Map;