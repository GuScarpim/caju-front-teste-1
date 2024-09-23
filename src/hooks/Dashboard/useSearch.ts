import { useCallback, useContext, useEffect, useRef } from 'react';
import { useDashboard } from './useDashboard';
import { maskCPF, removeMaskCPF } from '~/utils/maskUtils';
import { DashboardContext } from '~/context/dashboardContext';

const useSearch = () => {
  const { fetchRegistrations } = useDashboard();
  const { query: searchResults, setQuery: setSearchResults } = useContext(DashboardContext);
  const hasSearched = useRef(false);

  const handleInputChange = (cpf: string) => {
    setSearchResults(maskCPF(cpf));
  };

  const refreshRegistrations = useCallback(() => {
    fetchRegistrations()
    setSearchResults('')
  }, [fetchRegistrations, setSearchResults]);

  useEffect(() => {
    const results = removeMaskCPF(searchResults);

    if (results.length === 11) {
      hasSearched.current = true;
      fetchRegistrations(results);
    }

    else if (results === '' && hasSearched.current) {
      hasSearched.current = false;
      fetchRegistrations();
    }

  }, [fetchRegistrations, searchResults]);

  return { searchResults, setSearchResults, handleInputChange, refreshRegistrations };
};

export { useSearch };
