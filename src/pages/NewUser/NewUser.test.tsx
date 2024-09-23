import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewUserPage from './index';
import { useNewUser } from '~/hooks/Dashboard/useNewUser';
import Container from '~/__mocks__/container';

// Mock the custom hook
jest.mock('~/hooks/Dashboard/useNewUser');

// Mock the styled components
jest.mock('./styles', () => ({
  Container: 'div',
  Card: 'div',
  IconButtonLarge: 'button',
}));

// Mock the react-icons
jest.mock('react-icons/hi', () => ({
  HiOutlineArrowLeft: () => <span data-testid="mock-arrow-icon" />,
}));

describe('NewUserPage', () => {
  const mockHandleCreateUser = jest.fn();
  const mockGoToHome = jest.fn();

  beforeEach(() => {
    (useNewUser as jest.Mock).mockReturnValue({
      handleCreateUser: mockHandleCreateUser,
      goToHome: mockGoToHome,
      isLoading: false,
    });
  });

  it('renders the NewUserPage component', () => {
    render(<Container><NewUserPage /></Container>);

    expect(screen.getByLabelText('voltar para o inicio')).toBeInTheDocument();
    expect(screen.getByTestId('mock-arrow-icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('calls goToHome when back button is clicked', async () => {
    render(<Container><NewUserPage /></Container>);

    const backButton = screen.getByLabelText('voltar para o inicio');
    await userEvent.click(backButton);

    expect(mockGoToHome).toHaveBeenCalledTimes(1);
  });
});