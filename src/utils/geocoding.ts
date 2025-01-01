import mapboxgl from 'mapbox-gl';

export const geocodeLocation = async (locationName: string): Promise<[number, number]> => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  const accessToken = mapboxgl.accessToken;
  
  // Append "London, UK" to make the search more accurate
  const searchQuery = `${locationName}, London, UK`;
  
  const response = await fetch(
    `${baseUrl}/${encodeURIComponent(searchQuery)}.json?access_token=${accessToken}&limit=1`
  );
  
  if (!response.ok) {
    throw new Error('Geocoding failed');
  }
  
  const data = await response.json();
  
  if (!data.features || data.features.length === 0) {
    throw new Error(`Location "${locationName}" not found`);
  }
  
  const [longitude, latitude] = data.features[0].center;
  return [latitude, longitude];
};