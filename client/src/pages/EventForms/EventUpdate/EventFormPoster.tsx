import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FileUpload from '~/components/FileUpload/FileUpload';
import { AVATAR_PATH } from '~/consts/avatar';
import useFileSubmit from '~/hooks/use-file-submit';
import useRequestHandler from '~/hooks/use-request-handler';
import useCustomToast from '~/hooks/use-custom-toast';
import { useUpdateEventPosterMutation, useDeleteEventPosterMutation } from '~/store/api/event-slice';
import { FormValues, validate } from '~/validation/avatar';
import type { Event } from '~/types/event';

type IProps = {
  event: Event;
};

const EventFormPoster = ({ event }: IProps) => {
  const { toast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [updatePoster, { isLoading: isUpdateLoading }] = useUpdateEventPosterMutation();
  const [deletePoster, { isLoading: isDeleteLoading }] = useDeleteEventPosterMutation();

  const updateHandler = async (data: FormData) => {
    try {
      await updatePoster({ form: data, id: event.id }).unwrap();
      toast("You've successfully updated event's poster.", 'success');
      reset();
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deletePoster,
    successMsg: "You've successfully removed event's poster.",
  });

  const { onSubmit } = useFileSubmit({ handleSubmit, requestHandler: updateHandler, reset, fieldName: 'poster' });

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDir="column">
        <FormControl isInvalid={!!errors.files} isRequired>
          <FileUpload
            register={register('files', { validate })}
            avatar={AVATAR_PATH(event.picturePath)}
            name={event.name as string}
            isPoster={true}
          />

          <FormErrorMessage>{errors.files && errors?.files.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup mt="4" variant="outline" isAttached>
          <Button colorScheme="blue" type="submit" isLoading={isUpdateLoading}>
            Save
          </Button>
          <Button
            isDisabled={!event.picturePath}
            colorScheme="red"
            isLoading={isDeleteLoading}
            onClick={async () => {
              await deleteHandler(event.id);
            }}
          >
            Remove
          </Button>
        </ButtonGroup>
      </Flex>
    </form>
  );
};

export default EventFormPoster;
