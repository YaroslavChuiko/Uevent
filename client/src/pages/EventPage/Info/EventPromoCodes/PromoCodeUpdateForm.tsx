import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdatePromoCodeMutation } from '~/store/api/promo-code-slice';
import { IUpdate, updateSchema } from '~/validation/promo-code';
import type { PromoCode } from '~/types/promo-code';

type PropsType = {
  promoCode: PromoCode;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromoCodeUpdateForm = ({ promoCode, setIsEdit }: PropsType) => {
  const [update, { isLoading }] = useUpdatePromoCodeMutation();

  const { handler: updateHandler } = useRequestHandler<IUpdate & Pick<PromoCode, 'id'>>({
    f: update,
    successMsg: "You've successfully updated the promo code",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdate>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      promoCode: promoCode.promoCode,
      discount: promoCode.discount,
    },
  });

  const onSubmit = async (data: IUpdate) => {
    await updateHandler({ ...data, id: promoCode.id });
    setIsEdit(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl isInvalid={!!errors.promoCode}>
            <FormLabel htmlFor="promoCode">Promo code</FormLabel>
            <Input id="promoCode" placeholder="promo code" {...register('promoCode')} />
            <FormErrorMessage>{errors.promoCode?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.discount}>
            <FormLabel htmlFor="discount">Discount</FormLabel>
            <Input
              id="discount"
              type="number"
              placeholder="discount"
              {...register('discount', { valueAsNumber: true })}
            />
            <FormErrorMessage>{errors.discount?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Submitting" px="50px">
            Save
          </Button>
          <Button type="button" colorScheme="blue" variant="outline" px="50px" onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PromoCodeUpdateForm;
