import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';

const NothingFound = () => {
  return (
    <Flex minH="300px" alignItems="center" justifyContent="center" flexDirection="column">
      <Icon as={FiCalendar} boxSize="40px" mb="10px" />
      <Heading as="h2" fontWeight="medium" fontSize="18px" mb="5px">
        We didn't find anything
      </Heading>
      <Text fontSize="14px" color="gray.400">
        Try a different filter
      </Text>
    </Flex>
  );
};

export default NothingFound;
