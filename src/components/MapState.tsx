import React, { createContext, useContext, useState } from 'react';
import { Agent } from '../types';

interface MapState {
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
}

const MapStateContext = createContext<MapState | undefined>(undefined);

export const MapStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <MapStateContext.Provider value={{ selectedAgent, setSelectedAgent }}>
      {children}
    </MapStateContext.Provider>
  );
};

export const useMapState = () => {
  const context = useContext(MapStateContext);
  if (context === undefined) {
    throw new Error('useMapState must be used within a MapStateProvider');
  }
  return context;
};

// Helper function to convert database agent to Agent type
export const convertToAgent = (dbAgent: any): Agent => {
  return {
    ...dbAgent,
    instagram_handle: dbAgent.instagram_handle || null, // Add this line to handle the new field
  };
};

export default MapStateContext;