import { Avatar, Box, Card, CardBody, CardProps, Flex, Heading, Image, Stack, Tag, Text, Wrap } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useGetCompanyQuery } from '~/store/api/company-slice';
import { Event } from '~/types/event';
import styles from './event-card.styles';
import { AVATAR_PATH } from '~/consts/avatar';
import { DateFormatOptions } from '~/consts/event';
import { useState, useEffect } from 'react';
import Geocode from '~/consts/geocode';
import getFormatAddress from './format-address';

type Props = {
  event: Event;
  isTicket?: boolean;
} & CardProps;

const PriceFormatOptions = {
  style: 'currency',
  currency: 'USD',
} as const;

const EventCard = ({ event, isTicket = false, ...cardProps }: Props) => {
  const { data: company } = useGetCompanyQuery(event.companyId);
  const date = new Intl.DateTimeFormat('en-US', DateFormatOptions).format(new Date(event.date));
  const price = Number(event.price) ? new Intl.NumberFormat('en-US', PriceFormatOptions).format(event.price) : 'free';
  const eventUrl = `/events/${event.id}`;

  const [address, setAddress] = useState('');

  useEffect(() => {
    Geocode.fromLatLng(event.latitude.toString(), event.longitude.toString()).then(
      (response) => {
        const address = getFormatAddress(response.results[0].address_components);
        setAddress(address);
      },
      (_error) => {
        setAddress('');
      },
    );
  }, []);

  return (
    <Card sx={styles.card} variant="outline" {...cardProps}>
      <ReactRouterLink to={eventUrl}>
        <Flex w="100%" h="155px" overflow="hidden" alignItems="center" justifyContent="center">
          <Image
            sx={styles.img}
            src={AVATAR_PATH(event.picturePath)}
            fallbackSrc="https://via.placeholder.com/668x400?text=Poster"
            alt={event.name}
          />
        </Flex>
      </ReactRouterLink>

      <CardBody>
        <Stack spacing="2">
          <ReactRouterLink to={eventUrl}>
            <Heading as="h3" noOfLines={2} fontSize="18px">
              {event.name}
            </Heading>
          </ReactRouterLink>

          <Wrap spacing="10px">
            <Tag sx={styles.tag}>{event.theme.name}</Tag>
            <Tag sx={styles.tag}>{event.format.name}</Tag>
          </Wrap>

          <Text sx={styles.date}>{date}</Text>

          {address && <Text sx={styles.address}>{address}</Text>}

          {!isTicket && (
            <Box sx={styles.price}>
              <Text>Tickets left: {event.ticketsAvailable}</Text>
              <Text>{price}</Text>
            </Box>
          )}

          <Box sx={styles.company} noOfLines={1}>
            By{' '}
            <ReactRouterLink to={`/companies/${company?.id}`}>
              <Avatar size="xs" ml="3px" name={company?.name} src={AVATAR_PATH(company?.picturePath)} />{' '}
              <Text as="span" fontWeight="medium">
                {company?.name}
              </Text>
            </ReactRouterLink>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
