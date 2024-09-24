import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';
import Container from '~/__mocks__/container';
import { useNewUser } from '~/hooks/Dashboard/useNewUser';

import NewUser from './index';

jest.mock('~/hooks/Dashboard/useNewUser');

const axiosAdapterMockApi = new MockAdapter(api);
const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock('react-toastify');

const usersMock = {
  employeeName: "Gustavo Scarpim",
  email: "teste@teste.com",
  cpf: "47782898030",
  admissionDate: "10/10/2022",
  status: "APPROVED"
};

const renderComponent = () => render(<Container><NewUser /></Container>);

describe('NewUser component', () => {
  const mockHandleCreateUser = jest.fn();
  const mockGoToHome = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    (useNewUser as jest.Mock).mockReturnValue({
      handleCreateUser: mockHandleCreateUser,
      goToHome: mockGoToHome,
      isLoading: false,
    });
    mockPush.mockReset();
    onSubmit.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the NewUserPage component', () => {
    renderComponent();

    expect(screen.getByLabelText('voltar para o inicio')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('calls goToHome when back button is clicked', async () => {
    renderComponent();

    const backButton = screen.getByLabelText('voltar para o inicio');
    await userEvent.click(backButton);

    expect(mockGoToHome).toHaveBeenCalledTimes(1);
  });

  it('should create new user registration', async () => {
    const user = userEvent.setup();

    axiosAdapterMockApi
      .onPost('/registrations', usersMock)
      .reply(200, { id: '1', ...usersMock });

    renderComponent();

    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'Email' });
    const inputDate = screen.getByLabelText('Data de admissão');
    const inputCPF = screen.getByRole('textbox', { name: 'CPF' });
    const inputStatus = screen.getByRole('combobox', { name: 'Status' });

    await user.type(inputName, 'Gustavo Scarpim');
    await user.type(inputEmail, 'teste@teste.com');
    await user.type(inputCPF, '47782898030');
    await user.type(inputDate, '2023-02-10');
    await user.selectOptions(inputStatus, 'APPROVED');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    await waitFor(() => {
      expect(mockHandleCreateUser).toHaveBeenCalledTimes(1)
    });
  });

  it('should error created new user', async () => {
    const user = userEvent.setup();

    axiosAdapterMockApi
      .onPost('/registrations', usersMock)
      .reply(500, { message: 'Internal server error' });

    renderComponent();

    const inputName = screen.getByLabelText('Nome');
    const inputEmail = screen.getByLabelText('Email');
    const inputCPF = screen.getByLabelText('CPF');
    const inputDate = screen.getByLabelText('Data de admissão');
    const inputStatus = screen.getByRole('combobox', { name: 'Status' });

    await user.type(inputName, 'Gustavo Scarpim');
    await user.type(inputEmail, 'teste@teste.com');
    await user.type(inputCPF, '47782898030');
    await user.type(inputDate, '2023-02-10');
    await user.selectOptions(inputStatus, 'APPROVED');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    await waitFor(() => {
      expect(mockHandleCreateUser).toHaveBeenCalledTimes(1);
    });
  });
});
