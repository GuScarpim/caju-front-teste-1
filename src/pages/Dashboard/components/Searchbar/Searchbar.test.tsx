import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './index';
import { useSearch } from '~/hooks/Dashboard/useSearch';
import { useHistory } from 'react-router-dom';
import Container from '~/__mocks__/container';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('~/hooks/Dashboard/useSearch', () => ({
  useSearch: jest.fn().mockReturnValue({
    handleInputChange: jest.fn(),
    searchResults: '',
    refreshRegistrations: jest.fn(),
  }),
}));

describe('SearchBar', () => {
  it('should render the search input and buttons', () => {
    render(<Container><SearchBar /></Container>);

    expect(screen.getByPlaceholderText('Digite um CPF válido')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nova Admissão' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'refetch' })).toBeInTheDocument();
  });

  it('should call refreshRegistrations when refetch button is clicked', () => {
    const { refreshRegistrations } = useSearch();
    render(<Container><SearchBar /></Container>);

    fireEvent.click(screen.getByRole('button', { name: 'refetch' }));

    expect(refreshRegistrations).toHaveBeenCalled();
  });

  it('should navigate to new admission page when Nova Admissão button is clicked', () => {
    const push = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({ push });
    render(<Container><SearchBar /></Container>);

    fireEvent.click(screen.getByRole('button', { name: 'Nova Admissão' }));

    expect(push).toHaveBeenCalledWith('/new-user');
  });

  it('should call handleInputChange with the correct value when input changes', () => {
    const { handleInputChange } = useSearch();
    render(<Container><SearchBar /></Container>);

    fireEvent.change(screen.getByPlaceholderText('Digite um CPF válido'), { target: { value: '12345678900' } });

    expect(handleInputChange).toHaveBeenCalledWith('12345678900');
  });
});