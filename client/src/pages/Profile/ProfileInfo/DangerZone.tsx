import { DeleteIcon, LockIcon } from '@chakra-ui/icons';
import { Button, LinkBox, LinkOverlay, useDisclosure, Wrap } from '@chakra-ui/react';
import ConfirmPopover from '~/components/ConfirmPopover/ConfirmPopover';
import useRequestHandler from '~/hooks/use-request-handler';
import { useDeleteProfileMutation } from '~/store/api/profile-slice';
import { useLogoutMutation } from '~/store/api/auth-slice';

const DangerZone = () => {
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [deleteProfile, { isLoading: isDeleteLoading }] = useDeleteProfileMutation();
  const { onOpen: onOpenLogout, onClose: onCloseLogout, isOpen: isOpenLogout } = useDisclosure();
  const { onOpen: onOpenDelete, onClose: onCloseDelete, isOpen: isOpenDelete } = useDisclosure();

  const { handler: logoutHandler } = useRequestHandler<void>({ f: logout });
  const { handler: deleteHandler } = useRequestHandler<void>({ f: deleteProfile });

  return (
    <Wrap mt="4" spacing="4">
      <LinkBox maxW="sm">
        <Button leftIcon={<LockIcon />} colorScheme="blue" variant="outline">
          <LinkOverlay isExternal href="/password-reset">
            Reset password
          </LinkOverlay>
        </Button>
      </LinkBox>
      <ConfirmPopover
        header="Are you sure you want to logout?"
        trigger={
          <Button onClick={onOpenLogout} colorScheme="red" variant="outline" isLoading={isLogoutLoading}>
            Logout
          </Button>
        }
        onConfirm={logoutHandler}
        isOpen={isOpenLogout}
        onClose={onCloseLogout}
      />
      <ConfirmPopover
        header="Are you sure you want to delete your account?"
        trigger={
          <Button onClick={onOpenDelete} leftIcon={<DeleteIcon />} colorScheme="red" isLoading={isDeleteLoading}>
            Delete my account
          </Button>
        }
        onConfirm={deleteHandler}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      />
    </Wrap>
  );
};

export default DangerZone;
