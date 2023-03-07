import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const CompanyCardSkeleton = () => {
  return (
    <Flex borderRadius="md" overflow="hidden" maxWidth="sm" padding="10px" alignItems="center">
      <SkeletonCircle size="120px" />
      <SkeletonText ml="10px" noOfLines={3} spacing="5" skeletonHeight="3" width="230px" />
    </Flex>
  );
};

export default CompanyCardSkeleton;
