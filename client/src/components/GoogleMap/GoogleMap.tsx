import { Box, Text, Flex } from '@chakra-ui/react';
import GoogleMapReact from 'google-map-react';
import { IoLocationSharp } from 'react-icons/all';

type IProps = {
  text: string;
  lat: number;
  lng: number;
};

const LocationPin = ({ text, lat, lng }: IProps) => (
  <Flex alignItems="center">
    <Box fontSize="30px">
      <IoLocationSharp />
    </Box>
    <Text fontSize="16px">{text}</Text>
  </Flex>
);

const GoogleMap = ({ text, lat, lng }: IProps) => {
  const zoom = 13;

  return (
    <div style={{ height: '400px', width: '100%', maxWidth: '50rem' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={{ lat: Number(lat), lng: Number(lng) }}
        defaultZoom={zoom}
      >
        <LocationPin lat={Number(lat)} lng={Number(lng)} text={text} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
