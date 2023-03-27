import { useState } from 'react';
import { Card, HStack, Text, IconButton, Menu, MenuButton, MenuItem, MenuList, Box } from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';
import useRequestHandler from '~/hooks/use-request-handler';
import { useDeletePromoCodeMutation } from '~/store/api/promo-code-slice';
import PromoCodeUpdateForm from './PromoCodeUpdateForm';
import type { PromoCode } from '~/types/promo-code';

type PropsType = {
  promoCode: PromoCode;
};

const EventPromoCode = ({ promoCode }: PropsType) => {
  const [isEdit, setIsEdit] = useState(false);

  const [deletePromoCode] = useDeletePromoCodeMutation();

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deletePromoCode,
    successMsg: "You've successfully deleted the promo code",
  });

  return (
    <Card p="2" w="100%" variant="outline">
      {isEdit ? (
        <PromoCodeUpdateForm promoCode={promoCode} setIsEdit={setIsEdit} />
      ) : (
        <HStack spacing="4">
          <Text fontSize="md" w="40px">
            {promoCode.discount}%
          </Text>
          <Text fontSize="md" overflowWrap="break-word" wordBreak="break-all" w="100%">
            {promoCode.promoCode}
          </Text>
          <Box>
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<FiMoreHorizontal />} variant="ghost" h="30px" />
              <MenuList>
                <MenuItem icon={<FiEdit />} onClick={() => setIsEdit(true)}>
                  Edit
                </MenuItem>
                <MenuItem color="red" icon={<FiTrash2 />} onClick={() => deleteHandler(promoCode.id)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      )}
    </Card>
  );
};

export default EventPromoCode;
