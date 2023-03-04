import { Box, Button, Card, Flex, Heading, Image, Icon, Text, VStack, HStack } from '@chakra-ui/react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import styles from '../event.styles';
import { Event } from '~/types/event';
import { AVATAR_PATH } from '~/consts/avatar';
import GoogleMap from '~/components/GoogleMap/GoogleMap';

type PropType = {
  event: Event;
  companyName: string;
};

const EventInfo = ({ event, companyName }: PropType) => {
  const src = AVATAR_PATH(event.picturePath);
  const date = new Date(event.date);
  const shortDate = date.toLocaleString('default', { month: 'long', day: '2-digit' });
  const eventTitle = `${event.name} by ${companyName}`;

  return (
    <Box pb="8">
      <Flex sx={styles.poster}>
        <Box sx={styles.blurBg(src)}></Box>
        <Image sx={styles.image} src={src} boxSize="full" objectFit="cover" alt="Event image" />
      </Flex>
      <Flex pt="8" justify="space-between" sx={styles.info}>
        <VStack spacing={4} align="flex-start" sx={styles.mainInfo}>
          <Text fontSize="lg">{shortDate}</Text>
          <Heading fontSize={{ base: '3xl', md: '5xl' }}>{eventTitle.toUpperCase()}</Heading>
          <Text fontSize="lg">{event.description}</Text>
        </VStack>
        <VStack spacing={4} sx={styles.price}>
          <Card p={{ base: '4', sm: '10' }} variant="filled" w="100%">
            <Flex flexDir="column" justify="center" w="100%">
              <Text fontSize="3xl" fontWeight="semibold" textAlign="center">
                {event.price !== 0 && '$'}
                {event.price}
              </Text>
              <Button disabled={event.ticketsAvailable === 0} size="lg" colorScheme="blue" mt="4">
                Get a ticket
              </Button>
            </Flex>
          </Card>
        </VStack>
      </Flex>
      <Flex pt="8" flexDir="column">
        <Flex sx={styles.dateNLocation}>
          <Card p={{ base: '4', sm: '6' }} variant="outline">
            <HStack spacing="6">
              <Icon color="tertiary" w="8" h="8" as={FiCalendar} />
              <VStack align="flex-start">
                <Heading fontSize="2xl">Date and time</Heading>
                <Text>{date.toDateString()}</Text>
              </VStack>
            </HStack>
          </Card>
          <Card sx={styles.location} variant="outline">
            <HStack spacing="6" align="center" h="100%">
              <Icon color="tertiary" w="8" h="8" as={FiMapPin} />
              <VStack align="flex-start">
                <Heading fontSize="2xl">Location</Heading>
                <Text>Check the map</Text>
              </VStack>
            </HStack>
          </Card>
        </Flex>
        <Box pt="8">
          <GoogleMap text={event.name} lat={event.latitude} lng={event.longitude} />
        </Box>
      </Flex>
    </Box>
  );
};

export default EventInfo;
