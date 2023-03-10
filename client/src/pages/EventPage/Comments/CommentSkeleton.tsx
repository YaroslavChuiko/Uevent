import { Box, BoxProps, HStack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const CommentSkeleton = (props: BoxProps) => {
  return (
    <Box {...props}>
      <HStack spacing="10px">
        <SkeletonCircle size="10" />
      </HStack>
      <SkeletonText noOfLines={4} skeletonHeight="3" ml="60px" />
    </Box>
  );
};

export default CommentSkeleton;
