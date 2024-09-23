import { useContext } from 'react';
import { updateRegistration, deleteRegistration } from '../../services/registrationService';
import { Registration, Status } from '~/types/registration';
import { useDashboard } from './useDashboard';
import { showErrorToast, showSuccessToast } from '~/utils/toastConfig';
import { DashboardContext } from '~/context/dashboardContext';
import { removeMaskCPF } from '~/utils/maskUtils';

const useRegistration = () => {
  const { fetchRegistrations } = useDashboard()
  const { isLoading, setIsLoading, query: searchResults } = useContext(DashboardContext);
  const results = removeMaskCPF(searchResults);

  const handleUpdateRegistration = async (registration: Registration, status: Status) => {
    setIsLoading(true);

    const data: Registration = {
      ...registration,
      status
    }

    try {
      await updateRegistration(data.id, data);

      await fetchRegistrations(results);
      showSuccessToast('Usuário atualizado com sucesso!');
    } catch (err) {
      showErrorToast('Erro ao alterar usuário!');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteRegistration(id);
      await fetchRegistrations(results);
      showSuccessToast('Usuário deletado com sucesso!');
    } catch (err) {
      console.error(err);
      showErrorToast('Erro ao deletar usuário!');
    } finally {
      setIsLoading(false);
    }
  };

  const onRegistration = async (registration: Registration, status: Status) => {
    await handleUpdateRegistration(registration, status);
  };

  const onDelete = async (id: string) => {
    await handleDeleteRegistration(id);
  };

  return {
    isLoading,
    handleUpdateRegistration,
    handleDeleteRegistration,
    onRegistration,
    onDelete
  };
};

export { useRegistration };
