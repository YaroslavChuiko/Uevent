import { Button, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FileUpload from '~/components/FileUpload/FileUpload';
import useFileSubmit from '~/hooks/use-file-submit';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateAvatarMutation } from '~/store/api/profile-slice';
import { FormValues, validate } from '~/validation/avatar';

type PropTypes = { avatar: string };

const ProfileFormAvatar = ({ avatar }: PropTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const { handler: requestHandler } = useRequestHandler<FormData>({
    f: updateAvatar,
    successMsg: "You've successfully updated your avatar.",
  });

  const { onSubmit } = useFileSubmit({ handleSubmit, requestHandler });

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDir="column">
        <FormControl isInvalid={!!errors.files} isRequired>
          <FileUpload register={register('files', { validate })} avatar={avatar} />

          <FormErrorMessage>{errors.files && errors?.files.message}</FormErrorMessage>
        </FormControl>

        <Button mt="4" variant="outline" colorScheme="blue" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default ProfileFormAvatar;
