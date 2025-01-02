import mapboxgl from 'mapbox-gl';

export const geocodeLocation = async (locationName: string): Promise<[number, number]> => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  const accessToken = 'pk.eyJ1IjoibnVsbWF0dCIsImEiOiJjbTVkcWRqMGwweDBnMmpyMzB2N210ZzloIn0.TE1FzZdU3IsNQtSsbyhyJw';
  
  try {
    console.log(`Geocoding location: ${locationName}`);
    const response = await fetch(
      `${baseUrl}/${encodeURIComponent(locationName)}.json?access_token=${accessToken}&limit=1&country=GB&types=place,district,region,locality,neighborhood&language=en`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      console.error(`Location "${locationName}" not found`);
      throw new Error(`Location "${locationName}" not found`);
    }
    
    const [longitude, latitude] = data.features[0].center;
    console.log(`Geocoded ${locationName} to:`, { latitude, longitude });
    return [latitude, longitude];
  } catch (error) {
    console.error(`Error geocoding ${locationName}:`, error);
    throw error;
  }
};