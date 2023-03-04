import { Icon, useToken } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
import { ClearIndicatorProps, components, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';

const CustomAsyncSelect = (props: any) => {
  const [gray100, gray200, gray300, gray500] = useToken('colors', ['gray.100', 'gray.200', 'gray.300', 'gray.500']);

  const ClearIndicator = (props: ClearIndicatorProps) => {
    return (
      <components.ClearIndicator {...props}>
        <Icon as={FiX} boxSize={5} />
      </components.ClearIndicator>
    );
  };

  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      minWidth: '270px',
      height: '40px',
      borderColor: gray200,
      '&:hover': {
        borderColor: gray300,
        cursor: 'text',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: gray500,
      fontWeight: 400,
    }),
    menu: (base) => ({
      ...base,
      padding: '3px 0',
      color: '#000',
      zIndex: 99999,
    }),
    option: (base, state) => ({
      ...base,
      padding: '5px 10px',
      color: '#000',
      backgroundColor: state.isSelected ? gray100 : '#fff',
      '&:hover': {
        backgroundColor: gray100,
        cursor: 'pointer',
      },
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: gray500,
      padding: '0',
    }),
    clearIndicator: (base, state) => ({
      ...base,
      cursor: 'pointer',
      color: state.isFocused ? gray500 : gray300,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      display: 'none',
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
    }),
  };

  return (
    <AsyncSelect {...props} components={{ ClearIndicator }} styles={customStyles} menuPortalTarget={document.body} />
  );
};

export default CustomAsyncSelect;
