import { useLazyGetCompaniesQuery } from '~/store/api/company-slice';
import { SelectOptionData } from '~/types/select-option-data';
import { useAppSelector } from '~/hooks/use-app-selector';
import CustomAsyncSelect from './CustomAsyncSelect';
import { useState, useEffect } from 'react';

type Props = {
  company: SelectOptionData | null;
  setCompany: (company: SelectOptionData) => void;
};

const AsyncSelectFormat = ({ company, setCompany }: Props) => {
  const [getCompanies] = useLazyGetCompaniesQuery();
  const { user: curUser } = useAppSelector((state) => state.profile);

  const [defaultOptions, setDefaultOptions] = useState<SelectOptionData[]>([]);

  useEffect(() => {
    getOptions().then((data) => {
      setDefaultOptions(data);
    });
  }, []);

  const getOptions = async (inputValue?: string) => {
    const params = {
      _sort: 'name',
      _order: 'ASC' as const,
      _start: 0,
      _end: 10,
      creatorId: Number(curUser.id),
      q: inputValue ? inputValue : undefined,
    };
    const { companies } = await getCompanies(params).unwrap();
    return companies.map((item) => ({ id: item.id, label: item.name, value: item.name }));
  };

  const loadOptions = async (inputValue: string, callback: (options: SelectOptionData[]) => void) => {
    const companiesOptions = await getOptions(inputValue);
    callback(companiesOptions);
  };

  return (
    <CustomAsyncSelect
      cacheOptions
      isClearable
      value={company}
      placeholder="your company name"
      onChange={setCompany}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
    />
  );
};

export default AsyncSelectFormat;
