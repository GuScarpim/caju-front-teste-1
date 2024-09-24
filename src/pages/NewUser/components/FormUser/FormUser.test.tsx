import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import FormUser from './index';
import Container from '~/__mocks__/container';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';


const axiosAdapterMockApi = new MockAdapter(api);

const usersMock = {
  employeeName: "Gustavo Scarpim",
  email: "teste@teste.com",
  cpf: "47782898030",
  admissionDate: "10/10/2022",
  status: "APPROVED"
};

describe('FormUser Validations', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should display validation errors when required fields are missing', async () => {
    render(<Container><FormUser onSubmit={mockOnSubmit} isLoading={false} /></Container>);

    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('CPF é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Data de admissão é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Status é obrigatório')).toBeInTheDocument();
  });


  it('should display invalid email error when email is not valid', async () => {
    const user = userEvent.setup();

    axiosAdapterMockApi
      .onPost('/registrations', usersMock)
      .reply(200, { id: '8fb1', ...usersMock });

    render(<Container><FormUser onSubmit={mockOnSubmit} isLoading={false} /></Container>);

    const inputEmail = screen.getByRole('textbox', { name: 'Email' });
    await user.type(inputEmail, 'angular@');

    const button = screen.getByRole('button', { name: 'Cadastrar' });
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryByText('Email inválido')).toBeInTheDocument();
    });
  });


  it('should display invalid CPF error when CPF is not valid', async () => {
    render(<Container><FormUser onSubmit={mockOnSubmit} isLoading={false} /></Container>);

    const cpfInput = screen.getByLabelText('CPF');
    fireEvent.change(cpfInput, { target: { value: '11111111111' } });

    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    expect(screen.getByText('CPF inválido')).toBeInTheDocument();
  });

  // it('should display invalid status error when an invalid status is selected', async () => {
  //   render(<Container><FormUser onSubmit={mockOnSubmit} isLoading={false} /></Container>);

    // const statusInput = screen.getByText('Status');
    // fireEvent.change(statusInput, { target: { value: 'invalid-status' } });

  //   await act(async () => {
  //     fireEvent.click(screen.getByTestId('submit-button'));
  //   });

  //   expect(screen.getByText('Status inválido')).toBeInTheDocument();
  // });
});
