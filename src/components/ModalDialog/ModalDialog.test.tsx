import { render, screen, fireEvent } from '@testing-library/react';
import ModalDialog from './index';
import Container from '~/__mocks__/container';

describe('ModalDialog', () => {
  it('does not render when isOpen is false', () => {
    render(<Container><ModalDialog isOpen={false} onClose={() => { }} onConfirm={() => { }} title="Test Title" message="Test Message" /></Container>);
    expect(screen.queryByText('Test Title')).toBeNull();
    expect(screen.queryByText('Test Message')).toBeNull();
  });

  it('renders when isOpen is true', () => {
    render(<Container><ModalDialog isOpen={true} onClose={() => { }} onConfirm={() => { }} title="Test Title" message="Test Message" /></Container>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const onClose = jest.fn();
    render(<Container><ModalDialog isOpen={true} onClose={onClose} onConfirm={() => { }} title="Test Title" message="Test Message" /></Container>);
    fireEvent.click(screen.getByText('Cancelar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when Confirm button is clicked', () => {
    const onConfirm = jest.fn();
    render(<Container><ModalDialog isOpen={true} onClose={() => { }} onConfirm={onConfirm} title="Test Title" message="Test Message" /></Container>);
    fireEvent.click(screen.getByText('Confirmar'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
