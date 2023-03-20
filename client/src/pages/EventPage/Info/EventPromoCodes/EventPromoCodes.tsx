import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import { FiFrown } from 'react-icons/fi';
import { useGetPromoCodesQuery } from '~/store/api/promo-code-slice';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import Loader from '~/components/Loader/Loader';
import NothingFound from '../../NothingFound';
import PromoCodeCreate from '~/pages/EventPage/Info/EventPromoCodes/PromoCodeCreate/PromoCodeCreate';
import EventPromoCode from './EventPromoCode';
import type { Event } from '~/types/event';

type PropsType = {
  event: Event;
};

const EventPromoCodes = ({ event }: PropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, error } = useGetPromoCodesQuery({ _start: 0, _end: 10, eventId: event.id });

  return (
    <>
      <Button colorScheme="blue" variant="outline" isLoading={isLoading} onClick={onOpen} isDisabled={!!error}>
        View promo codes
      </Button>
      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Promo codes">
        <>
          <PromoCodeCreate event={event} />

          {isLoading ? (
            <Loader isFullScreen={false} />
          ) : data?.promoCodes?.length ? (
            <VStack spacing="4" py="4">
              {data?.promoCodes.map((promoCode) => (
                <EventPromoCode key={promoCode.id} promoCode={promoCode} />
              ))}
            </VStack>
          ) : (
            <NothingFound icon={FiFrown} message="There are no promo codes" />
          )}
        </>
      </DrawerWrapper>
    </>
  );
};

export default EventPromoCodes;
