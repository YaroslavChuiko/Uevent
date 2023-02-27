import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import styles from '~/components/Layout/layout.styles';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Flex justify="center" align="flex-start" sx={styles.page}>
      {isEdit ? <ProfileForm setEdit={setIsEdit} /> : <ProfileInfo setEdit={setIsEdit} />}
    </Flex>
  );
};

export default ProfilePage;
