import { useCallback, useContext } from 'react';
import { DashboardContext } from '../../context/dashboardContext';
import { getRegistrations } from '../../services/registrationService';
import { Registration, Status } from '../../types/registration';
import { showErrorToast } from '~/utils/toastConfig';

const useDashboard = () => {
  const { isLoading, setIsLoading, registrations, setRegistrations } = useContext(DashboardContext);

  const separateByStatus = (data: Registration[]) => {
    const separatedData: Record<Status, Registration[]> = {
      APPROVED: [],
      REVIEW: [],
      REPROVED: []
    };

    data.forEach((registration) => {
      if (registration.status in separatedData) {
        separatedData[registration.status].push(registration);
      }
    });

    return separatedData;
  };

  const fetchRegistrations = useCallback(async (query?: string) => {
    try {
      setIsLoading(true);
      const response = await getRegistrations({ query });

      const separatedData = separateByStatus(response.data ?? []);
      setRegistrations(separatedData);
    } catch (error) {
      showErrorToast('Erro ao buscar registros')
      console.error('Erro ao buscar registros', error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setRegistrations]);

  return {
    isLoading,
    registrations,
    setRegistrations,
    fetchRegistrations
  };
};

export { useDashboard };
