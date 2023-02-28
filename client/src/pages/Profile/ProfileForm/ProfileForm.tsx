import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FiAtSign, FiUser, FiUserCheck } from 'react-icons/fi';
import { useAppSelector } from '~/hooks/use-app-selector';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateProfileMutation } from '~/store/api/profile-slice';
import { IUpdate, updateSchema } from '~/validation/profile';
import styles from '../profile-card.styles';
import ProfileFormAvatar from './ProfileFormAvatar';

type PropsType = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileForm = ({ setEdit }: PropsType) => {
  const { user } = useAppSelector((state) => state.profile);

  const [update, { isLoading }] = useUpdateProfileMutation();
  const { picturePath, id, ...defaultValues } = user;

  const { handler: updateHandler } = useRequestHandler<IUpdate>({
    f: update,
    successMsg: "You've successfully updated your profile",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdate>({
    resolver: zodResolver(updateSchema),
    defaultValues,
  });

  const onSubmit = async (data: IUpdate) => {
    await updateHandler(data);
    reset(defaultValues);
  };

  return (
    <Card sx={styles.card} variant="outline">
      <CardHeader>
        <Flex flexDir="row">
          <Flex flexDir="column" flexGrow="0">
            <ProfileFormAvatar />
          </Flex>
          <Flex justify="flex-end" flexGrow="1">
            <Button onClick={() => setEdit(false)} variant="outline">
              Go Back
            </Button>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="4">
            <FormControl isInvalid={!!errors.login}>
              <FormLabel htmlFor="login">Login</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<Icon as={FiUser} color="secondary" />} />
                <Input id="login" placeholder="Your login" {...register('login')} />
              </InputGroup>
              <FormErrorMessage>{errors.login && errors.login.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<Icon as={FiAtSign} color="secondary" />} />
                <Input id="email" placeholder="Your email" {...register('email')} />
              </InputGroup>
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<Icon as={FiUserCheck} color="secondary" />} />
                <Input id="fullName" placeholder="Your full name" {...register('fullName')} />
              </InputGroup>
              <FormErrorMessage>{errors.fullName && errors.fullName.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w="200px" colorScheme="blue" isLoading={isLoading}>
              Submit
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProfileForm;
