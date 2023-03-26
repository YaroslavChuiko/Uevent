import { useLazyGetThemesQuery } from '~/store/api/theme-slice';
import { SelectOptionData } from '~/types/select-option-data';
import CustomAsyncSelect from '../CustomAsyncSelect';
import { useState, useEffect } from 'react';

type Props = {
  theme: SelectOptionData | null;
  setTheme: (val: SelectOptionData) => void;
};

const AsyncSelectTheme = ({ theme, setTheme }: Props) => {
  const [getThemes] = useLazyGetThemesQuery();

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
      q: inputValue ? inputValue : undefined,
    };
    const { themes } = await getThemes(params).unwrap();
    return themes.map((item) => ({ id: item.id, label: item.name, value: item.name }));
  };

  const loadOptions = async (inputValue: string, callback: (options: SelectOptionData[]) => void) => {
    const formatOptions = await getOptions(inputValue);
    callback(formatOptions);
  };

  return (
    <CustomAsyncSelect
      cacheOptions
      isClearable
      value={theme}
      placeholder="e.g. (business politics sport)"
      onChange={setTheme}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
    />
  );
};

export default AsyncSelectTheme;
