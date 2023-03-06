import { Button, FormControl, FormLabel, Switch, VStack } from '@chakra-ui/react';
import { useCheckoutForEventMutation } from '~/store/api/event-slice';
import useCustomToast from '~/hooks/use-custom-toast';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISubscribe, subscribeSchema } from '~/validation/event';
import { Event } from '~/types/event';
import { STRIPE_API_KEY } from '~/consts/event';
import { loadStripe } from '@stripe/stripe-js';

type PropsType = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
};

const EventSubscribe = ({ event: { id, price }, isOpen, onClose }: PropsType) => {
  const [subscribe, { isLoading }] = useCheckoutForEventMutation();

  const { register, handleSubmit } = useForm<ISubscribe>({
    resolver: zodResolver(subscribeSchema),
  });

  const { toast } = useCustomToast();
  const onSubmit = async (data: ISubscribe) => {
    try {
      const result = await subscribe({ ...data, id }).unwrap();
      if (!price && result.sessionId === -1) {
        toast('You are successfully subscribed to the event', 'success');
        return;
      }
      const stripe = await loadStripe(STRIPE_API_KEY);
      const sessionId = String(result.sessionId);
      toast('You are being redirected to the checkout page.', 'info');
      await stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      toast(err.message || err.data.message, 'error');
    }
  };

  return (
    <DrawerWrapper title="Event subscription" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display="flex" alignItems="center">
          <VStack align="flex-start" spacing={4}>
            <FormLabel htmlFor="is-visible" mb="0">
              Do you want to be visible as an attendee?
            </FormLabel>
            <Switch id="is-visible" {...register('isVisible')} />
            <Button type="submit" isLoading={isLoading}>
              Subscribe to an event
            </Button>
          </VStack>
        </FormControl>
      </form>
    </DrawerWrapper>
  );
};

export default EventSubscribe;
