import { useState, SyntheticEvent, useEffect } from 'react';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { Input, FormControl, FormLabel, FormErrorMessage, Box } from '@chakra-ui/react';
import Geocode from '~/consts/geocode';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';

const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = ['places'];

type IProps = {
  lat?: number;
  lng?: number;
  register: UseFormRegister<
    {
      latitude: number;
      longitude: number;
    } & any
  >;
  setValue: UseFormSetValue<
    {
      latitude: number;
      longitude: number;
    } & any
  >;
  errors: FieldErrors<
    {
      latitude: number;
      longitude: number;
    } & any
  >;
};

function PlacesSearch({ lat, lng, register, setValue, errors }: IProps) {
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [address, setAddress] = useState('');
  const handleChangeAddress = (e: SyntheticEvent) => {
    setAddress((e.target as HTMLInputElement).value);
    setValue('latitude', 1000, { shouldValidate: true });
  };

  const isRequired = lat === undefined;

  useEffect(() => {
    if (lat && lng) {
      Geocode.fromLatLng(lat.toString(), lng.toString()).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setAddress(address);
        },
        (error) => {
          setAddress('');
        },
      );
    }
  }, []);

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };
  const onPlacesChanged = () => {
    let places = searchBox?.getPlaces();
    if (places && places[0] && places[0].formatted_address) {
      setAddress(places[0].formatted_address);
      if (places[0]?.geometry?.location) {
        setValue('latitude', places[0].geometry.location.lat(), {
          shouldValidate: true,
        });
        setValue('longitude', places[0].geometry.location.lng(), {
          shouldValidate: true,
        });
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY} libraries={libraries}>
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <FormControl isInvalid={!!errors.latitude || !!errors.longitude} isRequired={isRequired}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input id="address" placeholder="address" value={address} onChange={handleChangeAddress} />
            <FormErrorMessage>Input correct address please</FormErrorMessage>
          </FormControl>
        </StandaloneSearchBox>
      </LoadScript>
      <Input hidden id="latitude" {...register('latitude', { valueAsNumber: true })} />
      <Input hidden id="longitude" {...register('longitude', { valueAsNumber: true })} />
    </Box>
  );
}

export default PlacesSearch;
