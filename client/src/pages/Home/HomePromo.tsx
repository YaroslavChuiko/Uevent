import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import Container from '~/components/Container';

const HomePromo = () => {
  return (
    <Box bg="red.400">
      <Container>
        <Flex flexDir="column" alignItems="center" justifyContent="center" p="50px 0" bg="red.400">
          <Heading as="h1" textTransform="capitalize">
            Let's Make Live Happen
          </Heading>
          <Text fontSize="xl">
            Shop millions of live events and discover can't-miss concerts, games, theater and more.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default HomePromo;
