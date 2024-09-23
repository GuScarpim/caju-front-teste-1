import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from './index';
import { useDashboard } from '../../hooks/Dashboard/useDashboard';
import Container from '~/__mocks__/container';

jest.mock('./components/Searchbar', () => ({ SearchBar: () => <div>SearchBar</div> }));
jest.mock('./components/Columns', () => ({ default: ({ registrations, isLoading }: any) => <div>Columns: {registrations.length}, Loading: {isLoading.toString()}</div> }));
jest.mock('../../hooks/Dashboard/useDashboard');

describe('DashboardPage', () => {
  const mockFetchRegistrations = jest.fn();
  const mockRegistrations = [{ id: 1, name: 'Test' }];

  beforeEach(() => {
    useDashboard.mockReturnValue({
      fetchRegistrations: mockFetchRegistrations,
      registrations: mockRegistrations,
      isLoading: false,
    });
  });

  it('renders the DashboardPage component', () => {
    render(<Container><DashboardPage /></Container>);

    expect(screen.getByText('SearchBar')).toBeInTheDocument();
    expect(screen.getByText('Columns: 1, Loading: false')).toBeInTheDocument();
  });

  it('calls fetchRegistrations on mount', async () => {
    render(<Container><DashboardPage /></Container>);

    await waitFor(() => {
      expect(mockFetchRegistrations).toHaveBeenCalledTimes(2);
    });
  });

  it('displays loading state correctly', () => {
    useDashboard.mockReturnValue({
      fetchRegistrations: mockFetchRegistrations,
      registrations: [],
      isLoading: true,
    });

    render(<Container><DashboardPage /></Container>);

    expect(screen.getByText('Columns: 0, Loading: true')).toBeInTheDocument();
  });
});