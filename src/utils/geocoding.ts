import mapboxgl from 'mapbox-gl';

export const geocodeLocation = async (locationName: string): Promise<[number, number]> => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  const accessToken = mapboxgl.accessToken;
  
  // Clean and truncate the location name to avoid query length issues
  // Only take the first part before any comma or separator
  const cleanedLocation = locationName.split(/[,|&]/)[0].trim();
  
  // Add London context but keep query short
  const searchQuery = `${cleanedLocation}, London`;
  
  try {
    const response = await fetch(
      `${baseUrl}/${encodeURIComponent(searchQuery)}.json?access_token=${accessToken}&limit=1`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      throw new Error(`Location "${cleanedLocation}" not found`);
    }
    
    const [longitude, latitude] = data.features[0].center;
    return [latitude, longitude];
  } catch (error) {
    console.error(`Error geocoding ${cleanedLocation}:`, error);
    // Return coordinates for central London as fallback
    return [51.5074, -0.1278];
  }
};
