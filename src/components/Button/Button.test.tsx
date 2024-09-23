import { render, screen } from '@testing-library/react';
import Container from '~/__mocks__/container';
import Button from './index';
import { ButtonSmall } from './styles';

describe('Button Component', () => {
  it('renders children when not loading', () => {
    render(<Container><Button>Click me</Button></Container>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });

  it('renders LoadingScreen when isLoading is true', () => {
    render(<Container><Button isLoading={true} /></Container>);

    expect(screen.getByLabelText('Carregando...')).toBeInTheDocument();
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });

  it('renders LoadingScreen when isLoading is true', () => {
    render(<Container><ButtonSmall>Carregando...</ButtonSmall></Container>);

    expect(screen.queryByText('Carregando...')).toBeInTheDocument();
  });
});
