import { Avatar, Button, useDisclosure, Card, HStack, Text, VStack, Flex } from '@chakra-ui/react';
import { FiFrown } from 'react-icons/fi';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import Loader from '~/components/Loader/Loader';
import { AVATAR_PATH } from '~/consts/avatar';
import { useAppSelector } from '~/hooks/use-app-selector';
import { useGetUsersQuery } from '~/store/api/user-slice';
import NothingFound from '../NothingFound';
import { Event } from '~/types/event';
import Pagination from '~/components/Pagination/Pagination';
import { useState } from 'react';

type PropsType = {
  event: Event;
};

const EventVisitors = ({ event }: PropsType) => {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, error } = useGetUsersQuery({
    eventId: event.id,
    _sort: 'id',
    _order: 'ASC' as const,
    _start: (page - 1) * itemsPerPage,
    _end: page * itemsPerPage,
  });
  const { user } = useAppSelector((state) => state.profile);

  return (
    <>
      <Button
        colorScheme="blue"
        variant="outline"
        isLoading={isLoading}
        onClick={onOpen}
        isDisabled={!error && !data?.users}
      >
        View visitors
      </Button>
      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Visitors of the event">
        {isLoading ? (
          <Loader isFullScreen={false} />
        ) : data?.users?.length ? (
          <VStack spacing="4" py="4">
            {data?.users.map((u) => (
              <Card
                key={u.id}
                p="2"
                w="100%"
                cursor="pointer"
                variant={u.id === Number(user.id) ? 'filled' : 'outline'}
              >
                <HStack spacing="4">
                  <Avatar size="sm" src={AVATAR_PATH(u.picturePath)} name={u.fullName} />
                  <Text fontSize="md">{u.id === Number(user.id) ? 'You' : u.login}</Text>
                </HStack>
              </Card>
            ))}
            <Flex w="100%" alignItems="center" justifyContent="center">
              <Pagination
                numberOfPages={Math.ceil((data?.totalCount as number) / itemsPerPage)}
                curPage={page}
                setCurPage={setPage}
              />
            </Flex>
          </VStack>
        ) : (
          <NothingFound icon={FiFrown} message="We didn't find anything" />
        )}
      </DrawerWrapper>
    </>
  );
};

export default EventVisitors;
