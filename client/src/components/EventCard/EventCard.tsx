import { Avatar, Box, Card, CardBody, CardProps, Flex, Heading, Image, Stack, Tag, Text, Wrap } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useGetCompanyQuery } from '~/store/api/company-slice';
import { Event } from '~/types/event';
import styles from './event-card.styles';

type Props = {
  event: Event;
  isTicket?: boolean;
} & CardProps;

const DateFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
} as const;

const PriceFormatOptions = {
  style: 'currency',
  currency: 'USD',
} as const;

const EventCard = ({ event, isTicket = false, ...cardProps }: Props) => {
  const { data: company } = useGetCompanyQuery(event.companyId);
  const date = new Intl.DateTimeFormat('en-US', DateFormatOptions).format(new Date(event.date));
  const price = event.price ? new Intl.NumberFormat('en-US', PriceFormatOptions).format(event.price) : 'free';
  const eventUrl = `/events/${event.id}`;

  return (
    <Card sx={styles.card} variant="outline" {...cardProps}>
      <ReactRouterLink to={eventUrl}>
        <Flex w="100%" h="155px" overflow="hidden" alignItems="center" justifyContent="center">
          <Image
            sx={styles.img}
            src={`${import.meta.env.VITE_API_URL}/${event.picturePath}`}
            fallbackSrc="https://via.placeholder.com/668x400?text=Poster"
            alt={event.name}
          />
        </Flex>
      </ReactRouterLink>

      <CardBody>
        <Stack mt="1" spacing="2">
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

          {!isTicket && (
            <Box sx={styles.price}>
              <Text>Tickets left: {event.ticketsAvailable}</Text>
              <Text>{price}</Text>
            </Box>
          )}

          <Box sx={styles.company} noOfLines={1}>
            By{' '}
            <ReactRouterLink to={`/companies/${company?.id}`}>
              <Avatar
                size="xs"
                ml="3px"
                name={company?.name}
                src={`${import.meta.env.VITE_API_URL}/${company?.picturePath}`}
              />{' '}
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
