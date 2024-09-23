import { render, screen, fireEvent } from '@testing-library/react';
import FormUser from './index';
import { PropsTextFieldFormik } from '~/components/TextFieldFormik';

jest.mock('~/components/Button', () => ({ default: ({ children, ...props }: any) => <button {...props}>{children}</button> }));
jest.mock('~/components/TextFieldFormik', () => ({ default: ({ name, label, ...props }: PropsTextFieldFormik) => <input data-testid={name} aria-label={label} {...props} /> }));
jest.mock('~/utils/maskUtils', () => ({ maskCPF: jest.fn((value) => value) }));

describe('FormUser', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('disables submit button when isLoading is true', () => {
    render(<FormUser onSubmit={mockOnSubmit} isLoading={true} />);
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeDisabled();
  });

  it('applies CPF mask when typing', () => {
    render(<FormUser onSubmit={mockOnSubmit} isLoading={false} />);

    const cpfInput = screen.getByLabelText('CPF');
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    expect(cpfInput).toHaveValue('12345678900');
  });
});
