type TAddressComponent = {
  types: string[];
  long_name: string;
};

const parseGoogleAddressComponents = (addressComponents: TAddressComponent[]) => {
  let components: { [key: string]: string } = {};
  addressComponents.forEach((addressComponent) => {
    addressComponent.types.forEach((type) => {
      components[type] = addressComponent.long_name;
    });
  });
  return components;
};

const getFormatAddress = (addressComponents: TAddressComponent[]) => {
  let components = parseGoogleAddressComponents(addressComponents);
  let res = '';
  if (components.route) {
    res += components.route + ' ';
    if (components.street_number) {
      res += components.street_number + ' • ';
    } else {
      res += '• ';
    }
  }

  if (components.locality) {
    res += components.locality + ' • ';
  } else if (components.postal_town) {
    res += components.postal_town + ' • ';
  }

  if (components.country) {
    res += components.country;
  }
  return res;
};

export default getFormatAddress;
