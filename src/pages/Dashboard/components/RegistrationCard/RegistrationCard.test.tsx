import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationCard from './index';
import { useRegistration } from '~/hooks/Dashboard/useRegistration';
import { Status } from '~/utils/enums/status';
import Container from '~/__mocks__/container';
import { debug } from 'console';

// Mock the useRegistration hook
jest.mock('~/hooks/Dashboard/useRegistration', () => ({
  useRegistration: jest.fn().mockReturnValue({
    onRegistration: jest.fn(),
    onDelete: jest.fn(),
  }),
}));

// Mock the ModalDialog component
jest.mock('~/components/ModalDialog', () => ({
  __esModule: true,
  default: jest.fn(({ isOpen, onClose, onConfirm, title, message }) => (
    <div>
      {isOpen && (
        <div>
          <h1>{title}</h1>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      )}
    </div>
  )),
}));

describe('RegistrationCard', () => {
  const mockRegistration = {
    id: '1',
    cpf: '00000000000',
    employeeName: 'John Doe',
    email: 'john.doe@example.com',
    admissionDate: '2022-01-01',
    status: Status.REVIEW,
  };

  it('should render registration details', () => {
    render(<Container><RegistrationCard {...mockRegistration} /></Container>);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('2022-01-01')).toBeInTheDocument();
  });

  it('should open the modal when Aprovar button is clicked', () => {
    render(<Container><RegistrationCard {...mockRegistration} /></Container>);

    fireEvent.click(screen.getByText('Aprovar'));

    expect(screen.getByText('Você gostaria de mover o usuário para a coluna APROVADO?')).toBeInTheDocument();
  });

  it('should call onRegistration with APPROVED when Aprovar button is clicked', async () => {
    const { onRegistration } = useRegistration();

    render(<Container><RegistrationCard {...mockRegistration} /></Container>);

    fireEvent.click(screen.getByText('Aprovar'));

    const confirmButton = await screen.findByText('Confirmar');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(onRegistration).toHaveBeenCalledWith(mockRegistration, Status.APPROVED);
    });
  });

  it('should call onRegistration with REPROVED when Aprovar button is clicked', async () => {
    const { onRegistration } = useRegistration();

    render(<Container><RegistrationCard {...mockRegistration} /></Container>);

    fireEvent.click(screen.getByText('Reprovar'));

    const confirmButton = await screen.findByText('Confirmar');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(onRegistration).toHaveBeenCalledWith(mockRegistration, Status.REPROVED);
    });
  });

  it('should call onDelete when trash icon is clicked', async () => {
    const { onDelete } = useRegistration();

    render(<Container><RegistrationCard {...mockRegistration} /></Container>);

    const trashIcon = await screen.findByTestId('trash-id');

    fireEvent.click(trashIcon);

    const confirmButton = await screen.findByText('Confirmar');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(mockRegistration.id);
    });
  });
});
