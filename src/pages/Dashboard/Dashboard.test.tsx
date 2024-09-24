import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from './index';
import { useDashboard } from '../../hooks/Dashboard/useDashboard';
import MockAdapter from 'axios-mock-adapter';
import Container from '~/__mocks__/container';
import api from '~/services/api';

jest.mock('./components/Searchbar', () => ({ SearchBar: () => <div>SearchBar</div> }));
jest.mock('./components/Columns', () => ({ default: ({ registrations, isLoading }: any) => <div>Columns: {registrations.length}, Loading: {isLoading.toString()}</div> }));
jest.mock('../../hooks/Dashboard/useDashboard');

const axiosAdapterMockApi = new MockAdapter(api);

const mockResponse = {
  APPROVED: [
    {
      id: "259d",
      employeeName: "Gustavo 2",
      email: "gustavoscarpim@gmail.com",
      cpf: "78502270006",
      admissionDate: "05/11/2022",
      status: "APPROVED"
    }
  ],
  REVIEW: [
    {
      id: "7ee9",
      employeeName: "Gustavo",
      email: "gustavoscarpim@gmail.com",
      cpf: "78502270006",
      admissionDate: "05/11/2022",
      status: "REVIEW"
    }
  ],
  REPROVED: [
    {
      id: "6",
      admissionDate: "22/10/2026",
      email: "jose6@caju.com.br",
      employeeName: "José Leão 6",
      status: "REPROVED",
      cpf: "78502270006"
    }
  ]
};

const renderComponent = () => render(<Container><DashboardPage /></Container>);

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
    renderComponent();

    expect(screen.getByText('SearchBar')).toBeInTheDocument();
    expect(screen.getByText('Columns: 1, Loading: false')).toBeInTheDocument();
  });

  it('calls fetchRegistrations on mount', async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockFetchRegistrations).toHaveBeenCalledTimes(2);
    });
  });

  it('should fetched registrations correctly', async () => {
    axiosAdapterMockApi
      .onGet('http://localhost:3000/registrations')
      .reply(200, mockResponse);

    renderComponent();

    waitFor(() => {
      expect(screen.getByText(/"employeeName":"Gustavo 2"/)).toBeInTheDocument();
      expect(screen.getByText(/"employeeName":"Gustavo"/)).toBeInTheDocument();
      expect(screen.getByText(/"employeeName":"José Leão 6"/)).toBeInTheDocument();
    });
  });

  it('should fetched filter registrations correctly', async () => {
    axiosAdapterMockApi.onGet('http://localhost:3000/registrations?cpf=78502270006')
      .reply(200, mockResponse);

    renderComponent();

    waitFor(() => {
      expect(screen.getByText(/"employeeName":"Gustavo 2"/)).toBeInTheDocument();
    });
  });
});