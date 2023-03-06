import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type IProps = {
  text: string;
  lat: number;
  lng: number;
};

const zoom = 13;

const containerStyle = { height: '400px', width: '100%', maxWidth: '50rem' };

function Map({ text, lat, lng }: IProps) {
  const center = { lat: Number(lat), lng: Number(lng) };
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <Marker position={center} title={text} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
