import mapboxgl from 'mapbox-gl';

export const geocodeLocation = async (locationName: string): Promise<[number, number]> => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  const accessToken = 'pk.eyJ1IjoibnVsbWF0dCIsImEiOiJjbTVkcWRqMGwweDBnMmpyMzB2N210ZzloIn0.TE1FzZdU3IsNQtSsbyhyJw';
  
  try {
    // Split the location string by commas and take the first location
    const primaryLocation = locationName.split(',')[0].trim();
    
    console.log(`Geocoding primary location: ${primaryLocation}`);
    const response = await fetch(
      `${baseUrl}/${encodeURIComponent(primaryLocation)}.json?access_token=${accessToken}&limit=1&country=GB&types=place,district,region,locality,neighborhood&language=en`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      console.error(`Location "${primaryLocation}" not found`);
      throw new Error(`Location "${primaryLocation}" not found`);
    }
    
    const [longitude, latitude] = data.features[0].center;
    console.log(`Geocoded ${primaryLocation} to:`, { latitude, longitude });
    return [latitude, longitude];
  } catch (error) {
    console.error(`Error geocoding location:`, error);
    throw error;
  }
};