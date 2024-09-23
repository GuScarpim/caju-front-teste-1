import { removeMaskCPF } from './../../utils/maskUtils';
import { useState } from 'react';
import { createRegistration } from '../../services/registrationService';
import { Registration } from '~/types/registration';
import { formatDate } from '~/utils/formatDate';
import { showErrorToast, showSuccessToast } from '~/utils/toastConfig';
import { useHistory } from 'react-router-dom';
import routes from '~/router/routes';

const useNewUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };


  const handleCreateUser = async (data: Registration) => {
    setIsLoading(true);
    try {
      const body = {
        ...data,
        admissionDate: formatDate(data.admissionDate),
        cpf: removeMaskCPF(data.cpf)
      };
      await createRegistration(body);
      goToHome();
      showSuccessToast('Usuário cadastrado com sucesso!');

    } catch (error) {
      showErrorToast('Erro ao criar registro');
      console.error("Erro ao criar registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleCreateUser,
    goToHome
  };
};

export { useNewUser };
