import { Flex, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';

export type ISearch = {
  q: string;
};

type IProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const EventSearch = ({ setSearch }: IProps) => {
  const { register } = useForm<ISearch>();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <Flex>
      <InputGroup>
        <InputLeftAddon>
          <FiSearch />
        </InputLeftAddon>
        <Input
          sx={{ w: '400px', h: '40px' }}
          id="q"
          type="q"
          placeholder="Type the name of the event"
          {...register('q', {
            onChange,
          })}
        />
      </InputGroup>
    </Flex>
  );
};

export default EventSearch;
