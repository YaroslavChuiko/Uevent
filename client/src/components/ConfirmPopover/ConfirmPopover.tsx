import {
  PopoverBody,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Box,
} from '@chakra-ui/react';

type PopoverType = {
  header: string;
  trigger: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

const ConfirmPopover = ({ header, trigger, isOpen, onClose, onConfirm }: PopoverType) => {
  const confirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Box>
      <Popover returnFocusOnClose={false} placement="bottom" isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">{header}</PopoverHeader>
          <PopoverBody>
            <Flex sx={{ width: '100%', justifyContent: 'space-around' }}>
              <Button onClick={onClose} colorScheme="red" variant="outline">
                Cancel
              </Button>
              <Button onClick={confirm} colorScheme="green">
                Confirm
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ConfirmPopover;
