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
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '~/store/api/user-slice';
import { useDeleteCompanyMutation } from '~/store/api/company-slice';
import { useAppSelector } from '~/hooks/use-app-selector';
import useRequestHandler from '~/hooks/use-request-handler';
import PageAlert from '~/components/PageAlert/PageAlert';
import Loader from '~/components/Loader/Loader';
import GoogleMap from '~/components/GoogleMap/GoogleMap';
import ConfirmPopover from '~/components/ConfirmPopover/ConfirmPopover';
import IError from '~/types/error';
import type { Company } from '~/types/company';
import { AVATAR_PATH } from '~/consts/avatar';

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
    <Card variant="outline">
      <CardHeader>
        <Flex flexDir="row">
          <Flex flexDir="column" flexGrow="1">
            <Avatar size="2xl" name={company.name} src={AVATAR_PATH(company.picturePath)} />
            <Heading mt="4" size="lg">
              {company.name}
            </Heading>
          </Flex>
          {Number(curUser.id) === company.userId && (
            <Flex>
              <Button onClick={() => setEdit(true)} leftIcon={<EditIcon />}>
                Edit
              </Button>
              <ConfirmPopover
                header="Are you sure you want to delete the company? Its events will be deleted too."
                trigger={
                  <Button
                    onClick={onOpenDelete}
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    isLoading={isDeleteLoading}
                  >
                    Delete
                  </Button>
                }
                onConfirm={() => {
                  deleteHandler(company.id);
                }}
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
              />
            </Flex>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <HStack divider={<StackDivider />} spacing="4">
            <Text fontSize="md" colorScheme="gray">
              {`${company.email}`}
            </Text>
            <Box fontSize="md">
              <Flex alignItems="center">
                Founder{' '}
                <Avatar size="sm" ml="7px" mr="7px" name={user?.fullName} src={AVATAR_PATH(user?.picturePath)} /> @
                {user?.login}
              </Flex>
            </Box>
          </HStack>
          <GoogleMap text={company.name} lat={company.latitude} lng={company.longitude} />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CompanyInfo;
