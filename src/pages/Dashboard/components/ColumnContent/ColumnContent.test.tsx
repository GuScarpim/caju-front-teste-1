import { render, screen } from '@testing-library/react';
import ColumnContent from './index';
import RegistrationCard from '../RegistrationCard';
import { Registration } from '~/types/registration';

// Mock the RegistrationCard component
jest.mock('../RegistrationCard', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Registration Card</div>)
}));

const mockRegistrations: Registration[] = [
  {
    id: '1', status: 'APPROVED',
    admissionDate: '',
    email: '',
    employeeName: '',
    cpf: ''
  },
  {
    id: '2', status: 'REVIEW',
    admissionDate: '',
    email: '',
    employeeName: '',
    cpf: ''
  }
];

describe('ColumnContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a list of RegistrationCard components', () => {
    render(<ColumnContent registrations={mockRegistrations} />);

    expect(screen.getAllByText('Registration Card')).toHaveLength(mockRegistrations.length);
  });

  it('should pass the correct props to RegistrationCard', () => {
    render(<ColumnContent registrations={mockRegistrations} />);

    mockRegistrations.forEach(registration => {
      expect(RegistrationCard).toHaveBeenCalledWith(expect.objectContaining(registration), {});
    });
  });

  it('should render an empty list if no registrations are passed', () => {
    render(<ColumnContent registrations={[]} />);

    expect(screen.queryByText('Registration Card')).toBeNull();
  });
});
