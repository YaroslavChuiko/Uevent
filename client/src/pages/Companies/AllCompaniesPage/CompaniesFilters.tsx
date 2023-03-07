import { useForm } from 'react-hook-form';
import { FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type IFilter = {
  search: string;
};

type IProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const CompaniesFilters = ({ setSearch }: IProps) => {
  const { register, handleSubmit } = useForm<IFilter>({});

  const submitHandler = (data: IFilter) => {
    setSearch(data.search);
  };

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="secondary" />} />
          <Input
            id="search"
            type="search"
            placeholder="find companies"
            {...register('search', {
              onChange: changeHandler,
            })}
          />
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default CompaniesFilters;
