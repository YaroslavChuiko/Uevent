import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Textarea, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useRequestHandler from '~/hooks/use-request-handler';
import { useCreateCommentMutation } from '~/store/api/comment-slice';
import { CreateCommentPayload } from '~/types/comment';
import { createSchema, ICreate } from '~/validation/comment';

type Props = {
  eventId: number;
};

const CreateCommentForm = ({ eventId }: Props) => {
  const [create, { isLoading }] = useCreateCommentMutation();

  const { handler: createHandler } = useRequestHandler<CreateCommentPayload>({
    f: create,
    successMsg: 'Comment successfully created',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  });

  const onSubmit = async (data: ICreate) => {
    await createHandler({ content: data.content, eventId });
    reset();
  };

  return (
    <>
      <Heading as="h3" fontSize="18px" my="20px">
        Your Comment
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl isInvalid={!!errors.content}>
            <Textarea id="content" placeholder="Message" {...register('content')} />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Submitting" px="50px">
            Submit
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default CreateCommentForm;
