import { render, screen } from '@testing-library/react';
import TextField from './index';
import Container from '~/__mocks__/container';

describe('TextField', () => {
  it('renders with a label', () => {
    render(<Container><TextField label="Username" id="username" /></Container>);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders without a label', () => {
    render(<Container><TextField id="username" /></Container>);
    expect(screen.queryByLabelText('Username')).toBeNull();
  });

  it('renders with an error message', () => {
    render(<Container><TextField label="Username" id="username" error="This field is required" /></Container>);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not render an error message when none is provided', () => {
    render(<Container><TextField label="Username" id="username" /></Container>);
    expect(screen.queryByText('This field is required')).toBeNull();
  });

  it('renders the input with correct id and placeholder', () => {
    render(<Container><TextField id="username" placeholder="Enter your username" /></Container>);
    const input = screen.getByPlaceholderText('Enter your username');
    expect(input).toHaveAttribute('id', 'username');
  });
});
