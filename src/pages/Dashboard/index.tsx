import { useEffect } from 'react';
import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useDashboard } from '../../hooks/Dashboard/useDashboard';

const DashboardPage = () => {
  const { fetchRegistrations, registrations, isLoading } = useDashboard();

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} isLoading={isLoading} />
    </S.Container>
  );
};
export default DashboardPage;
