import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Flex w="100%" h="100%" justify="center" align="flex-start">
      {isEdit ? <ProfileForm setEdit={setIsEdit} /> : <ProfileInfo setEdit={setIsEdit} />}
    </Flex>
  );
};

export default ProfilePage;
