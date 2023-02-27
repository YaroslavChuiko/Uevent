import CustomAsyncSelect from '~/components/Select/CustomAsyncSelect/CustomAsyncSelect';
import { useLazyGetFormatsQuery } from '~/store/api/format-slice';
import { formatOption } from './format-option.type';

type Props = {
  format: formatOption | null;
  setFormat: (format: formatOption) => void;
};

const AsyncSelectFormat = ({ format, setFormat }: Props) => {
  const [getFormats] = useLazyGetFormatsQuery();

  const loadOptions = async (inputValue: string, callback: (options: formatOption[]) => void) => {
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
