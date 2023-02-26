import { Button, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FileUpload from '~/components/FileUpload/FileUpload';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateAvatarMutation } from '~/store/api/apiSlice';

type PropTypes = {
  avatar: string;
};

type FormValues = {
  files: FileList;
};

const ProfileFormAvatar = ({ avatar }: PropTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const { handler: updateHandler } = useRequestHandler<FormData>({
    f: updateAvatar,
    successMsg: "You've successfully updated your avatar.",
  });

  const onSubmit = handleSubmit(async ({ files }) => {
    const form = new FormData();
    form.append('avatar', files[0]);
    await updateHandler(form);
  });

  const validate = (value: FileList) => {
    if (value.length < 1) {
      return 'A file is required';
    }
  };

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
