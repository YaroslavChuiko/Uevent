import { DeleteIcon, EditIcon, LockIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  StackDivider,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { useAppSelector } from '~/hooks/use-app-selector';
import { profileLinks as links } from './const';
import styles from './profile-info.styles';

const ProfileInfo = () => {
  const { user } = useAppSelector((state) => state.profile);

  const avatarSrc = `${import.meta.env.VITE_API_URL}/${user.picturePath}`;

  return (
    <Card sx={styles.card} variant="outline">
      <CardHeader>
        <Flex flexDir="row">
          <Flex flexDir="column" flexGrow="1">
            <Avatar size="2xl" src={avatarSrc} />

            <Heading mt="4" size="lg">
              {user.fullName}
            </Heading>
          </Flex>
          <Flex>
            <Button leftIcon={<EditIcon />}>Edit</Button>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Heading size="xs" textTransform="uppercase">
            General
          </Heading>
          <HStack divider={<StackDivider />} spacing="4">
            <Text fontSize="md" colorScheme="gray">
              {`@${user.login}`}
            </Text>
            <Text fontSize="md" colorScheme="gray">
              {`${user.email}`}
            </Text>
          </HStack>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Important links
            </Heading>
            <Wrap align="center" spacing="4" py="4">
              {links.map((l) => (
                <LinkBox key={l.label} maxW="sm">
                  <Box p="5" bgColor={l.color} borderRadius="12px">
                    <Heading size="sm">
                      <LinkOverlay isExternal href={l.href}>
                        {l.label}
                      </LinkOverlay>
                    </Heading>
                    <Text fontSize="sm">{l.description}</Text>
                  </Box>
                </LinkBox>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Danger zone
            </Heading>
            <Wrap mt="4" spacing="4">
              <LinkBox maxW="sm">
                <Button leftIcon={<LockIcon />} colorScheme="blue" variant="outline">
                  <LinkOverlay isExternal href="/password-reset">
                    Reset password
                  </LinkOverlay>
                </Button>
              </LinkBox>
              <Button leftIcon={<DeleteIcon />} colorScheme="red">
                Delete my account
              </Button>
            </Wrap>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileInfo;
