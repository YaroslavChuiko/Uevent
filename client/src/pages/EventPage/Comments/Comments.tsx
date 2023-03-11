import { Box, Center, Divider, Flex, Heading, SlideFade, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import Pagination from '~/components/Pagination/Pagination';
import { useGetCommentsQuery } from '~/store/api/comment-slice';
import { CommentsParam } from '~/types/comment';
import styles from '../event.styles';
import NothingFound from '../NothingFound';
import Comment from './Comment';
import CreateCommentForm from './CreateCommentForm';

type Props = {
  eventId: number;
};

const Comments = ({ eventId }: Props) => {
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 5;

  const params: CommentsParam = {
    _sort: 'publishDate',
    _order: 'DESC' as const,
    _start: (curPage - 1) * itemsPerPage,
    _end: curPage * itemsPerPage,
    eventId: eventId,
  };

  const { data, isFetching, isSuccess } = useGetCommentsQuery(params);

  return (
    <Box sx={styles.mainInfo} mt="40px" mb="20px">
      <Heading as="h3" fontSize="24px" mb="10px">
        {isSuccess && data.totalCount} {isSuccess && data.totalCount > 1 ? 'Comments' : 'Comment'}
      </Heading>
      <Divider mb="10px" />
      <Box>
        {isFetching ? (
          <Center py="40px">
            <Spinner w="50px" h="50px" speed=".8s" color="secondary" thickness="4px" />
          </Center>
        ) : data?.comments.length ? (
          data.comments.map((comment) => (
            <SlideFade key={comment.id} offsetY="30px" in={true}>
              <Comment comment={comment} />
            </SlideFade>
          ))
        ) : (
          <SlideFade offsetY="30px" in={true}>
            <NothingFound icon={FiMessageSquare} message="There are no comments yet. You can be first!" />
          </SlideFade>
        )}
      </Box>
      <Flex w="100%" alignItems="center" justifyContent="center" py="30px">
        {isSuccess && data.totalCount > itemsPerPage && data?.comments.length ? (
          <Pagination
            numberOfPages={Math.ceil((data?.totalCount as number) / itemsPerPage)}
            curPage={curPage}
            setCurPage={setCurPage}
          />
        ) : null}
      </Flex>
      <CreateCommentForm eventId={eventId} />
    </Box>
  );
};

export default Comments;
