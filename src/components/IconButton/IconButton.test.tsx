import { render, screen } from '@testing-library/react';
import IconButton from './index';
import Container from '~/__mocks__/container';

describe('IconButton Component', () => {
  it('renders children inside the button', () => {
    const buttonText = 'Click Me';

    render(<Container><IconButton>{buttonText}</IconButton></Container>);

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies HTML button attributes', () => {
    const buttonTestId = 'icon-button';

    render(<Container><IconButton data-testid={buttonTestId} disabled>Test</IconButton></Container>);

    const buttonElement = screen.getByTestId(buttonTestId);
    expect(buttonElement).toBeDisabled();
  });
});
