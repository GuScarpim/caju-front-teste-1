import { render, screen, act, waitFor } from '@testing-library/react';
import { showErrorToast, showSuccessToast } from '~/utils/toastConfig';
import { Registration } from '~/types/registration';
import { formatDate } from '~/utils/formatDate';
import { createRegistration } from '~/services/registrationService';
import { useNewUser } from '../useNewUser';
import { removeMaskCPF } from '~/utils/maskUtils';

jest.mock('~/services/registrationService');
jest.mock('~/utils/toastConfig', () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
}));
(createRegistration as jest.Mock).mockResolvedValue({});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));


const mockRegistration: Registration = {
  id: '1',
  email: 'john@email.com',
  employeeName: 'John Doe',
  cpf: '123.456.789-00',
  admissionDate: '01-01-2015',
  status: 'APPROVED'
};

describe('useNewUser', () => {
  it('should handle user creation successfully', async () => {
    (createRegistration as jest.Mock).mockResolvedValue({});

    const TestComponent = () => {
      const { isLoading, handleCreateUser } = useNewUser();

      return (
        <div>
          <button
            onClick={() => handleCreateUser(mockRegistration)}
          >
            Create User
          </button>
          {isLoading && <p data-testid="loading">Loading...</p>}
        </div>
      );
    };

    render(<TestComponent />);

    await act(async () => {
      screen.getByText('Create User').click();

      expect(createRegistration).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(showSuccessToast).toHaveBeenCalledWith('Usuário cadastrado com sucesso!');
      });

      expect(createRegistration).toHaveBeenCalledWith({
        ...mockRegistration,
        admissionDate: formatDate(mockRegistration.admissionDate),
        cpf: removeMaskCPF(mockRegistration.cpf)
      });

      expect(screen.queryByTestId('loading')).toBeNull();
    });
  });

  it('should handle user creation error', async () => {
    (createRegistration as jest.Mock).mockRejectedValue(new Error('Creation error'));

    const TestComponent = () => {
      const { isLoading, handleCreateUser } = useNewUser();

      return (
        <div>
          <button
            onClick={() => handleCreateUser(mockRegistration)}
          >
            Create User
          </button>
          {isLoading && <p data-testid="loading">Loading...</p>}
        </div>
      );
    };

    render(<TestComponent />);

    await act(async () => {
      screen.getByText('Create User').click();
      await waitFor(() => {
        expect(showErrorToast).toHaveBeenCalledWith('Erro ao criar registro');
        expect(screen.queryByTestId('loading')).toBeNull();
      });
    });
  });

  it('should show loading state while creating user', async () => {
    (createRegistration as jest.Mock).mockReturnValue(new Promise(() => { }));

    const TestComponent = () => {
      const { isLoading, handleCreateUser } = useNewUser();

      return (
        <div>
          <button
            onClick={() => handleCreateUser(mockRegistration)}
          >
            Create User
          </button>
          {isLoading && <p data-testid="loading">Loading...</p>}
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      screen.getByText('Create User').click();
    });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
