import { Flex } from '@chakra-ui/react';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const ProfilePage = () => {
  return (
    <Flex w="100%" h="100%" justify="center" align="flex-start">
      <ProfileInfo />
    </Flex>
  );
};

export default ProfilePage;
