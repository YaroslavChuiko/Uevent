import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SimpleGrid, Center, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useGetCompaniesQuery } from '~/store/api/company-slice';
import { useAppSelector } from '~/hooks/use-app-selector';
import CompaniesFilters from './CompaniesFilters';
import CompanyCard from './CompanyCard';
import PageAlert from '~/components/PageAlert/PageAlert';
import Loader from '~/components/Loader/Loader';
import Container from '~/components/Container/Container';
import Pagination from '~/components/Pagination/Pagination';
import IError from '~/types/error';
import type { Company } from '~/types/company';

const AllCompaniesPage = () => {
  const { user: curUser } = useAppSelector((state) => state.profile);
  const [search, setSearch] = useState('');
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: comData,
    isLoading: comIsLoading,
    error: comError,
  } = useGetCompaniesQuery({
    _start: (curPage - 1) * itemsPerPage,
    _end: curPage * itemsPerPage,
    q: search ? search : undefined,
  });

  if (comError) {
    return <PageAlert status="error" message={(comError as IError).data.message} />;
  }

  if (comIsLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {curUser.id && (
        <Button as={RouterLink} to="/companies/create" leftIcon={<AddIcon />}>
          Create company
        </Button>
      )}
      <CompaniesFilters setSearch={setSearch} />
      {comData?.companies.length === 0 ? (
        <Center h="200px" fontSize="xl">
          No companies found
        </Center>
      ) : (
        <SimpleGrid minChildWidth="300px" spacing="30px" p="40px 0">
          {comData?.companies.map((company: Company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </SimpleGrid>
      )}
      <Pagination
        numberOfPages={Math.ceil((comData?.totalCount as number) / itemsPerPage)}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </Container>
  );
};

export default AllCompaniesPage;
