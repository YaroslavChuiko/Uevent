import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage, Heading,
  Link,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useAppSelector } from '~/hooks/use-app-selector';
import useRequestHandler from '~/hooks/use-request-handler';
import { useCreateCommentMutation } from '~/store/api/comment-slice';
import { CreateCommentPayload } from '~/types/comment';
import { createSchema, ICreate } from '~/validation/comment';

type Props = {
  eventId: number;
};

const CreateCommentForm = ({ eventId }: Props) => {
  const { user } = useAppSelector((state) => state.profile);
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
      {user.id ? (
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
      ) : (
        <Flex align="center" justify="center" py="20px">
          <Text fontSize="16px">
            <Link as={ReactRouterLink} to="/login" color="secondary">
              Login in to account
            </Link>{' '}
            to write a comment!
          </Text>
        </Flex>
      )}
    </>
  );
};

export default CreateCommentForm;
