import { useLazyGetFormatsQuery } from '~/store/api/format-slice';
import { SelectOptionData } from '~/types/select-option-data';
import CustomAsyncSelect from '../CustomAsyncSelect';
import { useState, useEffect } from 'react';

type Props = {
  format: SelectOptionData | null;
  setFormat: (format: SelectOptionData) => void;
};

const AsyncSelectFormat = ({ format, setFormat }: Props) => {
  const [getFormats] = useLazyGetFormatsQuery();

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
    const { formats } = await getFormats(params).unwrap();
    return formats.map((item) => ({ id: item.id, label: item.name, value: item.name }));
  };

  const loadOptions = async (inputValue: string, callback: (options: SelectOptionData[]) => void) => {
    const formatOptions = await getOptions(inputValue);
    callback(formatOptions);
  };

  return (
    <CustomAsyncSelect
      cacheOptions
      isClearable
      value={format}
      placeholder="e.g. (fest lecture concert)"
      onChange={setFormat}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
    />
  );
};

export default AsyncSelectFormat;
