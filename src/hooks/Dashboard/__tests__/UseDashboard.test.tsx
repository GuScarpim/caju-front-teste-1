// src/hooks/useDashboard.test.tsx
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { useDashboard } from '../useDashboard';
import { getRegistrations } from '../../../services/registrationService';
import { showErrorToast } from '~/utils/toastConfig';
import { act } from 'react-dom/test-utils';
import { Registration } from '../../../types/registration';
import { DashboardProvider } from '../../../context/dashboardContext'; // Certifique-se de que o caminho esteja correto

jest.mock('../../../services/registrationService');
jest.mock('~/utils/toastConfig', () => ({
  showErrorToast: jest.fn()
}));

const mockRegistrations: Registration[] = [
  {
    id: '1', status: 'APPROVED',
    admissionDate: '1',
    email: '1@1',
    employeeName: '1',
    cpf: '00000000000'
  },
  {
    id: '2', status: 'REVIEW',
    admissionDate: '1',
    email: '1@1',
    employeeName: '1',
    cpf: '00000000000'
  },
  {
    id: '3', status: 'REPROVED',
    admissionDate: '1',
    email: '1@1',
    employeeName: '1',
    cpf: '00000000000'
  }
];

describe('useDashboard', () => {
  it('should initialize with default values', () => {
    const TestComponent = () => {
      const { isLoading, registrations } = useDashboard();
      return (
        <div>
          <p data-testid="isLoading">{isLoading.toString()}</p>
          <p data-testid="registrations">{JSON.stringify(registrations)}</p>
        </div>
      );
    };

    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    expect(screen.getByTestId('registrations')).toHaveTextContent(JSON.stringify({
      APPROVED: [],
      REVIEW: [],
      REPROVED: []
    }));
  });

  it('should fetch and update registrations correctly', async () => {
    (getRegistrations as jest.Mock).mockResolvedValue({ data: mockRegistrations });

    const TestComponent = () => {
      const { fetchRegistrations, registrations } = useDashboard();
      return (
        <div>
          <button onClick={() => fetchRegistrations()}>Fetch Registrations</button>
          <p data-testid="registrations">{JSON.stringify(registrations)}</p>
        </div>
      );
    };

    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    fireEvent.click(screen.getByText('Fetch Registrations'));

    await waitFor(() => {
      expect(screen.getByTestId('registrations')).toHaveTextContent(JSON.stringify(mockRegistrations[0]));
    });
  });

  it('should handle fetch error correctly', async () => {
    (getRegistrations as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    const TestComponent = () => {
      const { fetchRegistrations } = useDashboard();
      return (
        <div>
          <button onClick={() => fetchRegistrations()}>Fetch Registrations</button>
        </div>
      );
    };

    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    await act(async () => {
      screen.getByText('Fetch Registrations').click();
      await waitFor(() => {
        expect(showErrorToast).toHaveBeenCalledWith('Erro ao buscar registros');
      });
    });
  });
});
