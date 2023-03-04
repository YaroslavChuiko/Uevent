import { useLazyGetThemesQuery } from '~/store/api/theme-slice';
import { SelectOptionData } from '~/types/select-option-data';
import CustomAsyncSelect from '../CustomAsyncSelect';

type Props = {
  theme: SelectOptionData | null;
  setTheme: (val: SelectOptionData) => void;
};

const AsyncSelectTheme = ({ theme, setTheme }: Props) => {
  const [getThemes] = useLazyGetThemesQuery();

  const loadOptions = async (inputValue: string, callback: (options: SelectOptionData[]) => void) => {
    const params = {
      _sort: 'name',
      _order: 'ASC' as const,
      _start: 0,
      _end: 10,
      q: inputValue,
    };
    const { themes } = await getThemes(params).unwrap();
    const formatOptions = themes.map((item) => ({ id: item.id, label: item.name, value: item.name }));
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
    />
  );
};

export default AsyncSelectTheme;
