import { Avatar, Card, HStack, Text, VStack } from '@chakra-ui/react';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import Loader from '~/components/Loader/Loader';
import { AVATAR_PATH } from '~/consts/avatar';
import { useAppSelector } from '~/hooks/use-app-selector';
import useCustomToast from '~/hooks/use-custom-toast';
import { useGetUsersQuery } from '~/store/api/user-slice';
import NothingFound from '../Carousel/NothingFound';

type PropsType = {
  eventId: number;
  isOpen: boolean;
  onClose: () => void;
};

const EventVisitors = ({ eventId, isOpen, onClose }: PropsType) => {
  const { data, isLoading, error } = useGetUsersQuery({ eventId });
  const { user } = useAppSelector((state) => state.profile);

  const { toast } = useCustomToast();
  if (error) {
    toast((error as any).data.message || (error as any).message, 'error');
  }

  return (
    <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Visitors of the event">
      {isLoading ? (
        <Loader isFullScreen={false} />
      ) : data?.users.length ? (
        <VStack spacing="4" py="4">
          {data?.users.map((u) => (
            <Card p="2" w="100%" cursor="pointer" variant={u.id === Number(user.id) ? 'filled' : 'outline'}>
              <HStack spacing="4">
                <Avatar size="sm" src={AVATAR_PATH(u.picturePath)} name={u.fullName} />
                <Text fontSize="md">{u.id === Number(user.id) ? 'You' : u.login}</Text>
              </HStack>
            </Card>
          ))}
        </VStack>
      ) : (
        <NothingFound />
      )}
    </DrawerWrapper>
  );
};

export default EventVisitors;
