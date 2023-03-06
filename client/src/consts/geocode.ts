import Geocode from 'react-geocode';

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
Geocode.setLocationType('ROOFTOP');

export default Geocode;
