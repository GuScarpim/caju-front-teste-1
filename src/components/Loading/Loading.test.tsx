import { render, screen } from '@testing-library/react';
import LoadingScreen from './index';
import Container from '~/__mocks__/container';

describe('LoadingScreen', () => {
  it('renders the loading spinner and uses default values', () => {

    render(<Container><LoadingScreen /></Container>);

    const loadingElement = screen.getByTestId('1');
    expect(loadingElement).toBeInTheDocument();

    expect(loadingElement).toBeTruthy();
  });

  it('renders the loading spinner with custom height and width', () => {

    render(<Container><LoadingScreen isLoadingHeight="200px" isLoadingWidth="200px" /></Container>);

    const spinner = screen.getByLabelText('loading');
    expect(spinner).toHaveStyle('height: 200px');
    expect(spinner).toHaveStyle('width: 200px');
  });

  it('does not render the full screen loading container when fullScreen is false', () => {

    render(<Container><LoadingScreen fullScreen={false} /></Container>);

    const loadingElement = screen.getByTestId('0');
    expect(loadingElement).toBeTruthy();
  });

  it('renders the full screen loading container when fullScreen is true', () => {

    render(<Container><LoadingScreen fullScreen={true} /></Container>);

    const loadingElement = screen.getByTestId('1');
    expect(loadingElement).toBeTruthy();
  });
});
