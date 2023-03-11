import { Box, BoxProps, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const CommentSkeleton = (props: BoxProps) => {
  return (
    <Box {...props}>
      <SkeletonCircle size="10" />
      <SkeletonText noOfLines={4} skeletonHeight="3" ml="60px" />
    </Box>
  );
};

export default CommentSkeleton;
