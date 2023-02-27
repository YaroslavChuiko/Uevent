import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FileUpload from '~/components/FileUpload/FileUpload';
import { AVATAR_PATH } from '~/consts/avatar';
import { useAppSelector } from '~/hooks/use-app-selector';
import useFileSubmit from '~/hooks/use-file-submit';
import useRequestHandler from '~/hooks/use-request-handler';
import { useDeleteAvatarMutation, useUpdateAvatarMutation } from '~/store/api/profile-slice';
import { FormValues, validate } from '~/validation/avatar';

const ProfileFormAvatar = () => {
  const { user } = useAppSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [updateAvatar, { isLoading: isUpdateLoading }] = useUpdateAvatarMutation();
  const [deleteAvatar, { isLoading: isDeleteLoading }] = useDeleteAvatarMutation();
  const { handler: updateHandler } = useRequestHandler<FormData>({
    f: updateAvatar,
    successMsg: "You've successfully updated your avatar.",
  });
  const { handler: deleteHandler } = useRequestHandler<void>({
    f: deleteAvatar,
    successMsg: "You've successfully removed your avatar.",
  });

  const { onSubmit } = useFileSubmit({ handleSubmit, requestHandler: updateHandler, reset });

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDir="column">
        <FormControl isInvalid={!!errors.files} isRequired>
          <FileUpload
            register={register('files', { validate })}
            avatar={AVATAR_PATH(user.picturePath)}
            name={user.fullName as string}
          />

          <FormErrorMessage>{errors.files && errors?.files.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup mt="4" variant="outline" isAttached>
          <Button colorScheme="blue" type="submit" isLoading={isUpdateLoading}>
            Save
          </Button>
          <Button
            isDisabled={!user.picturePath}
            colorScheme="red"
            isLoading={isDeleteLoading}
            onClick={() => deleteHandler()}
          >
            Remove
          </Button>
        </ButtonGroup>
      </Flex>
    </form>
  );
};

export default ProfileFormAvatar;
