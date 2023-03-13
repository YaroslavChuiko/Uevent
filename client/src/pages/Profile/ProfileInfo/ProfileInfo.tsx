import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  StackDivider,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { AVATAR_PATH } from '~/consts/avatar';
import { useAppSelector } from '~/hooks/use-app-selector';
import { profileLinks as links } from '../const';
import styles from '../profile-card.styles';
import DangerZone from './DangerZone';

type PropsType = { onOpen: () => void };

const ProfileInfo = ({ onOpen }: PropsType) => {
  const { user } = useAppSelector((state) => state.profile);

  return (
    <Card sx={styles.card} variant="outline">
      <CardHeader>
        <Flex flexDir="row">
          <Flex flexDir="column" flexGrow="1">
            <Avatar size="2xl" name={user.fullName as string} src={AVATAR_PATH(user.picturePath)} bgColor="secondary" />

            <Heading mt="4" size="lg">
              {user.fullName}
            </Heading>
          </Flex>
          <Flex>
            <Button onClick={onOpen} leftIcon={<Icon as={FiEdit} />}>
              Edit
            </Button>
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
            <DangerZone />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileInfo;
