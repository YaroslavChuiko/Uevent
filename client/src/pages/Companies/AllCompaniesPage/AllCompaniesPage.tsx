import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SimpleGrid, Button, Flex, Heading, SlideFade } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useGetCompaniesQuery } from '~/store/api/company-slice';
import { useAppSelector } from '~/hooks/use-app-selector';
import CompaniesFilters from './CompaniesFilters';
import CompanyCard from '../CompanyCard/CompanyCard';
import CompanyCardSkeleton from '../CompanyCard/CompanyCardSkeleton';
import PageAlert from '~/components/PageAlert/PageAlert';
import Container from '~/components/Container/Container';
import NothingFound from '~/pages/Home/Events/NothingFound';
import Pagination from '~/components/Pagination/Pagination';
import IError from '~/types/error';
import type { Company } from '~/types/company';

type IProps = {
  heading: string;
  isYourCompanies?: boolean;
  isSubscriptions?: boolean;
};

const AllCompaniesPage = ({ heading, isYourCompanies = false, isSubscriptions = false }: IProps) => {
  const { user: curUser } = useAppSelector((state) => state.profile);
  const [search, setSearch] = useState('');
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: comData,
    isFetching: comIsFetching,
    error: comError,
  } = useGetCompaniesQuery({
    _start: (curPage - 1) * itemsPerPage,
    _end: curPage * itemsPerPage,
    q: search ? search : undefined,
    creatorId: isYourCompanies ? Number(curUser.id) : undefined,
    subscriberId: isSubscriptions ? Number(curUser.id) : undefined,
  });

  if (comError) {
    return <PageAlert status="error" message={(comError as IError).data.message} />;
  }

  return (
    <Container>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Heading color="hover">{heading}</Heading>
        {curUser.id && (
          <Button as={RouterLink} to="/companies/create" leftIcon={<AddIcon />}>
            Create company
          </Button>
        )}
      </Flex>
      <CompaniesFilters setSearch={setSearch} />
      <SimpleGrid minChildWidth="300px" spacing="30px" p="40px 0">
        {comIsFetching ? (
          <>
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
          </>
        ) : comData?.companies.length === 0 ? (
          <SlideFade offsetY="30px" in={true}>
            <NothingFound />
          </SlideFade>
        ) : (
          comData?.companies.map((company: Company) => (
            <SlideFade key={company.id} offsetY="30px" in={true}>
              <CompanyCard company={company} />
            </SlideFade>
          ))
        )}
      </SimpleGrid>
      <Flex w="100%" alignItems="center" justifyContent="center" pb="40px">
        <Pagination
          numberOfPages={Math.ceil((comData?.totalCount as number) / itemsPerPage)}
          curPage={curPage}
          setCurPage={setCurPage}
        />
      </Flex>
    </Container>
  );
};

export default AllCompaniesPage;
