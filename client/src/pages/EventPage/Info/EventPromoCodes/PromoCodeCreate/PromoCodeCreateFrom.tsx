import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useRequestHandler from '~/hooks/use-request-handler';
import { useCreatePromoCodeMutation } from '~/store/api/promo-code-slice';
import { createSchema } from '~/validation/promo-code';
import type { ICreate } from '~/validation/promo-code';
import { Event } from '~/types/event';
import type { CreatePromoCodesPayload } from '~/types/promo-code';

type PropsType = {
  event: Event;
};

const PromoCodeCreateForm = ({ event }: PropsType) => {
  const [create, { isLoading }] = useCreatePromoCodeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  });

  const { handler: updateHandler } = useRequestHandler<CreatePromoCodesPayload>({
    f: create,
    successMsg: "You've successfully created new promo code",
  });

  const onSubmit = async (data: ICreate) => {
    await updateHandler({ ...data, eventId: event.id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4">
        <FormControl isInvalid={!!errors.promoCode} isRequired>
          <FormLabel htmlFor="promoCode">Promo code</FormLabel>
          <Input id="promoCode" placeholder="promo code" {...register('promoCode')} />
          <FormErrorMessage>{errors.promoCode?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.discount} isRequired>
          <FormLabel htmlFor="discount">Discount</FormLabel>
          <Input
            id="discount"
            type="number"
            placeholder="discount"
            {...register('discount', { valueAsNumber: true })}
          />
          <FormErrorMessage>{errors.discount?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" w="200px" colorScheme="blue" isLoading={isLoading}>
          Create
        </Button>
      </VStack>
    </form>
  );
};

export default PromoCodeCreateForm;
