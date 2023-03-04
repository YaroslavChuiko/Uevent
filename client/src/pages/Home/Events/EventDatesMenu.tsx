import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useDisclosure,
} from '@chakra-ui/react';
import { endOfDay, endOfMonth, endOfToday, format, nextSaturday, nextSunday, startOfDay } from 'date-fns';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';

const now = new Date();
const today: DateRange = { from: now, to: endOfToday() };
const thisWeekend: DateRange = { from: startOfDay(nextSaturday(now)), to: endOfDay(nextSunday(now)) };
const thisMonth: DateRange = { from: now, to: endOfMonth(now) };

type Props = {
  dateRange: DateRange | null;
  setDateRange: (val: DateRange | null) => void;
};

const EventDatesMenu = ({ dateRange, setDateRange }: Props) => {
  const optionLabels = {
    allDates: 'All Dates',
    today: 'Today',
    thisWeekend: 'This Weekend',
    thisMonth: 'This Month',
    customRange: 'Custom Range',
  };

  const options = [
    {
      value: optionLabels.allDates,
      closeOnSelect: true,
      onClick: handleSelectOption({ from: undefined, to: undefined }),
    },
    {
      value: optionLabels.today,
      closeOnSelect: true,
      onClick: handleSelectOption(today),
    },
    {
      value: optionLabels.thisWeekend,
      closeOnSelect: true,
      onClick: handleSelectOption(thisWeekend),
    },
    {
      value: optionLabels.thisMonth,
      closeOnSelect: true,
      onClick: handleSelectOption(thisMonth),
    },
    {
      value: optionLabels.customRange,
      closeOnSelect: false,
      onClick: () => {
        setIsCustomRangeOpen((prev) => !prev);
      },
    },
  ];

  const defaultValue = { label: optionLabels.allDates, value: optionLabels.allDates };

  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [activeOption, setActiveOption] = useState(defaultValue);

  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState<boolean>(false);

  const onMenuOpen = () => {
    setIsCustomRangeOpen(false);
    openMenu();
  };

  function handleSelectOption(range: DateRange) {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const optionValue = e.currentTarget.value;
      setActiveOption({ label: optionValue, value: optionValue });
      setDateRange(range);
      setCustomRange({} as DateRange);
    };
  }

  const onCustomRangeSelect = (newDateRange: DateRange | undefined) => {
    setCustomRange(newDateRange);

    if (!newDateRange?.from || !newDateRange?.to) return;
    if (newDateRange.from === dateRange?.from && newDateRange.to === dateRange?.to) return;

    setActiveOption({
      label: `${format(newDateRange.from, 'MMM d')} - ${format(newDateRange.to, 'MMM d')}`,
      value: optionLabels.customRange,
    });
    setDateRange(newDateRange);
    closeMenu();
  };

  return (
    <Box>
      <Menu closeOnSelect={true} isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={closeMenu}>
        <MenuButton
          as={Button}
          variant="ghost"
          colorScheme="blue"
          leftIcon={<Icon as={FiCalendar} />}
          rightIcon={<Icon as={FiChevronDown} />}
        >
          {activeOption.label}
        </MenuButton>
        {!isCustomRangeOpen ? (
          <MenuList minWidth="240px">
            <MenuOptionGroup defaultValue={activeOption.value} type="radio">
              {options.map((option, i) => (
                <MenuItemOption
                  key={i}
                  value={option.value}
                  closeOnSelect={option.closeOnSelect}
                  onClick={option.onClick}
                >
                  {option.value}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        ) : (
          <MenuList>
            <DayPicker mode="range" disabled={{ before: now }} selected={customRange} onSelect={onCustomRangeSelect} />
          </MenuList>
        )}
      </Menu>
    </Box>
  );
};

export default EventDatesMenu;
