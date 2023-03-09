import { Box, Card, Divider, Heading } from '@chakra-ui/react';
import { useGetCommentsQuery } from '~/store/api/comment-slice';
import { CommentsParam } from '~/types/comment';
import styles from '../event.styles';

type Props = {
  eventId: number;
};

const Comments = ({ eventId }: Props) => {
  const params: CommentsParam = {
    _sort: 'publishDate',
    _order: 'ASC' as const,
    _start: 0,
    _end: 20,
    eventId: eventId,
  };

  const { data, isFetching, isSuccess } = useGetCommentsQuery(params);

  if (isFetching) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={styles.mainInfo} my="20px">
      <Heading as="h3" fontSize="24px" mb="10px">
        {isSuccess && data.totalCount} {isSuccess && data.totalCount > 1 ? 'Comments' : 'Comment'}
      </Heading>
      <Divider mb="10px" />
      <Box>
        {data?.comments.map((comment) => (
          <Card key={comment.id}>{comment.content}</Card>
        ))}
      </Box>
    </Box>
  );
};

export default Comments;
