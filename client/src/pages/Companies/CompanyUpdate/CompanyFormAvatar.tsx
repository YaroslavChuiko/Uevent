import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FileUpload from '~/components/FileUpload/FileUpload';
import { AVATAR_PATH } from '~/consts/avatar';
import useFileSubmit from '~/hooks/use-file-submit';
import useRequestHandler from '~/hooks/use-request-handler';
import useCustomToast from '~/hooks/use-custom-toast';
import { useUpdateCompanyAvatarMutation, useDeleteCompanyAvatarMutation } from '~/store/api/company-slice';
import { FormValues, validate } from '~/validation/avatar';
import type { Company } from '~/types/company';

type IProps = {
  company: Company;
};

const CompanyFormAvatar = ({ company }: IProps) => {
  const { toast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [updateAvatar, { isLoading: isUpdateLoading }] = useUpdateCompanyAvatarMutation();
  const [deleteAvatar, { isLoading: isDeleteLoading }] = useDeleteCompanyAvatarMutation();

  const updateHandler = async (data: FormData) => {
    try {
      await updateAvatar({ form: data, id: company.id }).unwrap();
      toast("You've successfully updated company's avatar.", 'success');
      reset();
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deleteAvatar,
    successMsg: "You've successfully removed company's avatar.",
  });

  const { onSubmit } = useFileSubmit({ handleSubmit, requestHandler: updateHandler, reset });

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDir="column">
        <FormControl isInvalid={!!errors.files} isRequired>
          <FileUpload
            register={register('files', { validate })}
            avatar={AVATAR_PATH(company.picturePath)}
            name={company.name as string}
          />

          <FormErrorMessage>{errors.files && errors?.files.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup mt="4" variant="outline" isAttached>
          <Button colorScheme="blue" type="submit" isLoading={isUpdateLoading}>
            Save
          </Button>
          <Button
            isDisabled={!company.picturePath}
            colorScheme="red"
            isLoading={isDeleteLoading}
            onClick={async () => {
              await deleteHandler(company.id);
            }}
          >
            Remove
          </Button>
        </ButtonGroup>
      </Flex>
    </form>
  );
};

export default CompanyFormAvatar;
