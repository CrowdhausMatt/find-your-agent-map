import Map from '../components/Map';
import { MapStateProvider } from '../components/MapState';

const Index = () => {
  return (
    <MapStateProvider>
      <Map />
    </MapStateProvider>
  );
};

export default Index;