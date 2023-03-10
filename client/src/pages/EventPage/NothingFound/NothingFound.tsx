import { Flex, Heading, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type Props = {
  icon: IconType;
  message: string;
};

const NothingFound = ({ icon, message }: Props) => {
  return (
    <Flex minH="200px" alignItems="center" justifyContent="center" flexDirection="column" color="gray.500">
      <Icon as={icon} boxSize="30px" mb="10px" />
      <Heading as="h4" fontWeight="medium" fontSize="16px" mb="5px">
        {message}
      </Heading>
    </Flex>
  );
};

export default NothingFound;
