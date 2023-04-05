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
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import styles from '../event.styles';
import { Event } from '~/types/event';
import GoogleMap from '~/components/GoogleMap/GoogleMap';
import { FALLBACK_POSTER, GET_DISPLAY_EVENT } from '~/consts/event';
import { useAppSelector } from '~/hooks/use-app-selector';
import EventSubscribe from './EventSubscribe';
import EventVisitors from './EventVisitors';
import { useState, useEffect } from 'react';
import Geocode from '~/consts/geocode';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import type { Company } from '~/types/company';
import ConfirmPopover from '~/components/ConfirmPopover/ConfirmPopover';
import { useDeleteEventMutation, useGetEventsQuery } from '~/store/api/event-slice';
import useRequestHandler from '~/hooks/use-request-handler';
import { useNavigate } from 'react-router-dom';
import EventPromoCodes from './EventPromoCodes/EventPromoCodes';

type PropType = {
  event: Event;
  company: Company;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventInfo = ({ event, company, setEdit }: PropType) => {
  const { user } = useAppSelector((state) => state.profile);
  const eventTitle = `${event.name} by ${company.name}`;
  const e = GET_DISPLAY_EVENT(event);
  const tags = [e.format.name, e.theme.name];

  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();

  const navigate = useNavigate();
  const [deleteEvent, { isLoading: isDeleteLoading }] = useDeleteEventMutation();
  const { onOpen: onOpenDelete, onClose: onCloseDelete, isOpen: isOpenDelete } = useDisclosure();

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deleteEvent,
    successMsg: "You've successfully deleted the event",
    successF: () => {
      navigate('/');
    },
  });

  const { data, isFetching: isVisitorFetching } = useGetEventsQuery({
    id: event.id,
    userId: Number(user.id),
  });

  const isVisitor = data?.events?.length !== 0;

  const isEnded = Number(new Date()) - Number(new Date(event.date)) > 0;
  const isPublished = Number(new Date()) - Number(new Date(event.publishDate)) > 0;

  const [address, setAddress] = useState('');

  useEffect(() => {
    Geocode.fromLatLng(event.latitude.toString(), event.longitude.toString()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      (_error) => {
        setAddress('');
      },
    );
  }, []);

  const getTicketButtonText = () => {
    if (isVisitor) {
      return 'You already have a ticket';
    }
    if (isEnded) {
      return 'Sales Ended';
    }
    if (!isPublished) {
      return 'Sales have not started';
    }
    return 'Get a ticket';
  };

  return (
    <Box>
      <Flex sx={styles.poster}>
        <Box sx={styles.blurBg(e.picturePath || FALLBACK_POSTER)}></Box>
        <Image
          sx={styles.image}
          src={e.picturePath}
          fallbackSrc={e.picturePath && e.id ? undefined : FALLBACK_POSTER}
          boxSize="full"
          objectFit="contain"
          alt="Event image"
        />
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
          <Wrap spacing="4" w="100%" justify="flex-end">
            <Tag size="lg" variant="subtle" colorScheme={e.tickets ? 'blue' : 'red'} px="4" py="2">
              <TagLeftIcon boxSize="6" as={FiUsers} />
              <TagLabel pl="2">{e.availability}</TagLabel>
            </Tag>
            <EventVisitors event={event} />
          </Wrap>
          <Card p={{ base: '4', sm: '10' }} variant="filled" w="100%">
            <Flex flexDir="column" justify="center" w="100%">
              <Text fontSize="3xl" fontWeight="semibold" textAlign="center">
                {e.price}
              </Text>
              <Button
                isLoading={isVisitorFetching}
                onClick={onFormOpen}
                isDisabled={!e.tickets || isVisitor || isEnded || !isPublished}
                size="lg"
                colorScheme="blue"
                mt="4"
              >
                {getTicketButtonText()}
              </Button>
              <EventSubscribe isOpen={isFormOpen} onClose={onFormClose} event={event} />
            </Flex>
          </Card>

          {Number(user.id) === company.userId && (
            <HStack spacing={4} alignSelf="flex-end">
              {!!Number(event.price) && <EventPromoCodes event={event} />}
              <Button onClick={() => setEdit(true)} leftIcon={<EditIcon />}>
                Edit
              </Button>
              <ConfirmPopover
                header="Are you sure you want to delete the event?"
                trigger={
                  <Button
                    onClick={onOpenDelete}
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    isLoading={isDeleteLoading}
                  >
                    Delete
                  </Button>
                }
                onConfirm={() => {
                  deleteHandler(event.id);
                }}
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
              />
            </HStack>
          )}
        </VStack>
      </Flex>
      <Flex pt="8" flexDir="column" sx={styles.mainInfo}>
        <Flex sx={styles.dateNLocation}>
          <Card p={{ base: '4', sm: '6' }} variant="outline" minW="270px">
            <HStack spacing="6">
              <Icon color="tertiary" w="8" h="8" as={FiCalendar} />
              <VStack align="flex-start">
                <Heading fontSize="2xl">Date and time</Heading>
                <Text>{e.date}</Text>
              </VStack>
            </HStack>
          </Card>
          <Card sx={styles.location} variant="outline">
            <HStack spacing="6" align="center" h="100%">
              <Icon color="tertiary" w="8" h="8" as={FiMapPin} />
              <VStack align="flex-start">
                <Heading fontSize="2xl">Location</Heading>
                <Text>{address ? address : 'Check the map'}</Text>
              </VStack>
            </HStack>
          </Card>
        </Flex>
        <Flex pt="8" justify="center">
          <GoogleMap text={`${e.name}, ${address}`} lat={e.latitude} lng={e.longitude} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventInfo;
