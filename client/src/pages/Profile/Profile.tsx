import { Flex, useDisclosure } from '@chakra-ui/react';
import styles from '~/components/Layout/layout.styles';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const ProfilePage = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Flex justify="center" align="flex-start" sx={styles.page}>
      <ProfileForm isOpen={isOpen} onClose={onClose} />
      <ProfileInfo onOpen={onOpen} />
    </Flex>
  );
};

export default ProfilePage;
