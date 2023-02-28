import { useLazyGetFormatsQuery } from '~/store/api/format-slice';
import { SelectOptionData } from '~/types/select-option-data';
import CustomAsyncSelect from '../CustomAsyncSelect';

type Props = {
  format: SelectOptionData | null;
  setFormat: (format: SelectOptionData) => void;
};

const AsyncSelectFormat = ({ format, setFormat }: Props) => {
  const [getFormats] = useLazyGetFormatsQuery();

  const loadOptions = async (inputValue: string, callback: (options: SelectOptionData[]) => void) => {
    const params = {
      _sort: 'name',
      _order: 'ASC' as const,
      _start: 0,
      _end: 10,
      q: inputValue,
    };
    const { formats } = await getFormats(params).unwrap();
    const formatOptions = formats.map((item) => ({ id: item.id, label: item.name, value: item.name }));
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
    />
  );
};

export default AsyncSelectFormat;
