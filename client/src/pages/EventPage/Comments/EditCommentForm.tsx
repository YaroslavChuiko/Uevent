import { Box, Button, FormControl, FormErrorMessage, HStack, Textarea, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateCommentMutation } from '~/store/api/comment-slice';
import { Comment, UpdateCommentPayload } from '~/types/comment';
import { createSchema, ICreate } from '~/validation/comment';

type Props = {
  commentId: number;
  commentContent: string;
  setIsEdit: (v: boolean) => void;
};

const EditCommentForm = ({ commentId, commentContent, setIsEdit }: Props) => {
  const [update, { isLoading }] = useUpdateCommentMutation();

  const { handler: updateHandler } = useRequestHandler<UpdateCommentPayload & Pick<Comment, 'id'>>({
    f: update,
    successMsg: 'Comment successfully updated',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      content: commentContent,
    },
  });

  const onSubmit = async (data: ICreate) => {
    await updateHandler({ content: data.content, id: commentId });
    setIsEdit(false);
    reset();
  };

  return (
    <Box pt="40px" pl="60px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl isInvalid={!!errors.content}>
            <Textarea id="content" placeholder="Message" {...register('content')} />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
          <HStack>
            <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Submitting" px="50px">
              Save
            </Button>
            <Button type="button" colorScheme="blue" variant="outline" px="50px" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default EditCommentForm;
