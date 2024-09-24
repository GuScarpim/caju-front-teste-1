import { render, screen } from '@testing-library/react';
import Collumns from './index';
import SingleColumn from '../SingleColumn';
import { Status } from '~/utils/enums/status';
import { RegistrationsByStatus } from '~/types/registration';
import Container from '~/__mocks__/container';

// Mock components
jest.mock('../SingleColumn', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Single Column</div>)
}));

jest.mock('~/components/Loading', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Loading Screen</div>)
}));

const mockRegistrations: RegistrationsByStatus = {
  [Status.REVIEW]: [{ id: '1', status: Status.REVIEW }],
  [Status.APPROVED]: [{ id: '2', status: Status.APPROVED }],
  [Status.REPROVED]: [{ id: '3', status: Status.REPROVED }],
  APPROVED: [],
  REVIEW: [],
  REPROVED: []
};


describe('Collumns', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render LoadingScreen when isLoading is true', () => {
    render(<Container><Collumns registrations={mockRegistrations} isLoading={true} /></Container>);
    expect(screen.getByText('Loading Screen')).toBeInTheDocument();
  });

  it('should render SingleColumn components when isLoading is false', () => {
    render(<Container><Collumns registrations={mockRegistrations} isLoading={false} /></Container>);
    expect(screen.getAllByText('Single Column')).toHaveLength(3);
  });

  it('should pass the correct props to SingleColumn', () => {
    render(<Container><Collumns registrations={mockRegistrations} isLoading={false} /></Container>);

    expect(SingleColumn).toHaveBeenCalledWith(
      expect.objectContaining({
        status: Status.REVIEW,
        title: "Pronto para revisar",
        registrations: mockRegistrations[Status.REVIEW]
      }),
      {}
    );
    expect(SingleColumn).toHaveBeenCalledWith(
      expect.objectContaining({
        status: Status.APPROVED,
        title: "Aprovado",
        registrations: mockRegistrations[Status.APPROVED]
      }),
      {}
    );
    expect(SingleColumn).toHaveBeenCalledWith(
      expect.objectContaining({
        status: Status.REPROVED,
        title: "Reprovado",
        registrations: mockRegistrations[Status.REPROVED]
      }),
      {}
    );
  });

  it('should pass an empty array for statuses with no registrations', () => {
    const emptyRegistrations: RegistrationsByStatus = {
      [Status.REVIEW]: [],
      [Status.APPROVED]: [],
      [Status.REPROVED]: [],
      APPROVED: [],
      REVIEW: [],
      REPROVED: []
    };

    render(<Container><Collumns registrations={emptyRegistrations} isLoading={false} /></Container>);

    expect(SingleColumn).toHaveBeenCalledWith(
      expect.objectContaining({
        status: Status.REVIEW,
        title: "Pronto para revisar",
        registrations: []
      }),
      {}
    );
    expect(SingleColumn).toHaveBeenCalledWith(
      expect.objectContaining({
        status: Status.APPROVED,
        title: "Aprovado",
        registrations: []
      }),
      {}
    );
    expect(SingleColumn).toHaveBeenCalledWith(
      expect.objectContaining({
        status: Status.REPROVED,
        title: "Reprovado",
        registrations: []
      }),
      {}
    );
  });
});