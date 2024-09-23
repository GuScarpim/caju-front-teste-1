import { render, screen, act, waitFor } from '@testing-library/react';
import { useRegistration } from '../useRegistration';
import { updateRegistration, deleteRegistration } from '~/services/registrationService';
import { showErrorToast } from '~/utils/toastConfig';
import { DashboardContext } from '~/context/dashboardContext';
import { Registration, } from '~/types/registration';
import { useDashboard } from '../useDashboard';

jest.mock('~/services/registrationService');
jest.mock('~/utils/toastConfig', () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn()
}));
jest.mock('~/utils/maskUtils', () => ({
  removeMaskCPF: jest.fn((data) => data)
}));
jest.mock('../useDashboard', () => ({
  useDashboard: jest.fn(() => ({
    fetchRegistrations: jest.fn()
  }))
}));

const mockRegistration: Registration = {
  id: '1',
  email: 'john@email.com',
  employeeName: 'John Doe',
  cpf: '123.456.789-00',
  admissionDate: '01-01-2015',
  status: 'APPROVED'
};

describe('useRegistration', () => {
  const mockContext = {
    isLoading: false,
    setIsLoading: jest.fn(),
    query: [mockRegistration],
  };

  it('should handle update registration error', async () => {
    (updateRegistration as jest.Mock).mockRejectedValue(new Error('Update error'));
    const { fetchRegistrations } = useDashboard() as any;
    (fetchRegistrations as jest.Mock).mockResolvedValue({});

    const TestComponent = () => {
      const { isLoading, handleUpdateRegistration } = useRegistration();
      const handleClick = () => handleUpdateRegistration(mockRegistration, 'REVIEW');

      return (
        <DashboardContext.Provider value={mockContext}>
          <div>
            <button onClick={handleClick}>Update Registration</button>
            {isLoading && <p data-testid="loading">Loading...</p>}
          </div>
        </DashboardContext.Provider>
      );
    };

    render(<TestComponent />);

    // Trigger update
    await act(async () => {
      screen.getByText('Update Registration').click();
      await waitFor(() => {
        expect(showErrorToast).toHaveBeenCalledWith('Erro ao alterar usuário!');
        expect(screen.queryByTestId('loading')).toBeNull();
      });
    });
  });

  it('should handle delete registration error', async () => {
    (deleteRegistration as jest.Mock).mockRejectedValue(new Error('Delete error'));
    const { fetchRegistrations } = useDashboard() as any;
    (fetchRegistrations as jest.Mock).mockResolvedValue({});

    const TestComponent = () => {
      const { isLoading, handleDeleteRegistration } = useRegistration();
      const handleClick = () => handleDeleteRegistration(mockRegistration.id);

      return (
        <DashboardContext.Provider value={mockContext}>
          <div>
            <button onClick={handleClick}>Delete Registration</button>
            {isLoading && <p data-testid="loading">Loading...</p>}
          </div>
        </DashboardContext.Provider>
      );
    };

    render(<TestComponent />);

    // Trigger delete
    await act(async () => {
      screen.getByText('Delete Registration').click();
      await waitFor(() => {
        expect(showErrorToast).toHaveBeenCalledWith('Erro ao deletar usuário!');
        expect(screen.queryByTestId('loading')).toBeNull();
      });
    });
  });
});
