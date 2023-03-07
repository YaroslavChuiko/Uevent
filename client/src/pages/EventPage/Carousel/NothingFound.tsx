import { Flex, Heading, Icon } from '@chakra-ui/react';
import { FiFrown } from 'react-icons/fi';

const NothingFound = () => {
  return (
    <Flex minH="200px" alignItems="center" justifyContent="center" flexDirection="column" color="gray.500">
      <Icon as={FiFrown} boxSize="30px" mb="10px" />
      <Heading as="h4" fontWeight="medium" fontSize="18px" mb="5px">
        We didn't find anything
      </Heading>
    </Flex>
  );
};

export default NothingFound;
