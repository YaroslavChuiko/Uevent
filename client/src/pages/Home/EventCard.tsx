import { Avatar, Box, Card, CardBody, Heading, Image, Stack, Tag, Text, Wrap } from '@chakra-ui/react';
import { useGetCompanyQuery } from '~/store/api/company-slice';
import { Event } from '~/types/event';

type Props = {
  event: Event;
};

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

const EventCard = ({ event }: Props) => {
  const { data: company } = useGetCompanyQuery(event.companyId);
  const date = new Intl.DateTimeFormat('en-US', DateFormatOptions).format(new Date(event.date));
  const price = event.price ? new Intl.NumberFormat('en-US', PriceFormatOptions).format(event.price) : 'free';

  return (
    <Card maxW="sm" overflow="hidden">
      <Image
        h="160px"
        objectFit="cover"
        src={`${import.meta.env.VITE_API_URL}/${event.picturePath}`}
        fallbackSrc="https://via.placeholder.com/468x400?text=Poster"
        alt={event.name}
      />
      <CardBody>
        <Stack mt="1" spacing="2">
          <Heading as="h3" noOfLines={2} fontSize="18px">
            {event.name}
          </Heading>

          <Wrap spacing="10px">
            <Tag fontSize="12px">{event.theme.name}</Tag>
            <Tag fontSize="12px">{event.format.name}</Tag>
          </Wrap>

          <Text color="red.500" fontWeight="medium">
            {date}
          </Text>

          <Box color="blue.600" fontSize="14px">
            <Text>Tickets left: {event.ticketsAvailable}</Text>
            <Text>{price}</Text>
          </Box>

          <Box fontSize="14px">
            By{' '}
            <Avatar
              size="xs"
              ml="3px"
              name={company?.name}
              src={`${import.meta.env.VITE_API_URL}/${company?.picturePath}`}
            />{' '}
            {company?.name}
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
