import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Icon,
  Text,
  VStack,
  HStack,
  TagLeftIcon,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import styles from '../event.styles';
import { Event } from '~/types/event';
import GoogleMap from '~/components/GoogleMap/GoogleMap';
import { GET_DISPLAY_EVENT } from '~/consts/event';

type PropType = {
  event: Event;
  companyName: string;
};

const EventInfo = ({ event, companyName }: PropType) => {
  const eventTitle = `${event.name} by ${companyName}`;
  const e = GET_DISPLAY_EVENT(event);
  const tags = [e.format.name, e.theme.name];

  return (
    <Box pb="8">
      <Flex sx={styles.poster}>
        <Box sx={styles.blurBg(e.picturePath)}></Box>
        <Image sx={styles.image} src={e.picturePath} boxSize="full" objectFit="contain" alt="Event image" />
      </Flex>
      <Flex pt="8" justify="space-between" sx={styles.info}>
        <VStack spacing={4} align="flex-start" sx={styles.mainInfo}>
          <Text fontSize="lg">{e.shortDate}</Text>
          <Heading fontSize={{ base: '3xl', md: '5xl' }}>{eventTitle.toUpperCase()}</Heading>
          <Text fontSize="xl">{e.description}</Text>
          <HStack spacing="4">
            {tags.map((t, i) => (
              <Tag size="lg" key={i} colorScheme="purple">
                {t}
              </Tag>
            ))}
          </HStack>
        </VStack>
        <VStack spacing={4} sx={styles.price}>
          <Flex w="100%" justify="flex-end">
            <Tag size="lg" variant="subtle" colorScheme={e.tickets ? 'blue' : 'red'} px="4" py="2">
              <TagLeftIcon boxSize="6" as={FiUsers} />
              <TagLabel pl="2">{e.availability}</TagLabel>
            </Tag>
          </Flex>
          <Card p={{ base: '4', sm: '10' }} variant="filled" w="100%">
            <Flex flexDir="column" justify="center" w="100%">
              <Text fontSize="3xl" fontWeight="semibold" textAlign="center">
                {e.price}
              </Text>
              <Button isDisabled={!e.tickets} size="lg" colorScheme="blue" mt="4">
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
                <Text>{e.date.toDateString()}</Text>
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
          <GoogleMap text={e.name} lat={e.latitude} lng={e.longitude} />
        </Box>
      </Flex>
    </Box>
  );
};

export default EventInfo;
