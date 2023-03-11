import {
  Avatar,
  Card,
  CardBody,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { ReactNode, useState } from 'react';
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import { AVATAR_PATH } from '~/consts/avatar';
import { useAppSelector } from '~/hooks/use-app-selector';
import useRequestHandler from '~/hooks/use-request-handler';
import { useDeleteCommentMutation } from '~/store/api/comment-slice';
import { useGetUserQuery } from '~/store/api/user-slice';
import { Comment } from '~/types/comment';
import CommentSkeleton from './CommentSkeleton';
import EditCommentForm from './EditCommentForm';

type Props = {
  comment: Comment;
};

const Comment = ({ comment }: Props) => {
  const { data: author, isFetching, isSuccess } = useGetUserQuery(comment.userId);
  const { user } = useAppSelector((state) => state.profile);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deleteComment,
    successMsg: "You've successfully delete your comment.",
  });

  let menu: ReactNode | null = null;

  if (isSuccess && user.id && +user.id === author.id) {
    menu = (
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<FiMoreHorizontal />} variant="ghost" h="30px" />
        <MenuList>
          <MenuItem icon={<FiEdit />} onClick={() => setIsEdit(true)}>
            Edit
          </MenuItem>
          <MenuItem color="red" icon={<FiTrash2 />} onClick={() => deleteHandler(comment.id)}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  if (isFetching) {
    return <CommentSkeleton mb="10px" />;
  }

  return (
    <Card variant="outline" mb="10px">
      <CardBody p="10px">
        <Flex align="center" justify="space-between">
          <HStack spacing="10px">
            {author && (
              <>
                <Avatar size="md" bgColor="tertiary" name={author.fullName} src={AVATAR_PATH(author.picturePath)} />
                <Text as="span" color="secondary" fontWeight="bold">
                  {author.login}
                </Text>
                <Text as="span" title={comment.publishDate} color="gray.500" fontSize="14px">
                  {format(new Date(comment.publishDate), 'PPp')}
                </Text>
              </>
            )}
          </HStack>
          {menu}
        </Flex>
        <Text ml="60px" fontSize="14px">
          {comment.content}
        </Text>

        {isEdit && <EditCommentForm commentId={comment.id} commentContent={comment.content} setIsEdit={setIsEdit} />}
      </CardBody>
    </Card>
  );
};

export default Comment;
