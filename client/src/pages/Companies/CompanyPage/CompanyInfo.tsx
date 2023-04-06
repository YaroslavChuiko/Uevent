import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
  Icon,
  Link,
  useMediaQuery,
  Wrap,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '~/store/api/user-slice';
import { useDeleteCompanyMutation } from '~/store/api/company-slice';
import { useAppSelector } from '~/hooks/use-app-selector';
import useRequestHandler from '~/hooks/use-request-handler';
import PageAlert from '~/components/PageAlert/PageAlert';
import Loader from '~/components/Loader/Loader';
import Container from '~/components/Container';
import GoogleMap from '~/components/GoogleMap/GoogleMap';
import ConfirmPopover from '~/components/ConfirmPopover/ConfirmPopover';
import SubscribersInfo from './SubscribersInfo';
import IError from '~/types/error';
import type { Company } from '~/types/company';
import type { User } from '~/types/user';
import { AVATAR_PATH } from '~/consts/avatar';
import Geocode from '~/consts/geocode';
import styles from './company.styles';
import CompanyEvents from './CompanyEvents';
import CustomAlert from '~/components/Alert/CustomAlert';
import StripeButtons from './StripeButtons';

type IProps = {
  company: Company;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompanyInfo = ({ company, setEdit }: IProps) => {
  const { user: curUser } = useAppSelector((state) => state.profile);
  const { data: user, isLoading: userIsLoading, error: userError } = useGetUserQuery(company.userId);
  const [deleteCompany, { isLoading: isDeleteLoading }] = useDeleteCompanyMutation();
  const { onOpen: onOpenDelete, onClose: onCloseDelete, isOpen: isOpenDelete } = useDisclosure();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');

  useEffect(() => {
    Geocode.fromLatLng(company.latitude.toString(), company.longitude.toString()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      (error) => {
        setAddress('');
      },
    );
  }, []);

  const { handler: deleteHandler } = useRequestHandler<number>({
    f: deleteCompany,
    successMsg: "You've successfully deleted the company",
    successF: () => {
      navigate('/');
    },
  });

  const error = userError;
  if (error) {
    return <PageAlert status="error" message={(error as IError).data.message} />;
  }

  if (userIsLoading) {
    return <Loader />;
  }

  return (
    <Container pb="16">
      <Flex sx={styles.poster}>
        <Box sx={styles.blurBg(AVATAR_PATH(company.picturePath))} />
        <Card sx={styles.intro}>
          <VStack spacing={4} maxWidth="100%">
            <Avatar size="2xl" name={company.name} src={AVATAR_PATH(company.picturePath)} />
            <Heading mt="4" size="lg" textAlign="center">
              {company.name}
            </Heading>
            <SubscribersInfo company={company} />

            <Box sx={styles.location}>
              <HStack spacing="6" align="center" h="100%">
                <Icon color="tertiary" w="6" h="6" as={FiMapPin} />
                <VStack align="flex-start">
                  <Text>{address ? address : 'Check the map'}</Text>
                </VStack>
              </HStack>
            </Box>

            <EmailAndFounder company={company} user={user} />
            {company.isAccountCompleted == false && (
              <CustomAlert
                status="warning"
                description="Paid events aren't possible. Complete your Stripe account using the button below."
              />
            )}
          </VStack>
        </Card>
      </Flex>

      <VStack spacing={4} marginTop="20px">
        {Number(curUser.id) === company.userId && (
          <Wrap spacing={4} alignSelf="flex-end">
            <Button as={RouterLink} to="/events/create" leftIcon={<AddIcon />}>
              Create event
            </Button>
            <Button onClick={() => setEdit(true)} leftIcon={<EditIcon />}>
              Edit
            </Button>
            <StripeButtons company={company} />
            <ConfirmPopover
              header="Are you sure you want to delete the company? Its events will be deleted too."
              trigger={
                <Button onClick={onOpenDelete} leftIcon={<DeleteIcon />} colorScheme="red" isLoading={isDeleteLoading}>
                  Delete
                </Button>
              }
              onConfirm={() => {
                deleteHandler(company.id);
              }}
              isOpen={isOpenDelete}
              onClose={onCloseDelete}
            />
          </Wrap>
        )}

        <GoogleMap text={`${company.name}, ${address}`} lat={company.latitude} lng={company.longitude} />
      </VStack>
      <CompanyEvents isCurUserOwner={Number(curUser.id) === company.userId} />
    </Container>
  );
};

const EmailAndFounder = ({ company, user }: { company: Company; user?: User }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const email = (
    <Text fontSize="md" wordBreak="break-all">
      <Link href={`mailto:${company.email}`}>{company.email}</Link>
    </Text>
  );

  const founder = (
    <Box fontSize="md">
      <Flex alignItems="center">
        Founder <Avatar size="sm" ml="7px" mr="7px" name={user?.fullName} src={AVATAR_PATH(user?.picturePath)} /> @
        {user?.login}
      </Flex>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        {founder}
        {email}
      </>
    );
  }

  return (
    <HStack divider={<StackDivider />} spacing="4">
      {founder}
      {email}
    </HStack>
  );
};

export default CompanyInfo;
