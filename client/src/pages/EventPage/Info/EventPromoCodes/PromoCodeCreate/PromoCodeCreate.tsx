import { Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import PromoCodeCreateForm from './PromoCodeCreateFrom';
import { Event } from '~/types/event';

type PropsType = {
  event: Event;
};

const PromoCodeCreate = ({ event }: PropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="blue" variant="outline" onClick={onOpen} leftIcon={<AddIcon />}>
        Create promo code
      </Button>
      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Create promo code">
        <PromoCodeCreateForm event={event} />
      </DrawerWrapper>
    </>
  );
};

export default PromoCodeCreate;
