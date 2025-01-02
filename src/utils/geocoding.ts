import mapboxgl from 'mapbox-gl';

export const geocodeLocation = async (locationName: string): Promise<[number, number]> => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  const accessToken = 'pk.eyJ1IjoibnVsbWF0dCIsImEiOiJjbTVkcWRqMGwweDBnMmpyMzB2N210ZzloIn0.TE1FzZdU3IsNQtSsbyhyJw';
  
  // Add UK context if not already present
  const searchQuery = locationName.toLowerCase().includes('uk') || 
                     locationName.toLowerCase().includes('united kingdom') || 
                     locationName.toLowerCase().includes('england') || 
                     locationName.toLowerCase().includes('scotland') || 
                     locationName.toLowerCase().includes('wales') || 
                     locationName.toLowerCase().includes('northern ireland')
    ? locationName
    : `${locationName}, UK`;
  
  try {
    console.log(`Geocoding location: ${searchQuery}`);
    const response = await fetch(
      `${baseUrl}/${encodeURIComponent(searchQuery)}.json?access_token=${accessToken}&limit=1&country=GB`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      console.error(`Location "${searchQuery}" not found`);
      throw new Error(`Location "${searchQuery}" not found`);
    }
    
    const [longitude, latitude] = data.features[0].center;
    console.log(`Geocoded ${searchQuery} to:`, { latitude, longitude });
    return [latitude, longitude];
  } catch (error) {
    console.error(`Error geocoding ${searchQuery}:`, error);
    throw error;
  }
};