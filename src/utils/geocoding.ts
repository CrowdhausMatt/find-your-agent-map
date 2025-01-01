import mapboxgl from 'mapbox-gl';

export const geocodeLocation = async (locationName: string): Promise<[number, number]> => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  const accessToken = mapboxgl.accessToken;
  
  // Only search for the area name within London to get more accurate results
  // and keep the query string shorter
  const searchQuery = `${locationName}, London`;
  
  try {
    const response = await fetch(
      `${baseUrl}/${encodeURIComponent(searchQuery)}.json?access_token=${accessToken}&limit=1`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      throw new Error(`Location "${locationName}" not found`);
    }
    
    const [longitude, latitude] = data.features[0].center;
    return [latitude, longitude];
  } catch (error) {
    console.error(`Error geocoding ${locationName}:`, error);
    // Return coordinates for central London as fallback
    return [51.5074, -0.1278];
  }
};
